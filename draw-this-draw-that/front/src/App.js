import GameBoard from "./components/GameBoard";
import Welcome from "./components/Welcome";
import Loader from "./components/Loader";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Guess from "./components/Guess";
const server = "http://localhost:8080/";
const socket = io.connect(server);
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome socket={socket} />} />
        <Route path="loader" element={<Loader socket={socket} />} />
        <Route path="guess" element={<Guess socket={socket} />} />
        <Route path="game" element={<GameBoard socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}
