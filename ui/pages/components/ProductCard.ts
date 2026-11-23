import type { Locator } from '@playwright/test';
import { parseMoney, type Cents } from '../../utils/money';

export class ProductCard {
  readonly name: Locator;
  readonly price: Locator;
  readonly addButton: Locator;

  constructor(readonly root: Locator) {
    this.name = root.getByTestId('inventory-item-name');
    this.price = root.getByTestId('inventory-item-price');
    this.addButton = root.getByRole('button', { name: 'Add to cart' });
  }

  async getName(): Promise<string> {
    return (await this.name.innerText()).trim();
  }

  async getPrice(): Promise<Cents> {
    return parseMoney(await this.price.innerText());
  }
}
