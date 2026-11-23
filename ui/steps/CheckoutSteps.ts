import { test, expect } from '@playwright/test';
import { SALES_TAX_RATE } from '../data/catalog';
import type { CustomerInfo } from '../data/factories';
import type { CartPage } from '../pages/CartPage';
import type { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import type { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import type { InventoryPage } from '../pages/InventoryPage';
import { formatMoney, sumCents, taxOn, type Cents } from '../utils/money';

export class CheckoutSteps {
  constructor(
    private readonly inventoryPage: InventoryPage,
    private readonly cartPage: CartPage,
    private readonly checkoutInfoPage: CheckoutInfoPage,
    private readonly checkoutOverviewPage: CheckoutOverviewPage,
  ) {}

  async addToCart(productNames: readonly string[]): Promise<Map<string, Cents>> {
    return test.step(`add ${productNames.join(', ')} to the cart`, async () => {
      await this.inventoryPage.goto();
      const prices = new Map<string, Cents>();
      for (const name of productNames) {
        prices.set(name, await this.inventoryPage.product(name).getPrice());
        await this.inventoryPage.addToCart(name);
      }
      await expect(this.inventoryPage.header.cartBadge).toHaveText(String(productNames.length));
      return prices;
    });
  }

  async goToOverview(customer: CustomerInfo): Promise<void> {
    await test.step('go through the cart to the checkout overview', async () => {
      await this.inventoryPage.openCart();
      await this.cartPage.expectLoaded();
      await this.cartPage.checkout();
      await this.checkoutInfoPage.expectLoaded();
      await this.checkoutInfoPage.submit(customer);
      await this.checkoutOverviewPage.expectLoaded();
    });
  }

  async verifyTotals(expectedPrices: Map<string, Cents>): Promise<void> {
    await test.step('verify item total, tax and total on the overview', async () => {
      const lineItems = await this.checkoutOverviewPage.getLineItems();
      expect(new Map(lineItems.map((item) => [item.name, item.price]))).toEqual(expectedPrices);

      const itemTotal = sumCents([...expectedPrices.values()]);
      const tax = taxOn(itemTotal, SALES_TAX_RATE);
      const summary = await this.checkoutOverviewPage.getSummary();

      expect({
        itemTotal: formatMoney(summary.itemTotal),
        tax: formatMoney(summary.tax),
        total: formatMoney(summary.total),
      }).toEqual({
        itemTotal: formatMoney(itemTotal),
        tax: formatMoney(tax),
        total: formatMoney(itemTotal + tax),
      });
    });
  }
}
