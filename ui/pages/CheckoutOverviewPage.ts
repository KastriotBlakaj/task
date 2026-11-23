import { expect, type Locator, type Page } from '@playwright/test';
import { parseMoney, type Cents } from '../utils/money';
import { BasePage } from './BasePage';
import { ProductCard } from './components/ProductCard';

export interface OverviewSummary {
  itemTotal: Cents;
  tax: Cents;
  total: Cents;
}

export interface LineItem {
  name: string;
  price: Cents;
}

export class CheckoutOverviewPage extends BasePage {
  protected readonly path = '/checkout-step-two.html';
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  private readonly lineItems: Locator;

  constructor(page: Page) {
    super(page);
    this.itemTotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.lineItems = page.getByTestId('inventory-item');
  }

  override async expectLoaded(): Promise<void> {
    await super.expectLoaded();
    await expect(this.total).toBeVisible();
  }

  async getLineItems(): Promise<LineItem[]> {
    const cards = (await this.lineItems.all()).map((root) => new ProductCard(root));
    return Promise.all(cards.map(async (card) => ({ name: await card.getName(), price: await card.getPrice() })));
  }

  async getSummary(): Promise<OverviewSummary> {
    const [itemTotal, tax, total] = await Promise.all([
      this.itemTotal.innerText(),
      this.tax.innerText(),
      this.total.innerText(),
    ]);
    return { itemTotal: parseMoney(itemTotal), tax: parseMoney(tax), total: parseMoney(total) };
  }
}
