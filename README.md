# dzi-search
## Scraping organization data
run `npm run scrape` to regenerate the organization data in 
DATA/organizations.json

intermediate scraping results are stored in DATA/temp and new data is only 
scraped for data items that are not found in DATA/temp to avoid scraping 
data needlessly again and again.
The fetch the most recent data, make sure that DATA/temp is empty
