import * as fs from 'fs';
import { mkdirSync } from 'fs';
import { readOrExecute, wait } from './helper';
import { Organization } from './organization';
import { List, scrapeList } from './scrape-list';
import { scrapeOrganization } from './scrape-organization';
import { Overview, scrapeOverview } from './scrape-overview';

const FETCH_DELAY_IN_MS = 1000; // don't DOS the server
const DATA_DIR = './DATA/';
const TEMP_DATA_DIR = './DATA/temp/';

const scrapeOrganizations = async (
  organizationList: List
): Promise<Organization[]> => {
  const result: Organization[] = [];
  for (const organizationInfo of [
    organizationList.organizations[0],
    organizationList.organizations[1]
  ]) {
    if (organizationInfo) {
      const filename = organizationInfo.url
        .replace(/https:\/\/www.dzi.de\//, '')
        .replace(/[^a-zA-Z0-9]/g, '-');
      const { data: organization, executed } = await readOrExecute<
        Organization | undefined
      >(`${TEMP_DATA_DIR}${filename}.json`, async () =>
        scrapeOrganization(organizationInfo)
      );

      if (organization) {
        result.push(organization);
      }

      if (executed) {
        await wait(FETCH_DELAY_IN_MS);
      }
    }
  }

  return result;
};

const scrape = async (): Promise<Organization[]> => {
  const { data: overview } = await readOrExecute<Overview | undefined>(
    `${TEMP_DATA_DIR}overview.json`,
    scrapeOverview
  );

  if (!overview) {
    throw new Error('Error reading overview');
  }

  const organizations: Organization[] = [];
  for (const listUrl of overview.urls) {
    const filename = `${TEMP_DATA_DIR}list-${listUrl.substr(-1)}.json`;
    const { data: organizationList } = await readOrExecute<List | undefined>(
      filename,
      async () => scrapeList(listUrl)
    );

    if (!organizationList) {
      throw new Error(`Error reading Organization list: ${listUrl}`);
    }

    organizations.push(...(await scrapeOrganizations(organizationList)));
  }

  return organizations;
};

const run = async () => {
  mkdirSync(TEMP_DATA_DIR, { recursive: true });
  mkdirSync(DATA_DIR, { recursive: true });

  try {
    const organizations = await scrape();
    fs.writeFileSync(
      `${DATA_DIR}organizations.json`,
      JSON.stringify(organizations, undefined, 2),
      {
        encoding: 'utf8'
      }
    );
  } catch (e) {
    console.error('error scraping data', e);
  }
};

run();
