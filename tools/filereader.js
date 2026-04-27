import fs from 'fs';
import mammoth from 'mammoth';

export async function readFile(filePath, mimeType) {
  try {
    if (mimeType === 'application/pdf') {
      const buffer = fs.readFileSync(filePath);

      // ← FIXED: use pdf2json which works with ES modules
      const PDFParser = (await import('pdf2json')).default;

      return new Promise((resolve) => {
        const parser = new PDFParser();

        parser.on('pdfParser_dataReady', (data) => {
          try {
            const text = data.Pages
              .flatMap(p => p.Texts)
              .map(t => decodeURIComponent(t.R[0].T))
              .join(' ');
            resolve({ text, type: 'PDF' });
          } catch {
            resolve({ text: null, type: 'Error', error: 'Failed to parse PDF content' });
          }
        });

        parser.on('pdfParser_dataError', (err) => {
          resolve({ text: null, type: 'Error', error: err.message });
        });

        parser.parseBuffer(buffer);
      });
    }

    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ path: filePath });
      return { text: result.value, type: 'Word' };
    }

    if (mimeType === 'text/plain') {
      const text = fs.readFileSync(filePath, 'utf-8');
      return { text, type: 'Text' };
    }

    return { text: null, type: 'Unknown' };

  } catch (err) {
    return { text: null, type: 'Error', error: err.message };
  }
}