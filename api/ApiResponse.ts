import type { APIResponse } from '@playwright/test';

export interface ApiResult<T> {
  status: number;
  headers: Record<string, string>;
  body: T;
}

export async function toResult<T>(response: APIResponse): Promise<ApiResult<T>> {
  const text = await response.text();
  return {
    status: response.status(),
    headers: response.headers(),
    body: (text ? JSON.parse(text) : undefined) as T,
  };
}
