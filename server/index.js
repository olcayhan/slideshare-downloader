const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
const port = 5000; // Varsayılan olarak 3000 portunda bir sunucu oluşturuyoruz

app.use(bodyParser.json());
app.use(cors());

app.post("/api/scrape", async (req, res) => {
  try {
    const { url } = req.body;
    const data = await scrapeWebsite(url);
    res.json(data);
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

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
    return imgSrcList;
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
