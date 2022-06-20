const deck = ({ game }) => game.deck;
const playerHand = ({ game }) => game.playerHand;
const aiHand = ({ game }) => game.aiHand;
const playerMoney = ({ game }) => game.playerMoney;
const aiMoney = ({ game }) => game.aiMoney;
const playerBet = ({ game }) => game.playerBet;
const aiBet = ({ game }) => game.aiBet;
const phase = ({ game }) => game.phase;
const pot = ({ game }) => game.playerBet + game.aiBet;
const changedPlayerHand = ({ game }) => game.changedPlayerHand;

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
