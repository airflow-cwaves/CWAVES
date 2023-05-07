import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import Pathfinding from "../pages/Pathfinding";
import Home from "../pages/Home";
import DistanceCalculator from "../pages/DistanceCalculator";
import FindDistance from "./FindDistance";
import MyLocation from "./MyLocation";

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>} />
        </Routes>
        <Routes>
            <Route exact path="/distance" element={<DistanceCalculator/>} />
        </Routes>
        <Routes>
            <Route exact path="/distance2" element={<FindDistance/>} />
        </Routes>
        <Routes>
            <Route exact path="/pathfinding" element={<Pathfinding/>} />
        </Routes>
        <Routes>
            <Route exact path="/mylocation" element={<MyLocation/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
