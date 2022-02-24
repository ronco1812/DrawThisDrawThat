import React from "react";
import ReactDOM from "react-dom";
import GameBoard from "./components/GameBoard";
import Welcome from "./components/Welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="game" element={<GameBoard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
