const axios = require("axios");
const { jsPDF } = require("jspdf");

async function convertImagetoPdf(images) {
  const pdf = new jsPDF();
  for (const resimURL of images) {
    const img = await downloadImage(resimURL.src);
    pdf.addImage(img, "JPEG", 0, 50, 210, 210);
    pdf.addPage();
  }
  return pdf.output("arraybuffer");
}

async function downloadImage(url) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data, "binary").toString("base64");
}

module.exports = convertImagetoPdf;
