const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://practicesoftwaretesting.com/auth/login', { waitUntil: 'domcontentloaded' });
  await page.locator('#email').fill('customer3@practicesoftwaretesting.com');
  await page.locator('#password').fill('pass123');
  await page.getByRole('button', { name: /^login$/i }).click();
  await page.waitForURL('**/account', { timeout: 30000 });
  await page.goto('https://practicesoftwaretesting.com/', { waitUntil: 'domcontentloaded' });

  const addProduct = async (name) => {
    const link = page.locator('h5.card-title').filter({ hasText: new RegExp('^\\s*' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$') }).first();
    await link.click();
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.waitForTimeout(500);
  };

  await addProduct('Slip Joint Pliers');
  await addProduct('Bolt Cutters');

  await page.locator('a[aria-label="cart"]').click();
  await page.waitForURL('**/checkout', { timeout: 15000 });

  const totalRows = await page.locator('tbody tr').count();
  console.log('row count:', totalRows);
  console.log('all row texts:', JSON.stringify(await page.locator('tbody tr').evaluateAll(rows => rows.map(r => r.innerText.trim()))));
  console.log('product titles:', JSON.stringify(await page.locator('[data-test="product-title"]').allTextContents()));
  console.log('remove count:', await page.locator('a.btn-danger').count());

  await browser.close();
})();
