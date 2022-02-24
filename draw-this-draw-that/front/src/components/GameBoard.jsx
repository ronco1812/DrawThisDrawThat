import DrawBoard from "./DrawBoard";
import Player from "./Player";
import WordInput from "./WordInput";
import WordOption from "./WordOption";
import "./GameBoard.css";
export default function GameBoard(props) {
  return (
    <div>
      <h2>Draw this Draw that</h2>
      <Player />
      <Player />
      <WordOption />
      <div className="GameBoard drawing-area">
        <DrawBoard />
      </div>
      <WordInput />
    </div>
  );
}
