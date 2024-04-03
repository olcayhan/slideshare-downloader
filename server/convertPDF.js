const { createCanvas, Image, loadImage } = require("canvas");
const { jsPDF } = require("jspdf");

async function convertImagetoPdf(images) {
  const pdf = new jsPDF();
  for (const resimURL of images) {
    const img = await loadImage(resimURL.src);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imageDataURL = canvas.toDataURL("image/jpeg");
    pdf.addImage(imageDataURL, "JPEG", 0, 0, 210, 210);
    pdf.addPage();
  }
  return pdf.output("arraybuffer");
}

module.exports = convertImagetoPdf;
