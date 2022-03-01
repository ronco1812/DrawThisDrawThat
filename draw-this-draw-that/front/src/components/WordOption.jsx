import { useEffect } from "react";
import { useState } from "react";
import words from "../helpers/words.json";
import { Outlet, Link } from "react-router-dom";

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
      <Link to="/game">
        <div>
          <label>easy :</label>
          <br />
          <button>{easy}</button>
        </div>

        <div>
          <label>medium :</label>
          <br />
          <button>{medium}</button>
        </div>

        <div>
          <label>hard :</label>
          <br />

          <button>{hard}</button>
        </div>
      </Link>
      <Outlet />
    </div>
  );
}
