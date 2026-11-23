import { test as base } from '@playwright/test';
import { CartPage } from './pages/CartPage';
import { CheckoutInfoPage } from './pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from './pages/CheckoutOverviewPage';
import { InventoryPage } from './pages/InventoryPage';
import { LoginPage } from './pages/LoginPage';
import { CheckoutSteps } from './steps/CheckoutSteps';

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutInfoPage: CheckoutInfoPage;
  checkoutOverviewPage: CheckoutOverviewPage;
};

type Steps = {
  checkoutSteps: CheckoutSteps;
};

export const test = base.extend<Pages & Steps>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutInfoPage: async ({ page }, use) => use(new CheckoutInfoPage(page)),
  checkoutOverviewPage: async ({ page }, use) => use(new CheckoutOverviewPage(page)),

  checkoutSteps: async ({ inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage }, use) =>
    use(new CheckoutSteps(inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage)),
});

export { expect } from '@playwright/test';
