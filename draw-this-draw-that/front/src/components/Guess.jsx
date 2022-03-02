import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notyf from "../helpers/notyf";
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
export default function Guess(props) {
  const navigator = useNavigate();
  const { socket } = props;
  const [wait, setWait] = useState(true);
  const [image, setImage] = useState("");
  const [word, setWord] = useState("");
  const [level, setLevel] = useState("");
  const [score, setScore] = useState(0);

  const checkWord = ({ target: { value } }) => {
    if (value === word) {
      if (level === "easy") {
        setScore(score + 1);
      } else if (level === "medium") {
        setScore(score + 3);
      } else if (level === "hard") {
        setScore(score + 5);
      }

      notyf.success("guessed the word");
      navigator("/game");
    }
  };
  socket.on("guess-now", (data) => {
    setWait(false);
    setImage(data.draw);
    setWord(data.word);
    setLevel(data.level);
  });
  socket.on("left-game", ({ name }) => {
    notyf.success(`your opponent has disconnected, the game is over!r!`);
  });
  return (
    <>
      <StyledContainer>
        {wait ? (
          "other player currently drawing . . ."
        ) : (
          <div>
            <h3>Guess ✏️</h3>
            <h5>your score : {score}</h5>
            <img
              src={image}
              width="270px"
              height="270px"
              alt="draw"
              style={{ backgroundColor: "lightyellow" }}
            />
            <br />
            <input onChange={checkWord} placeholder="maybe... computer?" />
          </div>
        )}
      </StyledContainer>
    </>
  );
}
