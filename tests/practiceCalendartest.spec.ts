import { test, expect } from '@playwright/test';

test('select a date from the calendar dropdown', async ({ page }) => {
  await page.goto('https://practice-automation.com/');
  await page.getByRole('link', { name: 'Calendars' }).click();

  const dateInput = page.getByRole('textbox', { name: 'Select or enter a date' });
  await expect(dateInput).toBeVisible();
  await dateInput.click();

  const currentMonthButton = page.locator('.dp-cal-month');
  const currentYearButton = page.locator('.dp-cal-year');
  const augustButton = page.getByRole('button', { name: /^August$/ });
  const year2018Button = page.getByRole('button', { name: /^2018$/ });
  const day2018Button = page.getByRole('button', { name: /^Fri Aug 17 2018/ });

  await expect(currentMonthButton).toBeVisible();
  await currentMonthButton.click();
  await expect(augustButton).toBeVisible();
  await augustButton.click();

  await expect(currentYearButton).toBeVisible();
  await currentYearButton.click();
  await expect(year2018Button).toBeVisible();
  await year2018Button.click();

  await expect(day2018Button).toBeVisible();
  await day2018Button.click();

  await expect(dateInput).toHaveValue('2018-08-17');
});