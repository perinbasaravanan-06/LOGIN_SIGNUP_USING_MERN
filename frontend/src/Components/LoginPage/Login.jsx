import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';
const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", user);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className='loginContainer'>
        <div className='loginText'><h2>Login</h2></div>
        <form onSubmit={handleSubmit} className='formArea'>
            <input type="email" placeholder='Enter your email' required className="input email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}/>
            <input type="password" placeholder='Enter your password' required className="input password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}/>
            <button type='submit' className="input btn">Login</button>
        </form>
        <p>New user? <span onClick={() => navigate("/signup")} className="toSignup">Signup</span></p>
    </div>
  );
}

export default Login;
