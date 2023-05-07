import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import Pathfinding from "../pages/Pathfinding";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/main" element={<Home/>} />
        </Routes>
        <Routes>
            <Route path="/pathfinding" element={<Pathfinding/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
