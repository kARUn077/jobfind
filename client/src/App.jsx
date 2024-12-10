import React from "react";
import { BrowserRouter, Routes, Route }  from "react-router-dom";
import Home from "./User/Home";
import Register from "./User/Register";
import Login from "./User/Login";
import DashBoard from "./User/DashBoard";
import Notification from "./User/Notification";
import PastApplication from "./User/PastApplication";
import './App.css';

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
