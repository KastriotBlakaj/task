import type { ApiResult } from '../ApiResponse';
import type { NewPost, Post } from '../types';
import { BaseClient } from './BaseClient';

export class PostsClient extends BaseClient {
  create(post: NewPost): Promise<ApiResult<Post>> {
    return this.post<Post>('/posts', post);
  }

  getById(id: number): Promise<ApiResult<Post>> {
    return this.get<Post>(`/posts/${id}`);
  }

  listByUser(userId: number): Promise<ApiResult<Post[]>> {
    return this.get<Post[]>('/posts', { userId });
  }
}
