import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Signup.css';

const Signup = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", user);
      alert("Signup successful! Redirecting to login.");
      navigate("/");
    } catch (err) {
      alert("Signup failed!");
    }
  };

  return (
    <div className='signupContainer'>
        <div className='signupText'><h2>Signup</h2></div>
        <form onSubmit={handleSubmit} className='formArea'>
            <input type="text" placeholder='Enter your Name' required className="input name"
              onChange={(e) => setUser({ ...user, username: e.target.value })} />
            <input type="email" placeholder='Enter your email' required className="input email"
              onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <input type="password" placeholder='Enter your password' required className="input password" 
              onChange={(e) => setUser({ ...user, password: e.target.value })}/>
            <button type='submit' className="input btn">Signup</button>
        </form>
        <p>Already have an Account? <span onClick={() => navigate("/")} className="toLogin">Login</span></p>
    </div>
  );
}

export default Signup;
