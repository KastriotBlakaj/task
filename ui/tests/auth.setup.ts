import { test as setup, expect } from '../fixtures';
import { PERSONAS, credentialsFor, storageStatePath } from '../../shared/config';

for (const persona of PERSONAS) {
  setup(`authenticate as ${persona} user`, async ({ page, loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(credentialsFor(persona));
    await inventoryPage.expectLoaded();
    await expect(inventoryPage.header.cartLink).toBeVisible();

    await page.context().storageState({ path: storageStatePath(persona) });
  });
}
