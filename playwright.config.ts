import { defineConfig, devices } from '@playwright/test';
import { config, storageStatePath } from './shared/config';

const isCI = !!process.env.CI;

export default defineConfig({
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    testIdAttribute: 'data-test',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testDir: './ui/tests',
      testMatch: /.*\.setup\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: config.ui.baseUrl },
    },
    {
      name: 'ui',
      testDir: './ui/tests',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: config.ui.baseUrl,
        storageState: storageStatePath('standard'),
      },
    },
    {
      name: 'api',
      testDir: './api/tests',
    },
  ],
});
