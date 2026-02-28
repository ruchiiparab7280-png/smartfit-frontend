import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ServicesSection = () => {
  const services = [
  {
    icon: "MapPin",
    title: "Gym Discovery & Search",
    description: "Find gyms near you with our intelligent location-based search. Filter by distance, amenities, price range, and user ratings to discover the perfect fitness facility.",
    image:"image1.png",
    imageAlt: "Person using smartphone to search for nearby gyms on interactive map interface with location pins and gym details displayed on screen",
    features: ["Location-based search", "Advanced filtering", "Real-time availability", "Virtual tours"]
  },
  {
    icon: "CreditCard",
    title: "Membership Management",
    description: "Manage all your gym memberships from one convenient dashboard. Track payments, view membership details, and handle renewals with ease.",
    image: "image2.png",
    imageAlt: "Clean dashboard interface showing membership cards, payment history, and subscription details with modern blue and white design elements",
    features: ["Centralized dashboard", "Payment tracking", "Auto-renewal options", "Membership history"]
  },
  {
    icon: "Activity",
    title: "Fitness Tracking & Planning",
    description: "Set goals, track workouts, and monitor your progress with our comprehensive fitness tools. Get personalized workout recommendations and nutrition tips.",
    image: "image3.png",
    imageAlt: "Fitness tracking dashboard displaying workout statistics, progress charts, goal achievements, and personalized exercise recommendations on tablet device",
    features: ["Workout logging", "Progress analytics", "Goal setting", "BMI calculator"]
  },
  {
    icon: "Star",
    title: "Reviews & Ratings",
    description: "Read authentic reviews from real gym members. Share your own experiences to help others make informed decisions about their fitness journey.",
    image: "image4.png",
    imageAlt: "User interface showing detailed gym reviews with star ratings, member testimonials, facility photos, and verified user badges on mobile device",
    features: ["Verified reviews", "Photo uploads", "Rating system", "Response from gyms"]
  },
  {
    icon: "Bell",
    title: "Smart Notifications",
    description: "Stay updated with personalized notifications about membership renewals, special offers, class schedules, and fitness milestones.",
    image: "image5.png",
    imageAlt: "Smartphone screen displaying push notifications for gym class reminders, membership alerts, and special promotional offers with colorful notification badges",
    features: ["Renewal reminders", "Class alerts", "Special offers", "Achievement badges"]
  },
  {
    icon: "Handshake",
    title: "Gym Partner Program",
    description: "Gym owners can join our platform to increase visibility, attract new members, and manage their facility's online presence effectively.",
    image: "image6.png",
    imageAlt: "Professional gym owner shaking hands with business partner in modern fitness facility with exercise equipment visible in background",
    features: ["Business dashboard", "Member analytics", "Marketing tools", "Revenue tracking"]
  }];


  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions designed to enhance every aspect of your fitness journey, from discovery to achievement.
          </p>
        </div>

        <div className="space-y-16">
          {services?.map((service, index) =>
          <div
            key={index}
            className={`grid md:grid-cols-2 gap-8 items-center ${
            index % 2 === 1 ? 'md:flex-row-reverse' : ''}`
            }>

              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <div className="bg-card p-8 rounded-lg border border-border card-elevation-sm">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <Icon name={service?.icon} size={28} color="var(--color-primary)" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {service?.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service?.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {service?.features?.map((feature, idx) =>
                  <div key={idx} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} color="var(--color-accent)" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                  )}
                  </div>
                </div>
              </div>
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <div className="relative rounded-lg overflow-hidden card-elevation-md">
                  <Image
                  src={service?.image}
                  alt={service?.imageAlt}
                  className="w-full h-[400px] object-cover" />

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default ServicesSection;