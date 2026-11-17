import { content } from '@/data/content/registry';
import type { AiTool } from '@/features/tools/types';

export interface ToolsRepository {
  list(): AiTool[];
  get(toolId: string): AiTool | null;
}

/** Strumenti nella lingua attiva dell'app. */
export const toolsRepository: ToolsRepository = {
  list: () => content().tools,
  get: (toolId) => content().tools.find((tool) => tool.id === toolId) ?? null,
};
