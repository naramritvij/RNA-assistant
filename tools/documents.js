import PDFDocument from 'pdfkit';
import fs from 'fs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import ExcelJS from 'exceljs';

// 📄 PDF
export function createPDF(filename, content) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(`C:\\RNA\\${filename}.pdf`));
  doc.fontSize(16).text('RNA — Ritvij Naram Assistant', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(content, { align: 'left' });
  doc.end();
  return `✅ PDF saved → C:\\RNA\\${filename}.pdf`;
}

// 📝 Word
export async function createWord(filename, content) {
  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({
          text: 'RNA — Ritvij Naram Assistant',
          heading: HeadingLevel.HEADING_1
        }),
        ...content.split('\n').map(line =>
          new Paragraph({ children: [new TextRun(line)] })
        )
      ]
    }]
  });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(`C:\\RNA\\${filename}.docx`, buffer);
  return `✅ Word doc saved → C:\\RNA\\${filename}.docx`;
}

// 📊 Excel
export async function createExcel(filename, rows) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('RNA Output');
  ws.addRow(['RNA — Ritvij Naram Assistant']);
  ws.addRow([]);
  rows.forEach(row => ws.addRow(row));
  await wb.xlsx.writeFile(`C:\\RNA\\${filename}.xlsx`);
  return `✅ Excel saved → C:\\RNA\\${filename}.xlsx`;
}