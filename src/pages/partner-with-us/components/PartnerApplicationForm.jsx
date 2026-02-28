import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';


const PartnerApplicationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    gymName: '',
    businessLicense: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    gymType: '',
    establishedYear: '',
    totalArea: '',
    membershipCapacity: '',
    monthlyFee: '',
    yearlyFee: '',
    amenities: [],
    hasParking: false,
    hasLockerRoom: false,
    hasShower: false,
    hasWifi: false,
    description: '',
    website: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const gymTypeOptions = [
    { value: 'commercial', label: 'Commercial Gym' },
    { value: 'boutique', label: 'Boutique Fitness Studio' },
    { value: 'crossfit', label: 'CrossFit Box' },
    { value: 'yoga', label: 'Yoga Studio' },
    { value: 'martial-arts', label: 'Martial Arts Gym' },
    { value: 'sports', label: 'Sports Training Facility' },
    { value: 'other', label: 'Other' }
  ];

  const stateOptions = [
   
  { value: 'AP', label: 'Andhra Pradesh' },
  { value: 'AR', label: 'Arunachal Pradesh' },
  { value: 'AS', label: 'Assam' },
  { value: 'BR', label: 'Bihar' },
  { value: 'CH', label: 'Chandigarh' },
  { value: 'CT', label: 'Chhattisgarh' },
  { value: 'DN', label: 'Dadra and Nagar Haveli and Daman and Diu' },
  { value: 'DL', label: 'Delhi' },
  { value: 'GA', label: 'Goa' },
  { value: 'GJ', label: 'Gujarat' },
  { value: 'HR', label: 'Haryana' },
  { value: 'HP', label: 'Himachal Pradesh' },
  { value: 'JK', label: 'Jammu and Kashmir' },
  { value: 'JH', label: 'Jharkhand' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'KL', label: 'Kerala' },
  { value: 'LA', label: 'Ladakh' },
  { value: 'LD', label: 'Lakshadweep' },
  { value: 'MP', label: 'Madhya Pradesh' },
  { value: 'MH', label: 'Maharashtra' },
  { value: 'MN', label: 'Manipur' },
  { value: 'ML', label: 'Meghalaya' },
  { value: 'MZ', label: 'Mizoram' },
  { value: 'NL', label: 'Nagaland' },
  { value: 'OR', label: 'Odisha' },
  { value: 'PY', label: 'Puducherry' },
  { value: 'PB', label: 'Punjab' },
  { value: 'RJ', label: 'Rajasthan' },
  { value: 'SK', label: 'Sikkim' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'TG', label: 'Telangana' },
  { value: 'TR', label: 'Tripura' },
  { value: 'UP', label: 'Uttar Pradesh' },
  { value: 'UT', label: 'Uttarakhand' },
  { value: 'WB', label: 'West Bengal' }
  ];

  const amenitiesOptions = [
    'Cardio Equipment',
    'Free Weights',
    'Weight Machines',
    'Group Classes',
    'Personal Training',
    'Sauna/Steam Room',
    'Swimming Pool',
    'Basketball Court',
    'Juice Bar',
    'Childcare Services'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev?.amenities?.includes(amenity)
        ? prev?.amenities?.filter(a => a !== amenity)
        : [...prev?.amenities, amenity]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.ownerName?.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/?.test(formData?.phone?.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData?.gymName?.trim()) newErrors.gymName = 'Gym name is required';
    if (!formData?.businessLicense?.trim()) newErrors.businessLicense = 'Business license number is required';
    if (!formData?.address?.trim()) newErrors.address = 'Address is required';
    if (!formData?.city?.trim()) newErrors.city = 'City is required';
    if (!formData?.state) newErrors.state = 'State is required';
    if (!formData?.zipCode?.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}$/?.test(formData?.zipCode)) {
      newErrors.zipCode = 'ZIP code must be 5 digits';
    }
    if (!formData?.gymType) newErrors.gymType = 'Gym type is required';
    if (!formData?.establishedYear) {
      newErrors.establishedYear = 'Established year is required';
    } else if (formData?.establishedYear < 1900 || formData?.establishedYear > 2025) {
      newErrors.establishedYear = 'Invalid year';
    }
    if (!formData?.totalArea) {
      newErrors.totalArea = 'Total area is required';
    } else if (formData?.totalArea < 500) {
      newErrors.totalArea = 'Minimum area should be 500 sq ft';
    }
    if (!formData?.membershipCapacity) {
      newErrors.membershipCapacity = 'Membership capacity is required';
    } else if (formData?.membershipCapacity < 10) {
      newErrors.membershipCapacity = 'Minimum capacity should be 10 members';
    }
    if (!formData?.monthlyFee) {
      newErrors.monthlyFee = 'Monthly fee is required';
    } else if (formData?.monthlyFee < 10) {
      newErrors.monthlyFee = 'Minimum fee should be $10';
    }
    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData?.description?.trim()?.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
 const isAuth = localStorage.getItem("isAuthenticated") === "true";
const role = localStorage.getItem("userRole");

if (!isAuth) {
  alert("Please signup/login first as a Gym Owner");
  navigate("/sign-in-sign-up");
  return;
}

if (role !== "owner") {
  alert("Only Gym Owners can submit partnership form");
  navigate("/sign-in-sign-up");
  return;
}
  
  if (!validateForm()) return;

  setIsSubmitting(true);

  try {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/gym-owner-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        full_name: formData.ownerName,
        email: formData.email,
        phone: formData.phone,

        business_license: formData.businessLicense,
        gym_type: formData.gymType,
        year_established: formData.establishedYear,

        website: formData.website,

        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zipCode,

        total_area: formData.totalArea,
        capacity: formData.membershipCapacity,

        monthly_fee: formData.monthlyFee,
        yearly_fee: formData.yearlyFee,

        amenities: formData.amenities.join(", "),

        gym_description: formData.description
      })
    });

    const data = await response.json();

    if (response.ok) {
      setSubmitSuccess(true);
    } else {
      alert(data.message || "Submission failed ❌");
    }

  } catch (error) {
    console.error(error);
    alert("Server error ❌");
  }

  setIsSubmitting(false);
};

  if (submitSuccess) {
    return (
      <div className="bg-card rounded-lg p-8 card-elevation-sm">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle2" size={48} color="var(--color-success)" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Application Submitted Successfully!</h2>
          <p className="text-muted-foreground text-lg mb-6">
            Thank you for your interest in partnering with SmartFit. Our team will review your application and contact you within 2-3 business days.
          </p>
          <div className="bg-muted/30 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-foreground mb-3">What happens next?</h3>
            <ul className="text-left space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <Icon name="Check" size={16} color="var(--color-success)" className="mr-2 mt-1 flex-shrink-0" />
                <span>Application review by our partnership team</span>
              </li>
              <li className="flex items-start">
                <Icon name="Check" size={16} color="var(--color-success)" className="mr-2 mt-1 flex-shrink-0" />
                <span>Verification of business documents</span>
              </li>
              <li className="flex items-start">
                <Icon name="Check" size={16} color="var(--color-success)" className="mr-2 mt-1 flex-shrink-0" />
                <span>Facility inspection scheduling</span>
              </li>
              <li className="flex items-start">
                <Icon name="Check" size={16} color="var(--color-success)" className="mr-2 mt-1 flex-shrink-0" />
                <span>Partnership agreement finalization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-8 card-elevation-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">Partnership Application</h2>
        <p className="text-muted-foreground text-lg">Fill out the form below to start your partnership journey</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <Icon name="User" size={20} className="mr-2" />
            Owner Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              type="text"
              name="ownerName"
              placeholder="John Doe"
              value={formData?.ownerName}
              onChange={handleInputChange}
              error={errors?.ownerName}
              required
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData?.email}
              onChange={handleInputChange}
              error={errors?.email}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              placeholder="(555) 123-4567"
              value={formData?.phone}
              onChange={handleInputChange}
              error={errors?.phone}
              required
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Building2" size={20} className="mr-2" />
            Business Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Gym Name"
              type="text"
              name="gymName"
              placeholder="Fitness Pro Gym"
              value={formData?.gymName}
              onChange={handleInputChange}
              error={errors?.gymName}
              required
            />
            <Input
              label="Business License Number"
              type="text"
              name="businessLicense"
              placeholder="BL-123456789"
              value={formData?.businessLicense}
              onChange={handleInputChange}
              error={errors?.businessLicense}
              required
            />
            <Select
              label="Gym Type"
              options={gymTypeOptions}
              value={formData?.gymType}
              onChange={(value) => handleSelectChange('gymType', value)}
              error={errors?.gymType}
              placeholder="Select gym type"
              required
            />
            <Input
              label="Year Established"
              type="number"
              name="establishedYear"
              placeholder="2020"
              value={formData?.establishedYear}
              onChange={handleInputChange}
              error={errors?.establishedYear}
              min="1900"
              max="2025"
              required
            />
            <Input
              label="Website (Optional)"
              type="url"
              name="website"
              placeholder="https://www.yourgym.com"
              value={formData?.website}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <Icon name="MapPin" size={20} className="mr-2" />
            Location Details
          </h3>
          <div className="grid grid-cols-1 gap-6">
            <Input
              label="Street Address"
              type="text"
              name="address"
              placeholder="123 Main Street"
              value={formData?.address}
              onChange={handleInputChange}
              error={errors?.address}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="City"
                type="text"
                name="city"
                placeholder="Mumbai"
                value={formData?.city}
                onChange={handleInputChange}
                error={errors?.city}
                required
              />
              <Select
                label="State"
                options={stateOptions}
                value={formData?.state}
                onChange={(value) => handleSelectChange('state', value)}
                error={errors?.state}
                placeholder="Select state"
                searchable
                required
              />
              <Input
                label="ZIP Code"
                type="text"
                name="zipCode"
                placeholder="90001"
                value={formData?.zipCode}
                onChange={handleInputChange}
                error={errors?.zipCode}
                maxLength="5"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Dumbbell" size={20} className="mr-2" />
            Facility Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Total Area (sq ft)"
              type="number"
              name="totalArea"
              placeholder="5000"
              value={formData?.totalArea}
              onChange={handleInputChange}
              error={errors?.totalArea}
              min="500"
              required
            />
            <Input
              label="Membership Capacity"
              type="number"
              name="membershipCapacity"
              placeholder="200"
              value={formData?.membershipCapacity}
              onChange={handleInputChange}
              error={errors?.membershipCapacity}
              min="10"
              required
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <Icon name="DollarSign" size={20} className="mr-2" />
            Pricing Structure
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Monthly Membership Fee"
              type="number"
              name="monthlyFee"
              placeholder="50"
              value={formData?.monthlyFee}
              onChange={handleInputChange}
              error={errors?.monthlyFee}
              min="10"
              required
              description="Base monthly membership price in USD"
            />
            <Input
              label="Yearly Membership Fee (Optional)"
              type="number"
              name="yearlyFee"
              placeholder="500"
              value={formData?.yearlyFee}
              onChange={handleInputChange}
              min="100"
              description="Annual membership price in USD"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Star" size={20} className="mr-2" />
            Amenities & Features
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {amenitiesOptions?.map((amenity) => (
                <Checkbox
                  key={amenity}
                  label={amenity}
                  checked={formData?.amenities?.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                />
              ))}
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-3">Additional Facilities</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Checkbox
                  label="Parking Available"
                  checked={formData?.hasParking}
                  onChange={(e) => handleInputChange(e)}
                  name="hasParking"
                />
                <Checkbox
                  label="Locker Rooms"
                  checked={formData?.hasLockerRoom}
                  onChange={(e) => handleInputChange(e)}
                  name="hasLockerRoom"
                />
                <Checkbox
                  label="Shower Facilities"
                  checked={formData?.hasShower}
                  onChange={(e) => handleInputChange(e)}
                  name="hasShower"
                />
                <Checkbox
                  label="WiFi Available"
                  checked={formData?.hasWifi}
                  onChange={(e) => handleInputChange(e)}
                  name="hasWifi"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <Icon name="FileText" size={20} className="mr-2" />
            Gym Description
          </h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Describe Your Gym <span className="text-error">*</span>
            </label>
            <textarea
              name="description"
              value={formData?.description}
              onChange={handleInputChange}
              placeholder="Tell us about your gym, its unique features, training programs, and what makes it special..."
              rows="6"
            className={`w-full px-4 py-3 rounded-md border transition-base focus:outline-none focus:ring-2 focus:ring-ring text-black dark:text-white placeholder:text-gray-400 ${
  errors?.description 
    ? 'border-error focus:border-error' 
    : 'border-input focus:border-primary'
}`}
            
            />
            {errors?.description && (
              <p className="text-sm text-error mt-1">{errors?.description}</p>
            )}
            <p className="text-xs text-muted-foreground">Minimum 50 characters required</p>
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <Checkbox
            label="I agree to the terms and conditions and partnership agreement"
            checked={formData?.agreeToTerms}
            onChange={(e) => handleInputChange(e)}
            name="agreeToTerms"
            error={errors?.agreeToTerms}
            required
            description="By checking this box, you confirm that all information provided is accurate and you agree to our partnership terms"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isSubmitting}
            iconName="Send"
            iconPosition="right"
            className="flex-1"
          >
            {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              setFormData({
                ownerName: '',
                email: '',
                phone: '',
                gymName: '',
                businessLicense: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
                gymType: '',
                establishedYear: '',
                totalArea: '',
                membershipCapacity: '',
                monthlyFee: '',
                yearlyFee: '',
                amenities: [],
                hasParking: false,
                hasLockerRoom: false,
                hasShower: false,
                hasWifi: false,
                description: '',
                website: '',
                agreeToTerms: false
              });
              setErrors({});
            }}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset Form
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PartnerApplicationForm;