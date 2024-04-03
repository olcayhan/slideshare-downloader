const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);
    const newArr = [];

    const pageTitle = $("#new-player").find("img");
    const newTitle = pageTitle[0].attribs.src;
    const urlCon = newTitle.split("1-320");
    console.log(urlCon);
    pageTitle.map((index, element) => {
      newArr.push({
        src: `${urlCon[0]}${index + 1}-638${urlCon[1]}`,
      });
    });
    return newArr;
  } catch (error) {
    console.error("Web scraping error:", error);
    return null;
  }
}

module.exports = scrapeWebsite;
