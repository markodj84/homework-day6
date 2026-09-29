import { test, expect } from '@playwright/test';
import loginData from '../test-data/login.json' with { type: 'json' };

test('login using data from JSON', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');

  await page.getByLabel('Email address').fill(loginData.email);
  await page.locator('[data-test="password"]').fill(loginData.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/account/);
});