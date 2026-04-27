import fs from 'fs';
import path from 'path';

const MEMORY_FILE = 'C:\\RNA\\memory.json';

// Load memory from file
export function loadMemory() {
  try {
    if (fs.existsSync(MEMORY_FILE)) {
      const data = fs.readFileSync(MEMORY_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch {
    // If file is corrupted, start fresh
  }
  return {
    user: { name: 'Ritvij', sessions: 0, firstSeen: new Date().toISOString() },
    conversations: [],
    facts: []
  };
}

// Save memory to file
export function saveMemory(memory) {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
}

// Add a conversation to memory
export function rememberConversation(memory, role, content) {
  memory.conversations.push({
    role,
    content,
    timestamp: new Date().toISOString()
  });

  // Keep only last 50 messages to avoid bloat
  if (memory.conversations.length > 50) {
    memory.conversations = memory.conversations.slice(-50);
  }

  saveMemory(memory);
}

// Remember a specific fact about the user
export function rememberFact(memory, fact) {
  if (!memory.facts.includes(fact)) {
    memory.facts.push(fact);
    saveMemory(memory);
  }
}

// Get last N conversations as context
export function getRecentContext(memory, n = 10) {
  return memory.conversations.slice(-n);
}