import React from "react";
import { Card, Deck } from "./components";
import handCheck from "lib/handCheck";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHand: ["H02", "D12", "H11"],
      playerTurn: true,
      aiHand: ["H13", "H12", "H11"],
    };
  }

  // TODO: PUSH A CARD TO PLAYER OR AI conditionally and not more than five card is allowed
  renderDrawCardButton() {
    const onClickHandler = () => {
      const newPlayerHand = this.state.playerHand.slice();
      const newAiHand = this.state.aiHand.slice();
      newPlayerHand.push("H10");
      newAiHand.push("H11");

      if (
        (this.state.playerTurn && this.state.playerHand.length === 5) ||
        (!this.state.playerTurn && this.state.aiHand.length === 5)
      ) {
        return;
      }
      this.state.playerTurn
        ? this.setState({
            playerHand: newPlayerHand,
            playerTurn: !this.state.playerTurn,
          })
        : this.setState({
            aiHand: newAiHand,
            playerTurn: !this.state.playerTurn,
          });
    };

    return <Deck onClick={onClickHandler} />;
  }

  render() {
    return (
      <div className="container">
        <div className="top-player">
          <h2>Player's Hand: {this.state.playerHand}</h2>
          <div>{this.renderDrawCardButton()}</div>
          <div className="board-row">
            {this.state.playerHand.map((card) => (
              <Card card={card} />
            ))}
          </div>
          <h2>Player's Strength: {handCheck(this.state.playerHand)}</h2>
        </div>
        <div className="bottom-player">
          <h2>Opponent's Hand: {this.state.aiHand}</h2>
          <div className="board-row">
            {this.state.aiHand.map((card) => (
              <Card card={card} />
            ))}
          </div>
          <h2>Opponent's Strength: {handCheck(this.state.aiHand)}</h2>
        </div>
      </div>
    );
  }
}

export default Board;

//

// 1. Create GitHub repo and upload the code
// 2. Make class components to functional components
//    - Change states usings hooks
//    - Change lifecycle methods using hooks
// 3. Do the the hook exersise
// 4. Create a deck.js lib that will create a deck of 52 cards shuffled, so it can be used to deal cards to players
// 5. Deal cards to players on the initial state using the deck library

// 6. Do CSS Lessons..
// 7. Create LastPass account on ioannis.siampalias@gmail.com
