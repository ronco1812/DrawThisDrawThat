import { useEffect } from "react";
import { useState } from "react";

const words = require("../helpers/words.json");
export default function WordOption(props) {
  const [easy, setEasy] = useState("");
  const [medium, setMedium] = useState("");
  const [hard, setHard] = useState("");
  useEffect(() => {
    setEasy(words.easy[Math.floor(Math.random() * words.easy.length)]);
    setMedium(words.medium[Math.floor(Math.random() * words.medium.length)]);
    setHard(words.hard[Math.floor(Math.random() * words.hard.length)]);
  }, []);

  return (
    <div>
      <h3>choose a word to Draw</h3>
      <button>{easy}</button>
      <button>{medium}</button>
      <button>{hard}</button>
    </div>
  );
}
