/* const axios = require("axios");
const cheerio = require("cheerio");

async function scrape(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $("#new-player")
      .find("img")
      .each((i, el) => {
        console.log("a : " + $(el));
      });
  } catch (error) {
    console.error("Hata:", error);
  }
}
const url = "https://www.slideshare.net/SkeletonTech/skeleton-culture-code";

scrape(url); */

const puppeteer = require("puppeteer");

async function scrapeWebsite(url) {
  let browser;
  try {
    browser = await puppeteer.launch();
    console.log("Launched");

    const page = await browser.newPage();
    console.log("New Page Created");

    let pageLoaded = false;
    let retryCount = 0;
    const maxRetries = 50;

    while (!pageLoaded && retryCount < maxRetries) {
      try {
        await page.goto(url, { timeout: 1000 });
        console.log("Page Opened");
        pageLoaded = true;
      } catch (error) {
        console.error(`Failed to navigate to ${url}, retrying...`);
        retryCount++;
      }
    }

    if (!pageLoaded) {
      console.error(
        `Failed to navigate to ${url} after ${maxRetries} retries.`
      );
      return;
    }

    // Sayfanın sonuna kadar scroll yaparak tüm içeriğin yüklenmesini sağla
    await autoScroll(page);

    const imgSrcList = await page.evaluate(() => {
      const parent = document.querySelector("#new-player");
      const imgElements = parent.querySelectorAll("img");
      const srcList = [];
      imgElements.forEach((img) => srcList.push(img.src));
      return srcList;
    });

    console.log("Image Sources:", imgSrcList);

    // HTML içeriğini kullanarak veri çekme işlemlerini gerçekleştir

    await browser.close();
  } catch (error) {
    console.error("Hata:", error);
    if (browser) {
      await browser.close();
    }
  }
}

// Otomatik olarak sayfayı scroll eden fonksiyon
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        // Sayfanın sonuna ulaşıldığında veya belirli bir noktaya kadar scroll edildiğinde dur
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 500);
    });
  });
}

// Web sitesi URL'si
const url = "https://www.slideshare.net/atkearney/strategy-study-results";

// Fonksiyonu çağırarak veriyi çek
scrapeWebsite(url);
