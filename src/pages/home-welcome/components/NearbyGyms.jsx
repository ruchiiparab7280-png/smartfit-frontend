import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GymCard from "pages/gym-listing/components/GymCard";
import Button from "../../../components/ui/Button";

const NearbyGyms = () => {
  const navigate = useNavigate();

  const [gyms, setGyms] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const userCity = localStorage.getItem("userCity") || "Mumbai";

  // 📍 Distance function
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  // 📍 Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (err) => console.log("Location error", err)
    );
  }, []);

  // 📍 Fetch gyms
  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gyms`);
        const data = await res.json();

        console.log("🔥 REAL GYMS:", data);

        setGyms(data);
      } catch (err) {
        console.log("Error fetching gyms", err);
      }
    };

    fetchGyms();
  }, []);

  // 📍 Filter by city
  const filteredGyms = gyms.filter(
    (gym) =>
      gym.city &&
      gym.city.toLowerCase().includes(userCity.toLowerCase())
  );

  const handleViewDetails = () => navigate("/gym-listing");

  const handleContact = (gym) => {
    alert(`Contacting ${gym.name}`);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Gyms Near You
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover gyms available in your area
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => navigate("/gym-listing")}
            className="mt-4 sm:mt-0"
          >
            View All Gyms
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredGyms.length === 0 && (
            <p className="text-muted-foreground">
              No gyms found in your area 😕
            </p>
          )}

          {filteredGyms.map((gym) => (
            <GymCard
              key={gym.id}
              gym={{
                name: gym.gym_name,
                location: `${gym.address}, ${gym.city}`,
                price: gym.monthly_fee || 999,
                rating: 4.5,

                distance:
                  userLocation &&
                  gym.latitude &&
                  gym.longitude &&
                  !isNaN(gym.latitude) &&
                  !isNaN(gym.longitude)
                    ? getDistance(
                        userLocation.lat,
                        userLocation.lng,
                        parseFloat(gym.latitude),
                        parseFloat(gym.longitude)
                      )
                    : null,

                amenities: gym.amenities
                  ? gym.amenities.split(",")
                  : [],

                image: gym.gym_images
                  ? gym.gym_images.split(",")[0]
                  : "https://images.unsplash.com/photo-1671970921963-7c265e8e3565"
              }}
              onViewDetails={handleViewDetails}
              onContact={handleContact}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyGyms;