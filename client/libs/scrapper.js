const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeWebsite(url) {
  try {
    const response = await fetch(url);
    const $ = cheerio.load(await response.text());
    const titles = [];
    $("img").each((index, element) => {
      titles.push(element.attribs.src);
    });
    return titles;
  } catch (error) {
    console.error("Error scraping website:", error);
    return [];
  }
}

export default scrapeWebsite;
