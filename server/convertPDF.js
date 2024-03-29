const { createCanvas, loadImage } = require("canvas");
const { jsPDF } = require("jspdf");

async function convertImagetoPdf(images) {
  console.log("aldı");
  const pdf = new jsPDF();
  console.log("aldı2");
  for (const resimURL of images) {
    const img = await loadImage(resimURL.srcset);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imageDataURL = canvas.toDataURL("image/jpeg");
    console.log("aldı3");
    pdf.addImage(imageDataURL, "JPEG", 10, 10);
    console.log("aldı4");
    pdf.addPage();
  }
  return pdf.output("arraybuffer");
}

module.exports = convertImagetoPdf;
