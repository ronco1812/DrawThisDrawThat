import React from "react";
import ReactDOM from "react-dom";
import GameBoard from "./components/GameBoard";
import Welcome from "./components/Welcome";
import WordOption from "./components/WordOption";
import Loader from "./components/Loader";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const server = "http://localhost:8080/";
const socket = io.connect(server);
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome socket={socket} />} />
        <Route path="loader" element={<Loader socket={socket} />} />
        <Route path="word" element={<WordOption socket={socket} />} />
        <Route path="game" element={<GameBoard socket={socket} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
