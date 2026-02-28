import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminApproval = () => {

  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const fetchPending = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/pending-requests`);
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  // ✅ APPROVE
 const approveGym = async (email) => {

  try {

    await fetch(`${import.meta.env.VITE_API_URL}/approve-gym/${email}`, {
      method: "PUT"
    });

    alert("Approved ✅");

    fetchPending();   // ✔️ refresh list only

  } catch (err) {
    console.log(err);
  }

};

  // ✅ REJECT
  const rejectGym = async (email) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/reject-gym/${email}`, {
        method: "PUT"
      });

      alert("Rejected ❌");

      navigate("/owner-rejected");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Pending Gym Requests</h1>

      {requests.length === 0 ? (
        <p>No Pending Requests</p>
      ) : (
        requests.map((req) => (
          <div key={req.email} style={{border:"1px solid #ccc", padding:"20px", marginBottom:"10px"}}>

            <p><b>Name:</b> {req.full_name}</p>
            <p><b>Email:</b> {req.email}</p>
            <p><b>City:</b> {req.city}</p>

            <button onClick={() => approveGym(req.email)}>
              Approve
            </button>

            <button 
              onClick={() => rejectGym(req.email)}
              style={{ marginLeft: "10px", background: "red", color: "white" }}
            >
              Reject
            </button>

          </div>
        ))
      )}
    </div>
  );
};

export default AdminApproval;