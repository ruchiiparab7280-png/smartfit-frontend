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
    images: [
    "https://images.unsplash.com/photo-1729156638396-47c6a6cffe16",
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e",
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
     "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b"
  ],

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
    ],

    trainers: [
      {
        name: "Rahul Sharma",
        price: 500,
        image: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Aman Verma",
        price: 600,
        image: "https://randomuser.me/api/portraits/men/45.jpg"
      }
    ],

    supplements: [
      {
        name: "Whey Protein",
        price: 2499,
        image: "https://images.unsplash.com/photo-1594737625785-c3fcd5f5a7a7"
      },
      {
        name: "Creatine",
        price: 1499,
        image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1"
      }
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
    ],

    trainers: [
      {
        name: "Vikram Singh",
        price: 700,
        image: "https://randomuser.me/api/portraits/men/52.jpg"
      }
    ],

    supplements: [
      {
        name: "Mass Gainer",
        price: 2999,
        image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1"
      }
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
    ],

    trainers: [
      {
        name: "Neha Kapoor",
        price: 400,
        image: "https://randomuser.me/api/portraits/women/65.jpg"
      }
    ],

    supplements: [
      {
        name: "Vegan Protein",
        price: 2199,
        image: "https://images.unsplash.com/photo-1594737625785-c3fcd5f5a7a7"
      }
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