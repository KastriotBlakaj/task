import type { Locator, Page } from '@playwright/test';
import type { CustomerInfo } from '../data/factories';
import { BasePage } from './BasePage';

export class CheckoutInfoPage extends BasePage {
  protected readonly path = '/checkout-step-one.html';
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.error = page.getByTestId('error');
  }

  async submit(customer: CustomerInfo): Promise<void> {
    await this.fill(this.firstName, customer.firstName);
    await this.fill(this.lastName, customer.lastName);
    await this.fill(this.postalCode, customer.postalCode);
    await this.click(this.continueButton);
  }
}
