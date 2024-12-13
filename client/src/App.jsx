import React from "react";
import { BrowserRouter, Routes, Route }  from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import DashBoard from "./Pages/DashBoard";
import Notification from "./Pages/Notification";
import PastApplication from "./Pages/PastApplication";
//import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/User/register" element={<Register />}></Route>
          <Route path="/User/login" element={<Login />}></Route>
          <Route path="/User/dashBoard" element={<DashBoard />}></Route>
          <Route path="/User/notification" element={<Notification />}></Route>
          <Route path="/User/pastApplication" element={<PastApplication />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
