import { test as base, type APIRequestContext } from '@playwright/test';
import { config } from '../shared/config';
import { PostsClient } from './clients/PostsClient';
import { UsersClient } from './clients/UsersClient';

type Clients = {
  apiContext: APIRequestContext;
  usersClient: UsersClient;
  postsClient: PostsClient;
};

export const test = base.extend<Clients>({
  apiContext: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: config.api.baseUrl,
      extraHTTPHeaders: { Accept: 'application/json' },
    });
    await use(context);
    await context.dispose();
  },
  usersClient: async ({ apiContext }, use) => use(new UsersClient(apiContext)),
  postsClient: async ({ apiContext }, use) => use(new PostsClient(apiContext)),
});

export { expect } from './schemas/matchers';
