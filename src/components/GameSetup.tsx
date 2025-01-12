import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import { useGameContext } from '../context/gameContext';

export function GameSetup() {
    const [step, setStep] = useState<"initial" | "playerCount" | "playerNames">("initial");
    const [numPlayers, setNumPlayers] = useState<number>(0);
    const [playerNames, setPlayerNames] = useState<string[]>([]);
    const { startGame } = useGameContext();
    const navigate = useNavigate();


    return (
    <div className="flex flex-col items-center justify-center h-screen bg-accent text-white px-6">
      {step === "initial" && (
        <InitialScreen
            setPlayers={() => setStep("playerCount")}
            getStarted={() => {
                startGame();
                navigate("/play");
            }}
        />
      )}

      {step === "playerCount" && (
        <SetNumPlayersScreen
          numPlayers={numPlayers}
          setNumPlayers={setNumPlayers}
          handleContinue={() => {
            const defaultNames = Array(numPlayers).map((_, index) => `Player ${index + 1}`);
            setPlayerNames(defaultNames);
            setStep("playerNames");
          }}
        />
      )}

      {step === "playerNames" && (
        <SetPlayerNamesScreen
          playerNames={playerNames}
          setPlayerNames={setPlayerNames}
          handleContinue={() => {
            startGame(playerNames);
            navigate("/play");
          }}
        />
      )}
    </div>
  );
}

const InitialScreen: React.FC<{
    setPlayers: () => void;
    getStarted: () => void;
}> = ({ setPlayers, getStarted }) => {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-8">Get ready to Blitz!</h1>
            <div className="flex flex-col gap-4">
                <button
                    onClick={setPlayers}
                    className="bg-primary text-black font-bold py-4 px-8 rounded hover:bg-secondary transition"
                >
                    Set your players
                </button>
                <button
                    onClick={getStarted}
                    className="bg-secondary text-white font-bold py-4 px-8 rounded hover:bg-primary transition"
                >
                    Just get going
                </button>
            </div>
        </div>
    )
}

const SetNumPlayersScreen: React.FC<{
    numPlayers: number;
    setNumPlayers: (num: number) => void;
    handleContinue: () => void;
}> = ({ numPlayers, setNumPlayers, handleContinue }) => {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-8">How many people are playing?</h1>
            <input
                type="number"
                value={numPlayers}
                onChange={(e) => setNumPlayers(Math.max(1, Math.min(20, parseInt(e.target.value, 10) || 1)))}
                className="block mx-auto text-center w-20 text-2xl py-2 px-4 border rounded bg-gray-100 text-black focus:outline-none focus:ring focus:ring-accent"
            />
            <button
                onClick={handleContinue}
                className="mt-8 bg-primary text-black font-bold py-4 px-8 rounded hover:bg-secondary transition"
            >
                Continue
            </button>
        </div>
    )
}

const SetPlayerNamesScreen: React.FC<{
    playerNames: string[];
    setPlayerNames: (names: string[]) => void;
    handleContinue: () => void;
}> = ({ playerNames, setPlayerNames, handleContinue}) => {
    return  (
        <div className="text-center">
    <h1 className="text-4xl font-bold mb-8">Name your players</h1>
    <div className="flex flex-col gap-4 mb-8">
      {playerNames.map((name, index) => (
        <div key={index} className="flex items-center gap-4">
          <span className="text-2xl">{index + 1}.</span>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              const updatedNames = [...playerNames];
              updatedNames[index] = e.target.value;
              setPlayerNames(updatedNames);
            }}
            className="flex-grow py-2 px-4 border rounded bg-gray-100 text-black focus:outline-none focus:ring focus:ring-accent"
          />
        </div>
      ))}
    </div>
    <button
      onClick={handleContinue}
      className="bg-primary text-black font-bold py-4 px-8 rounded hover:bg-secondary transition"
    >
      Let&apos;s get Blitzing!
    </button>
  </div>
    )
}

export default GameSetup;