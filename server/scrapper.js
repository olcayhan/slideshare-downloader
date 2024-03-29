const puppeteer = require("puppeteer");
const autoScroll = require("./autoScroll");

async function scrapeWebsite(url) {
  let browser;
  try {
    browser = await puppeteer.launch();

    const page = await browser.newPage();
    let pageLoaded = false;
    let retryCount = 0;
    const maxRetries = 50;

    while (!pageLoaded && retryCount < maxRetries) {
      try {
        await page.goto(url, { timeout: 2000 });
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

    await autoScroll(page);

    const imgSrcList = await page.evaluate(() => {
      const parent = document.querySelector("#new-player");
      const imgElements = parent.querySelectorAll("img");
      const srcList = [];
      imgElements.forEach((img) => {
        img.src !==
          "https://public.slidesharecdn.com/_next/static/media/save-slide-icon-424766.b5658b5b.svg" &&
          srcList.push({
            srcset: img.srcset,
            src: img.src,
            alt: img.alt,
            type: img.type,
            sizes: img.sizes,
          });
      });
      return srcList;
    });

    await browser.close();
    return imgSrcList;
  } catch (error) {
    console.error("Hata:", error);
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = scrapeWebsite;
