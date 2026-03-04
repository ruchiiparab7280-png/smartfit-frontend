import React, { useState, useEffect } from "react";
import MainNavigation from "../../components/MainNavigation";

const TrainerControl = () => {

  const [trainer, setTrainer] = useState({
    name: "",
    price: "",
    image: ""
  });

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("gymTrainers")) || [];
    setTrainers(saved);
  }, []);

  const handleSave = () => {

    const newTrainer = {
      id: Date.now(),
      ...trainer
    };

    const updated = [...trainers, newTrainer];

    localStorage.setItem("gymTrainers", JSON.stringify(updated));
    window.location.reload();
  };

  const removeTrainer = (id) => {

    const updated = trainers.filter(t => t.id !== id);
    localStorage.setItem("gymTrainers", JSON.stringify(updated));
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <div className="container-custom pt-24 pb-8">

        {/* HERO */}
        <div className="mb-10 bg-gradient-to-r from-orange-500 to-red-500 p-8 rounded-xl text-white shadow-lg">
          <h1 className="text-4xl font-bold mb-2">
            Trainer Management
          </h1>
          <p className="text-lg opacity-90">
            Add, update and manage your gym trainers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ADD FORM */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20">

            <h2 className="text-2xl font-bold mb-6">
              Add Trainer
            </h2>

            <input
              type="text"
              placeholder="Trainer Name"
              onChange={(e) => setTrainer({ ...trainer, name: e.target.value })}
              className="w-full p-3 mb-3 rounded bg-white/10 border border-white/20"
            />

            <input
              type="number"
              placeholder="Session Price"
              onChange={(e) => setTrainer({ ...trainer, price: e.target.value })}
              className="w-full p-3 mb-3 rounded bg-white/10 border border-white/20"
            />

            <input
              type="file"
              onChange={(e) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setTrainer({ ...trainer, image: reader.result });
                };
                reader.readAsDataURL(e.target.files[0]);
              }}
              className="w-full mb-4"
            />

            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 rounded text-white w-full"
            >
              Add Trainer
            </button>

          </div>

          {/* TRAINER LIST */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20">

            <h2 className="text-2xl font-bold mb-6">
              Your Trainers
            </h2>

            {trainers.length === 0 && (
              <p>No Trainers Added</p>
            )}

            {trainers.map(t => (
              <div key={t.id} className="mb-6 p-4 border border-white/20 rounded">

                {t.image && (
                  <img
                    src={t.image}
                    className="w-24 h-24 rounded-full mb-2 object-cover"
                  />
                )}

                <p className="font-bold">{t.name}</p>
                <p>₹ {t.price} / session</p>

                <button
                  onClick={() => removeTrainer(t.id)}
                  className="bg-red-500 px-3 py-1 mt-2 rounded text-white"
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

export default TrainerControl;