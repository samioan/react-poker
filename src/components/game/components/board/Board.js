import React from "react";
import { Card, Deck, Replace, Fold, Check, Raise } from "./components";
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
      phase: 0,
    };
    this.state = this.initialState;
  }

  renderBuildDeckButton() {
    const onClickHandler = () => {
      const newDeck = this.state.deck.slice();
      const newPlayerHand = this.state.playerHand.slice();
      const newAiHand = this.state.aiHand.slice();
      let newPlayerBet = this.state.playerBet;
      let newAiBet = this.state.aiBet;
      let newPhase = this.state.phase;

      newDeck.push(deckCreator());
      const newDeckFlat = newDeck.flat();

      if (newPhase === 0) {
        newPlayerHand.push(newDeckFlat[0]);
        newPlayerHand.splice(0, 1);
        newDeckFlat.splice(0, 1);
        newPlayerHand.push(newDeckFlat[0]);
        newDeckFlat.splice(0, 1);
        newPlayerHand.push(newDeckFlat[0]);
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
        newAiHand.push(newDeckFlat[0]);
        newDeckFlat.splice(0, 1);
        newAiHand.push(newDeckFlat[0]);
        newDeckFlat.splice(0, 1);

        newPlayerBet += 100;
        newAiBet += 100;
        newPhase += 2;
      } else if (newPhase === 2) {
        newPhase += 1;
      } else if (newPhase >= 3) {
        newPhase += 1;
      }

      this.setState({
        deck: newDeckFlat,
        playerHand: newPlayerHand,
        aiHand: newAiHand,
        playerBet: newPlayerBet,
        aiBet: newAiBet,
        phase: newPhase,
      });
    };

    if (
      this.state.phase !== 0 &&
      this.state.phase !== 2 &&
      (this.state.phase < 3 || this.state.phase >= 4)
    ) {
      return;
    }

    return <Deck onClick={onClickHandler} />;
  }

  renderReplaceCardButton(handIndex) {
    const onClickHandler = () => {
      const newPlayerHand = this.state.playerHand.slice();
      const newDeck = this.state.deck.slice();
      let newPhase = this.state.phase;

      newPlayerHand.splice(handIndex, 1, newDeck[0]);
      newDeck.splice(0, 1);
      newPhase += 0.5;

      if (newDeck.length > 39) {
        this.setState({
          playerHand: newPlayerHand,
          deck: newDeck,
          phase: newPhase,
        });
      }
    };

    if (this.state.phase <= 2 || this.state.phase >= 4) {
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
        newAiMoney += newAiBet + newPlayerBet;

        this.setState({
          ...this.initialState,
          playerMoney: newPlayerMoney,
          aiMoney: newAiMoney,
        });
        alert("You lose!");
      }
    };

    if (this.state.phase !== 2 && this.state.phase < 4) {
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
          newPlayerMoney += newPlayerBet + newAiBet;
          newAiMoney -= newAiBet;
          alert("You win!");
        } else if (
          handCheck(this.state.playerHand) === handCheck(this.state.aiHand)
        ) {
          newPlayerMoney += newPlayerBet;
          newAiMoney += newAiBet;
          alert("Tie!");
        } else {
          newPlayerMoney -= newPlayerBet;
          newAiMoney += newAiBet + newPlayerBet;
          alert("You lose!");
        }
      }
      this.setState({
        ...this.initialState,
        playerMoney: newPlayerMoney,
        aiMoney: newAiMoney,
      });
    };

    if (this.state.phase !== 2 && this.state.phase < 4) {
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
      this.state.playerMoney === this.state.playerBet ||
      (this.state.phase !== 2 && this.state.phase < 4)
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
