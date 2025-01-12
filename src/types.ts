export interface SerializedPrompt { 
    "Prompt": string;
    "Category": string;
}

export interface Prompt {
    prompt: string;
    category: string;
}

export type GroupedPrompts = Record<string, Prompt[]>;

export interface PromptData {
    categories: string[];
    prompts: GroupedPrompts;
}

export interface GameState {
    players?: string[];
    previousPrompts: Prompt[];
    currentPrompt: Prompt;
    currentPlayer?: string;
}

export interface GamePlayContext {
    promptData: PromptData;
    activeGame?: GameState;
    continueGame: () => void;
    startGame: (players?: string[]) => void;
    endGame: () => void;
}

export interface ActiveGamePlayContext extends GamePlayContext { activeGame: GameState };

export function isActiveGame(context:GamePlayContext): context is ActiveGamePlayContext {
    return 'activeGame' in context;
}   