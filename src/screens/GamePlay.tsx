import { useGameContext } from '../context/gameContext';
// import { Badge } from '../components/ui/badge';
import PromptDisplay from '../components/PromptDisplay';

export function GamePlay() {
  const gameScreenStyles = 'flex items-center flex-col h-screen pt-24 p-4 bg-steel-blue-200 text-white';
  // const gameHeaderStyles = 'flex justify-between text-sm p-1 mb-4 bg-slate-100 border-accent border-2 rounded';
  const continueStyles = 'w-full lg:w-3/5 mt-4 mx-auto bg-primary text-black text-lg font-bold py-2 px-4 rounded hover:bg-secondary transition';

  const { continueGame, activeGame } = useGameContext();

  if (!activeGame) {
    throw new Error('No active game found!');
  }
  const { currentPrompt } = activeGame;
  const { prompt, category } = currentPrompt;
  return (
    <div className={gameScreenStyles}>
      {/* <div className={gameHeaderStyles}>
        {activeGame.players && activeGame.currentPlayer && (
          <span className="player-name">{activeGame.currentPlayer}</span>
        )}
        <Badge color='pink' className='text-2xl'>
          <span className='text-2xl'>{category}</span>
        </Badge>
      </div> */}
      <PromptDisplay {...{ prompt, category }} />
      <button className={continueStyles} onClick={continueGame}>
        Continue
      </button>
    </div>
  );
}

export default GamePlay;