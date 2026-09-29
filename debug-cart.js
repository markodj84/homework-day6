const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://practicesoftwaretesting.com/auth/login', { waitUntil: 'domcontentloaded' });
  await page.locator('#email').fill('customer3@practicesoftwaretesting.com');
  await page.locator('#password').fill('pass123');
  await page.getByRole('button', { name: /^login$/i }).click();
  await page.waitForURL('**/', { timeout: 30000 });

  const add = async (name) => {
    await page.locator('h5.card-title').filter({ hasText: name }).first().click();
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.waitForTimeout(500);
  };

  await add('Combination Pliers');
  await add('Pliers');
  console.log('badge before cart', JSON.stringify(await page.locator('a[aria-label="cart"]').textContent()));

  await page.locator('a[aria-label="cart"]').click();
  await page.waitForTimeout(1000);

  const buttons = await page.locator('button').evaluateAll((nodes) => nodes.map((n) => n.textContent.trim()));
  console.log('buttons', JSON.stringify(buttons, null, 2));

  const links = await page.locator('a').evaluateAll((nodes) => nodes.map((n) => n.textContent.trim()));
  console.log('links', JSON.stringify(links.slice(0, 200), null, 2));

  const rows = await page.locator('.card').evaluateAll((nodes) => nodes.map((n) => n.textContent.trim()));
  console.log('card texts', JSON.stringify(rows.slice(0, 20), null, 2));

  await browser.close();
})();
