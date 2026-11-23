import type { APIRequestContext } from '@playwright/test';
import { toResult, type ApiResult } from '../ApiResponse';

export abstract class BaseClient {
  constructor(protected readonly request: APIRequestContext) {}

  protected async get<T>(path: string, params?: Record<string, string | number>): Promise<ApiResult<T>> {
    return toResult<T>(await this.request.get(path, { params }));
  }

  protected async post<T>(path: string, data: unknown): Promise<ApiResult<T>> {
    return toResult<T>(await this.request.post(path, { data }));
  }
}
