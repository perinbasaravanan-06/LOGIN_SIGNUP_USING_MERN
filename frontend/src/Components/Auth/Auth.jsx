import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import "./Auth.css";

const Auth = ({ type }) => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const isLogin = type === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/login" : "/signup";
      const res = await axios.post(`http://localhost:5000${endpoint}`, user);
      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/home");
      } else {
        alert("Signup successful! Redirecting to login.");
        navigate("/");
      }
    } catch (err) {
      alert(`${isLogin ? "Login" : "Signup"} failed!`);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    try {
      const res = await axios.post("http://localhost:5000/google-auth", decoded);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      alert("Google authentication failed!");
    }
  };

  return (
    <div className="authContainer">
      <div className="authText"><h2>{isLogin ? "Login" : "Signup"}</h2></div>
      <form onSubmit={handleSubmit} className="formArea">
        {!isLogin && (
          <input type="text" placeholder="Enter your Name" required className="input name"
            onChange={(e) => setUser({ ...user, username: e.target.value })} />
        )}
        <input type="email" placeholder="Enter your email" required className="input email"
          onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input type="password" placeholder="Enter your password" required className="input password"
          onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <button type='submit' className="input btn">{isLogin ? "Login" : "Signup"}</button>
      </form>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert("Google authentication failed!")} />
      </GoogleOAuthProvider>
      <p>{isLogin ? "New user? " : "Already have an Account? "}
        <span onClick={() => navigate(isLogin ? "/signup" : "/")} className="toggleAuth">
          {isLogin ? "Signup" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default Auth;
