import { React } from "react";
import { Stage, Layer, Line } from "react-konva";
import { useEffect, useState, useRef } from "react";

const DrawBoard = ({ onClearLines, clearLines }) => {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  useEffect(() => {
    //loadImage();
  }, [clearLines]);

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
    const canvas = document.getElementsByTagName("canvas")[0]; // send to server canvas.toDataUrl
    // console.log(typeof draw[0].toDataURL());
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  const clearBoard = () => {
    setLines([]);
  };

  return (
    <div className=" text-center text-dark">
      <Stage
        width={300}
        height={300}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className="canvas-stage"
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
      <button onClick={submit}>sent</button>
      <button onClick={clearBoard}>clear</button>
    </div>
  );
};

export default DrawBoard;
