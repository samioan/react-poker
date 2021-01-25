import { React } from "react";
import "./card.css";

const Card = ({ rank, suit, suitSymbol, visible, onClick }) =>
  visible ? (
    <div className="playingCards">
      <a
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
