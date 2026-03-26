import React, { useState, useEffect,  } from 'react';

import MainNavigation from '../../components/MainNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GymCard from './components/GymCard';
import FilterPanel from './components/FilterPanel';
import MapView from "./components/MapView";
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import GymDetailsModal from './components/GymDetailsModal';
import { normalizeGymImages, normalizeImageUrl } from '../../utils/gymImageUtils';

const GymListing = () => {
  const calculateDistance = (lat1, lon1, lat2, lon2) => {

const R = 6371;

const dLat = (lat2 - lat1) * Math.PI / 180;
const dLon = (lon2 - lon1) * Math.PI / 180;

const a =
Math.sin(dLat/2) * Math.sin(dLat/2) +
Math.cos(lat1 * Math.PI/180) *
Math.cos(lat2 * Math.PI/180) *
Math.sin(dLon/2) *
Math.sin(dLon/2);

const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

return R * c;

};
  const [filters, setFilters] = useState({
    distance: 10,
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
  const [gyms, setGyms] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {

if (navigator.geolocation) {

navigator.geolocation.getCurrentPosition(

(position) => {

const lat = position.coords.latitude;
const lng = position.coords.longitude;

console.log("USER LOCATION:", lat, lng);

setUserLocation({
lat,
lng
});

},

(error) => {
console.log("Location permission denied");
}

);

}

}, []);
useEffect(() => {

  const fetchGyms = async () => {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/gyms`
      );
      if (!res.ok) {
  console.log("Gym API error");
  return;
}
      const data = await res.json();
const formattedGyms = await Promise.all(
data.map(async (gym, index) => {

  const trainerRes = await fetch(
    `${import.meta.env.VITE_API_URL}/trainers/${gym.email}`
  );

  const trainers = await trainerRes.json();

  const supplementRes = await fetch(
`${import.meta.env.VITE_API_URL}/supplements/${gym.email}`
);

const supplements = await supplementRes.json();

const membershipRes = await fetch(
`${import.meta.env.VITE_API_URL}/memberships/${gym.email}`
);

const memberships = await membershipRes.json();

 return {
  id: index + 1,

  name: gym.gym_name,
  address: gym.address,
  phone: gym.phone,
  email: gym.email,
  latitude: gym.latitude,
  longitude: gym.longitude,
  price: gym.monthly_fee,
  members: gym.capacity,

 distance: userLocation
  ? parseFloat(
      calculateDistance(
        userLocation.lat,
        userLocation.lng,
        gym.latitude,
        gym.longitude
      ).toFixed(1)
    )
  : 0, // add this
  rating: 4, // add this

  openTime: `${gym.opening_time} - ${gym.closing_time}`,

  description: gym.gym_description,
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

    trainers: trainers.map(t => ({
      name: t.name,
      price: t.price,
      image: normalizeImageUrl(t.image) || ''
    })),

 supplements: supplements.map(s => ({
id: s.id,
name: s.name,
price: s.price,
image: s.image,
description: s.description
})),

  
 memberships: memberships.map(m => ({
    name: m.name,
    price: m.price,
    duration: m.duration,
    description: m.description
  }))
  };

})
);
      setGyms(formattedGyms);

    } catch (error) {

      console.log("Gym fetch error:", error);

    }

  };

  fetchGyms();

}, []);

 
  const [filteredGyms, setFilteredGyms] = useState([]);
  useEffect(() => {
    let result = [...gyms];

    if (searchQuery) {
      result = result.filter(gym =>
        gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gym.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result = result.filter(gym =>
      gym.distance <= filters.distance &&
      gym.price >= filters.priceRange.min &&
      gym.price <= filters.priceRange.max &&
      gym.rating >= filters.minRating
    );

    if (filters?.amenities?.length > 0) {
      result = result?.filter((gym) =>
      filters?.amenities?.every((amenity) =>
      gym?.amenities?.some((a) => a?.name?.toLowerCase()?.includes(amenity))
      )
      );
    }

    switch (sortBy) {
      case 'distance':
        result?.sort((a, b) => a?.distance - b?.distance);
        break;
      case 'rating':
        result?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'price-low':
        result?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        result?.sort((a, b) => b?.price - a?.price);
        break;
      case 'members':
        result?.sort((a, b) => b?.members - a?.members);
        break;
      case 'newest':
        result?.sort((a, b) => b?.id - a?.id);
        break;
      default:
        break;
    }

    setFilteredGyms(result);
  }, [filters, sortBy, searchQuery,gyms]);

  const handleResetFilters = () => {
    setFilters({
      distance: 10,
      priceRange: { min: 0, max: 500 },
      minRating: 1,
      amenities: []
    });
    setSearchQuery('');
  };

  const handleViewDetails = (gym) => {
    setSelectedGym(gym);
    setShowDetailsModal(true);
  };

  const handleContact = (gym) => {
    alert(`Contacting ${gym?.name}\nPhone: ${gym?.phone}\nEmail: ${gym?.email}`);
  };

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
                onFilterToggle={() => setShowFilters(!showFilters)}
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
                onToggle={() => setShowFilters(!showFilters)} />

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

              {filteredGyms?.length === 0 ?
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                  <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No gyms found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button
                  variant="outline"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={handleResetFilters}>

                    Reset Filters
                  </Button>
                </div> :

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
      <div className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`
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
              }
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
/>
  <span className="text-lg font-bold text-foreground">
    SmartFit
  </span>
</div>
            <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} SmartFit. All rights reserved.              </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-base">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-base">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-base">
                <Icon name="Instagram" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>);

};

export default GymListing;