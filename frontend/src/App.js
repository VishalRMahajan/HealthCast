import Navbar from "./component/Navbar";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import About from "./component/About/About";
import Home from "./component/Home/Home";
import Services from "./component/Services/Services";
import Contact from "./component/Contact/Contact";

function App() {
  const [page, setPage] = React.useState("");
  return (
    <div className="App flex flex-col pt-5 px-16 h-dvh">
      <BrowserRouter>
        <Navbar page={page} />
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home setPage={setPage} />} />
          <Route path="/home" element={<Home setPage={setPage} />} />
          {/* Services */}
          <Route path="/services" element={<Services setPage={setPage} />} />
          {/* About */}
          <Route path="/about" element={<About setPage={setPage} />} />
          {/* Contact */}
          <Route path="/contact" element={<Contact setPage={setPage} />} />
          {/* Auth */}
          <Route path="/login" element={<Navigate to="/auth" />} />
          <Route path="/register" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<h1>Auth</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
