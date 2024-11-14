import React from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Messenger from "./pages/messenger/Messenger";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={user ? <Home /> : <Login />}></Route>
            <Route
              path="login"
              element={user ? <Navigate to="/" /> : <Login />}
            ></Route>
            <Route
              path="register"
              element={user ? <Navigate to="/" /> : <Register />}
            ></Route>
            <Route
              path="messenger"
              element={!user ? <Navigate to="/" /> : <Messenger />}
            ></Route>
            <Route path="profile/:username" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
