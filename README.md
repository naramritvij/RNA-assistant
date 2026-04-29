<div align="center">

<img src="https://img.shields.io/badge/RNA-Ritvij%20Naram%20Assistant-7c3aed?style=for-the-badge&logo=robot&logoColor=white" alt="RNA"/>

#  RNA! Ritvij Naram Assistant

### Your personal AI assistant, running 100% locally and privately on your machine.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Ollama](https://img.shields.io/badge/Powered%20by-Ollama-black?style=flat-square&logo=ollama&logoColor=white)](https://ollama.com)
[![phi3:mini](https://img.shields.io/badge/Model-phi3%3Amini-7c3aed?style=flat-square)](https://ollama.com/library/phi3)
[![License: MIT](https://img.shields.io/badge/License-MIT-06b6d4?style=flat-square)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-naramritvij-181717?style=flat-square&logo=github)](https://github.com/naramritvij)

<br/>

![RNA Preview](https://img.shields.io/badge/UI-Web%20Interface%20at%20localhost%3A3000-13131f?style=for-the-badge&logo=googlechrome&logoColor=7c3aed)

</div>

---

##  What is RNA?

**RNA (Ritvij Naram Assistant)** is a fully-featured personal AI assistant built from scratch using Node.js and [Ollama](https://ollama.com). It runs entirely on your local machine — no subscriptions, no API costs, no data leaving your PC. Every conversation stays private.

> Built as a personal project to explore local AI, modern web UI design, and agentic systems.

---

##  Features

| Feature | Description |
|---|---|
| 💬 **Smart Chat** | Conversational AI powered by phi3:mini via Ollama |
| 🧠 **Persistent Memory** | Remembers sessions, greets you by name, tracks conversation history |
| 🌐 **Web Search** | Live DuckDuckGo search — RNA searches the internet for you |
| 📁 **File Reading** | Upload PDFs, Word docs, or text files — RNA reads & summarizes them |
| 📄 **PDF Generation** | Generate and save PDF documents from chat |
| 📝 **Word Documents** | Create `.docx` files directly from RNA |
| 📊 **Excel Files** | Generate `.xlsx` spreadsheets on demand |
| 🎨 **Stunning Web UI** | Aurora dark theme, animated particles, glassmorphism, smooth transitions |
| 🔒 **100% Private** | Everything runs locally — no cloud, no tracking, no cost |

---

##  Screenshots

```
┌─────────────────────────────────────────────────────┐
│   RNA          phi3:mini · Local AI    Session #5  │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│  💬 Chat     │   👋 Welcome back, Ritvij!           │
│  📁 Upload   │   Session #5 · Last seen today       │
│  🔍 Search   │                                      │
│              │   [💻 Code Help] [📁 Read File]      │
│  📄 PDF      │   [🔍 Web Search] [🤖 Explore RNA]   │
│  📝 Word     │                                      │
│  📊 Excel    ├──────────────────────────────────────┤
│              │  📁 Upload  🔍 Search  📄  📝  📊    │
│  🧠 Memory   │  ┌─────────────────────────────┐ ➤  │
│              │  │ Message RNA...               │    │
│  Ritvij N. 🟢│  └─────────────────────────────┘    │
└──────────────┴──────────────────────────────────────┘
```

---

##  Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js v18+ |
| **AI Engine** | [Ollama](https://ollama.com) + phi3:mini |
| **Web Server** | Express.js |
| **Frontend** | Vanilla HTML/CSS/JS — no framework |
| **PDF** | pdfkit |
| **Word** | docx |
| **Excel** | exceljs |
| **File Reading** | pdf2json + mammoth |
| **Web Search** | axios + cheerio (DuckDuckGo scrape) |
| **Memory** | JSON file persistence |

---

##  Installation

### Prerequisites

- [Node.js v18+](https://nodejs.org)
- [Ollama](https://ollama.com) installed and running
- Git

### 1. Clone the repository

```bash
git clone https://github.com/naramritvij/RNA-assistant.git
cd RNA-assistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Pull the AI model

```bash
ollama pull phi3:mini
```

### 4. Start RNA

```bash
node server.js
```

### 5. Open in browser

```
http://localhost:3000
```

That's it! 🎉 RNA is running locally on your machine.

---

##  Project Structure

```
RNA-assistant/
├── server.js           # Express server — API endpoints
├── rna.js              # RNA brain — Ollama integration + memory
├── index.js            # CLI entry point (terminal mode)
├── memory.json         # Persistent memory (auto-generated)
├── public/
│   └── index.html      # Web UI — aurora dark theme
├── tools/
│   ├── memory.js       # Memory load/save/update functions
│   ├── search.js       # DuckDuckGo web search
│   ├── documents.js    # PDF, Word, Excel generation
│   └── filereader.js   # PDF, Word, text file reading
├── uploads/            # Temporary file upload storage
├── package.json
└── .gitignore
```

---

##  Usage

### Web Interface (Recommended)

Start the server and open `http://localhost:3000`

| Action | How |
|---|---|
| Chat with RNA | Type in the message box and press Enter |
| Web Search | Click 🔍 Search chip or sidebar item |
| Upload a file | Click 📁 Upload — supports PDF, Word, TXT |
| Generate PDF | Click 📄 PDF chip |
| Generate Word | Click 📝 Word chip |
| Generate Excel | Click 📊 Excel chip |
| New chat | Click "New conversation" in sidebar |

### Terminal Mode

```bash
node index.js
```

```
You → Hey RNA, who are you?
RNA → I'm RNA — Ritvij Naram Assistant! ...

You → /search latest AI news
RNA → 🔍 Searching...

You → /pdf My report content here
RNA → ✅ PDF saved → C:\RNA\rna_output.pdf

You → /exit
RNA → Goodbye Ritvij! See you soon 👋
```

---

##  How Memory Works

RNA saves your conversation history and session data to `memory.json`:

```json
{
  "user": {
    "name": "Ritvij",
    "sessions": 12,
    "firstSeen": "2026-04-26T10:16:05.132Z",
    "lastSeen": "2026-04-27T08:30:00.000Z"
  },
  "conversations": [...],
  "facts": []
}
```

- Each session is tracked and counted
- Last 50 messages are kept as context
- RNA greets you differently on first visit vs returning sessions

---

##  Configuration

To switch AI models, edit `rna.js` line 30:

```javascript
model: 'phi3:mini',   // fast, fits in 6GB VRAM
// model: 'llama3.2', // slightly faster, less smart
// model: 'mistral',  // smarter but needs more VRAM
```

**Recommended models by RAM:**

| RAM | Recommended Model |
|---|---|
| 8GB | `phi3:mini` or `llama3.2` |
| 16GB | `mistral` or `llama3.1:8b` |
| 32GB+ | `llama3.3:70b` |

---

##  Roadmap

- [x] Core chat with memory
- [x] Web UI with aurora dark theme
- [x] Web search integration
- [x] File reading (PDF, Word, TXT)
- [x] Document generation (PDF, Word, Excel)
- [x] GitHub repository
- [ ] 🎙️ Voice input
- [ ] 🌐 Cloud deployment (Railway/Render + Groq)
- [ ] 📊 Conversation analytics dashboard
- [ ] 🔌 Plugin system for custom tools

---

##  Contributing

This is a personal project but contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

##  License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

##  Author

**Ritvij Naram**
- GitHub: [@naramritvij](https://github.com/naramritvij)
- Project: [RNA-assistant](https://github.com/naramritvij/RNA-assistant)

---

<div align="center">

Built with ❤️ by Ritvij Naram · Powered by [Ollama](https://ollama.com) · Running locally, always free

⭐ **Star this repo if you found it useful!**

</div>
