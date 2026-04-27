import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer'; // ← ADDED
import { askRNA, memory } from './rna.js';
import { webSearch } from './tools/search.js';
import { createPDF, createWord, createExcel } from './tools/documents.js';
import { readFile } from './tools/filereader.js'; // ← ADDED

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ← ADDED: Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Get memory/session info
app.get('/api/memory', (req, res) => {
  res.json({
    name: memory.user.name,
    sessions: memory.user.sessions,
    lastSeen: memory.user.lastSeen,
    facts: memory.facts
  });
});

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const reply = await askRNA(message);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ← ADDED: File upload + read + summarize endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { text, type, error } = await readFile(req.file.path, req.file.mimetype);

    if (!text) {
      return res.status(400).json({ error: error || 'Could not read file' });
    }

    // Truncate if too long
    const truncated = text.length > 4000 ? text.slice(0, 4000) + '...[truncated]' : text;

    const prompt = `The user uploaded a ${type} file named "${req.file.originalname}". 
Here is its content:
---
${truncated}
---
Please provide a clear, structured summary of this document. Highlight the key points.`;

    const reply = await askRNA(prompt);
    res.json({ reply, filename: req.file.originalname, type });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Web search endpoint
app.post('/api/search', async (req, res) => {
  const { query } = req.body;
  try {
    const results = await webSearch(query);
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Document generation endpoints
app.post('/api/pdf', async (req, res) => {
  const { content } = req.body;
  const result = createPDF('rna_output', content);
  res.json({ result });
});

app.post('/api/word', async (req, res) => {
  const { content } = req.body;
  const result = await createWord('rna_output', content);
  res.json({ result });
});

app.post('/api/excel', async (req, res) => {
  const result = await createExcel('rna_output', [
    ['Feature', 'Status'],
    ['Chat', 'Active'],
    ['Web Search', 'Active'],
    ['Documents', 'Active']
  ]);
  res.json({ result });
});

app.listen(3000, () => {
  console.log('\n🤖 RNA Server running!');
  console.log('👉 Open http://localhost:3000 in your browser\n');
});