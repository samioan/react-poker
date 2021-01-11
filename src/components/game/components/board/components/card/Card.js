import React from "react";

const Card = ({ rank, suit, id, selected }) => {
  const [checked, setChecked] = React.useState(false);

  const rankLower = typeof rank === "string" ? rank.toLowerCase() : undefined;
  const rankUpper = typeof rank === "string" ? rank.toUpperCase() : undefined;
  const idUpperChar =
    typeof id === "string" ? id.charAt(0).toUpperCase() : undefined;
  return (
    <div className="playingCards faceImages">
      <label
        for={"c-" + rankUpper + "" + idUpperChar}
        className={"card rank-" + rankLower + " " + id}
      >
        <span className="rank">{rank}</span>
        <span className="suit">{suit}</span>
        <input
          type="checkbox"
          name={"c-" + rankLower + "" + idUpperChar}
          id={"c-" + rankLower + "" + idUpperChar}
          value="select"
          onChange={() => setChecked(!checked)}
          selected={checked ? true : false}
        />
      </label>
    </div>
  );
};

export default Card;
