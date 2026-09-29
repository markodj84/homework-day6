import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';

const DEMO_EMAIL = 'customer3@practicesoftwaretesting.com';
const DEMO_PASSWORD = 'pass123';

test.describe.serial('Homework 3 - Toolshop cart scenarios', () => {
  test('adding item adds two products to the cart badge', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await loginPage.login(DEMO_EMAIL, DEMO_PASSWORD);
    await homePage.goto();

    await homePage.addItemToCart('Slip Joint Pliers'); //NOTE: During the test Combination Pliers and Pliers were Out of Stock, different prtoducts were used instead
    await homePage.addItemToCart('Bolt Cutters'); //NOTE: During the test Combination Pliers and Pliers were Out of Stock, different prtoducts were used instead

    await expect(homePage.cartBadge).toHaveText('2');
  });

  test('removing one item reduces the cart badge from 2 to 1', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await loginPage.login(DEMO_EMAIL, DEMO_PASSWORD);
    await homePage.goto();

    await homePage.addItemToCart('Slip Joint Pliers'); //NOTE: During the test Combination Pliers and Pliers were Out of Stock, different prtoducts were used instead
    await homePage.addItemToCart('Bolt Cutters'); //NOTE: During the test Combination Pliers and Pliers were Out of Stock, different prtoducts were used instead
    await homePage.removeItemFromCart('Bolt Cutters'); //NOTE: During the test Combination Pliers and Pliers were Out of Stock, different prtoducts were used instead

    await expect(homePage.cartBadge).toHaveText('1');
  });
});
