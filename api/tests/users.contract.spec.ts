import { test, expect } from '../fixtures';
import { userSchema } from '../schemas';

test.describe('Users API contract', () => {
  for (const id of [1, 5, 10]) {
    test(`GET /users/${id} matches the user schema`, { tag: ['@smoke', '@contract'] }, async ({ usersClient }) => {
      const response = await usersClient.getById(id);

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchSchema(userSchema);
      expect(response.body.id).toBe(id);
    });
  }

  test('GET /users/{id} for an unknown id returns 404', { tag: '@regression' }, async ({ usersClient }) => {
    const response = await usersClient.getById(9999);

    expect(response.status).toBe(404);
  });
});
