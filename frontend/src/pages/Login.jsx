import React, { useState } from "react";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const API = "http://localhost:5000";

  const sendOtp = async () => {
    await fetch(`${API}/auth/request-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await fetch(`${API}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      alert("❌ Invalid OTP");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Notes App</h1>
      {step === 1 ? (
        <>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
      <div className="divider">OR</div>
      <a className="google-btn" href={`${API}/auth/google`}>
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
        />
        Sign in with Google
      </a>
    </div>
  );
}
