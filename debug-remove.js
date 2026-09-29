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
    await page.locator('h5.card-title').filter({ hasText: name }).first().click();
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.waitForTimeout(400);
  };

  await add('Combination Pliers');
  await add('Pliers');
  await page.locator('a[aria-label="cart"]').click();
  await page.waitForTimeout(1500);

  const buttons = await page.locator('button').evaluateAll((nodes) => nodes.map((n) => n.textContent.trim()));
  console.log('BUTTONS', JSON.stringify(buttons, null, 2));

  const ariaButtons = await page.locator('button[aria-label]').evaluateAll((nodes) => nodes.map((n) => ({ label: n.getAttribute('aria-label'), text: n.textContent.trim() })));
  console.log('ARIA BUTTONS', JSON.stringify(ariaButtons, null, 2));

  const bodyText = await page.locator('body').textContent();
  console.log('BODY SAMPLE', bodyText.slice(0, 3000));

  await browser.close();
})();
