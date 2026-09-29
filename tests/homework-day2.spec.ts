import { test, expect } from '@playwright/test';

test('search for pliers returns 4 matching products', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/', { waitUntil: 'domcontentloaded' });

  const searchInput = page.getByLabel('Search');
  await expect(searchInput).toBeVisible();

  await searchInput.dblclick();
  await searchInput.fill('Pliers');
  await expect(searchInput).toHaveValue('Pliers');

  await page.getByRole('button', { name: 'Search' }).click();

  const productTitles = page.locator('h5.card-title');
  await expect(productTitles).toHaveCount(4);
});

test('filter the catalog to hammers and toggle the checkbox', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/', { waitUntil: 'domcontentloaded' });

  const hammerCheckbox = page.locator('label:has-text("Hammer") input[type="checkbox"]');
  await expect(hammerCheckbox).toBeVisible();

  await hammerCheckbox.check();
  await expect(hammerCheckbox).toBeChecked();

  const productTitles = page.locator('h5.card-title');
  await expect(productTitles).toHaveCount(7);

  await hammerCheckbox.uncheck();
  await expect(hammerCheckbox).not.toBeChecked();
});

test('sort products by name ascending', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/', { waitUntil: 'domcontentloaded' });

  const sortDropdown = page.locator('select');
  await expect(sortDropdown).toBeVisible();
  await sortDropdown.selectOption({ label: 'Name (A - Z)' });

  const productTitles = page.locator('.card-title');
  await expect(productTitles).toHaveCount(9);
  await expect(productTitles.first()).toContainText('Adjustable Wrench');
  await expect(productTitles.first()).toHaveClass(/card-title/);
});

test('inspect a product and add two items to the cart', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/', { waitUntil: 'domcontentloaded' });

  const productLink = page.locator('h5.card-title').filter({ hasText: 'Combination Pliers' }).first();
  await expect(productLink).toBeVisible();
  await productLink.click();

  const productHeading = page.getByRole('heading', { name: 'Combination Pliers' });
  await expect(productHeading).toBeVisible();

  const quantityInput = page.locator('input[type="number"]');
  await expect(quantityInput).toHaveValue('1');

  const increaseButton = page.getByRole('button', { name: 'Increase quantity' });
  await increaseButton.click();
  await expect(quantityInput).toHaveValue('2');

  await page.getByRole('button', { name: 'Add to cart' }).click();

  const cartMessage = page.getByText('Product added to shopping cart.');
  await expect(cartMessage).toBeVisible();

  const cartLink = page.locator('a[aria-label="cart"]');
  await expect(cartLink).toBeVisible();
  await expect(cartLink).toContainText('2');
});
