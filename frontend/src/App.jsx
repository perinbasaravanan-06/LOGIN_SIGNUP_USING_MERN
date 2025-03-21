import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from '../src/Components/Auth/Auth'
import Home from "./Components/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
