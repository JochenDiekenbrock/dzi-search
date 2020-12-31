import scrapeIt from 'scrape-it';
import { Organization } from '../organization';

export interface List {
  organizations: Organization[];
}

export const scrapeList = async (url: string): Promise<List | undefined> => {
  const result = await scrapeIt<{ organizations: Organization[] }>(url, {
    organizations: {
      listItem: '.treffertable h2 a',
      data: {
        title: {},
        url: {
          attr: 'href'
        }
      }
    }
  });

  if (result.response.statusCode >= 300) {
    return undefined;
  }

  return result.data;
};
