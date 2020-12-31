import scrapeIt, { ScrapeOptions } from 'scrape-it';
import { Organization } from './organization';

export const scrapeOrganization = async (
  organization: Organization
): Promise<Organization | undefined> => {
  const opts: ScrapeOptions = {
    weltanschaulicheAusrichtung: {
      selector: '.orgaboxtext strong:contains("Weltanschauliche Ausrichtung")',
      closest: 'p',
      how: (sel) => sel.children().get(1).next.data
    },
    finanzen: {
      selector: '.odabamain table',
      data: {
        bezugsjahr: {
          selector: 'th:contains("Bezugsjahr")',
          how: (elem) => Number.parseInt(elem.next('td').text())
        },
        gesamtEinnahmen: {
          selector: 'th:contains("Gesamteinnahmen")',
          how: (elem) => elem.next('td').text()
        },
        anteilKosten: {
          selector: 'th:contains("Anteil Werbe")',
          how: (elem) => elem.next('td').text()
        }
      }
    },
    volltext: {
      selector: 'article',
      convert: (text: string) => {
        text = text.replace(/ +/g, ' ');
        text = text.replace(/\t/g, '');
        text = text.replace(/ *[\r\n]+ */g, '\n');
        text = text.replace(/[\r\n]+/g, '\n');
        return text;
      }
    }
  };

  const result = await scrapeIt<Organization>(organization.url, opts);
  // const result = {
  //   response: { statusCode: 200 },
  //   data: scrapeHTML<Organization>(testhtml, opts)
  // };

  if (result.response.statusCode >= 300) {
    return undefined;
  }

  return { ...organization, ...result.data };
};
