import { MockAIProvider } from "./mockProvider";
import type { AIProvider } from "./aiProvider";

export const getAIProvider = (): AIProvider => {
  return new MockAIProvider();
};
