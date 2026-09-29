import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly productLinks: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('a[aria-label="cart"]');
    this.sortDropdown = page.locator('select');
    this.productLinks = page.locator('[data-test="product-title"], [data-test="product-name"]');
    this.productPrices = page.locator('.card-text');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com/', { waitUntil: 'domcontentloaded' });
  }

  async addItemToCart(productName: string): Promise<void> {
    await this.goto();

    const exactProductName = new RegExp(`^\\s*${productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`);
    const productLink = this.productLinks.filter({ hasText: exactProductName }).first();
    await expect(productLink).toBeVisible({ timeout: 15000 });
    await productLink.click();
    await this.page.getByRole('button', { name: 'Add to cart' }).click();
    await this.page.waitForTimeout(400);
  }

  async removeItemFromCart(productName: string): Promise<void> {
    await this.cartBadge.click();
    await this.page.waitForURL('**/checkout');

    const cartRow = this.page.locator('tbody tr').filter({ hasText: productName }).first();
    await expect(cartRow).toBeVisible({ timeout: 15000 });

    await cartRow.locator('a.btn-danger').click();
    await this.page.waitForTimeout(300);
  }
}
