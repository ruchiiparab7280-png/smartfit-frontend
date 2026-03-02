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

    if (!trainer.name || !trainer.price) {
      alert("Enter trainer details");
      return;
    }

    const newTrainer = {
      id: Date.now(),
      ...trainer
    };

    const updated = [...trainers, newTrainer];
    localStorage.setItem("gymTrainers", JSON.stringify(updated));
    setTrainers(updated);

    setTrainer({
      name: "",
      price: "",
      image: ""
    });
  };

  const removeTrainer = (id) => {
    const updated = trainers.filter(t => t.id !== id);
    localStorage.setItem("gymTrainers", JSON.stringify(updated));
    setTrainers(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <MainNavigation />

      <div className="container-custom pt-24 pb-8">

        {/* HERO */}
        <div className="mb-10 bg-gradient-to-r from-orange-500 to-red-500 p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold mb-2">
            Trainer Management
          </h1>
          <p className="text-lg opacity-90">
            Add and manage your gym trainers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ADD TRAINER */}
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-xl border border-orange-500/20 shadow-lg">

            <h2 className="text-2xl font-bold mb-6 text-orange-400">
              Add Trainer
            </h2>

            <input
              type="text"
              placeholder="Trainer Name"
              value={trainer.name}
              onChange={(e) => setTrainer({ ...trainer, name: e.target.value })}
              className="w-full p-3 mb-3 rounded bg-white/10 border border-white/20"
            />

            <input
              type="number"
              placeholder="Session Price"
              value={trainer.price}
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
              className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 rounded text-white w-full hover:scale-105 transition"
            >
              Add Trainer
            </button>

          </div>

          {/* TRAINER LIST */}
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-xl border border-orange-500/20 shadow-lg">

            <h2 className="text-2xl font-bold mb-6 text-orange-400">
              Your Trainers
            </h2>

            {trainers.length === 0 && (
              <p className="text-gray-400">No Trainers Added</p>
            )}

            {trainers.map(t => (
              <div
                key={t.id}
                className="mb-6 p-4 border border-white/20 rounded-xl flex items-center justify-between hover:bg-white/5 transition"
              >
                <div className="flex items-center gap-4">

                  {t.image && (
                    <img
                      src={t.image}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  )}

                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-gray-400">₹ {t.price} / session</p>
                  </div>

                </div>

                <button
                  onClick={() => removeTrainer(t.id)}
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

export default TrainerControl;