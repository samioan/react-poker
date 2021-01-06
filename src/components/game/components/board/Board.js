import React from "react";
import { Card, Deck, Replace, Fold, Check, Raise } from "./components";
import handCheck from "lib/handCheck";
import deckCreator from "lib/deckCreator";

const Board = (props) => {
  const initialState = {
    deck: [],
    playerHand: [],
    aiHand: [],
    playerMoney: 1000,
    aiMoney: 1000,
    playerBet: 0,
    aiBet: 0,
    phase: 0,
  };

  const [state, setState] = React.useState(initialState);

  const renderBuildDeckButton = () => {
    const onClickHandler = () => {
      const newDeck = state.deck.slice();
      const newPlayerHand = state.playerHand.slice();
      const newAiHand = state.aiHand.slice();

      const newPlayerBet = state.playerBet;
      const newAiBet = state.aiBet;
      const bet = 100;

      const newPhase = state.phase;

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

        setState((prevState) => ({
          ...prevState,
          deck: newDeckFlat,
          playerHand: newerPlayerHand,
          aiHand: newerAiHand,
          playerBet: newPlayerBet + bet,
          aiBet: newAiBet + bet,
          phase: newPhase + 2,
        }));
      } else {
        setState((prevState) => ({ ...prevState, phase: newPhase + 1 }));
      }
    };

    return state.phase >= 4 ? null : <Deck onClick={onClickHandler} />;
  };

  const renderReplaceCardButton = (handIndex) => {
    const onClickHandler = () => {
      const newPlayerHand = state.playerHand.slice();
      const newDeck = state.deck.slice();
      const newPhase = state.phase;

      newPlayerHand.splice(handIndex, 1, newDeck[0]);
      newDeck.splice(0, 1);

      if (newDeck.length > 39) {
        setState((prevState) => ({
          ...prevState,
          deck: newDeck,
          playerHand: newPlayerHand,
          phase: newPhase + 0.5,
        }));
      }
    };

    if (state.phase <= 2 || state.phase >= 4) {
      return;
    }

    return <Replace onClick={onClickHandler} />;
  };

  const renderFoldButton = () => {
    const onClickHandler = () => {
      const newPlayerMoney = state.playerMoney;
      const newAiMoney = state.aiMoney;
      const newPlayerBet = state.playerBet;
      const newAiBet = state.aiBet;

      if (state.playerHand.length === 5) {
        setState(() => ({
          ...initialState,
          playerMoney: newPlayerMoney - newPlayerBet,
          aiMoney: newAiMoney + (newAiBet + newPlayerBet),
        }));

        alert("You lose!");
      }
    };

    if (state.phase !== 2 && state.phase < 4) {
      return;
    }

    return <Fold onClick={onClickHandler} />;
  };

  const renderCheckButton = () => {
    const onClickHandler = () => {
      const newPlayerMoney = state.playerMoney;
      const newAiMoney = state.aiMoney;
      const newPlayerBet = state.playerBet;
      const newAiBet = state.aiBet;

      if (state.playerHand.length === 5) {
        if (handCheck(state.playerHand) > handCheck(state.aiHand)) {
          setState(() => ({
            ...initialState,
            playerMoney: newPlayerMoney + (newPlayerBet + newAiBet),
            aiMoney: newAiMoney - newAiBet,
          }));

          alert("You win!");
        } else if (handCheck(state.playerHand) === handCheck(state.aiHand)) {
          setState(() => ({
            ...initialState,
            playerMoney: newPlayerMoney + newPlayerBet,
            aiMoney: newAiMoney + newAiBet,
          }));

          alert("Tie!");
        } else {
          setState(() => ({
            ...initialState,
            playerMoney: newPlayerMoney - newPlayerBet,
            aiMoney: newAiMoney + (newPlayerBet + newAiBet),
          }));

          alert("You lose!");
        }
      }
    };

    if (state.phase !== 2 && state.phase < 4) {
      return;
    }

    return <Check onClick={onClickHandler} />;
  };

  const renderRaiseButton = () => {
    const onClickHandler = () => {
      const newPlayerBet = state.playerBet;
      const newAiBet = state.aiBet;
      const bet = 100;

      setState((prevState) => ({
        ...prevState,
        playerBet: newPlayerBet + bet,
        aiBet: newAiBet + bet,
      }));
    };

    if (
      state.playerMoney === state.playerBet ||
      (state.phase !== 2 && state.phase < 4)
    ) {
      return;
    }

    return <Raise onClick={onClickHandler} />;
  };

  return (
    <div className="container">
      <div className="top-player">
        <div>{renderBuildDeckButton()}</div>
        <h2>Deck: {state.deck}</h2>
        <div className="board-row">
          {state.deck.map((card) => (
            <Card card={card} />
          ))}
        </div>
        <div className="board-row">
          {renderFoldButton()}
          {renderCheckButton()}
          {renderRaiseButton()}
        </div>
        <div className="board-row">
          {renderReplaceCardButton(0)}
          {renderReplaceCardButton(1)}
          {renderReplaceCardButton(2)}
          {renderReplaceCardButton(3)}
          {renderReplaceCardButton(4)}
        </div>
        <div className="board-row">
          <h2>Player's Hand: {state.playerHand}</h2>
          <h2>, Player's Money: {state.playerMoney}</h2>
          <h2>, Player's Bet: {state.playerBet}</h2>
        </div>
        <div className="board-row">
          {state.playerHand.map((card) => (
            <Card card={card} />
          ))}
        </div>
        <h2>Player's Strength: {handCheck(state.playerHand)}</h2>
      </div>
      <div className="bottom-player">
        <div className="board-row">
          <h2>Opponent's Hand: {state.aiHand}</h2>
          <h2>, Opponent's Money: {state.aiMoney}</h2>
          <h2>, Opponent's Bet: {state.aiBet}</h2>
        </div>
        <div className="board-row">
          {state.aiHand.map((card) => (
            <Card card={card} />
          ))}
        </div>
        <h2>Opponent's Strength: {handCheck(state.aiHand)}</h2>
      </div>
    </div>
  );
};

export default Board;
