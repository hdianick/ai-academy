import type { NewsItem } from './types';

/** Dalla più recente alla meno recente. */
export function sortNews(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id));
}

export function latestNews(items: NewsItem[], count: number): NewsItem[] {
  return sortNews(items).slice(0, count);
}

export function newsForTool(items: NewsItem[], toolId: string): NewsItem[] {
  return sortNews(items.filter((item) => item.toolIds.includes(toolId)));
}

export function formatDay(isoDate: string, language: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  try {
    return new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1).toLocaleDateString(
      language === 'en' ? 'en-GB' : 'it-IT',
      { day: 'numeric', month: 'long', year: 'numeric' },
    );
  } catch {
    return isoDate;
  }
}

/** Controlli di qualità sui dati (usati dai test e dal controllo settimanale). */
export function validateNews(items: NewsItem[], knownToolIds: string[]): string[] {
  const problems: string[] = [];
  const ids = new Set<string>();
  for (const item of items) {
    if (ids.has(item.id)) problems.push(`id duplicato: ${item.id}`);
    ids.add(item.id);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date)) problems.push(`data non valida: ${item.id}`);
    if (!item.source.url.startsWith('https://')) problems.push(`fonte non https: ${item.id}`);
    if (!item.title.trim() || item.title.length > 90) problems.push(`titolo: ${item.id}`);
    if (!item.summary.trim() || item.summary.length > 400) problems.push(`riassunto: ${item.id}`);
    for (const toolId of item.toolIds)
      if (!knownToolIds.includes(toolId))
        problems.push(`strumento sconosciuto ${toolId} in ${item.id}`);
  }
  return problems;
}
