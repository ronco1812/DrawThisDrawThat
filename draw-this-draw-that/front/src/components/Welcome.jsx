import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
export default function Welcome(props) {
  const [name, setName] = useState("");
  const { socket } = props;
  const navigator = useNavigate();
  const submitName = () => {
    if (!name) return;
    socket.emit("submit-name", { name }); // backend!
    navigator("/loader");
  };
  return (
    <div>
      <input
        value={name}
        onChange={({ target: { value } }) => setName(value)}
        type="text"
        placeholder="enter your name"
      />
      <button onClick={submitName}>start playin!</button>
    </div>
  );
}
