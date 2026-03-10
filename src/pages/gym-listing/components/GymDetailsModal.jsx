import React, { useRef } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GymDetailsModal = ({ gym, isOpen, onClose }) => {
  if (!isOpen || !gym) return null;

  const scrollRef = useRef(null);

const scrollLeft = () => {
  scrollRef.current.scrollBy({
    left: -400,
    behavior: "smooth"
  });
};

const scrollRight = () => {
  scrollRef.current.scrollBy({
    left: 400,
    behavior: "smooth"
  });
};

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? 'Star' : 'StarOff'}
        size={18}
        color={index < Math.floor(rating) ? '#F59E0B' : '#D1D5DB'}
        className="fill-current"
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-lg card-elevation-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-base focus-ring"
          aria-label="Close modal"
        >
          <Icon name="X" size={24} />
        </button>

        <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-lg">

  {/* LEFT BUTTON */}
  <button
    onClick={scrollLeft}
    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full z-10"
  >
    <Icon name="ChevronLeft" size={20} />
  </button>

  {/* IMAGE SLIDER */}
  <div
    ref={scrollRef}
    className="flex overflow-x-auto h-full scroll-smooth no-scrollbar"
  >
    {gym?.images?.map((img, index) => (
      <Image
        key={index}
        src={img}
        alt="gym"
        className="min-w-full h-full object-cover"
      />
    ))}
  </div>

  {/* RIGHT BUTTON */}
  <button
    onClick={scrollRight}
    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full z-10"
  >
    <Icon name="ChevronRight" size={20} />
  </button>

  {/* FEATURED TAG */}
  {gym?.featured && (
    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-md font-medium">
      Featured Gym
    </div>
  )}

</div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {gym?.name}
              </h2>
              <div className="flex items-center space-x-2 mb-2">
                {renderStars(gym?.rating)}
                <span className="text-sm text-muted-foreground">
                  {gym?.rating} ({gym?.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Icon name="MapPin" size={18} className="mr-2" />
                <span>{gym?.address}</span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-muted-foreground mb-1">Starting from</p>
              <p className="text-3xl font-bold text-primary">${gym?.price}/month</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <Icon name="Users" size={24} className="mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Members</p>
              <p className="font-semibold text-foreground">{gym?.members}+</p>
            </div>
            <div className="text-center">
              <Icon name="Clock" size={24} className="mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Open Hours</p>
              <p className="font-semibold text-foreground">{gym?.openTime}</p>
            </div>
            <div className="text-center">
              <Icon name="MapPin" size={24} className="mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Distance</p>
              <p className="font-semibold text-foreground">{gym?.distance} km</p>
            </div>
            <div className="text-center">
              <Icon name="Star" size={24} className="mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Rating</p>
              <p className="font-semibold text-foreground">{gym?.rating}/5</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
              <Icon name="Info" size={20} className="mr-2" />
              About This Gym
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {gym?.description}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
              <Icon name="Sparkles" size={20} className="mr-2" />
              Amenities & Features
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gym?.amenities?.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-3 bg-muted rounded-lg"
                >
                  <Icon name={amenity?.icon} size={18} color="var(--color-primary)" />
                  <span className="text-sm text-foreground">{amenity?.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
              <Icon name="CreditCard" size={20} className="mr-2" />
              Membership Plans
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {gym?.plans?.map((plan, index) => (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg hover:border-primary transition-base"
                >
                  <h4 className="font-semibold text-foreground mb-2">{plan?.name}</h4>
                  <p className="text-2xl font-bold text-primary mb-2">
                    ${plan?.price}
                    <span className="text-sm text-muted-foreground font-normal">/{plan?.duration}</span>
                  </p>
                  <ul className="space-y-1">
                    {plan?.features?.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <Icon name="Check" size={16} className="mr-1 mt-0.5 text-success flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* FREE TRIAL */}

<div className="mb-6 bg-muted p-4 rounded-lg">

  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
    <Icon name="Gift" size={20} className="mr-2" />
    One Day Free Trial
  </h3>

  <p className="text-muted-foreground mb-3">
    Try this gym for free for one day before purchasing a membership.
  </p>

  <button
    onClick={() => alert("Free Trial Request Sent!")}
    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
  >
    Book Free Trial
  </button>

</div>


          {/* TRAINERS */}

<div className="mb-6">
  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
    <Icon name="UserCheck" size={20} className="mr-2" />
    Available Trainers
  </h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

    {gym?.trainers?.map((trainer, index) => (

      <div
        key={index}
        className="p-4 bg-muted rounded-lg text-center"
      >

        <img
          src={trainer.image}
          alt="trainer"
          className="w-20 h-20 mx-auto rounded-full object-cover mb-2"
        />

        <p className="font-semibold text-foreground">
          {trainer.name}
        </p>

        <p className="text-sm text-muted-foreground">
          ₹{trainer.price}/session
        </p>

        <button
          onClick={() => alert("Trainer Booking Sent")}
          className="mt-2 bg-orange-500 text-white px-3 py-1 rounded"
        >
          Book Trainer
        </button>

      </div>

    ))}

  </div>
</div>

{/* SUPPLEMENTS */}

<div className="mb-6">
  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
    <Icon name="ShoppingCart" size={20} className="mr-2" />
    Supplements Available
  </h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

    {gym?.supplements?.map((item, index) => (

      <div
        key={index}
        className="p-4 bg-muted rounded-lg text-center"
      >

        <img
          src={item.image}
          alt="supplement"
          className="w-20 h-20 mx-auto rounded object-cover mb-2"
        />

        <p className="font-semibold text-foreground">
          {item.name}
        </p>

        <p className="text-sm text-muted-foreground">
          ₹{item.price}
        </p>

        <button
          className="mt-2 bg-orange-500 text-white px-3 py-1 rounded"
        >
          Buy Now
        </button>

      </div>

    ))}

  </div>
</div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
              <Icon name="Phone" size={20} className="mr-2" />
              Contact Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <Icon name="Phone" size={20} color="var(--color-primary)" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">{gym?.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <Icon name="Mail" size={20} color="var(--color-primary)" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{gym?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              variant="default"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
            >
              Book a Visit
            </Button>
            <Button
              variant="outline"
              fullWidth
              iconName="Phone"
              iconPosition="left"
            >
              Call Now
            </Button>
            <Button
              variant="outline"
              fullWidth
              iconName="Mail"
              iconPosition="left"
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymDetailsModal;