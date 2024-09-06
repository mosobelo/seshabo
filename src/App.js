import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Messages from "./Components/fetch";
import Footer from "./Components/Footer";
import Hae from "./Components/Hae";
import Contact from "./Components/Contact";
import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from "./Components/Login";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/fetch" element={<Messages />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hae" element={<Hae />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login/>} />
          
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;

