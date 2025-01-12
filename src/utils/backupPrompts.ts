import { fileURLToPath } from 'url';
import { fetchPrompts } from './fetchPrompts';
import { Prompt } from '../types';
import Papa from 'papaparse';
import { writeFileSync } from 'fs';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BACKUP_FILENAME = 'prompts_backup.csv';
const BACKUP_FILE = path.resolve(__dirname, BACKUP_FILENAME);

export async function backupPrompts():Promise<void> {
    const allPrompts = await fetchPrompts();
    const flatPrompts = allPrompts.categories.reduce((acc, category) => {
        return acc.concat(allPrompts.prompts[category]);
    }, [] as Prompt[]);
    const promptCsv = Papa.unparse(flatPrompts, );
    writeFileSync(BACKUP_FILE, promptCsv, 'utf-8');
}

backupPrompts();