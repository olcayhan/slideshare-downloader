const { createCanvas, loadImage } = require("canvas");
const jsPDF = require("jspdf");

const resimURLler = ["resim1.jpg", "resim2.jpg", "resim3.jpg"];

async function convertImagetoPdf() {
  const pdf = new jsPDF();

  for (const resimURL of resimURLler) {
    const img = await loadImage(resimURL);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imageDataURL = canvas.toDataURL("image/jpeg");
    pdf.addImage(imageDataURL, "JPEG", 0, 0);
    pdf.addPage();
  }

  pdf.save("resimler.pdf");
}

module.exports = convertImagetoPdf;
