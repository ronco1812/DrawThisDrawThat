import DrawBoard from "./DrawBoard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import notyf from "../helpers/notyf";
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
  useEffect(() => {
    setEasy(words.easy[Math.floor(Math.random() * words.easy.length)]);
    setMedium(words.medium[Math.floor(Math.random() * words.medium.length)]);
    setHard(words.hard[Math.floor(Math.random() * words.hard.length)]);
  }, []);
  const { socket } = props;
  const [draw, setDraw] = useState("");
  useEffect(() => {
    if (draw) {
      socket.emit("submit-draw", { draw, word });
      socket.on("disconnected", ({ name }) => {
        notyf.success(`${name} has just left the chat`);
      });
      navigator("/guess");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draw]);
  return (
    <StyledContainer>
      <div>
        {/* <h2>Draw this Draw that ✏️</h2>
        <br /> */}
        {word ? (
          <>
            <h3>Drawing: {word}</h3>
            <div
              style={{
                width: "300px",
                height: "300px",
                marginLeft: "250px",
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
    </StyledContainer>
  );
}
