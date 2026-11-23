import { expect, type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  protected abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.path);
    await this.expectLoaded();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page, `expected to be on ${this.constructor.name}`).toHaveURL(new RegExp(`${this.path}$`));
  }

  protected async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  protected async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
    await expect(locator, 'field should contain the value just typed').toHaveValue(value);
  }
}
