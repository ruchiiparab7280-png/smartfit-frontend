import React, { useState, useEffect } from 'react';
import MainNavigation from '../../components/MainNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GymCard from './components/GymCard';
import FilterPanel from './components/FilterPanel';
import MapView from "./components/MapView";
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import GymDetailsModal from './components/GymDetailsModal';

const GymListing = () => {
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

 const mockGyms = [
  {
    id: 1,
    name: "PowerFit Elite Gym",
    image: "https://images.unsplash.com/photo-1729156638396-47c6a6cffe16",
    imageAlt: "Modern gym interior",
    address: "Andheri East, Mumbai",
    distance: 1.2,
    rating: 4.6,
    reviews: 342,
    price: 1499,
    members: 1200,
    openTime: "5 AM - 11 PM",
    featured: true,
    phone: "+91 98765 43210",
    email: "powerfit@gmail.com",
    description: "Premium gym with modern machines and certified trainers.",
    amenities: [
      { name: "Parking", icon: "Car" },
      { name: "Locker Room", icon: "Lock" },
      { name: "Shower", icon: "Droplet" },
      { name: "AC", icon: "Wind" },
      { name: "Personal Trainer", icon: "UserCheck" }
    ],
    plans: [
      { name: "Basic", price: 1499, duration: "month", features: ["Gym access"] },
      { name: "Premium", price: 2499, duration: "month", features: ["Classes", "Trainer"] }
    ]
  },

  {
    id: 2,
    name: "Iron Paradise Fitness",
    image: "https://images.unsplash.com/photo-1697490580141-a76008636dd7",
    imageAlt: "Strength gym",
    address: "Bandra West, Mumbai",
    distance: 3.5,
    rating: 4.6,
    reviews: 287,
    price: 1999,
    members: 950,
    openTime: "24/7",
    featured: false,
    phone: "+91 98989 12121",
    email: "ironparadise@gmail.com",
    description: "Hardcore strength and bodybuilding gym.",
    amenities: [
      { name: "Parking", icon: "Car" },
      { name: "Locker Room", icon: "Lock" },
      { name: "Personal Trainer", icon: "UserCheck" }
    ],
    plans: [
      { name: "Standard", price: 1999, duration: "month", features: ["24/7 Access"] }
    ]
  },

  {
    id: 3,
    name: "Zen Yoga & Wellness Center",
    image: "https://images.unsplash.com/photo-1671726203463-f262325f1b02",
    imageAlt: "Yoga studio",
    address: "Indiranagar, Nallasopara",
    distance: 4.2,
    rating: 4.9,
    reviews: 421,
    price: 1799,
    members: 680,
    openTime: "6 AM - 9 PM",
    featured: true,
    phone: "+91 98111 22334",
    email: "zenyoga@gmail.com",
    description: "Peaceful yoga and meditation center.",
    amenities: [
      { name: "Meditation Room", icon: "Heart" },
      { name: "AC", icon: "Wind" },
      { name: "Locker Room", icon: "Lock" }
    ],
    plans: [
      { name: "Beginner", price: 1799, duration: "month", features: ["Yoga Classes"] }
    ]
  },

  {
    id: 4,
    name: "CrossFit Revolution",
    image: "https://images.unsplash.com/photo-1591641079732-e34ae7aed2ed",
    imageAlt: "CrossFit gym",
    address: "Whitefield, Powai",
    distance: 5.1,
    rating: 4.7,
    reviews: 298,
    price: 2999,
    members: 450,
    openTime: "5 AM - 10 PM",
    featured: false,
    phone: "+91 99000 44556",
    email: "crossfit@gmail.com",
    description: "High intensity CrossFit workouts.",
    amenities: [
      { name: "Group Classes", icon: "Users" },
      { name: "Trainer", icon: "UserCheck" }
    ],
    plans: [
      { name: "Starter", price: 2999, duration: "month", features: ["Unlimited Classes"] }
    ]
  },

  {
    id: 5,
    name: "Aqua Fitness Club",
    image: "https://images.unsplash.com/photo-1574349508438-3b402594a11a",
    imageAlt: "Swimming pool gym",
    address: " Near PVR Kandivali, Mumbai",
    distance: 6.3,
    rating: 4.5,
    reviews: 189,
    price: 2299,
    members: 820,
    openTime: "6 AM - 10 PM",
    featured: false,
    phone: "+91 98300 77889",
    email: "aquafitness@gmail.com",
    description: "Swimming and aqua workout focused gym.",
    amenities: [
      { name: "Swimming Pool", icon: "Waves" },
      { name: "Shower", icon: "Droplet" }
    ],
    plans: [
      { name: "Swimmer", price: 2299, duration: "month", features: ["Pool Access"] }
    ]
  },

  {
    id: 6,
    name: "Cardio Kings Fitness",
    image: "https://images.unsplash.com/photo-1697490583984-9d945f9dbcd9",
    imageAlt: "Cardio gym",
    address: "Dahisar Mumbai",
    distance: 1.8,
    rating: 4.4,
    reviews: 256,
    price: 1299,
    members: 1500,
    openTime: "5 AM - 11 PM",
    featured: false,
    phone: "+91 99999 11122",
    email: "cardiokings@gmail.com",
    description: "Best gym for weight loss and cardio.",
    amenities: [
      { name: "Treadmills", icon: "Activity" },
      { name: "AC", icon: "Wind" }
    ],
    plans: [
      { name: "Basic", price: 1299, duration: "month", features: ["Cardio Access"] }
    ]
  }
];
  const [filteredGyms, setFilteredGyms] = useState(mockGyms);

  useEffect(() => {
    let result = [...mockGyms];

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
  }, [filters, sortBy, searchQuery]);

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