//handleAiSymbols(handIndex) {
//    switch (this.state.aiSuits[handIndex]) {
//      case "H":
//        return <span class="suit">&hearts;</span>;
//      case "C":
//        return <span class="suit">&clubs;</span>;
//      case "D":
//        return <span class="suit">&diams;</span>;
//      case "S":
//        return <span class="suit">&spades;</span>;
//      default:
//        return null;
//    }
//  }
//
//  handleAIClick(handIndex) {
//    const { aiHand, aiNumbers, aiSuits, playerTurn, playerIndex } = this.state;
//
//    const cardNumbers = [
//      "02",
//      "03",
//      "04",
//      "05",
//      "06",
//      "07",
//      "08",
//      "09",
//      "10",
//      "11",
//      "12",
//      "13",
//      "14",
//    ];
//    const cardSuits = ["H", "C", "D", "S"];
//
//    const newAiHand = aiHand.slice();
//    const newAiNumbers = aiNumbers.slice();
//    const newAiSuits = aiSuits.slice();
//    const newPlayerIndex = playerIndex.slice();
//
//    newAiNumbers[handIndex] = playerTurn
//      ? null
//      : cardNumbers[Math.floor(Math.random() * cardNumbers.length)];
//    newAiSuits[handIndex] = playerTurn
//      ? null
//      : cardSuits[Math.floor(Math.random() * cardSuits.length)];
//    newAiHand[handIndex] = playerTurn
//      ? null
//      : newAiSuits[handIndex] + newAiNumbers[handIndex];
//    newPlayerIndex[0] = playerTurn
//      ? newPlayerIndex[0] - 1
//      : newPlayerIndex[0] - 2;
//
//    this.setState({
//      aiHand: newAiHand,
//      aiNumbers: newAiNumbers,
//      aiSuits: newAiSuits,
//      playerTurn: true,
//    });
//  }
//
//  handlePlayerClick(handIndex) {
//    const { playerHand, playerTurn, playerIndex, playerStrength } = this.state;
//    const newPlayerHand = playerHand.slice();
//    const newPlayerIndex = playerIndex.slice();
//    const newPlayerStrength = playerStrength.slice();
//
//    newPlayerIndex[0] = playerTurn ? newPlayerIndex[0] + 1 : newPlayerIndex[0];
//    newPlayerStrength[0] = handCheck(playerHand);
//
//    this.setState({
//      playerHand: newPlayerHand,
//      playerIndex: newPlayerIndex,
//      playerTurn: false,
//      playerStrength: newPlayerStrength,
//    });
//  }
