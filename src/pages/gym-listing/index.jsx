import React, { useState, useEffect, useMemo, useCallback } from 'react';

import MainNavigation from '../../components/MainNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GymCard from './components/GymCard';
import FilterPanel from './components/FilterPanel';
import MapView from "./components/MapView";
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import GymDetailsModal from './components/GymDetailsModal';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { normalizeGymImages, normalizeImageUrl } from '../../utils/gymImageUtils';

// Haversine formula — returns distance in km between two lat/lng points
const getDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return null;
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const GymListing = () => {

  const [filters, setFilters] = useState({
    distance: 5,
    priceRange: { min: 0, max: 5000 },
    minRating: 1,
    amenities: []
  });

  const [sortBy, setSortBy] = useState('distance');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGym, setSelectedGym] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [rawGyms, setRawGyms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('pending'); // 'pending', 'granted', 'denied'

  // 1) Get user location once on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log('[SmartFit] 📍 User location obtained:', loc);
          setUserLocation(loc);
          setLocationStatus('granted');
          // Automatically trigger the nearby query when location is obtained
          setSearchQuery(`nearby:${loc.lat},${loc.lng}`);
        },
        () => {
          console.log("Location permission denied");
          setLocationStatus('denied');
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      setLocationStatus('denied');
      setIsLoading(false);
    }
  }, []);

  // 2) Fetch gyms triggered by searchQuery (only if granted)
  useEffect(() => {
    const fetchGyms = async () => {
      if (!searchQuery.startsWith('nearby:')) {
        // Only allow nearby searches as per requirements
        return;
      }

      setIsLoading(true);
      try {
        const [lat, lng] = searchQuery.replace('nearby:', '').split(',');
        const url = `${import.meta.env.VITE_API_URL}/api/gyms/nearby?lat=${lat}&lng=${lng}&radius=10`;

        const res = await fetch(url);
        if (!res.ok) {
          console.log("Gym API error");
          return;
        }
        const data = await res.json();

        const formattedGyms = data.map((gym, index) => ({
          id: gym.id || index + 1,
          name: gym.gym_name,
          address: gym.address,
          phone: gym.phone,
          email: gym.email,
          latitude: parseFloat(gym.latitude) || null,
          longitude: parseFloat(gym.longitude) || null,
          price: gym.monthly_fee,
          members: gym.capacity,
          rating: 4,
          openTime: `${gym.opening_time} - ${gym.closing_time}`,
          description: gym.gym_description,
          distance: gym.distance || null,
          ...(function buildImages() {
            const normalizedImages = normalizeGymImages(gym.gym_images);
            return {
              image: normalizedImages[0],
              images: normalizedImages
            };
          })(),
          amenities: gym.amenities
            ? gym.amenities.split(",").map(a => ({
              name: a.trim(),
              icon: "Check"
            }))
            : [],
          trainers: (gym.trainers || []).map(t => ({
            name: t.name,
            specialization: t.specialization || "",
            price: t.price,
            image: normalizeImageUrl(t.image) || ''
          })),
          supplements: (gym.supplements || []).map(s => ({
            id: s.id,
            name: s.name,
            price: s.price,
            image: s.image,
            description: s.description
          })),
          memberships: (gym.memberships || []).map(m => ({
            name: m.name,
            price: m.price,
            duration: m.duration,
            description: m.description
          }))
        }));

        setRawGyms(formattedGyms);
      } catch (error) {
        console.log("Gym fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (locationStatus === 'granted') {
      fetchGyms();
    }
  }, [searchQuery, locationStatus]);

  // 3) Recalculate distances reactively when location or raw data changes
  const gyms = useMemo(() => {
    console.log('[SmartFit] 🔄 Recalculating distances for', rawGyms.length, 'gyms. User location:', userLocation);
    return rawGyms.map(gym => {
      const dist = userLocation
        ? getDistance(userLocation.lat, userLocation.lng, gym.latitude, gym.longitude)
        : null;
      console.log(`[SmartFit] 🏋️ ${gym.name}: lat=${gym.latitude}, lng=${gym.longitude}, distance=${dist !== null ? dist.toFixed(1) + ' km' : 'N/A'}`);
      return {
        ...gym,
        distance: dist !== null ? parseFloat(dist.toFixed(1)) : null
      };
    });
  }, [rawGyms, userLocation]);

  // 🚀 PERFORMANCE: useMemo replaces useState+useEffect for derived data
  const filteredGyms = useMemo(() => {
    let result = [...gyms];

    if (searchQuery) {
      if (searchQuery.startsWith('nearby:')) {
        // Nearby search: let the distance slider filter handle radius
        // (no pre-filter here — filters.distance below does the work)
      } else {
        result = result.filter(gym =>
          gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gym.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    } else if (locationStatus === 'granted') {
      // If we have location but no specific query, let distance slider handle it
    } else {
      // No search and no location/denied? Empty list as per requirements.
      return [];
    }

    result = result.filter(gym => {
      // STRICT filter: always enforce user location + distance range
      if (locationStatus !== 'granted') return false;
      // If gym has no coordinates, still show it (distance will display as "Unavailable")
      const passesDistance = gym.distance === null || gym.distance <= filters.distance;
      return (
        passesDistance &&
        gym.price >= filters.priceRange.min &&
        gym.price <= filters.priceRange.max &&
        gym.rating >= filters.minRating
      );
    });

    if (filters?.amenities?.length > 0) {
      result = result.filter((gym) =>
        filters.amenities.every((amenity) =>
          gym?.amenities?.some((a) => a?.name?.toLowerCase()?.includes(amenity))
        )
      );
    }

    switch (sortBy) {
      case 'distance':
        // Gyms with null distance go to the end
        result.sort((a, b) => {
          if (a.distance === null && b.distance === null) return 0;
          if (a.distance === null) return 1;
          if (b.distance === null) return -1;
          return a.distance - b.distance;
        });
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'members':
        result.sort((a, b) => b.members - a.members);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy, searchQuery, gyms]);

  // 🚀 PERFORMANCE: useCallback prevents child re-renders
  const handleResetFilters = useCallback(() => {
    setFilters({
      distance: 5,
      priceRange: { min: 0, max: 5000 },
      minRating: 1,
      amenities: []
    });
    setSearchQuery('');
  }, []);

  const handleViewDetails = useCallback((gym) => {
    setSelectedGym(gym);
    setShowDetailsModal(true);
  }, []);

  const handleContact = useCallback((gym) => {
    alert(`Contacting ${gym?.name}\nPhone: ${gym?.phone}\nEmail: ${gym?.email}`);
  }, []);

  const handleFilterToggle = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <main className="main-content">
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 py-12 border-b border-border">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Find Your Perfect Gym
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Discover nearby fitness facilities tailored to your needs and preferences
              </p>
              <SearchBar
                onSearch={setSearchQuery}
                onFilterToggle={handleFilterToggle}
                showFilters={showFilters} />
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-80 flex-shrink-0">
              <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
                onResetFilters={handleResetFilters}
                isOpen={showFilters}
                onToggle={handleFilterToggle} />
            </aside>

            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <SortControls
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  resultsCount={filteredGyms?.length} />
              </div>

              {/* Location Pending/Denied UI */}
              {locationStatus === 'pending' ? (
                <div className="bg-card rounded-lg border border-border p-12 text-center">
                  <Icon name="Loader2" size={64} className="mx-auto mb-4 text-primary animate-spin" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Detecting your location...
                  </h3>
                  <p className="text-muted-foreground">
                    Please allow location access to find gyms near you.
                  </p>
                </div>
              ) : locationStatus === 'denied' ? (
                <div className="bg-card rounded-lg border border-red-200 p-12 text-center text-red-600 bg-red-50/10">
                  <Icon name="MapPinOff" size={64} className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Please enable location to find nearby gyms
                  </h3>
                  <p className="text-muted-foreground">
                    Location access is required to show gyms in your area. Please enable location permissions in your browser settings to proceed.
                  </p>
                </div>
              ) : isLoading ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
                  }`}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : filteredGyms?.length === 0 ? (
                <div className="bg-card rounded-lg border border-border p-12 text-center">
                  <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No gyms found nearby
                  </h3>
                  <p className="text-muted-foreground">
                    We couldn't find any gyms close to your current location.
                  </p>
                </div>
              ) : (
                <>
                  {viewMode === 'map' && (
                    <div className="h-[60vh] mb-6">
                      <MapView
                        gyms={filteredGyms}
                        selectedGym={selectedGym}
                        onGymSelect={setSelectedGym}
                      />
                    </div>
                  )}
                  <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`
                  }>
                    {filteredGyms?.map((gym) =>
                      <GymCard
                        key={gym?.id}
                        gym={gym}
                        onViewDetails={handleViewDetails}
                        onContact={handleContact} />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <GymDetailsModal
        gym={selectedGym}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)} />

      <footer className="bg-card border-t border-border mt-16">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <img
                src="smartfit-logo.png"
                alt="Smart-Fit Logo"
                className="h-20 w-20 object-contain"
                loading="lazy"
              />
              <span className="text-lg font-bold text-foreground">
                SmartFit
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} SmartFit. All rights reserved.              </p>
            <div className="flex items-center space-x-4">
              <a href="https://www.facebook.com/share/1Cuz1fQh3i/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-base">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="https://x.com/SmartFit7971" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-base">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="https://www.instagram.com/smartfit7971?igsh=MXdmZDZ4Yzc1cnMz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-base">
                <Icon name="Instagram" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>);

};

export default GymListing;