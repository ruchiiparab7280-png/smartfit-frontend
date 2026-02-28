import React from "react";
import { useNavigate } from "react-router-dom";
import GymCard from "pages/gym-listing/components/GymCard";
import Button from "../../../components/ui/Button";

const FeaturedGyms = () => {
  const navigate = useNavigate();

  const featuredGyms = [
    {
      id: 1,
      name: "PowerFit Elite",
      address: "Andheri East, Mumbai - 400069",
      distance: 0.5,
      rating: 4.9,
      reviews: 210,
      members: "800+",
      
      openTime: "5 AM - 11 PM",
      price:  "1400",
      image: "https://images.unsplash.com/photo-1671970921963-7c265e8e3565",
      imageAlt: "Modern gym interior",
      featured: true,
      amenities: [
        { name: "24/7 Access", icon: "Clock" },
        { name: "Personal Training", icon: "Users" },
        { name: "Sauna", icon: "Flame" }
      ]
    },
    {
      id: 2,
      name: "Flex Zone Fitness",
      address: "Malad West, Mumbai - 400095",
      distance: 1.2,
      rating: 4.7,
      reviews: 180,
      members: "200+",
      openTime: "6 AM - 11 PM",
      price: 1499,
      image: "https://images.unsplash.com/photo-1721394750732-6efdd186cb12",
      imageAlt: "Spacious fitness center",
      featured: true,
      amenities: [
        { name: "Group Classes", icon: "Users" },
        { name: "Pool", icon: "Droplet" },
        { name: "Yoga Studio", icon: "Heart" }
      ]
    }
  ];

  const handleViewDetails = () => {
  navigate("/gym-listing");
};

  const handleContact = (gym) => {
    alert(`Contacting ${gym.name}`);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Featured Gyms Near You
            </h2>
            <p className="text-lg text-muted-foreground">
              Top-rated fitness centers ready to welcome you
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => navigate('/gym-listing')}
            className="mt-4 sm:mt-0"
          >
            View All Gyms
          </Button>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {featuredGyms.map((gym) => (
    <GymCard
      key={gym.id}
      gym={gym}
      onViewDetails={handleViewDetails}
      onContact={handleContact}
    />
  ))}
</div>
      </div>
    </section>
  );
};

export default FeaturedGyms;