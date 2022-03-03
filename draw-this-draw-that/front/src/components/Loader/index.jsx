import "./style.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
export default function Loader(props) {
  const navigator = useNavigate();
  const { socket } = props;
  socket.on("name-submitted", (data) => {
    data.players.length === 2 && navigator("/game");
  });

  const StyledContainer = styled.div`
    text-align: center;
    background-color: lightblue;
    border: 20px solid lightblue;
    border-radius: 30px 30px 30px 30px;
    box-shadow: -2px 5px 33px 12px #cfcd8a;
    margin-top: 100px;
    margin-left: 100px;
    margin-right: 100px;
    height: 400px;
    font-family: cursive;
  `;
  return (
    <StyledContainer>
      <div>
        <h3>Draw this Draw that ✏️</h3>
        <h5>Waiting for other player to join ...</h5>
        <span className="loader" style={{ marginTop: "20vh" }}></span>
      </div>
    </StyledContainer>
  );
}
