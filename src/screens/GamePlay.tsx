import { useGameContext } from '../context/gameContext';
import PromptDisplay from './PromptDisplay';

export function GamePlay() {
  const gameScreenStyles = 'flex flex-col h-screen p-4 bg-accent text-white';
  const gameHeaderStyles = 'flex justify-between text-sm mb-4';
  const continueStyles = '"mt-4 mx-auto bg-primary text-black text-lg font-bold py-2 px-4 rounded hover:bg-secondary transition';

  const { continueGame, activeGame } = useGameContext();

  if (!activeGame) {
    throw new Error('No active game found!');
  }
  const { currentPrompt } = activeGame;
  const { category, prompt } = currentPrompt;
  return (
    <div className={gameScreenStyles}>
      <div className={gameHeaderStyles}>
        {activeGame.players && activeGame.currentPlayer && (
          <span className="player-name">{activeGame.currentPlayer}</span>
        )}
        <span className="category">{category}</span>
      </div>
      <PromptDisplay prompt={prompt} />
      <button className={continueStyles} onClick={continueGame}>
        Continue
      </button>
    </div>
  );
}

export default GamePlay;