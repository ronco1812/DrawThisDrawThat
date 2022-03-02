import "./style.css";
import { useNavigate } from "react-router-dom";
export default function Loader(props) {
  const navigator = useNavigate();
  const { socket } = props;
  socket.on("name-submitted", (data) => {
    data.players.length === 2 && navigator("/game");
  });
  return <span className="loader"></span>;
}
