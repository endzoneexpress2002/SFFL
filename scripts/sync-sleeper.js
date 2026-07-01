import { writeFile, mkdir, readFile } from 'node:fs/promises';

const LEAGUE_ID = process.env.SFFL_SLEEPER_LEAGUE_ID || '1315114040313278464';
const OUT_DIR = new URL('../data/current/', import.meta.url);
const sleeper = path => `https://api.sleeper.app/v1/${path}`;

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json();
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  try {
    const league = await getJson(sleeper(`league/${LEAGUE_ID}`));
    const rosters = await getJson(sleeper(`league/${LEAGUE_ID}/rosters`));
    const users = await getJson(sleeper(`league/${LEAGUE_ID}/users`));
    const week = Number(process.env.SFFL_WEEK || league.settings?.leg || 1);
    const matchups = await getJson(sleeper(`league/${LEAGUE_ID}/matchups/${week}`));
    const payload = { mode: 'live-sleeper', leagueId: LEAGUE_ID, syncedAt: new Date().toISOString(), week, league, users, rosters, matchups };
    await writeFile(new URL(`sleeper-${LEAGUE_ID}.json`, OUT_DIR), JSON.stringify(payload, null, 2));
    await writeFile(new URL('sleeper-live.json', OUT_DIR), JSON.stringify(payload, null, 2));
    console.log(`Synced Sleeper league ${LEAGUE_ID} for week ${week}`);
  } catch (error) {
    console.warn('Sleeper sync failed. Keeping demo fallback.');
    console.warn(error.message);
    const fallback = await readFile(new URL(`sleeper-${LEAGUE_ID}.json`, OUT_DIR), 'utf8');
    await writeFile(new URL('sleeper-live.json', OUT_DIR), fallback);
  }
}

main();
