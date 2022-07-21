import React from "react";
import "./Card.css";

const Card = ({ rank, suit, suitSymbol, visible, onClick }) => (
  <div className="playingCards">
    {visible ? (
      <a className={`card rank-${rank.toLowerCase()} ${suit}`}>
        <div onClick={onClick}>
          <span className="rank">{rank}</span>
          <span className="suit">{suitSymbol}</span>
        </div>
      </a>
    ) : (
      <div className={`card back`} />
    )}
  </div>
);

export { Card };
export default Card;
