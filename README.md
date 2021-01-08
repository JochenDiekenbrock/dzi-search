# dzi-search
dzi-search implements an advanced search for organizations with the 
donation certificate ("Spendensiegel") of the
[DZI (Deutsches Zentralinstitut für soziale Fragen)](https://www.dzi.de)

**No data is provided. You need to scrape data before using the search.**

### Scraping new organization data

**Scraped data is cached locally. To fetch the most recent data, make sure that DATA/temp is empty!**

run `npm run scrape` to regenerate the organization data in 
public/DATA/organizations.json

intermediate scraping results are stored in DATA/temp and new data is only 
scraped for data items that are not found in DATA/temp to avoid scraping 
data needlessly again and again.

