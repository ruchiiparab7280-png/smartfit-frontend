console.log("📩 Contact Routes Loaded");
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Contact() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

const handleSubmit = async () => {

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/contact"`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        full_name,
        email,
        message
      })
    });

    const data = await res.json();
    alert(data.message);

 

      if (res.ok) {
        alert("Message Sent ✅");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert(data?.message || "Failed ❌");
      }

    } catch (err) {
      console.error("Contact Error:", err);
      alert("Server error ❌");
    }
  };

  return (
    <>
      <style>{`
        .contact-page {
          min-height: 100vh;
          background: radial-gradient(circle at top, #0f172a, #020617);
          padding: 60px 20px;
        }

        .contact-hero {
          text-align: center;
          margin-bottom: 50px;
        }

        .back-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(249,115,22,0.4);
          color: #f97316;
          padding: 8px 18px;
          border-radius: 10px;
          cursor: pointer;
          margin-bottom: 25px;
          font-weight: 500;
          transition: 0.25s ease;
          backdrop-filter: blur(10px);
        }

        .back-btn:hover {
          background: rgba(249,115,22,0.15);
          border-color: #f97316;
          color: white;
        }

        .contact-hero h1 {
          font-size: 42px;
          color: white;
        }

        .contact-hero span {
          color: #f97316;
        }

        .contact-hero p {
          color: #94a3b8;
          max-width: 600px;
          margin: auto;
        }

        .contact-card {
          width: 100%;
          max-width: 900px;
          margin: auto;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          display: flex;
          overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow: 0 0 60px rgba(249,115,22,0.15);
        }

        .contact-left {
          flex: 1;
          padding: 40px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: white;
        }

        .contact-right {
          flex: 1;
          padding: 40px;
          background: rgba(2,6,23,0.8);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .contact-form input,
        .contact-form textarea {
          background: transparent;
          border: 1px solid #1e293b;
          padding: 12px;
          border-radius: 8px;
          color: white;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: #f97316;
          box-shadow: 0 0 0 2px rgba(249,115,22,0.3);
        }

        .contact-form button {
          background: #f97316;
          border: none;
          padding: 12px;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .contact-form button:hover {
          background: #ea580c;
        }

        .contact-info {
          margin-top: 25px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.12);
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
        }

        .info-item span {
          font-size: 18px;
        }

        .info-item p {
          margin: 0;
        }

        @media(max-width: 768px) {
          .contact-card {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="contact-page">

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="contact-hero">
          <h1>Get In <span>Touch</span></h1>
          <p>Have questions about gyms, memberships or partnerships? Our SmartFit team is here to help.</p>
        </div>

        <div className="contact-card">

          <div className="contact-left">
            <h2>Let’s Talk</h2>
            <p>We usually respond within 24 hours.</p>

            <div className="contact-info">
              <div className="info-item"><span>📧</span><p>support@smartfit.com</p></div>
              <div className="info-item"><span>📞</span><p>+91 XXXXX XXXXX</p></div>
              <div className="info-item"><span>📍</span><p>Mumbai, India</p></div>
              <div className="info-item"><span>🕒</span><p>Mon - Sat : 8AM - 8PM</p></div>
            </div>
          </div>

          <div className="contact-right">
            <form className="contact-form" onSubmit={handleSubmit}>

              <input 
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />

              <input 
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />

              <textarea 
                rows="5"
                placeholder="Write your message..."
                required
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
              />

              <button type="submit">Send Message</button>

            </form>
          </div>

        </div>
      </div>
    </>
  );
}

export default Contact;