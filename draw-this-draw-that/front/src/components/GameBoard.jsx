import DrawBoard from "./DrawBoard";
import "./GameBoard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const words = {
  easy: ["ball", "Bible", "bikini", "book", "bucket", "camera", "church"],
  medium: ["mailbox", "recycle", "sandcastle", "stairs", "tire", "toothbrush"],
  hard: ["crayon", "fireworks", "high heel", "ice cream", "cone", "lamp"],
};
export default function GameBoard(props) {
  const navigator = useNavigate();
  const [easy, setEasy] = useState("");
  const [medium, setMedium] = useState("");
  const [hard, setHard] = useState("");
  const [word, setWord] = useState("");
  useEffect(() => {
    setEasy(words.easy[Math.floor(Math.random() * words.easy.length)]);
    setMedium(words.medium[Math.floor(Math.random() * words.medium.length)]);
    setHard(words.hard[Math.floor(Math.random() * words.hard.length)]);
  }, []);
  const { socket } = props;
  const [draw, setDraw] = useState("");
  useEffect(() => {
    if (draw) {
      socket.emit("submit-draw", { draw, word }); //backend!
      navigator("/guess");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draw]);
  return (
    <div>
      <h2>Draw this Draw that</h2>
      <br />
      {word ? (
        <div className="GameBoard drawing-area">
          <h3>drawing : {word}</h3>
          <DrawBoard setDraw={setDraw} />
        </div>
      ) : (
        <div>
          <div>
            <label>easy :</label>
            <br />
            <button onClick={() => setWord(easy)}>{easy}</button>
          </div>

          <div>
            <label>medium :</label>
            <br />
            <button onClick={() => setWord(medium)}>{medium}</button>
          </div>

          <div>
            <label>hard :</label>
            <br />

            <button onClick={() => setWord(hard)}>{hard}</button>
          </div>
        </div>
      )}
    </div>
  );
}
