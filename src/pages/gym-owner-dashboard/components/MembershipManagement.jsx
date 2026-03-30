import React, { useState, useEffect } from 'react';

const emptyForm = { name: '', duration: '1 Month', price: '', description: '' };

const durations = ['1 Month', '3 Months', '6 Months', '1 year'];

const durationColor = (d) => {
  if (d === '1 Month') return 'bg-blue-100 text-blue-700';
  if (d === '3 Months') return 'bg-purple-100 text-purple-700';
  return 'bg-emerald-100 text-emerald-700';
};

const MembershipManagement = () => {

  const ownerEmail = localStorage.getItem("userEmail");

  const [plans, setPlans] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {

    // Guard: skip API calls if ownerEmail is missing
    if (!ownerEmail || ownerEmail === "null" || ownerEmail === "undefined") {
      setPlans([]);
      setMembers([]);
      setLoading(false);
      return;
    }

    const fetchMemberships = async () => {

      try {

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/memberships/${ownerEmail}`
        );

        const data = await res.json();

        setPlans(Array.isArray(data) ? data : []);

      } catch (err) {

        console.log("Membership fetch error", err);
        setPlans([]);

      }

    };

    const fetchMembers = async () => {

      try {

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/gym-members/${ownerEmail}`
        );

        const data = await res.json();

        setMembers(Array.isArray(data) ? data : []);

      } catch (err) {

        console.log("Members fetch error", err);
        setMembers([]);

      }

    };

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchMemberships(), fetchMembers()]);
      setLoading(false);
    };

    loadData();

  }, [ownerEmail]);

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setForm({
      name: p?.name,
      duration: p?.duration,
      price: p?.price,
      description: p?.description
    });
    setEditId(p?.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {

    try {

      await fetch(
        `${import.meta.env.VITE_API_URL}/membership/${id}`,
        {
          method: "DELETE"
        }
      );

      setPlans(plans.filter(p => p.id !== id));

    } catch (err) {

      console.log("Delete error", err);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        await fetch(
          `${import.meta.env.VITE_API_URL}/update-membership/${editId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
          }
        );

      } else {

        await fetch(
          `${import.meta.env.VITE_API_URL}/add-membership`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              gym_email: ownerEmail,
              ...form
            })
          }
        );

      }

      window.location.reload();

    } catch (err) {

      console.log("Save error", err);

    }

  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (

    <div>

      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-200">
            Membership Management
          </h2>
          <p className="text-slate-200 mt-1">
            {(plans || []).length} active membership plans
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-blue-700"

        >

          Add Plan </button>

      </div>

      {/* Plans */}

      {(plans || []).length === 0 ? (
        <div className="text-center py-12 bg-[#111827] rounded-xl border border-slate-800">
          <p className="text-slate-400 text-lg">No membership plans yet.</p>
          <p className="text-slate-500 text-sm mt-1">Click "Add Plan" to create your first membership plan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {(plans || []).map(plan => (

            <div
              key={plan?.id}
              className="bg-[#111827] rounded-xl shadow-sm border border-slate-800 p-6"
            >

              <div className="flex items-start justify-between mb-3">

                <div>
                  <h3 className="font-bold text-slate-200 text-lg">
                    {plan?.name}
                  </h3>

                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${durationColor(plan?.duration)}`}>
                    {plan?.duration} </span>

                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{plan?.price}
                  </p>
                  <p className="text-xs text-slate-200">per plan</p>
                </div>

              </div>

              <p className="text-slate-200 text-sm mb-4">
                {plan?.description}
              </p>

              <div className="flex gap-2 pt-3 border-t">

                <button
                  onClick={() => openEdit(plan)}
                  className="flex-1 py-1.5 text-sm text-blue-600 border border-blue-200 rounded-lg"

                >

                  Edit </button>

                <button
                  onClick={() => handleDelete(plan?.id)}
                  className="flex-1 py-1.5 text-sm text-red-500 border border-red-200 rounded-lg"

                >

                  Delete </button>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* Modal */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-[#111827] rounded-2xl shadow-xl w-full max-w-md p-6">

            <h3 className="text-lg font-bold mb-4">
              {editId ? 'Edit Plan' : 'Add Membership Plan'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Plan Name"
                value={form?.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border px-4 py-2 rounded text-slate-900"
              />

              <select
                value={form?.duration}
                onChange={(e) =>
                  setForm({ ...form, duration: e.target.value })
                }
                className="w-full border px-4 py-2 rounded text-slate-900"

              >

                {durations?.map(d => (

                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}

              </select>

              <input
                type="number"
                placeholder="Price"
                value={form?.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                className="w-full border px-4 py-2 rounded text-slate-900"
              />

              <textarea
                placeholder="Description"
                value={form?.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border px-4 py-2 rounded text-slate-900"
              />

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white py-2 rounded"
                >
                  Save
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* Active Members */}

      <div className="mt-10">

        <h3 className="text-xl font-bold text-slate-200 mb-4">
          Active Members
        </h3>

        <div className="bg-[#111827] rounded-xl border border-slate-800 overflow-hidden">

          {(members || []).length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400">No active members yet.</p>
            </div>
          ) : (
            <table className="w-full text-sm">

              <thead className="bg-slate-[#111827] text-slate-200">

                <tr>
                  <th className="px-4 py-3 text-left">Member</th>
                  <th className="px-4 py-3 text-left">Plan</th>
                  <th className="px-4 py-3 text-left">Start</th>
                  <th className="px-4 py-3 text-left">Payment</th>
                </tr>

              </thead>

              <tbody>

                {(members || []).map(member => (

                  <tr key={member?.id} className="border-t">

                    <td className="px-4 py-3 font-medium">
                      {member?.user_email}
                    </td>

                    <td className="px-4 py-3">
                      {member?.plan_name}
                    </td>

                    <td className="px-4 py-3">
                      {member?.start_date ? new Date(member.start_date).toLocaleDateString() : '—'}
                    </td>

                    <td className="px-4 py-3 font-semibold text-blue-600">
                      ₹{member?.price}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          )}

        </div>

      </div>

    </div>

  );

};

export default MembershipManagement;
