import React, { useState, useEffect } from "react";
import MainNavigation from "../../components/MainNavigation";

const SupplementControl = () => {

  const [protein, setProtein] = useState({
    name: "",
    price: "",
    imagePreview: ""
  });

  const [proteins, setProteins] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("gymProteins")) || [];
    setProteins(saved);
  }, []);

  const handleSave = () => {

    if (!protein.name || !protein.price) {
      alert("Enter all details");
      return;
    }

    const newProtein = {
      id: Date.now(),
      name: protein.name,
      price: protein.price
      // ❌ image save nahi kar rahe
    };

    const updated = [...proteins, newProtein];

    localStorage.setItem("gymProteins", JSON.stringify(updated));
    setProteins(updated);

    setProtein({
      name: "",
      price: "",
      imagePreview: ""
    });

  };

  const removeProtein = (id) => {

    const updated = proteins.filter(p => p.id !== id);
    localStorage.setItem("gymProteins", JSON.stringify(updated));
    setProteins(updated);

  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <div className="container-custom pt-24 pb-8">

        <div className="mb-10 bg-gradient-to-r from-orange-500 to-red-500 p-8 rounded-xl text-white shadow-lg">
          <h1 className="text-4xl font-bold mb-2">
            Supplement Management
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white/10 p-8 rounded-xl">

            <h2 className="text-2xl font-bold mb-6">
              Add Supplement
            </h2>

            <input
              type="text"
              value={protein.name}
              placeholder="Protein Name"
              onChange={(e) => setProtein({ ...protein, name: e.target.value })}
              className="w-full p-3 mb-3 rounded"
            />

            <input
              type="number"
              value={protein.price}
              placeholder="Price"
              onChange={(e) => setProtein({ ...protein, price: e.target.value })}
              className="w-full p-3 mb-3 rounded"
            />

            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => {
                  setProtein({
                    ...protein,
                    imagePreview: reader.result
                  });
                };
                reader.readAsDataURL(file);
              }}
              className="w-full mb-4"
            />

            {protein.imagePreview && (
              <img
                src={protein.imagePreview}
                alt="preview"
                className="w-20 h-20 mb-3 rounded object-cover"
              />
            )}

            <button
              onClick={handleSave}
              className="bg-orange-500 px-6 py-3 rounded text-white w-full"
            >
              Add Supplement
            </button>

          </div>

          <div className="bg-white/10 p-8 rounded-xl">

            <h2 className="text-2xl font-bold mb-6">
              Your Supplements
            </h2>

            {proteins.map(p => (
              <div
                key={p.id}
                className="mb-4 p-4 border rounded flex justify-between"
              >
                <div>
                  <p className="font-bold">{p.name}</p>
                  <p>₹ {p.price}</p>
                </div>

                <button
                  onClick={() => removeProtein(p.id)}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
};

export default SupplementControl;