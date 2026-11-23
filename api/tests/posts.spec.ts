import { test, expect } from '../fixtures';
import { postSchema } from '../schemas';
import { buildPost } from '../data/factories';

test.describe('Posts API', () => {
  test('POST /posts creates a post, and the fake backend does not persist it', { tag: '@regression' }, async ({
    postsClient,
  }) => {
    test.info().annotations.push({
      type: 'note',
      description: 'JSONPlaceholder does not persist writes; read-back asserts 404 by design.',
    });

    const newPost = buildPost();

    const created = await test.step('create the post', async () => {
      const response = await postsClient.create(newPost);

      expect(response.status).toBe(201);
      expect(response.body).toMatchSchema(postSchema);
      expect(response.body).toMatchObject({ ...newPost });
      return response.body;
    });

    await test.step('read the created post back', async () => {
      const response = await postsClient.getById(created.id);

      expect(response.status, 'JSONPlaceholder does not persist created resources').toBe(404);
    });
  });

  test('GET /posts/{id} for an existing post matches the post schema', { tag: ['@smoke', '@contract'] }, async ({
    postsClient,
  }) => {
    const response = await postsClient.getById(1);

    expect(response.status).toBe(200);
    expect(response.body).toMatchSchema(postSchema);
    expect(response.body.id).toBe(1);
  });
});
