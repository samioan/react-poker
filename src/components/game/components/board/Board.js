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

      const newPlayerBet = this.state.playerBet;
      const newAiBet = this.state.aiBet;
      const bet = 100;

      const newPhase = this.state.phase;

      newDeck.push(deckCreator());
      const newDeckFlat = newDeck.flat();

      const newerPlayerHand = newPlayerHand.concat(newDeckFlat);
      const newerAiHand = newAiHand.concat(newDeckFlat);

      if (newPhase === 0) {
        newerPlayerHand.splice(0, 1);
        newerPlayerHand.splice(5);
        newerAiHand.splice(0, 6);
        newerAiHand.splice(5);
        newDeckFlat.splice(0, 10);

        this.setState({
          deck: newDeckFlat,
          playerHand: newerPlayerHand,
          aiHand: newerAiHand,
          playerBet: newPlayerBet + bet,
          aiBet: newAiBet + bet,
          phase: newPhase + 2,
        });
      } else {
        this.setState({
          phase: newPhase + 1,
        });
      }
    };

    return this.state.phase >= 4 ? null : <Deck onClick={onClickHandler} />;
  }

  renderReplaceCardButton(handIndex) {
    const onClickHandler = () => {
      const newPlayerHand = this.state.playerHand.slice();
      const newDeck = this.state.deck.slice();
      const newPhase = this.state.phase;

      newPlayerHand.splice(handIndex, 1, newDeck[0]);
      newDeck.splice(0, 1);

      if (newDeck.length > 39) {
        this.setState({
          playerHand: newPlayerHand,
          deck: newDeck,
          phase: newPhase + 0.5,
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
      const newPlayerMoney = this.state.playerMoney;
      const newAiMoney = this.state.aiMoney;
      const newPlayerBet = this.state.playerBet;
      const newAiBet = this.state.aiBet;

      if (this.state.playerHand.length === 5) {
        this.setState({
          ...this.initialState,
          playerMoney: newPlayerMoney - newPlayerBet,
          aiMoney: newAiMoney + (newAiBet + newPlayerBet),
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
      const newPlayerMoney = this.state.playerMoney;
      const newAiMoney = this.state.aiMoney;
      const newPlayerBet = this.state.playerBet;
      const newAiBet = this.state.aiBet;

      if (this.state.playerHand.length === 5) {
        if (handCheck(this.state.playerHand) > handCheck(this.state.aiHand)) {
          this.setState({
            ...this.initialState,
            playerMoney: newPlayerMoney + (newPlayerBet + newAiBet),
            aiMoney: newAiMoney - newAiBet,
          });
          alert("You win!");
        } else if (
          handCheck(this.state.playerHand) === handCheck(this.state.aiHand)
        ) {
          this.setState({
            ...this.initialState,
            playerMoney: newPlayerMoney + newPlayerBet,
            aiMoney: newAiMoney + newAiBet,
          });
          alert("Tie!");
        } else {
          this.setState({
            ...this.initialState,
            playerMoney: newPlayerMoney - newPlayerBet,
            aiMoney: newAiMoney + (newPlayerBet + newAiBet),
          });
          alert("You lose!");
        }
      }
    };

    if (this.state.phase !== 2 && this.state.phase < 4) {
      return;
    }

    return <Check onClick={onClickHandler} />;
  }

  renderRaiseButton() {
    const onClickHandler = () => {
      const newPlayerBet = this.state.playerBet;
      const newAiBet = this.state.aiBet;
      const bet = 100;

      this.setState({
        playerBet: newPlayerBet + bet,
        aiBet: newAiBet + bet,
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
