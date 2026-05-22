/* eslint-disable react-hooks/rules-of-hooks */

import { test as base, expect } from "@playwright/test"
import type { Page } from "@playwright/test"
import "dotenv/config"
import dotenv from 'dotenv';
dotenv.config({ path: '../web/.env' });


type TestFixtures = {
  authenticatedPage: Page
}

export const test = base.extend<TestFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Navigate to login
    await page.goto("/login")


    await page.locator('input[type="Email"]').waitFor({ state: "visible" })


    await page.getByRole('textbox', { name: 'Email' }).fill(process.env.ADMIN_EMAIL!)
    
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ADMIN_PWD!)
    

    
    await page.click('button:has-text("Login")');

    
    await expect(page).toHaveURL('http://localhost:5173/admin');

    await expect(page.getByRole('heading', { name: 'Admin — Manage Users' })).toBeVisible();

    await use(page)
  },
})

export { expect }

// Add one to deactivate, can record a cursor to record actions. 
test('deactivate', async ({ page }) => {
  
})