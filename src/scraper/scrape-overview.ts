import scrapeIt from 'scrape-it';

const URL =
  'https://www.dzi.de/spenderberatung/spenden-siegel/liste-aller-spenden-siegel-organisationen-a-z/';

export interface Overview {
  urls: string[];
}

const example = {
  // Fetch the articles
  articles: {
    listItem: '.article',
    data: {
      // Get the article date and convert it into a Date object
      createdAt: {
        selector: '.date',
        convert: (x: string) => new Date(x)
      },

      // Get the title
      title: 'a.article-title',

      // Nested list
      tags: {
        listItem: '.tags > span'
      },

      // Get the content
      content: {
        selector: '.article-content',
        how: 'html'
      },

      // Get attribute value of root listItem by omitting the selector
      classes: {
        attr: 'class'
      }
    }
  },

  // Fetch the blog pages
  pages: {
    listItem: 'li.page',
    data: {
      title: 'a',
      url: {
        selector: 'a',
        attr: 'href'
      }
    }
  },

  // Fetch some other data from the page
  title: '.header h1',
  desc: '.header h2',
  avatar: {
    selector: '.header img',
    attr: 'src'
  }
};

export const scrapeOverview = async (): Promise<Overview | undefined> => {
  const result = await scrapeIt<Overview>(URL, {
    urls: {
      listItem: '.pagesaz a',
      attr: 'href',
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

  return { urls: result.data.urls.map((urlData: any) => urlData.url) };
};
