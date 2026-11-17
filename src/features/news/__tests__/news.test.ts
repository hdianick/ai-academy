import { CONTENT_VERIFIED_AT, newsItems } from '@/data/content/news';
import { demoTools } from '@/data/content/tools';

import { latestNews, newsForTool, sortNews, validateNews } from '../news';

describe('news', () => {
  it('contains only valid, sourced items linked to known tools', () => {
    expect(
      validateNews(
        newsItems,
        demoTools.map((t) => t.id),
      ),
    ).toEqual([]);
  });

  it('never shows news dated after the last content check', () => {
    for (const item of newsItems) expect(item.date <= CONTENT_VERIFIED_AT).toBe(true);
  });

  it('sorts newest first and filters by tool', () => {
    const sorted = sortNews(newsItems);
    for (let i = 1; i < sorted.length; i++)
      expect(sorted[i - 1]!.date >= sorted[i]!.date).toBe(true);
    expect(latestNews(newsItems, 2)).toHaveLength(2);
    expect(newsForTool(newsItems, 'sora').every((n) => n.toolIds.includes('sora'))).toBe(true);
  });

  it('reports problems in bad data', () => {
    const bad = [
      {
        ...newsItems[0]!,
        id: 'x',
        date: '17/11/2026',
        toolIds: ['nope'],
        source: { name: 'a', url: 'http://a' },
      },
    ];
    expect(validateNews(bad, ['chatgpt']).length).toBe(3);
  });
});

describe('tool catalog accuracy', () => {
  it('marks closed services and explains them', () => {
    for (const tool of demoTools) {
      if (tool.status === 'discontinued') {
        expect(tool.statusNote?.length ?? 0).toBeGreaterThan(20);
        expect(tool.relatedCourseIds).toEqual([]);
      }
      expect(tool.lastReviewed).toMatch(/^\d{4}-\d{2}$/);
    }
  });
});
