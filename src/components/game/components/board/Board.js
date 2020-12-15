import React from "react";
import { Card, Draw, Deck } from "./components";
import handCheck from "lib/handCheck";
import deckCreator from "lib/deckCreator";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: [],
      playerHand: [""],
      aiHand: [""],
      playerTurn: true,
    };
  }

  renderBuildDeckButton() {
    const onClickHandler = () => {
      const newDeck = this.state.deck.slice();
      const newPlayerHand = this.state.playerHand.slice();
      const newAiHand = this.state.aiHand.slice();

      newDeck.push(deckCreator());
      const newDeckFlat = newDeck.flat();

      newPlayerHand.push(newDeckFlat[0]);
      newPlayerHand.splice(0, 1);
      newDeckFlat.splice(0, 1);
      newAiHand.push(newDeckFlat[0]);
      newAiHand.splice(0, 1);
      newDeckFlat.splice(0, 1);

      this.setState({
        deck: newDeckFlat,
        playerHand: newPlayerHand,
        aiHand: newAiHand,
      });
    };

    if (this.state.deck.length > 0) {
      return;
    }

    return <Deck onClick={onClickHandler} />;
  }

  renderDrawCardButton() {
    const onClickHandler = () => {
      const newPlayerHand = this.state.playerHand.slice();
      const newAiHand = this.state.aiHand.slice();
      const newDeck = this.state.deck.slice();

      newPlayerHand.push(newDeck[0]);
      newAiHand.push(newDeck[0]);
      newDeck.splice(0, 1);

      if (
        (this.state.playerTurn && this.state.playerHand.length === 5) ||
        (!this.state.playerTurn && this.state.aiHand.length === 5) ||
        this.state.deck.length === 0
      ) {
        return;
      }
      this.state.playerTurn
        ? this.setState({
            playerHand: newPlayerHand,
            deck: newDeck,
            playerTurn: !this.state.playerTurn,
          })
        : this.setState({
            aiHand: newAiHand,
            deck: newDeck,
            playerTurn: !this.state.playerTurn,
          });
    };

    return <Draw onClick={onClickHandler} />;
  }

  render() {
    return (
      <div className="container">
        <div className="top-player">
          <div>{this.renderBuildDeckButton()}</div>
          <h2>Deck: {this.state.deck}</h2>
          <div className="board-row">
            {this.state.deck.map((card) => (
              <Card card={card} />
            ))}
          </div>
          <div>{this.renderDrawCardButton()}</div>
          <h2>Player's Hand: {this.state.playerHand}</h2>
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

// ---------------------------------------------1. Create GitHub repo and upload the code
// 2. Make class components to functional components
//    - Change states usings hooks
//    - Change lifecycle methods using hooks
// 3. Do the the hook exersise
// ---------------------------------------------4. Create a deck.js lib that will create a deck of 52 cards shuffled, so it can be used to deal cards to players
// ---------------------------------------------5. Deal cards to players on the initial state using the deck library

// 6. Do CSS Lessons..
// ---------------------------------------------7. Create LastPass account on ioannis.siampalias@gmail.com
