import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import Pathfinding from "../pages/Pathfinding";
import Home from "../pages/Home";
import UserGuide from "../pages/UserGuide";

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>} />
        </Routes>
        <Routes>
            <Route exact path="/pathfinding" element={<Pathfinding/>} />
        </Routes>
        <Routes>
            <Route exact path="/guide" element={<UserGuide/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
