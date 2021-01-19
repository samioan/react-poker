import { React } from "react";

const Card = ({ rank, suit, suitSymbol, visible, selected, onClick }) =>
  visible ? (
    <div className="playingCards">
      <a
        style={
          selected
            ? { border: "5px solid black" }
            : { border: "5px solid white" }
        }
        className={"card rank-" + rank.toLowerCase() + " " + suit}
        onClick={onClick}
        href="#"
      >
        <span className="rank">{rank}</span>
        <span className="suit">{suitSymbol}</span>
      </a>
    </div>
  ) : (
    <div className="playingCards">
      <div className="card back"></div>
    </div>
  );

export default Card;
