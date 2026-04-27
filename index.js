import readline from 'readline';
import chalk from 'chalk';
import { askRNA, memory } from './rna.js';  // ← UPDATED: added memory import
import { webSearch } from './tools/search.js';
import { createPDF, createWord, createExcel } from './tools/documents.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ← UPDATED: Smart welcome greeting with memory
console.log(chalk.cyan.bold(`
╔════════════════════════════════════════╗
║     RNA — Ritvij Naram Assistant 🤖    ║
║     Powered by Llama 3.2 (Local AI)   ║
╚════════════════════════════════════════╝
`));

// ← ADDED: Personalized greeting based on session count
if (memory.user.sessions > 1) {
  console.log(chalk.green(`👋 Welcome back, ${memory.user.name}! Session #${memory.user.sessions}`));
  console.log(chalk.gray(`   Last seen: ${new Date(memory.user.lastSeen).toLocaleString()}\n`));
} else {
  console.log(chalk.green(`👋 Hey ${memory.user.name}! Welcome to RNA for the first time!\n`));
}

console.log(chalk.gray('Commands:'));
console.log(chalk.gray('  /search <query>  → Search the web'));
console.log(chalk.gray('  /pdf <text>      → Save as PDF'));
console.log(chalk.gray('  /word <text>     → Save as Word doc'));
console.log(chalk.gray('  /excel           → Create Excel file'));
console.log(chalk.gray('  /exit            → Quit RNA\n'));

function prompt() {
  rl.question(chalk.yellow('You → '), async (input) => {
    const msg = input.trim();
    if (!msg) return prompt();

    if (msg === '/exit') {
      console.log(chalk.cyan('\nRNA: Goodbye Ritvij! See you soon 👋\n'));
      rl.close();
      return;
    }

    if (msg.startsWith('/search ')) {
      const query = msg.replace('/search ', '');
      console.log(chalk.gray('\n🔍 Searching the web...\n'));
      const results = await webSearch(query);
      console.log(chalk.cyan('RNA → ') + results + '\n');
      return prompt();
    }

    if (msg.startsWith('/pdf ')) {
      const content = msg.replace('/pdf ', '');
      const result = createPDF('rna_output', content);
      console.log(chalk.cyan('\nRNA → ') + result + '\n');
      return prompt();
    }

    if (msg.startsWith('/word ')) {
      const content = msg.replace('/word ', '');
      const result = await createWord('rna_output', content);
      console.log(chalk.cyan('\nRNA → ') + result + '\n');
      return prompt();
    }

    if (msg === '/excel') {
      const result = await createExcel('rna_output', [
        ['Feature', 'Status'],
        ['Chat', 'Active'],
        ['Web Search', 'Active'],
        ['Documents', 'Active']
      ]);
      console.log(chalk.cyan('\nRNA → ') + result + '\n');
      return prompt();
    }

    // Normal chat
    try {
      console.log(chalk.gray('\nRNA is thinking...\n'));
      const reply = await askRNA(msg);
      console.log(chalk.cyan('RNA → ') + reply + '\n');
    } catch (err) {
      console.log(chalk.red('Error: ') + err.message + '\n');
    }

    prompt();
  });
}

prompt();