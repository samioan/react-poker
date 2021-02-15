const deck = (state) => state.game.deck;
const playerHand = (state) => state.game.playerHand;
const aiHand = (state) => state.game.aiHand;
const playerMoney = (state) => state.game.playerMoney;
const aiMoney = (state) => state.game.aiMoney;
const playerBet = (state) => state.game.playerBet;
const aiBet = (state) => state.game.aiBet;
const phase = (state) => state.game.phase;
const pot = (state) => state.game.playerBet + state.game.aiBet;
const changedPlayerHand = (state) => state.game.changedPlayerHand;

export {
  deck,
  playerHand,
  aiHand,
  playerMoney,
  aiMoney,
  playerBet,
  aiBet,
  phase,
  pot,
  changedPlayerHand,
};
