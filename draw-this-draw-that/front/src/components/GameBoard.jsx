import DrawBoard from "./DrawBoard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const StyledContainer = styled.div`
  text-align: center;
  background-color: lightblue;
  border: 20px solid lightblue;
  border-radius: 30px 30px 30px 30px;
  box-shadow: -2px 5px 33px 12px #cfcd8a;
  margin-top: 100px;
  margin-left: 100px;
  margin-right: 100px;
  height: 400px;
  font-family: cursive;
`;
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
  const [level, setLevel] = useState("");
  const [score, setScore] = useState(0);
  useEffect(() => {
    setEasy(words.easy[Math.floor(Math.random() * words.easy.length)]);
    setMedium(words.medium[Math.floor(Math.random() * words.medium.length)]);
    setHard(words.hard[Math.floor(Math.random() * words.hard.length)]);
  }, []);
  const { socket } = props;
  const [draw, setDraw] = useState("");
  useEffect(() => {
    if (draw) {
      socket.emit("submit-draw", { draw, word, level });
      navigator("/guess");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draw]);
  socket.on("update-score", ({ score }) => {
    setScore(score);
  });
  return (
    <StyledContainer>
      <div>
        {word ? (
          <>
            <h3>Drawing: {word}</h3>
            <h5>session score : {score}</h5>
            <div
              style={{
                width: "300px",
                height: "300px",
                marginLeft: "365px",
                backgroundColor: "lightyellow",
                border: "4px solid black",
              }}
            >
              <DrawBoard setDraw={setDraw} />
            </div>
          </>
        ) : (
          <div>
            <h3>choose a word 🔤</h3>
            <div>
              <label>easy :</label>
              <br />
              <button
                onClick={() => {
                  setWord(easy);
                  setLevel("easy");
                }}
              >
                {easy}
              </button>
            </div>

            <div>
              <label>medium :</label>
              <br />
              <button
                onClick={() => {
                  setWord(medium);
                  setLevel("medium");
                }}
              >
                {medium}
              </button>
            </div>

            <div>
              <label>hard :</label>
              <br />

              <button
                onClick={() => {
                  setWord(hard);
                  setLevel("hard");
                }}
              >
                {hard}
              </button>
            </div>
          </div>
        )}
      </div>
    </StyledContainer>
  );
}
