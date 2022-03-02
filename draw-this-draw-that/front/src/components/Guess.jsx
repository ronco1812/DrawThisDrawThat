import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Guess(props) {
  const navigator = useNavigate();
  const { socket } = props;
  const [wait, setWait] = useState(true);
  const [image, setImage] = useState("");
  const [word, setWord] = useState("");
  const checkWord = ({ target: { value } }) => {
    if (value === word) {
      //notyf
      navigator("/game");
    }
  };
  socket.on("guess-now", (data) => {
    setWait(false);
    setImage(data.draw);
    setWord(data.word);
  });
  return (
    <>
      {wait ? (
        "other player turn"
      ) : (
        <div>
          <img src={image} alt="draw" />
          <input onChange={checkWord} />
        </div>
      )}
    </>
  );
}
