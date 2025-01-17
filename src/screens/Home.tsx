import { useNavigate } from 'react-router';
import { useGameContext } from '../context/gameContext';
import logo from '../assets/bagel-blitz.png'

export function Home() {
    const { activeGame } = useGameContext();
    const gameInProgress = activeGame !== undefined;
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-start h-screen bg-steel-blue-200 text-white">
            <img
                src={logo}
                alt="Bagel Blitz logo"
                className="w-2/3 sm:w-9/10 max-w-md mt-16"
            />

            <div
                className={`flex ${gameInProgress ? "justify-between" : "justify-center"
                    } w-2/3 sm:w-9/10 max-w-md mt-[10vh] space-x-4`}
            >
                <button
                    onClick={() => navigate("/setup")}
                    className="bg-primary text-black font-bold py-4 px-6 rounded hover:bg-secondary transition flex-1"
                >
                    New Game
                </button>

                {/* Continue Button (if game is in progress) */}
                {gameInProgress && (
                    <button
                        onClick={() => navigate("/play")}
                        className="bg-secondary text-white font-bold py-4 px-6 rounded hover:bg-primary transition flex-1"
                    >
                        Resume Game
                    </button>
                )}
            </div>

            <div className="w-2/3 sm:w-9/10 max-w-md mt-8">
                <button
                    onClick={() => navigate("/rules")}
                    className="bg-gray-800 text-white font-bold py-4 px-6 rounded hover:bg-primary transition w-full"
                >
                    Rules of Bagel-topia
                </button>
            </div>
        </div>
    );
}

export default Home;