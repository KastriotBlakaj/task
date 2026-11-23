import type { ApiResult } from '../ApiResponse';
import type { User } from '../types';
import { BaseClient } from './BaseClient';

export class UsersClient extends BaseClient {
  list(): Promise<ApiResult<User[]>> {
    return this.get<User[]>('/users');
  }

  getById(id: number): Promise<ApiResult<User>> {
    return this.get<User>(`/users/${id}`);
  }
}
