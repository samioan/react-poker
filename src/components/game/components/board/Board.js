import React from "react";
import { Card, Draw, Deck, Replace, Fold, Check, Raise } from "./components";
import handCheck from "lib/handCheck";
import deckCreator from "lib/deckCreator";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      deck: [],
      playerHand: [""],
      aiHand: [""],
      playerTurn: true,
      playerMoney: 1000,
      aiMoney: 1000,
      playerBet: 0,
      aiBet: 0,
    };
    this.state = this.initialState;
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
      newPlayerHand.push(newDeckFlat[0]);
      newDeckFlat.splice(0, 1);
      newPlayerHand.push(newDeckFlat[0]);
      newDeckFlat.splice(0, 1);

      newAiHand.push(newDeckFlat[0]);
      newAiHand.splice(0, 1);
      newDeckFlat.splice(0, 1);
      newAiHand.push(newDeckFlat[0]);
      newDeckFlat.splice(0, 1);
      newAiHand.push(newDeckFlat[0]);
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
      newDeck.splice(0, 1);

      newAiHand.push(newDeck[0]);
      newDeck.splice(0, 1);

      this.setState({
        playerHand: newPlayerHand,
        aiHand: newAiHand,
        deck: newDeck,
      });
    };

    if (
      (this.state.playerTurn && this.state.playerHand.length === 5) ||
      (!this.state.playerTurn && this.state.aiHand.length === 5) ||
      this.state.deck.length === 0
    ) {
      return;
    }

    return <Draw onClick={onClickHandler} />;
  }

  renderReplaceCardButton(handIndex) {
    const onClickHandler = () => {
      const newPlayerHand = this.state.playerHand.slice();
      const newerPlayerHand = this.state.playerHand.slice();
      const newDeck = this.state.deck.slice();

      if (newPlayerHand[handIndex] === newerPlayerHand[handIndex]) {
        newPlayerHand.splice(handIndex, 1, newDeck[0]);
        newDeck.splice(0, 1);
      }

      if (newDeck.length > 39) {
        this.setState({
          playerHand: newPlayerHand,
          deck: newDeck,
        });
      }
    };

    if (this.state.playerHand.length !== 5 || this.state.deck.length === 40) {
      return;
    }

    return <Replace onClick={onClickHandler} />;
  }

  renderFoldButton() {
    const onClickHandler = () => {
      let newPlayerMoney = this.state.playerMoney;
      let newAiMoney = this.state.aiMoney;
      const newPlayerBet = this.state.playerBet;
      const newAiBet = this.state.aiBet;

      if (this.state.playerHand.length === 5) {
        newPlayerMoney -= newPlayerBet;
        newAiMoney += newAiBet;

        this.setState({
          ...this.initialState,
          playerMoney: newPlayerMoney,
          aiMoney: newAiMoney,
        });
        alert("You lose!");
      }
    };

    if (this.state.playerHand.length !== 5) {
      return;
    }

    return <Fold onClick={onClickHandler} />;
  }

  renderCheckButton() {
    const onClickHandler = () => {
      let newPlayerMoney = this.state.playerMoney;
      let newAiMoney = this.state.aiMoney;
      const newPlayerBet = this.state.playerBet;
      const newAiBet = this.state.aiBet;

      if (this.state.playerHand.length === 5) {
        if (handCheck(this.state.playerHand) > handCheck(this.state.aiHand)) {
          newPlayerMoney += newPlayerBet;
          newAiMoney -= newAiBet;
          alert("You win!");
        } else if (
          handCheck(this.state.playerHand) === handCheck(this.state.aiHand)
        ) {
          alert("Tie!");
        } else {
          newPlayerMoney -= newPlayerBet;
          newAiMoney += newAiBet;
          alert("You lose!");
        }
      }
      this.setState({
        ...this.initialState,
        playerMoney: newPlayerMoney,
        aiMoney: newAiMoney,
      });
    };

    if (this.state.playerHand.length !== 5) {
      return;
    }

    return <Check onClick={onClickHandler} />;
  }

  renderRaiseButton() {
    const onClickHandler = () => {
      let newPlayerBet = this.state.playerBet;
      let newAiBet = this.state.aiBet;

      newPlayerBet += 100;
      newAiBet += 100;

      this.setState({
        playerBet: newPlayerBet,
        aiBet: newAiBet,
      });
    };

    if (
      this.state.playerMoney >= this.state.playerBet &&
      (this.state.playerBet === 300 || this.state.playerHand.length !== 5)
    ) {
      return;
    }

    return <Raise onClick={onClickHandler} />;
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
          <div className="board-row">
            {this.renderDrawCardButton()}
            {this.renderFoldButton()}
            {this.renderCheckButton()}
            {this.renderRaiseButton()}
          </div>
          <div className="board-row">
            {this.renderReplaceCardButton(0)}
            {this.renderReplaceCardButton(1)}
            {this.renderReplaceCardButton(2)}
            {this.renderReplaceCardButton(3)}
            {this.renderReplaceCardButton(4)}
          </div>
          <div className="board-row">
            <h2>Player's Hand: {this.state.playerHand}</h2>
            <h2>, Player's Money: {this.state.playerMoney}</h2>
            <h2>, Player's Bet: {this.state.playerBet}</h2>
          </div>
          <div className="board-row">
            {this.state.playerHand.map((card) => (
              <Card card={card} />
            ))}
          </div>
          <h2>Player's Strength: {handCheck(this.state.playerHand)}</h2>
        </div>
        <div className="bottom-player">
          <div className="board-row">
            <h2>Opponent's Hand: {this.state.aiHand}</h2>
            <h2>, Opponent's Money: {this.state.aiMoney}</h2>
            <h2>, Opponent's Bet: {this.state.aiBet}</h2>
          </div>
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
