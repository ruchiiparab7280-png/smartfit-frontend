import React, { useState, useEffect } from "react";
import MainNavigation from "../../components/MainNavigation";

const SupplementControl = () => {

  const [protein, setProtein] = useState({
    name: "",
    price: "",
    image: ""
  });

  const [proteins, setProteins] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("gymProteins")) || [];
    setProteins(saved);
  }, []);

  const handleSave = () => {

    if (!protein.name || !protein.price) {
      alert("Enter supplement details");
      return;
    }

    const newProtein = {
      id: Date.now(),
      ...protein
    };

    const updated = [...proteins, newProtein];
    localStorage.setItem("gymProteins", JSON.stringify(updated));
    setProteins(updated);

    setProtein({
      name: "",
      price: "",
      image: ""
    });
  };

  const removeProtein = (id) => {
    const updated = proteins.filter(p => p.id !== id);
    localStorage.setItem("gymProteins", JSON.stringify(updated));
    setProteins(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <MainNavigation />

      <div className="container-custom pt-24 pb-8">

        {/* HERO */}
        <div className="mb-10 bg-gradient-to-r from-orange-500 to-red-500 p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold mb-2">
            Supplement Management
          </h1>
          <p className="text-lg opacity-90">
            Add and manage gym supplements
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ADD SUPPLEMENT */}
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-xl border border-orange-500/20 shadow-lg">

            <h2 className="text-2xl font-bold mb-6 text-orange-400">
              Add Supplement
            </h2>

            <input
              type="text"
              value={protein.name}
              placeholder="Supplement Name"
              onChange={(e) => setProtein({ ...protein, name: e.target.value })}
              className="w-full p-3 mb-3 rounded bg-white/10 border border-white/20"
            />

            <input
              type="number"
              value={protein.price}
              placeholder="Price"
              onChange={(e) => setProtein({ ...protein, price: e.target.value })}
              className="w-full p-3 mb-3 rounded bg-white/10 border border-white/20"
            />

            <input
              type="file"
              onChange={(e) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProtein({ ...protein, image: reader.result });
                };
                reader.readAsDataURL(e.target.files[0]);
              }}
              className="w-full mb-4"
            />

            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 rounded text-white w-full hover:scale-105 transition"
            >
              Add Supplement
            </button>

          </div>

          {/* SUPPLEMENT LIST */}
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-xl border border-orange-500/20 shadow-lg">

            <h2 className="text-2xl font-bold mb-6 text-orange-400">
              Your Supplements
            </h2>

            {proteins.length === 0 && (
              <p className="text-gray-400">No Supplements Added</p>
            )}

            {proteins.map(p => (
              <div
                key={p.id}
                className="mb-4 p-4 border border-white/20 rounded-xl flex items-center justify-between hover:bg-white/5 transition"
              >
                <div className="flex items-center gap-4">

                  {p.image && (
                    <img
                      src={p.image}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}

                  <div>
                    <p className="font-bold">{p.name}</p>
                    <p className="text-gray-400">₹ {p.price}</p>
                  </div>

                </div>

                <button
                  onClick={() => removeProtein(p.id)}
                  className="bg-red-500 px-4 py-1 rounded text-white hover:scale-105 transition"
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