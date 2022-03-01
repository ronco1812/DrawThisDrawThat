import DrawBoard from "./DrawBoard";
import "./GameBoard.css";
import { useState } from "react";
export default function GameBoard(props) {
  //
  return (
    <div>
      <h2>Draw this Draw that</h2>
      <br />
      <div className="GameBoard drawing-area">
        <DrawBoard />
      </div>
    </div>
  );
}
