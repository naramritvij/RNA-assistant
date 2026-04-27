import axios from 'axios';
import * as cheerio from 'cheerio';

export async function webSearch(query) {
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const $ = cheerio.load(data);
    const results = [];

    $('.result__snippet').each((i, el) => {
      if (i < 4) results.push($(el).text().trim());
    });

    return results.length
      ? `Search results for "${query}":\n` + results.map((r, i) => `${i+1}. ${r}`).join('\n')
      : 'No results found.';
  } catch {
    return 'Search failed. Check your internet connection.';
  }
}