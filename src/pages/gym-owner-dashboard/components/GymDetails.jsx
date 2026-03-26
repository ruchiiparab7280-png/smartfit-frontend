import React, { useState, useEffect } from "react";
import { normalizeGymImages } from "../../../utils/gymImageUtils";
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

  // Holds preview URLs + optional File objects for newly selected images.
  // Existing images loaded from DB have no `file`.
  const [imageItems, setImageItems] = useState([]);
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
  openingTime: data.opening_time ? data.opening_time.slice(0,5) : "",
  closingTime: data.closing_time ? data.closing_time.slice(0,5) : "",
  description: data.gym_description || "",
  amenities: data.amenities
    ? data.amenities.split(",").map((a) => a.trim())
    : [],
});

const rawImages = data?.images ?? data?.image;
const existingImages = normalizeGymImages(rawImages);
setImageItems(existingImages.map((src) => ({ src })));
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
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const allowedExts = new Set([".jpg", ".jpeg", ".png", ".webp"]);
    const allowedMimes = new Set(["image/jpeg", "image/png", "image/webp"]);

    const validItems = [];
    files.forEach((file) => {
      const ext = file?.name?.toLowerCase().match(/\.[a-z0-9]+$/)?.[0];
      const isAllowed =
        (ext && allowedExts.has(ext)) && allowedMimes.has(file.type);

      if (!isAllowed) {
        alert("Invalid image type. Allowed: jpg, jpeg, png, webp");
        return;
      }

      validItems.push({
        src: URL.createObjectURL(file),
        file,
      });
    });

    setImageItems((prev) => [...prev, ...validItems]);
    // Allow selecting the same file again.
    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    setImageItems((prev) => {
      const item = prev[index];
      if (item?.file && item?.src?.startsWith("blob:")) {
        URL.revokeObjectURL(item.src);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  /* ================= SAVE ================= */

  const handleSave = async (e) => {
    console.log("IMAGE ITEMS:", imageItems); // 👈 YAHAN LAGANA HAI
    e.preventDefault();

    setErrorMessage("");

    if (imageItems.length < 6) {
      setErrorMessage("Please upload at least 6 images of the gym");
      return;
    }

    try {

      const email = localStorage.getItem("userEmail");

      const bucketName = "gym-images";

      // Upload only newly selected files; keep existing URLs as-is.
      // Result: store an array of public URLs in the gym table.
      const imagesToSave = await Promise.all(
        imageItems.map(async (item) => {
          if (!item?.file) return item?.src;

          const extFromName =
            item.file?.name?.split(".")?.pop()?.toLowerCase() || "jpg";
          const allowedExts = new Set(["jpg", "jpeg", "png", "webp"]);
          const ext = allowedExts.has(extFromName) ? extFromName : "jpg";

          const rand =
            typeof globalThis.crypto?.randomUUID === "function"
              ? globalThis.crypto.randomUUID()
              : `${Math.random().toString(16).slice(2)}${Date.now()}`;

          const filePath = `${email}/${Date.now()}-${rand}.${ext}`;

          const { error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(filePath, item.file, {
              upsert: false,
              contentType: item.file.type,
            });

          if (uploadError) {
            console.error("Supabase upload error:", uploadError);
            throw new Error("Failed to upload gym images");
          }

          const { data: publicData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

          return publicData.publicUrl;
        })
      );

      console.log("📌 Gym images URLs to save:", imagesToSave);

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
            images: imagesToSave,
          })
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSaved(true);
        alert("Gym details updated successfully");
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

            {errorMessage && (
              <p className="text-sm text-red-500 mb-2">{errorMessage}</p>
            )}

            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleImageUpload}
            />

            {imageItems.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {imageItems.map((item, i) => (
                  <div key={i} className="relative">
                    <img
                      src={item.src}
                      className="w-20 h-20 object-cover rounded"
                      alt={`Gym image ${i + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                    >
                      Remove
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