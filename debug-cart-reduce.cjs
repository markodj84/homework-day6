const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://practicesoftwaretesting.com/auth/login', { waitUntil: 'domcontentloaded' });
  await page.locator('#email').fill('customer3@practicesoftwaretesting.com');
  await page.locator('#password').fill('pass123');
  await page.getByRole('button', { name: /^login$/i }).click();
  await page.waitForTimeout(1500);
  await page.goto('https://practicesoftwaretesting.com/', { waitUntil: 'domcontentloaded' });

  const add = async (name) => {
    await page.getByRole('heading', { name, exact: true }).click();
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.waitForTimeout(500);
  };

  await add('Combination Pliers');
  await add('Pliers');
  console.log('badge after add:', await page.locator('a[aria-label="cart"]').textContent());
  await page.locator('a[aria-label="cart"]').click();
  await page.waitForTimeout(1000);

  const countBefore = await page.locator('a.btn-danger').count();
  console.log('remove buttons before:', countBefore);
  const firstRemove = page.locator('a.btn-danger').first();
  console.log('first remove outer:', await firstRemove.evaluate((el) => el.outerHTML));
  await firstRemove.click();
  await page.waitForTimeout(2000);

  console.log('URL after remove:', page.url());
  console.log('cart visible count:', await page.locator('a[aria-label="cart"]').count());
  const cartText = await page.locator('a[aria-label="cart"]').allTextContents().catch(() => []);
  console.log('cart allTextContents:', JSON.stringify(cartText));
  console.log('body:', (await page.locator('body').innerText()).slice(0, 3000));

  await browser.close();
})();
