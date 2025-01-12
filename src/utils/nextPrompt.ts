import { GamePlayContext, GameState, Prompt, PromptData } from "../types";


export function getNextPrompt({ promptData, activeGame}: {
    promptData: PromptData,
    activeGame: GameState
}):Prompt {
    const { prompts, categories } = promptData;
    if (!activeGame) throw new Error("Can't get next prompt without an active game!");
    const { previousPrompts } = activeGame;
    const currentCategory = activeGame.currentPrompt.category;
    const nextCategory = nextElt(categories, currentCategory);
    const availableNextPrompts = prompts[nextCategory].filter(
        prompt => !previousPrompts.some((prev) => prev.prompt == prompt.prompt)
    );
    return randomElt(availableNextPrompts);
};

export function nextElt(elts: string[], current: string): string {
    return elts[(elts.indexOf(current) + 1) % elts.length];
}

export function randomElt<T>(elts:T[]):T{
    return elts[Math.floor(Math.random() * elts.length)];
}