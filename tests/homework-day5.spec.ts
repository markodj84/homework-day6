import { readFileSync } from 'fs';

import { test, expect } from '../fixtures';
import { LoginPage } from '../pages/LoginPage';

test.describe('catalog hooks', () => {
  test.beforeAll(() => {
    const suiteStartTime = new Date().toISOString();
    console.log(`catalog hooks suite started at ${suiteStartTime}`);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('failure-screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    }
  });

  test.afterAll(() => {
    console.log('catalog hooks suite finished');
  });

  test('catalog page loaded', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveURL(/https:\/\/practicesoftwaretesting\.com\//);
  });
});

const csvData = readFileSync(
  new URL('../test-data/login-cases.csv', import.meta.url),
  'utf-8'
);

const loginCases = csvData
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.length > 0)
  .slice(1)
  .map((line) => {
    const [name, email, password, expectedResult] = line.split(',');

    return {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      expectedResult: expectedResult.trim().toLowerCase(),
    };
  });

test.describe.serial('csv login cases', () => {
  for (const record of loginCases) {
    test(`login case: ${record.name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(record.email, record.password);

      if (record.expectedResult === 'success') {
        await expect(page).toHaveURL(/\/account/);
      } else {
        await expect(page.getByText(/Invalid email or password/i)).toBeVisible();
      }
    });
  }
});