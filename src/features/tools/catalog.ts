import type { AiTool, ToolCategory } from './types';

function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

export function filterTools(
  tools: AiTool[],
  filters: { query?: string; category?: ToolCategory | null; includeDiscontinued?: boolean },
): AiTool[] {
  const words = normalize(filters.query ?? '')
    .split(/\s+/)
    .filter(Boolean);
  return tools.filter((tool) => {
    if (!filters.includeDiscontinued && tool.status === 'discontinued') return false;
    if (filters.category && !tool.categories.includes(filters.category)) return false;
    if (words.length === 0) return true;
    const haystack = normalize(
      [
        tool.name,
        ...(tool.formerNames ?? []),
        tool.company,
        tool.tagline,
        tool.description,
        ...tool.features,
      ].join(' '),
    );
    return words.every((word) => haystack.includes(word));
  });
}

/** Strumenti che compaiono nel corso (match per nome nei `tools` del corso o per collegamento). */
export function toolsForCourse(
  tools: AiTool[],
  courseId: string,
  courseToolNames: string[],
): AiTool[] {
  return tools.filter(
    (tool) =>
      tool.status !== 'discontinued' &&
      (tool.relatedCourseIds.includes(courseId) ||
        courseToolNames.includes(tool.name) ||
        (tool.formerNames ?? []).some((name) => courseToolNames.includes(name))),
  );
}
