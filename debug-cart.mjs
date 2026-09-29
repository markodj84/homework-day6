import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.goto('https://practicesoftwaretesting.com/auth/login', { waitUntil: 'domcontentloaded' });
await page.locator('#email').fill('customer3@practicesoftwaretesting.com');
await page.locator('#password').fill('pass123');
await page.getByRole('button', { name: /^login$/i }).click();
await page.waitForLoadState('networkidle');
await page.goto('https://practicesoftwaretesting.com/', { waitUntil: 'domcontentloaded' });

const add = async (name) => {
  await page.locator('h5.card-title').filter({ hasText: name }).first().click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.waitForTimeout(1000);
  console.log('ADDED', name, 'badge=', JSON.stringify(await page.locator('a[aria-label="cart"]').textContent()));
};

await add('Combination Pliers');
await add('Pliers');
console.log('BADGE BEFORE CART', JSON.stringify(await page.locator('a[aria-label="cart"]').textContent()));
await page.locator('a[aria-label="cart"]').click();
await page.waitForTimeout(2000);

console.log('CART URL', page.url());
const bodyText = await page.locator('body').innerText();
console.log('BODY', bodyText.slice(0, 4000));
console.log('BUTTONS', JSON.stringify(await page.locator('button').evaluateAll((nodes) => nodes.map((n) => n.textContent.trim())), null, 2));
console.log('LINKS', JSON.stringify(await page.locator('a').evaluateAll((nodes) => nodes.map((n) => n.textContent.trim())), null, 2));

await browser.close();
