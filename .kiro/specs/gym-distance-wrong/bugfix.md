# Bugfix Requirements Document

## Introduction

On the gym listing page, the distance shown on each GymCard is incorrect. The backend `/api/gyms/nearby` endpoint correctly computes distance using the Haversine formula and returns it in the response. However, the frontend ignores this value and redundantly recalculates distance client-side via a `useMemo`. Because the client-side recalculation uses gym coordinates geocoded from addresses (which may be inaccurate or have lat/lng swapped), the displayed distance diverges from the accurate server-computed value. This causes users to see wrong distances on gym cards.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the gym listing page loads and the backend returns gyms with a pre-calculated `distance` field THEN the system overwrites that value by recalculating distance client-side using `getDistance()` in a `useMemo`

1.2 WHEN the client-side `getDistance()` uses gym coordinates that are inaccurate (e.g., geocoded from a partial or incorrect address) THEN the system displays a distance that does not match the actual distance between the user and the gym

1.3 WHEN `userLocation` is null at the time `rawGyms` first populates THEN the system sets `distance` to `null` on all gym cards, even though the backend already returned correct distance values

### Expected Behavior (Correct)

2.1 WHEN the backend returns gyms with a `distance` field THEN the system SHALL use the backend-provided distance value directly without recalculating it client-side

2.2 WHEN gym coordinates stored in the database are inaccurate THEN the system SHALL still display the correct distance as computed by the backend using the user's coordinates passed as query parameters

2.3 WHEN `userLocation` is not yet available on the client THEN the system SHALL display the backend-provided distance rather than showing `null` or an incorrect value

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a gym has no `distance` value in the backend response THEN the system SHALL CONTINUE TO display "Distance unavailable" on the GymCard

3.2 WHEN the user sorts gyms by distance THEN the system SHALL CONTINUE TO sort correctly using the distance values shown on the cards

3.3 WHEN the distance filter slider is applied THEN the system SHALL CONTINUE TO filter gyms based on the distance values used for display

3.4 WHEN the user's location is denied or unavailable THEN the system SHALL CONTINUE TO show no gyms and display the location-denied UI
