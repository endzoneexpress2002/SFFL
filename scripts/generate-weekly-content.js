import { readFile, writeFile, mkdir } from 'node:fs/promises';

const currentPath = new URL('../data/current/sleeper-1315114040313278464.json', import.meta.url);
const outDir = new URL('../data/content/', import.meta.url);

function story(title, category, summary, image) {
  return { title, category, summary, image, status: 'generated-demo', generatedAt: new Date().toISOString() };
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const current = JSON.parse(await readFile(currentPath, 'utf8'));
  const [first, second] = current.standings;
  const gotw = current.matchups[0];
  const articles = [
    story(`Week ${current.week} Reset: ${first.team} Controls the Board`, 'Weekly Recap', `${first.team} enters the midseason window at ${first.wins}-${first.losses}, but ${second.team} is close enough to turn the playoff picture with one result.`, 'graphics/news/week-10-chaos.png'),
    story(`${gotw.away} vs ${gotw.home} Gets the Main Stage`, 'Game Preview', `The projected ${gotw.awayProj}-${gotw.homeProj} matchup is the kind of late-season leverage game the SFFL homepage was built to feature.`, 'graphics/news/blood-feud-next.png'),
    story('MVP Ladder Tightens After the Trade Deadline', 'Awards Watch', 'The current demo data now drives this demo article package. Real Sleeper sync will replace the fictional weekly context.', 'graphics/news/mvp-ladder.png')
  ];
  await writeFile(new URL(`week-${current.week}-articles.json`, outDir), JSON.stringify(articles, null, 2));
  console.log(`Generated ${articles.length} demo articles for Week ${current.week}`);
}
main();
