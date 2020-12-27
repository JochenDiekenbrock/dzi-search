import * as fs from 'fs';
import { scrapeOverview } from './scrape-overview';

const run = async () => {
  const overview = await scrapeOverview();
  console.log('scraper.ts:4: overview: ', overview);

  if (!overview) {
    console.error('Error reading overview');
    process.exit(1);
  }

  overview.urls.forEach((url) => console.log('scraper.ts:13: url: ', url));
  fs.writeFileSync('./overview.json', JSON.stringify(overview));
};

run();
