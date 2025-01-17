import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts'
import { PromptData, GameState, GamePlayContext } from '../types';
import { fetchPrompts } from '../utils/fetchPrompts';
import { getNextPrompt, nextElt, randomElt } from '../utils/nextPrompt';

const INITIAL_GAMEPLAY_DATA: GamePlayContext = {
    promptData: {
        categories: [],
        prompts: {}
    },
    continueGame: () => { },
    startGame: () => { },
    endGame: () => { }
}

const GameDataContext = createContext<GamePlayContext>(INITIAL_GAMEPLAY_DATA);

export const GameDataProvider = ({ children }: React.PropsWithChildren) => {
    const [gameState, setGameState] = useLocalStorage<GameState | undefined>('gameData', undefined);
    const [promptData, setPromptData] = useLocalStorage<PromptData>('promptData', { categories: [], prompts: {} });

    useEffect(function fetchPromptData() {
        fetchPrompts().then((data: PromptData) => {
            setPromptData(data)
        }).catch((error) => {
            console.error('Error fetching prompt data:', error);
        });
    }, []);

    function startGame(players?: string[]): void {
        if (promptData.categories.length === 0) throw new Error("Can't start a game until the prompts have been loaded!");
        const { categories, prompts } = promptData;
        const newGameState: GameState = {
            previousPrompts: [],
            currentPrompt: randomElt(prompts[categories[0]]),
            currentRound: 1
        };
        if (players) {
            newGameState.players = players;
            newGameState.currentPlayer = players[0];
        }
        setGameState(newGameState);
    }

    function endGame(): void {
        setGameState(undefined);
    }

    function continueGame() {
        if (!gameState) throw new Error("Can't continue without an active game!");
        const newGameState = Object.assign({}, gameState);
        newGameState.previousPrompts.push(newGameState.currentPrompt);
        newGameState.currentPrompt = getNextPrompt({ promptData, activeGame: newGameState });
        let roundLength = 7; // Default round length to num categories, use num players if available
        if (newGameState.currentPlayer && newGameState.players) {
            const nextPlayer = nextElt(newGameState.players, newGameState.currentPlayer || '');
            newGameState.currentPlayer = nextPlayer;
            roundLength = newGameState.players.length;
        }
        newGameState.currentRound = Math.ceil((newGameState.previousPrompts.length + 1) / roundLength);
        setGameState(newGameState);
    }

    const GameData: GamePlayContext = { promptData, startGame, endGame, continueGame };
    if (gameState) GameData.activeGame = gameState;
    return (
        <GameDataContext.Provider value={GameData}>
            {children}
        </GameDataContext.Provider>
    )
};

export const useGameContext = () => {
    return useContext(GameDataContext);
}