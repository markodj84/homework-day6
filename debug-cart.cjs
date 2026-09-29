const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://practicesoftwaretesting.com/auth/login', { waitUntil: 'domcontentloaded' });
  await page.locator('#email').fill('customer3@practicesoftwaretesting.com');
  await page.locator('#password').fill('pass123');
  await page.getByRole('button', { name: /^login$/i }).click();
  await page.waitForURL('**/account', { timeout: 30000 });

  const add = async (name) => {
    await page.locator('h5.card-title').filter({ hasText: name }).first().click();
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.waitForTimeout(500);
  };

  await add('Combination Pliers');
  await add('Pliers');
  console.log('badge before cart', JSON.stringify(await page.locator('a[aria-label="cart"]').textContent()));

  await page.locator('a[aria-label="cart"]').click();
  await page.waitForTimeout(1500);

  console.log('URL', page.url());
  console.log('TITLE', await page.locator('h1').first().textContent());
  console.log('BODY START');
  console.log((await page.locator('body').innerText()).slice(0, 4000));
  console.log('BUTTONS', JSON.stringify(await page.locator('button').evaluateAll((nodes) => nodes.map((n) => n.textContent.trim())), null, 2));
  console.log('LINKS', JSON.stringify(await page.locator('a').evaluateAll((nodes) => nodes.map((n) => n.textContent.trim())), null, 2));
  console.log('TABLE ROWS', JSON.stringify(await page.locator('tr').evaluateAll((nodes) => nodes.map((n) => n.textContent.trim())), null, 2));

  await browser.close();
})();
