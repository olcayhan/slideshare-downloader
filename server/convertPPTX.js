const axios = require("axios");
const PowerPoint = require("pptxgenjs");

async function convertImagetoPPTX(images) {
  try {
    const pptx = new PowerPoint();

    for (const resimURL of images)
      pptx.addSlide().addImage({ path: resimURL.src, x: 0, y: 0, w: 10, h: 5 });

    return pptx.write("arraybuffer");
  } catch (error) {
    console.error("Hata:", error);
  }
}

module.exports = convertImagetoPPTX;
