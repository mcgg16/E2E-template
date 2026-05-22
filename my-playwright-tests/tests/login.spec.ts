import { test, expect } from '@playwright/test';

test('user can login with valid credentials', async ({ page }) => {
  // Navigate to app
  await page.goto('http://localhost:5173/login');

  // Fill in credentials


  await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');



  // Click login button
  await page.click('button:has-text("Login")');

  // Wait for and verify success
  await expect(page).toHaveURL('http://localhost:5173/admin');

  await expect(page.getByRole('heading', { name: 'Admin — Manage Users' })).toBeVisible();

});