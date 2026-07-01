import { readFile, writeFile } from 'node:fs/promises';
const current = JSON.parse(await readFile(new URL('../data/current/sleeper-1315114040313278464.json', import.meta.url),'utf8'));
await writeFile(new URL('../data/current/demo-build-summary.json', import.meta.url), JSON.stringify({ builtAt:new Date().toISOString(), mode:current.mode, week:current.week, note:'Static demo data compiled for release preview.'}, null, 2));
console.log('Demo build summary updated.');
