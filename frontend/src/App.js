import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from "./context/UserContext";
import {Footer, Blog, Possibility, Features,WhatNIGHTCLUB, Header} from "./containers";
import {CTA, Brand, Navbar} from "./components";
 import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import VipSuites from "./pages/VipSuites";
import Ticket from "./pages/Ticket";
import NoPage from "./pages/NoPage";
import Event from "./pages/Event";

const App = () => {
    const [message, setMessage] = useState("");
    const [token] = useContext(UserContext);

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/signup", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log("something messed up");
    } else {
      setMessage(data.message);
    }
     };

  useEffect(() => {
    getWelcomeMessage();
  }, []);
     return (

        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Event" element={<Event />} />
          <Route path="About" element={<About />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="suites" element={<VipSuites />} />
            <Route path="ticket" element={<Ticket />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

    )
}
export default App;
