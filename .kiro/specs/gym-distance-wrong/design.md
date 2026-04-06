# Gym Distance Wrong Bugfix Design

## Overview

The gym listing page incorrectly overwrites the backend-provided `gym.distance` value with a
client-side Haversine recalculation inside a `useMemo`. The backend `/api/gyms/nearby` already
computes the correct distance using the user's actual GPS coordinates passed as query params and
returns it as `gym.distance`. The client-side recalculation uses gym lat/lng values geocoded from
addresses, which may be inaccurate or have coordinates swapped, causing users to see wrong distances
on gym cards.

The fix is minimal: replace the `gyms` useMemo with a simple passthrough (`rawGyms`) and remove the
now-unused `getDistance` helper function.

## Glossary

- **Bug_Condition (C)**: The condition that triggers the bug — the `gyms` useMemo recalculates
  distance client-side, overwriting the backend-provided `gym.distance` value
- **Property (P)**: The desired behavior — each gym's displayed distance SHALL equal the value
  returned by the backend in `gym.distance`
- **Preservation**: Existing behaviors (sorting, filtering, null-distance display, location-denied
  UI) that must remain unchanged by the fix
- **getDistance**: The Haversine helper function in `src/pages/gym-listing/index.jsx` that computes
  distance between two lat/lng points — to be removed as part of the fix
- **rawGyms**: The React state holding gyms as formatted from the API response, including the
  backend-provided `distance` field
- **gyms**: The derived `useMemo` value currently overwriting `distance`; after the fix it becomes
  a simple passthrough of `rawGyms`
- **userLocation**: Client-side GPS coordinates used to trigger the nearby search query; still
  needed for the `searchQuery` trigger but no longer needed for distance calculation

## Bug Details

### Bug Condition

The bug manifests whenever the gym listing page loads and the backend returns gyms with a
pre-calculated `distance` field. The `gyms` useMemo in `src/pages/gym-listing/index.jsx` maps over
`rawGyms` and unconditionally replaces `gym.distance` with a client-side calculation using
`getDistance()`. If `userLocation` is null at that moment, all distances are set to `null`. If
`userLocation` is set but gym coordinates are inaccurate, the displayed distance diverges from the
correct backend value.

**Formal Specification:**
```
FUNCTION isBugCondition(gym, userLocation)
  INPUT: gym object from rawGyms (has backend-provided distance field),
         userLocation (may be null or set)
  OUTPUT: boolean

  // The bug condition is true whenever the useMemo recalculates distance,
  // which is always — it runs for every gym on every rawGyms/userLocation change
  RETURN true  // the useMemo always overwrites gym.distance
END FUNCTION
```

### Examples

- **Inaccurate coordinates**: Backend returns `distance: 1.2` for a gym 1.2 km away. The gym's
  stored lat/lng are geocoded from a partial address and are off by several km. The useMemo
  calculates `3.7 km` using those bad coordinates. User sees `3.7 km` instead of `1.2 km`.
- **Null userLocation on first render**: Backend returns gyms with distances. `userLocation` is
  still null when `rawGyms` first populates (race condition). The useMemo sets all distances to
  `null`. User sees "Distance unavailable" on every card even though the backend sent correct values.
- **Correct coordinates, still wrong**: Even when gym coordinates are accurate, the client
  recalculation introduces floating-point rounding differences vs. the backend's calculation.
- **After fix**: Backend returns `distance: 2.4`. The passthrough useMemo returns `rawGyms`
  unchanged. User sees `2.4 km` — the correct backend value.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- When a gym has no `distance` value in the backend response, the GymCard SHALL continue to display
  "Distance unavailable"
- Sorting by distance SHALL continue to work correctly using the distance values on each gym object
- The distance filter slider SHALL continue to filter gyms using `gym.distance <= filters.distance`
- When location is denied or unavailable, the location-denied UI SHALL continue to show and no gyms
  SHALL be displayed

**Scope:**
All behaviors that do NOT involve the `gyms` useMemo distance recalculation are completely
unaffected by this fix. This includes:
- Mouse/touch interactions with gym cards
- Filter panel, sort controls, search bar behavior
- Map view rendering
- Gym details modal
- The geolocation flow and `searchQuery` trigger

## Hypothesized Root Cause

Based on the bug description and code review:

1. **Redundant client-side recalculation**: The `gyms` useMemo was likely added to reactively
   update distances when `userLocation` changes. However, the backend already receives the user's
   coordinates as query params (`/api/gyms/nearby?lat=...&lng=...`) and computes distance
   server-side. The client recalculation is therefore redundant and harmful.

2. **Inaccurate gym coordinates in the database**: Gym lat/lng values are geocoded from addresses
   and may be imprecise or have lat/lng swapped. The backend uses the user's actual GPS coordinates
   against its own distance computation, bypassing this issue. The client-side `getDistance` call
   uses these potentially bad coordinates directly.

3. **Race condition with userLocation**: The geolocation callback sets `userLocation` asynchronously.
   If `rawGyms` populates before `userLocation` is set (e.g., from a cached API response), the
   useMemo runs with `userLocation = null` and sets all distances to `null`, discarding the correct
   backend values.

4. **No guard against overwriting valid data**: The useMemo unconditionally overwrites `gym.distance`
   even when the backend already provided a valid value, with no fallback to the backend value.

## Correctness Properties

Property 1: Bug Condition - Backend Distance Passthrough

_For any_ gym object returned by the backend with a non-null `distance` field, the fixed `gyms`
useMemo SHALL return that gym with its `distance` value unchanged (equal to the backend-provided
value), regardless of the value of `userLocation`.

**Validates: Requirements 2.1, 2.2, 2.3**

Property 2: Preservation - Null Distance Passthrough

_For any_ gym object returned by the backend with a `null` or missing `distance` field, the fixed
`gyms` useMemo SHALL return that gym with `distance` remaining `null`, preserving the
"Distance unavailable" display behavior on GymCard.

**Validates: Requirements 3.1**

Property 3: Preservation - Sort and Filter Correctness

_For any_ set of gyms produced by the fixed `gyms` useMemo, the sort-by-distance and distance-filter
logic in `filteredGyms` SHALL produce the same results as if those same distance values had been
computed by the original useMemo, preserving sort order and filter behavior.

**Validates: Requirements 3.2, 3.3**

## Fix Implementation

### Changes Required

**File**: `src/pages/gym-listing/index.jsx`

**Specific Changes**:

1. **Remove `getDistance` helper function**: Delete the entire `getDistance` Haversine function
   (lines ~16–30) from the top of the file. It is no longer called anywhere after the fix.

2. **Replace the `gyms` useMemo with a passthrough**:
   ```js
   // Before (buggy):
   const gyms = useMemo(() => {
     return rawGyms.map(gym => {
       const dist = userLocation
         ? getDistance(userLocation.lat, userLocation.lng, gym.latitude, gym.longitude)
         : null;
       return {
         ...gym,
         distance: dist !== null ? parseFloat(dist.toFixed(1)) : null
       };
     });
   }, [rawGyms, userLocation]);

   // After (fixed):
   const gyms = useMemo(() => rawGyms, [rawGyms]);
   ```

3. **No other changes needed**: `userLocation` is still used to set `searchQuery` in the
   geolocation `useEffect`, so it must remain in state. `GymCard.jsx` and `backend/server.js`
   require no changes.

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate
the bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or
refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Write unit tests that call the buggy `gyms` useMemo logic directly with a mock
`rawGyms` array containing backend-provided `distance` values, and assert that the output distances
match the backend values. Run these tests on the UNFIXED code to observe failures.

**Test Cases**:
1. **Backend distance overwritten**: Pass a gym with `distance: 1.2` and accurate coordinates;
   assert output `distance === 1.2` (will fail on unfixed code — useMemo recalculates)
2. **Null userLocation discards backend distance**: Pass a gym with `distance: 2.5` and
   `userLocation = null`; assert output `distance === 2.5` (will fail — useMemo sets it to `null`)
3. **Inaccurate coordinates**: Pass a gym with `distance: 0.8` but lat/lng that would produce
   `5.3 km` via Haversine; assert output `distance === 0.8` (will fail — useMemo uses bad coords)
4. **Null backend distance preserved**: Pass a gym with `distance: null`; assert output
   `distance === null` (may pass on unfixed code — both paths produce null)

**Expected Counterexamples**:
- The useMemo output `distance` does not equal the backend-provided `distance`
- Possible causes: unconditional recalculation, null userLocation race condition, inaccurate gym
  coordinates in the database

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the
expected behavior.

**Pseudocode:**
```
FOR ALL gym IN rawGyms WHERE gym.distance IS NOT NULL DO
  result := gyms_fixed(rawGyms)  // passthrough useMemo
  ASSERT result[gym].distance === gym.distance  // backend value preserved
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold (gym has null distance),
the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL gym IN rawGyms WHERE gym.distance IS NULL DO
  ASSERT gyms_original(gym, userLocation).distance === gyms_fixed(rawGyms)[gym].distance
  // Both should be null
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the input domain
- It catches edge cases that manual unit tests might miss
- It provides strong guarantees that behavior is unchanged for all non-buggy inputs

**Test Plan**: Observe behavior on UNFIXED code for gyms with null distance, then write
property-based tests capturing that behavior.

**Test Cases**:
1. **Null distance preservation**: Verify gyms with no backend distance still show null after fix
2. **Sort preservation**: Verify sort-by-distance produces identical ordering before and after fix
   when using the same distance values
3. **Filter preservation**: Verify distance filter produces identical results before and after fix

### Unit Tests

- Test that the fixed `gyms` useMemo returns `rawGyms` unchanged (identity check)
- Test that a gym with `distance: 1.2` from the backend has `distance: 1.2` after the useMemo
- Test that a gym with `distance: null` from the backend has `distance: null` after the useMemo
- Test that `getDistance` is no longer called (function removed)

### Property-Based Tests

- Generate random arrays of gym objects with arbitrary `distance` values (including null) and verify
  the fixed useMemo returns them unchanged
- Generate random gym arrays and verify sort-by-distance order is identical when using backend
  distances vs. the previously recalculated distances (for gyms where coordinates were accurate)
- Generate random filter slider values and verify the same gyms pass/fail the distance filter
  regardless of whether distances came from the backend or the old recalculation (for accurate gyms)

### Integration Tests

- Load the gym listing page with a mocked `/api/gyms/nearby` response containing known `distance`
  values; assert GymCards display those exact values
- Verify the distance filter slider correctly hides/shows gyms based on backend-provided distances
- Verify sort-by-distance orders gym cards correctly using backend-provided distances
- Verify the location-denied UI still appears when geolocation is blocked
