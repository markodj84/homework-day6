import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practice-automation.com/modals/');
  await page.getByRole('button', { name: 'Form Modal' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Name Name');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test@test.com');
  await page.getByRole('textbox', { name: 'Message' }).click();
  await page.getByRole('textbox', { name: 'Message' }).fill('Message test');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('div').filter({ hasText: /^Name Name$/ }).click();
  await page.locator('div').filter({ hasText: /^test@test\.com$/ }).click();
  await page.locator('div').filter({ hasText: /^Message test$/ }).click();
  await page.getByRole('button', { name: 'Close' }).click();
});