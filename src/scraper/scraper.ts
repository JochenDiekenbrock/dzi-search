import { mkdirSync } from 'fs';
import { readOrExecute, wait } from './helper';
import { List, scrapeList } from './scrape-list';
import { Overview, scrapeOverview } from './scrape-overview';

const FETCH_DELAY_IN_MS = 1000; // don't DOS the server
const DATA_DIR = './DATA/';

const run = async () => {
  mkdirSync(DATA_DIR, { recursive: true });

  const overview = await readOrExecute<Overview | undefined>(
    `${DATA_DIR}overview.json`,
    scrapeOverview
  );
  console.log('scraper.ts:10: overview: ', overview);

  if (!overview) {
    console.error('Error reading overview');
    process.exit(1);
  }

  for (const listUrl of [overview.urls[0], overview.urls[1]]) {
    const filename = `${DATA_DIR}list-${listUrl.substr(-1)}.json`;
    const list = await readOrExecute<List | undefined>(filename, async () =>
      scrapeList(listUrl)
    );

    console.log('scraper.ts:40: list: ', list);
    await wait(FETCH_DELAY_IN_MS);
  }
};

run();
