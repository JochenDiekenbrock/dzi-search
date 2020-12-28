import scrapeIt from 'scrape-it';

const URL =
  'https://www.dzi.de/spenderberatung/spenden-siegel/liste-aller-spenden-siegel-organisationen-a-z/';

export interface Overview {
  urls: string[];
}

export const scrapeOverview = async (): Promise<Overview | undefined> => {
  const result = await scrapeIt<{ urlData: { url: string }[] }>(URL, {
    urlData: {
      listItem: '.pagesaz a',
      data: {
        url: {
          attr: 'href'
        }
      }
    }
  });

  if (result.response.statusCode >= 300) {
    return undefined;
  }

  const urls = result.data.urlData.map((urlData) => urlData.url);
  const aUrl = urls[0].substring(0, urls[0].length - 1) + 'A';

  return {
    urls: [aUrl, ...urls]
  };
};
