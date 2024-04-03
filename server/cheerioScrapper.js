const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeWebsiteCheerio(url) {
  try {
    // Web sitesinden veriyi çek
    const response = await axios.get(url);
    const html = response.data;

    // Cheerio kullanarak HTML belgesini yükle
    const $ = cheerio.load(html);
    const newArr = [];

    // Örneğin, başlığı ve bir liste öğelerini alalım
    const pageTitle = $("#new-player").find("img");
    const newTitle = pageTitle[0].attribs.src;
    const newURL = newTitle.split("1-320");
    pageTitle.map((index, element) => {
      newArr.push({
        src: `${newURL[0]}${index + 1}-638${newURL[1]}`,
        alt: $(element).attr("alt"),
      });
    });
    return newArr;
  } catch (error) {
    console.error("Web scraping error:", error);
    return null;
  }
}

module.exports = scrapeWebsiteCheerio;
