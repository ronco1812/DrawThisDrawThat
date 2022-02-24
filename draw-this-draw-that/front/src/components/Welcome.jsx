import { Outlet, Link } from "react-router-dom";

export default function Welcome(props) {
  return (
    <div>
      <input type={"text"} placeholder={"enter your name"}></input>
      <Link to="/game">
        <button>start playin!</button>
      </Link>
      <Outlet />
    </div>
  );
}
