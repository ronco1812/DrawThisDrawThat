import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notyf from "../helpers/notyf";
import styled from "styled-components";
import "./Loader/style.css";
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

  const checkWord = ({ target: { value } }) => {
    if (value.toLowerCase() === word.toLowerCase()) {
      socket.emit("change-score", { level });
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
  return (
    <>
      <StyledContainer>
        {wait ? (
          <>
            <h3>other player currently drawing . . .😴</h3>
            <span className="loader" style={{ marginTop: "20vh" }}></span>
          </>
        ) : (
          <div>
            <h3>Guess ✏️</h3>

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
