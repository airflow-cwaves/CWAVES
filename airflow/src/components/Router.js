import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import Kakao from "../kakaomap/Kakao";
import Pathfinding from "../pages/Pathfinding";

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Kakao/>} />
        </Routes>
        <Routes>
            <Route path="/pathfinding" element={<Pathfinding/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
