import { randomUUID } from 'node:crypto';
import type { NewPost } from '../types';

export function buildPost(overrides: Partial<NewPost> = {}): NewPost {
  const suffix = randomUUID();
  return {
    userId: 1,
    title: `qa-title-${suffix}`,
    body: `qa-body-${suffix}`,
    ...overrides,
  };
}
