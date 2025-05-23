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
import Profile from "./pages/userprofile/profile";
import { useLocation } from "react-router-dom";
import Mybooking from "./pages/mybooking";
import Mybooking2 from "./pages/mybooking2";

import { usePathname } from "./use-pathname";
import { useEffect, useContext } from "react";
import AdminDash from "./pages/admin/dashboard";
import { RoomContext } from "./context/context";
import { Protector } from "./pages/protector";
import { extendTheme } from "@chakra-ui/react";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import { SaasProvider, theme as baseTheme } from "@saas-ui/react";
import Unauthorized from "./pages/Unauthorized";
import PersistLogin from "./components/PersistLogin";
export const myTheme = extendTheme(
  {
    styles: {
      global: {
        ".containerx": {
          height: "$100vh",
          // top: "3rem",
        },
        ".highlight": {
          color: "red",
          fontSize: "1.9rem",
        },
      },
    },
  },
  baseTheme
);
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
      <Routes path="/" element={<Layout />}>
        <Route exact path="/" Component={Home} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/accomodation" element={<Accomodation />} />
        <Route exact path="/rooms/:slug" Component={SingleRoom} />
        <Route exact path="/gallery" element={<Gallery />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/reg" element={<SignUp />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[2001]} />}>
            <Route
              exact
              path="/profile"
              element={
                <SaasProvider theme={myTheme}>
                  {Profile()}
                  {/* <Protector Component={<Profile />} />{" "} */}
                </SaasProvider>
              }
            />

            <Route
              exact
              path="/mybooking"
              element={<Mybooking />}

              // element={<Protector Component={<Mybooking />} />}
            />
          </Route>
        </Route>
        <Route exact path="/mybooking2" element={<Mybooking2 />} />
        <Route exact path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
