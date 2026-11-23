import { test } from '../fixtures';
import { storageStatePath, type Persona } from '../../shared/config';
import { PRODUCTS } from '../data/catalog';
import { buildCustomer } from '../data/factories';

test.describe('Checkout', () => {
  const itemsToBuy = [PRODUCTS.backpack, PRODUCTS.bikeLight];

  const scenarios: { persona: Persona; tags: string[]; knownDefect?: string }[] = [
    { persona: 'standard', tags: ['@smoke', '@regression'] },
    {
      persona: 'problem',
      tags: ['@regression', '@known-defect'],
      knownDefect: 'DEFECT-1: typing in Last Name changes First Name, so checkout cannot continue',
    },
  ];

  for (const { persona, tags, knownDefect } of scenarios) {
    test.describe(`${persona}_user`, () => {
      test.use({ storageState: storageStatePath(persona) });

      test('overview item total, tax and total agree with the item prices', { tag: tags }, async ({
        checkoutSteps,
      }) => {
        test.fail(!!knownDefect, knownDefect);

        const prices = await checkoutSteps.addToCart(itemsToBuy);
        await checkoutSteps.goToOverview(buildCustomer());
        await checkoutSteps.verifyTotals(prices);
      });
    });
  }
});
