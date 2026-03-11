import React, { useState, useEffect } from "react";

const amenitiesList = [
  "Cardio Equipment",
  "Weight Machines",
  "Personal Training",
  "Swimming Pool",
  "Juice Bar",
  "Free Weights",
  "Group Classes",
  "Sauna/Steam Room",
  "Basketball Court",
  "Childcare Services",
  "Parking Available",
  "Locker Rooms",
  "Shower Facilities",
  "WiFi Available",
];

const GymDetails = () => {
  const [formData, setFormData] = useState({
    gymName: "",
    address: "",
    contactNumber: "",
    email: "",
    openingTime: "",
    closingTime: "",
    description: "",
    amenities: [],
  });

  const [images, setImages] = useState([]);
  const [saved, setSaved] = useState(false);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const email = localStorage.getItem("userEmail");

      const res = await fetch(
  `${import.meta.env.VITE_API_URL}/update-gym/${email}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      gym_name: formData.gymName,
      address: formData.address,
      phone: formData.contactNumber,
      gym_description: formData.description,
      amenities: formData.amenities.join(", "),
      opening_time: formData.openingTime,
      closing_time: formData.closingTime
    })
  }
);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    fetchGymDetails();
  }, []);

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= AMENITY CHANGE ================= */

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => {
      let updated = [...prev.amenities];

      if (updated.includes(amenity)) {
        updated = updated.filter((a) => a !== amenity);
      } else {
        updated.push(amenity);
      }

      return { ...prev, amenities: updated };
    });
  };

  /* ================= IMAGE UPLOAD ================= */

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 6) {
      alert("Maximum 6 images allowed");
      return;
    }

    const previews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previews]);
  };

  /* ================= SAVE ================= */

  const handleSave = async (e) => {

  e.preventDefault();

  if (images.length < 6) {
    alert("Please upload at least 6 gym images");
    return;
  }

  try {

    const email = localStorage.getItem("userEmail");

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/update-gym/${email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Gym details updated");
      setSaved(true);
    }

  } catch (error) {

    console.log(error);
    alert("Update failed");

  }

};
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Edit Gym Details</h2>
        <p className="text-slate-500 mt-1">
          Update your gym's information and settings
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Gym Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Gym Name
            </label>
            <input
              type="text"
              name="gymName"
              value={formData.gymName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Gym Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800"
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Opening Time
              </label>
              <input
                type="time"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Closing Time
              </label>
              <input
                type="time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800"
              />
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Gym Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800"
            />
          </div>

          {/* Amenities */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Amenities & Features
            </label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

              {amenitiesList.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-900 font-medium"
                >
                  <input
                    type="checkbox"
                    className="accent-blue-600"
                    checked={formData.amenities.includes(item)}
                    onChange={() => handleAmenityChange(item)}
                  />
                  {item}
                </label>
              ))}

            </div>
          </div>

          {/* Images */}
          <div className="md:col-span-2">
            <p className="text-xs text-red-500 mb-2">
              Minimum 6 gym images required
            </p>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />

            {images.length > 0 && (
              <div className="flex gap-3 mt-4">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Save Changes
        </button>

        {saved && (
          <p className="text-green-600 mt-2">
            Changes saved successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default GymDetails;