export default function Player(props) {
  return (
    <div>
      <h4>{props.name}</h4>
      <h4>{props.currentPlayer}</h4>
      <h4>{props.score}</h4>
    </div>
  );
}
