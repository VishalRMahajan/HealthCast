import Navbar from "./component/Navbar";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import About from "./component/About/About";
import Auth from "./component/Authorization/Auth";

function App() {
  return (
    <div className="App flex flex-col min-h-dvh py-10 px-16">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<h1>Hello</h1>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Navigate to="/auth" />} />
          <Route path="/register" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
