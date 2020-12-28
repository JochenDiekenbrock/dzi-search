import { mkdirSync } from 'fs';
import { readOrExecute, wait } from './helper';
import { Organization } from './organization';
import { List, scrapeList } from './scrape-list';
import { scrapeOrganization } from './scrape-organization';
import { Overview, scrapeOverview } from './scrape-overview';

const FETCH_DELAY_IN_MS = 1000; // don't DOS the server
const DATA_DIR = './DATA/';
const TEMP_DATA_DIR = './DATA/temp/';

const run = async () => {
  mkdirSync(TEMP_DATA_DIR, { recursive: true });
  mkdirSync(DATA_DIR, { recursive: true });

  const { data: overview } = await readOrExecute<Overview | undefined>(
    `${TEMP_DATA_DIR}overview.json`,
    scrapeOverview
  );

  if (!overview) {
    console.error('Error reading overview');
    process.exit(1);
  }

  for (const listUrl of overview.urls) {
    const filename = `${TEMP_DATA_DIR}list-${listUrl.substr(-1)}.json`;
    const { data: organizationList } = await readOrExecute<List | undefined>(
      filename,
      async () => scrapeList(listUrl)
    );

    if (!organizationList) {
      console.error('Error reading Organization list: ', listUrl);
      process.exit(1);
    }

    for (const organization of [
      organizationList.organizations[0],
      organizationList.organizations[1]
    ]) {
      if (organization) {
        const filename = organization.url
          .replace(/https:\/\/www.dzi.de\//, '')
          .replace(/[^a-zA-Z0-9]/g, '-');
        const { data: orgData, executed } = await readOrExecute<
          Organization | undefined
        >(`${TEMP_DATA_DIR}${filename}.json`, async () =>
          scrapeOrganization(organization)
        );
        if (executed) {
          await wait(FETCH_DELAY_IN_MS);
        }
        console.log('scraper.ts:38: orgData: ', orgData);
      }
    }
  }
};

run();
