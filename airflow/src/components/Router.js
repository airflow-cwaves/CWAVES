import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import {
  Route,
} from "react-router-dom";
import Pathfinding from "../pages/Pathfinding";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/main" element={<Home/>} />
        </Routes>
        <Routes>
            <Route exact path="/pathfinding" element={<Pathfinding/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
