import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from './components/HeaderComponent';
import { ProductCard } from './components/ProductCard';

export class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  product(name: string): ProductCard {
    return new ProductCard(
      this.page.getByTestId('inventory-item').filter({
        has: this.page.getByTestId('inventory-item-name').getByText(name, { exact: true }),
      }),
    );
  }

  async addToCart(name: string): Promise<void> {
    await this.click(this.product(name).addButton);
  }

  async openCart(): Promise<void> {
    await this.click(this.header.cartLink);
  }
}
