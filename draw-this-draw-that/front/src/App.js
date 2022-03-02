import GameBoard from "./components/GameBoard";
import Welcome from "./components/Welcome";
import WordOption from "./components/WordOption";
import Loader from "./components/Loader";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Guess from "./components/Guess";
import { useRef, useEffect } from "react";
const server = "http://localhost:8080/";
const socket = io.connect(server);
export default function App() {
  // const socketRef = useRef();
  // useEffect(() => {
  //   socketRef.current = io.connect(server);
  // });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome socket={socket} />} />
        <Route path="loader" element={<Loader socket={socket} />} />
        <Route path="guess" element={<Guess socket={socket} />} />
        <Route path="word" element={<WordOption socket={socket} />} />
        <Route path="game" element={<GameBoard socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}
