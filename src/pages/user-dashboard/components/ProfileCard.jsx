import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileCard = ({ data }) => {
 useState(data)

const [profileData, setProfileData] = useState({
  name: data?.name || "",
  email: data?.email || "",
  phone: data?.phone || "",
  age: data?.age || "",
  gender: data?.gender || "",
  location: data?.location || "",
  joinDate: "N/A",
  avatar: "https://via.placeholder.com/150",
  avatarAlt: "User"
});

useEffect(() => {
  if (data) {
    setProfileData({
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      age: data?.age || "",
      gender: data?.gender || "",
      location: data?.location || "",
      joinDate: "N/A",
      avatar: "https://via.placeholder.com/150",
      avatarAlt: "User"
    });
  }
}, [data]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-card rounded-lg p-6 card-elevation-sm">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Profile Information</h2>
        {!isEditing &&
        <Button variant="outline" size="sm" iconName="Edit2" iconPosition="left" onClick={handleEdit}>
            Edit Profile
          </Button>
        }
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
            <Image
              src={profileData?.avatar}
              alt={profileData?.avatarAlt}
              className="w-full h-full object-cover" />

          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">Member since</p>
            <p className="text-sm font-semibold text-foreground">{profileData?.joinDate}</p>
          </div>
        </div>

        <div className="flex-1">
          {isEditing ?
          <div className="space-y-4">
              <Input
              label="Full Name"
              type="text"
              value={editData?.name}
              onChange={(e) => handleChange('name', e?.target?.value)}
              required />

              <Input
              label="Email Address"
              type="email"
              value={editData?.email}
              onChange={(e) => handleChange('email', e?.target?.value)}
              required />

              <Input
              label="Phone Number"
              type="tel"
              value={editData?.phone}
              onChange={(e) => handleChange('phone', e?.target?.value)} />

              <div className="grid grid-cols-2 gap-4">
                <Input
                label="Age"
                type="number"
                value={editData?.age}
                onChange={(e) => handleChange('age', e?.target?.value)}
                min="18"
                max="100" />

                <Input
                label="Gender"
                type="text"
                value={editData?.gender}
                onChange={(e) => handleChange('gender', e?.target?.value)} />

              </div>
              <Input
              label="Location"
              type="text"
              value={editData?.location}
              onChange={(e) => handleChange('location', e?.target?.value)} />

              <div className="flex gap-3 pt-4">
                <Button variant="default" onClick={handleSave} iconName="Check" iconPosition="left">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel} iconName="X" iconPosition="left">
                  Cancel
                </Button>
              </div>
            </div> :

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Icon name="User" size={16} />
                  Full Name
                </p>
                <p className="text-base font-semibold text-foreground">{profileData?.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  Email
                </p>
                <p className="text-base font-semibold text-foreground">{profileData?.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  Phone
                </p>
                <p className="text-base font-semibold text-foreground">{profileData?.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  Age
                </p>
                <p className="text-base font-semibold text-foreground">{profileData?.age} years</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Icon name="Users" size={16} />
                  Gender
                </p>
                <p className="text-base font-semibold text-foreground">{profileData?.gender}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Location
                </p>
                <p className="text-base font-semibold text-foreground">{profileData?.location}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

};

export default ProfileCard;