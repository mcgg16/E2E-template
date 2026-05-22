import { test, expect } from '@playwright/test';

// Deactivate
test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');


  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Deactivate' }).first().click();
  await page.getByRole('button', { name: 'Activate' }).first().click();
  await page.getByRole('button', { name: 'Deactivate' }).nth(1).click();
  await page.getByRole('button', { name: 'Deactivate' }).nth(1).click();
  await page.getByRole('button', { name: 'Activate' }).nth(2).click();
  await page.getByRole('button', { name: 'Activate' }).nth(2).click();
});