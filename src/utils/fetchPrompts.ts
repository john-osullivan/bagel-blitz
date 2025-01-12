import Papa from 'papaparse';
import { GroupedPrompts, PromptData, SerializedPrompt } from '../types';

import backupPromptData from './prompts_backup.csv';

const PROMPTS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTOXYJxV3P3b1Vj4nO6wDDrmkvlKwVy--tcR3nr3_mYY2L_KtSYnql0z-16L1MIAfri4tngLgZ-HN2u/pub?output=csv";

export async function fetchPrompts():Promise<PromptData> {
    let csvString = '';
    try {
        const response = await fetch(PROMPTS_URL);
        csvString = await response.text();
    } catch (err) {
        csvString = backupPromptData;
    }
    
    const data = Papa.parse(csvString, { header: true });
    const promptArray = data.data as SerializedPrompt[];
    const groupedPrompts = promptArray.reduce((group:GroupedPrompts, prompt:SerializedPrompt) => {
        const category = prompt['Category'];
        const promptText = prompt['Prompt'];
        if (!group[category]) {
            group[category] = [{ prompt: promptText, category }];
        } else {
            group[category].push({ prompt: promptText, category });
        }
        return group;
    }, {} as GroupedPrompts);
    return {
        categories: Object.keys(groupedPrompts),
        prompts: groupedPrompts
    }
}

