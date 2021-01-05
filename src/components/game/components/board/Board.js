import React, { useState } from "react";
import { Card, Deck, Replace, Fold, Check, Raise } from "./components";
import handCheck from "lib/handCheck";
import deckCreator from "lib/deckCreator";

const Board = (props) => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([""]);
  const [aiHand, setAiHand] = useState([""]);
  const [playerMoney, setPlayerMoney] = useState(1000);
  const [aiMoney, setAiMoney] = useState(1000);
  const [playerBet, setPlayerBet] = useState(0);
  const [aiBet, setAiBet] = useState(0);
  const [phase, setPhase] = useState(0);

  const renderBuildDeckButton = () => {
    const onClickHandler = () => {
      const newDeck = deck.slice();
      const newPlayerHand = playerHand.slice();
      const newAiHand = aiHand.slice();

      const newPlayerBet = playerBet;
      const newAiBet = aiBet;
      const bet = 100;

      const newPhase = phase;

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

        setDeck(newDeckFlat);
        setPlayerHand(newerPlayerHand);
        setAiHand(newerAiHand);
        setPlayerBet(newPlayerBet + bet);
        setAiBet(newAiBet + bet);
        setPhase(newPhase + 2);
      } else {
        setPhase(newPhase + 1);
      }
    };

    return phase >= 4 ? null : <Deck onClick={onClickHandler} />;
  };

  const renderReplaceCardButton = (handIndex) => {
    const onClickHandler = () => {
      const newPlayerHand = playerHand.slice();
      const newDeck = deck.slice();
      const newPhase = phase;

      newPlayerHand.splice(handIndex, 1, newDeck[0]);
      newDeck.splice(0, 1);

      if (newDeck.length > 39) {
        setPlayerHand(newPlayerHand);
        setDeck(newDeck);
        setPhase(newPhase + 0.5);
      }
    };

    if (phase <= 2 || phase >= 4) {
      return;
    }

    return <Replace onClick={onClickHandler} />;
  };

  const renderFoldButton = () => {
    const onClickHandler = () => {
      const newPlayerMoney = playerMoney;
      const newAiMoney = aiMoney;
      const newPlayerBet = playerBet;
      const newAiBet = aiBet;

      if (playerHand.length === 5) {
        setDeck([]);
        setPlayerHand([""]);
        setAiHand([""]);
        setPlayerBet(0);
        setAiBet(0);
        setPhase(0);

        setPlayerMoney(newPlayerMoney - newPlayerBet);
        setAiMoney(newAiMoney + (newAiBet + newPlayerBet));

        alert("You lose!");
      }
    };

    if (phase !== 2 && phase < 4) {
      return;
    }

    return <Fold onClick={onClickHandler} />;
  };

  const renderCheckButton = () => {
    const onClickHandler = () => {
      const newPlayerMoney = playerMoney;
      const newAiMoney = aiMoney;
      const newPlayerBet = playerBet;
      const newAiBet = aiBet;

      if (playerHand.length === 5) {
        if (handCheck(playerHand) > handCheck(aiHand)) {
          setDeck([]);
          setPlayerHand([""]);
          setAiHand([""]);
          setPlayerBet(0);
          setAiBet(0);
          setPhase(0);

          setPlayerMoney(newPlayerMoney + (newPlayerBet + newAiBet));
          setAiMoney(newAiMoney - newAiBet);

          alert("You win!");
        } else if (handCheck(playerHand) === handCheck(aiHand)) {
          setDeck([]);
          setPlayerHand([""]);
          setAiHand([""]);
          setPlayerBet(0);
          setAiBet(0);
          setPhase(0);

          setPlayerMoney(newPlayerMoney + newPlayerBet);
          setAiMoney(newAiMoney + newAiBet);

          alert("Tie!");
        } else {
          setDeck([]);
          setPlayerHand([""]);
          setAiHand([""]);
          setPlayerBet(0);
          setAiBet(0);
          setPhase(0);

          setPlayerMoney(newPlayerMoney - newPlayerBet);
          setAiMoney(newAiMoney + (newPlayerBet + newAiBet));

          alert("You lose!");
        }
      }
    };

    if (phase !== 2 && phase < 4) {
      return;
    }

    return <Check onClick={onClickHandler} />;
  };

  const renderRaiseButton = () => {
    const onClickHandler = () => {
      const newPlayerBet = playerBet;
      const newAiBet = aiBet;
      const bet = 100;

      setPlayerBet(newPlayerBet + bet);
      setAiBet(newAiBet + bet);
    };

    if (playerMoney === playerBet || (phase !== 2 && phase < 4)) {
      return;
    }

    return <Raise onClick={onClickHandler} />;
  };

  return (
    <div className="container">
      <div className="top-player">
        <div>{renderBuildDeckButton()}</div>
        <h2>Deck: {deck}</h2>
        <div className="board-row">
          {deck.map((card) => (
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
          <h2>Player's Hand: {playerHand}</h2>
          <h2>, Player's Money: {playerMoney}</h2>
          <h2>, Player's Bet: {playerBet}</h2>
        </div>
        <div className="board-row">
          {playerHand.map((card) => (
            <Card card={card} />
          ))}
        </div>
        <h2>Player's Strength: {handCheck(playerHand)}</h2>
      </div>
      <div className="bottom-player">
        <div className="board-row">
          <h2>Opponent's Hand: {aiHand}</h2>
          <h2>, Opponent's Money: {aiMoney}</h2>
          <h2>, Opponent's Bet: {aiBet}</h2>
        </div>
        <div className="board-row">
          {aiHand.map((card) => (
            <Card card={card} />
          ))}
        </div>
        <h2>Opponent's Strength: {handCheck(aiHand)}</h2>
      </div>
    </div>
  );
};

export default Board;
