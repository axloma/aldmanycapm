import { useState } from 'react'
import {Route,Router,BrowserRouter,Routes} from 'react-router-dom';
import './App.css'
// import { Helmet } from 'react-helmet';
import Home from './pages/home';
import Contact from './contact';
import Nave from './components/nave';
import Navet from './components/navetwo';
import Footer from './components/footer';
import About  from './pages/about';
import Accomodation from './pages/accomodation';
import Gallery from './pages/gallery';
import Blog from './pages/blog';
import Singleblog from './pages/singleblog';
import SingleRoom from './pages/singleroom';
import  Error from './pages/error';
// import { RoomProvider } from './context';
import React, { Component } from 'react'
// import { useContext } from 'react';
import Checkout from './pages/checkout/Checkout';
// import Login from './pages/Login';
// import Reg from './pages/Register';
// import FG from './pages/ForgotPassword';

// import SignUp from './pages/signup';
import SignUp from "./pages/sign-up/SignUp"

import SignIn from "./pages/sign-in/SignIn"
import Profile from './pages/profile';
import { BookContextprovider } from './context/bookcontext';
function App() {
// const value = useContext(RoomProvider)
// console.log(value)
  return (
    <>
    {/* <BrowserRouter> */}
    {/* <Nave/>  */}
    <Nave/>

    {/* <RoomProvicer> */}
      <Routes>  
        <Route  exact path="/" Component={Home} />
           {/* <Home /> */}
        {/* </Route>  */}
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/accomodation" element={<Accomodation />} />
        <Route exact path="/rooms/:slug" Component={SingleRoom} />
        <Route exact path="/gallery" element={<Gallery />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/singleBlog" element={<Singleblog />} />
        <Route exact path="/checkout" element={<Checkout />} />
        {/* <Route exact path="/test" element={<BookContextprovider />} /> */}
        {/* 
        <Route exact path="/login" element={<SignUp />} />*/}
   

        <Route exact path="/reg" element={<SignUp />} />
        <Route exact path="/login" element={<SignIn />} /> 
        <Route exact path="/profile" element={<Profile />} /> 

        <Route path="*" element={<Error/>} />
      </Routes>
    {/* </RoomProvicer> */}
    <Footer/>
 

  {/* </BrowserRouter> */}
    </>
  );
}

export default App
