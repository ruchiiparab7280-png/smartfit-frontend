import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

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
    upiId: ""
  });

  const [images, setImages] = useState([]); // Array of public URLs (persisted)
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [saved, setSaved] = useState(false);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const email = localStorage.getItem("userEmail");

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/owner-gym/${email}`
        );

        const data = await res.json();

        setFormData({
          gymName: data.gym_name || "",
          address: data.address || "",
          contactNumber: data.phone || "",
          email: data.email || "",
          openingTime: data.opening_time ? data.opening_time.slice(0, 5) : "",
          closingTime: data.closing_time ? data.closing_time.slice(0, 5) : "",
          description: data.gym_description || "",
          amenities: data.amenities
            ? data.amenities.split(",").map((a) => a.trim())
            : [],
          upiId: data.upi_id || ""
        });

        // Load existing images from DB
        if (data.gym_images) {
          try {
            const parsed = JSON.parse(data.gym_images);
            if (Array.isArray(parsed)) {
              setImages(parsed);
            }
          } catch {
            // If not valid JSON, ignore
          }
        }
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

  /* ================= IMAGE UPLOAD TO SUPABASE STORAGE ================= */

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    setUploading(true);
    setImageError("");

    try {
      const uploadedUrls = [];

      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const filePath = `gym-photos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("gym-images")
          .upload(filePath, file);

        if (uploadError) {
          console.log("Upload error:", uploadError);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("gym-images")
          .getPublicUrl(filePath);

        if (urlData?.publicUrl) {
          uploadedUrls.push(urlData.publicUrl);
        }
      }

      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.log("Upload error:", error);
      setImageError("Failed to upload images. Please try again.");
    }

    setUploading(false);

    // Reset file input
    e.target.value = "";
  };

  /* ================= REMOVE IMAGE ================= */

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageError("");
  };

  /* ================= SAVE ================= */

  const handleSave = async (e) => {
    if (e) e.preventDefault();

    // Validate minimum 6 images
    if (images.length < 6) {
      setImageError("Please upload at least 6 images of the gym");
      return;
    }

    setImageError("");

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
            closing_time: formData.closingTime,
            upi_id: formData.upiId,
            gym_images: JSON.stringify(images)
          })
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSaved(true);
        alert("Gym details updated successfully");
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  return (
    <div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Edit Gym Details</h2>
        <p className="text-slate-400 mt-1">
          Update your gym's information and settings
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-[#111827] rounded-xl shadow-lg border border-slate-800 p-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Gym Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Gym Name
            </label>
            <input
              type="text"
              name="gymName"
              value={formData.gymName}
              onChange={handleChange}
             className="w-full px-4 py-2.5 rounded-lg bg-[#0f172a] border border-slate-700 text-white"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-[#0f172a] border border-slate-700 text-white"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Gym Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-[#0f172a] border border-slate-700 text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-[#0f172a] border border-slate-700 text-white"
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Opening Time
              </label>
              <input
                type="time"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-[#0f172a] border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Closing Time
              </label>
              <input
                type="time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-[#0f172a] border border-slate-700 text-white"
              />
            </div>

          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Gym Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg bg-[#0f172a] border border-slate-700 text-white"
            />
          </div>

<div>
  <label className="block text-sm font-semibold text-slate-300 mb-2">
    UPI ID (For Membership Payments)
  </label>

  <input
    type="text"
    name="upiId"
    value={formData.upiId}
    onChange={handleChange}
    placeholder="example@upi"
    className="w-full px-4 py-2.5 rounded-lg bg-[#0f172a] border border-slate-700 text-white"
  />
</div>
          {/* Amenities */}
          <div className="md:col-span-2">

            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Amenities & Features
            </label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

              {amenitiesList.map((item) => (

                <label
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-300 font-medium"
                >

                  <input
                    type="checkbox"
                    className="accent-orange-500"
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

            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Gym Images
            </label>

            <p className="text-xs text-slate-400 mb-3">
              Upload at least 6 images of your gym. Images are stored securely in cloud storage.
            </p>

            {/* Upload Button */}
            <label className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${
              uploading
                ? "bg-slate-700 text-slate-400 cursor-wait"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}>
              {uploading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  📷 Upload Images
                </>
              )}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>

            <span className="ml-3 text-sm text-slate-400">
              {images.length} / 6 minimum
            </span>

            {/* Validation Error */}
            {imageError && (
              <p className="text-red-400 text-sm mt-2">
                ❌ {imageError}
              </p>
            )}

            {/* Image Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4">
                {images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={img}
                      alt={`Gym ${i + 1}`}
                      className="w-full h-20 object-cover rounded-lg border border-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        <button
  type="button"
  onClick={handleSave}
  className="mt-6 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg cursor-pointer"
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