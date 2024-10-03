import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./modules/Home/Home";
import Events from "./modules/Events/Events";
import Gallery from "./modules/Gallery/Gallery";
import Contact from "./modules/Contact/Contact";

export default function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </div>
  );
}
