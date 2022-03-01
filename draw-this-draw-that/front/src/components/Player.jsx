export default function Player(props) {
  return (
    <div>
      <h4>name : {props.name}</h4>
      <h4>currently drawing : {props.currentPlayer}</h4>
      <h4>score : {props.score}</h4>
    </div>
  );
}
