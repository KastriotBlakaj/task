import type { Locator, Page } from '@playwright/test';
import type { Credentials } from '../../shared/config';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  protected readonly path = '/';
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.error = page.getByTestId('error');
  }

  async login({ username, password }: Credentials): Promise<void> {
    await this.fill(this.username, username);
    await this.fill(this.password, password);
    await this.click(this.loginButton);
  }
}
