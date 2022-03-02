import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import styled from "styled-components";
import notyf from "../helpers/notyf";
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

const StyledInput = styled(FormControl)`
  margin-right: 200px;
`;

export default function Welcome(props) {
  const [name, setName] = useState("");
  const { socket } = props;
  const navigator = useNavigate();
  const submitName = () => {
    if (!name) return;
    socket.emit("submit-name", { name });
    socket.on("left-game", ({ name }) => {
      notyf.success(`your opponent has disconnected, the game is over!`);
    });
    socket.on("name-submitted", (data) =>
      data.load ? navigator("/loader") : navigator("/guess")
    );
  };
  return (
    <StyledContainer>
      <h1 style={{ fontSize: "xxx-large" }}>Draw this Draw that ✏️</h1>
      <InputGroup className="mb-3" size="lg">
        <InputGroup.Text style={{ marginLeft: "200px" }}>name</InputGroup.Text>
        <StyledInput
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          type="text"
          placeholder="enter your name"
        />
      </InputGroup>
      <p />
      <Button variant="outline-warning" onClick={submitName}>
        start playin!
      </Button>
    </StyledContainer>
  );
}
