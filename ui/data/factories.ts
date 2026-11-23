import { randomUUID } from 'node:crypto';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export function buildCustomer(overrides: Partial<CustomerInfo> = {}): CustomerInfo {
  const suffix = randomUUID().slice(0, 8);
  return {
    firstName: `Test-${suffix}`,
    lastName: 'Automation',
    postalCode: '10001',
    ...overrides,
  };
}
