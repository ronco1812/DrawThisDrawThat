import { React } from "react";
import { Stage, Layer, Line } from "react-konva";
import { useState, useRef } from "react";

const DrawBoard = ({ setDraw }) => {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    // To draw line
    let lastLine = lines[lines.length - 1];

    if (lastLine) {
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);

      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const submit = () => {
    const canvas = document.getElementsByTagName("canvas")[0];
    setDraw(canvas.toDataURL());
    clearBoard();
  };
  const clearBoard = () => {
    setLines([]);
  };

  return (
    <>
      <div style={{ position: "absolute" }}>
        <Stage
          width={290}
          height={290}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={2}
                tension={0.5}
                lineCap="round"
              />
            ))}
          </Layer>
        </Stage>
        <div
          style={{
            position: "relative",
            left: "300px",
            bottom: "200px",
            display: "inline-grid",
          }}
        >
          <button onClick={submit}>send</button>
          <button onClick={clearBoard}>clear</button>
        </div>
      </div>
    </>
  );
};

export default DrawBoard;
