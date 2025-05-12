import { useState } from "react";
import { Route, Router, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Nave from "./components/navetwo";
import Footer from "./components/footer";
import About from "./pages/about";
import Accomodation from "./pages/accomodation";
import Gallery from "./pages/gallery";
import SingleRoom from "./pages/singleroom";
import Error from "./pages/error";
import React, { Component } from "react";
import Checkout from "./pages/checkout/Checkout";
import SignUp from "./pages/sign-up/SignUp";
import SignIn from "./pages/sign-in/SignIn";
import Profile from "./pages/profile";
import { useLocation } from "react-router-dom";
import Mybooking from "./pages/mybooking";
import { usePathname } from "./use-pathname";
import { useEffect, useContext } from "react";
import AdminDash from "./pages/admin/dashboard";
import { RoomContext } from "./context/context";
import { Protector } from "./pages/protector";
function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { userlogedin, handleuserChange, apilogout, Admin } =
    useContext(RoomContext);
  useScrollToTop();
  const location = useLocation();
  const cuser = () => {
    let userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return null;
  };
  const userProfile = cuser();
  const isAdmin = userProfile?.Admin;
  return (
    <div>
      {" "}
      {!isAdmin && <Nave />}
      {isAdmin && <AdminDash />}
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/accomodation" element={<Accomodation />} />
        <Route exact path="/rooms/:slug" Component={SingleRoom} />
        <Route exact path="/gallery" element={<Gallery />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/reg" element={<SignUp />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route
          exact
          path="/profile"
          element={<Protector Component={<Profile />} />}
        />
        <Route exact path="/mybooking" element={<Mybooking />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
