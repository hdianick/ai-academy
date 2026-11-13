import { demoTools } from '@/data/content/tools';
import type { AiTool } from '@/features/tools/types';

export interface ToolsRepository {
  list(): AiTool[];
  get(toolId: string): AiTool | null;
}

export const toolsRepository: ToolsRepository = {
  list: () => demoTools,
  get: (toolId) => demoTools.find((tool) => tool.id === toolId) ?? null,
};
