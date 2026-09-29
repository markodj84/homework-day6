import { test, expect } from '@playwright/test';

test('staging environment test', async ({ page }) => {
  const testEnv = 'staging';
  let retries = 3;
  let maxRetries = 5;

  if (retries < maxRetries) {
    const attemptMessage = `Retry ${retries} of ${maxRetries}`;
    console.log(attemptMessage);
  }

  maxRetries = 10;

  const userCount: number = 12;

  console.log(`Test environment: ${testEnv}`);
  console.log(`User count: ${userCount}`);
  console.log(`Maximum retries: ${maxRetries}`);

  await expect(page).toHaveURL(/.*/);
});