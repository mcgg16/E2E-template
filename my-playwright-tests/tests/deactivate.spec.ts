import { test, expect } from "./fixtures"


test("deactivate", async ({ authenticatedPage: page }) => {

      await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - heading "Admin — Manage Users" [level=4]
    - button "Logout"
    - table:
      - rowgroup:
        - row "Name Email Role Status Actions":
          - columnheader "Name":
            - strong: Name
          - columnheader "Email":
            - strong: Email
          - columnheader "Role":
            - strong: Role
          - columnheader "Status":
            - strong: Status
          - columnheader "Actions":
            - strong: Actions
      - rowgroup:
        - row "Admin User admin@test.com admin Active Deactivate Delete":
          - cell "Admin User"
          - cell "admin@test.com"
          - cell "admin"
          - cell "Active"
          - cell "Deactivate Delete":
            - button "Deactivate"
            - button "Delete"
        - row "John Doe john@test.com user Active Deactivate Delete":
          - cell "John Doe"
          - cell "john@test.com"
          - cell "user"
          - cell "Active"
          - cell "Deactivate Delete":
            - button "Deactivate"
            - button "Delete"
        - row "Jane Smith jane@test.com user Inactive Activate Delete":
          - cell "Jane Smith"
          - cell "jane@test.com"
          - cell "user"
          - cell "Inactive"
          - cell "Activate Delete":
            - button "Activate"
            - button "Delete"
    `);
      await page.getByRole('button', { name: 'Deactivate' }).first().click();
      await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - heading "Admin — Manage Users" [level=4]
    - button "Logout"
    - table:
      - rowgroup:
        - row "Name Email Role Status Actions":
          - columnheader "Name":
            - strong: Name
          - columnheader "Email":
            - strong: Email
          - columnheader "Role":
            - strong: Role
          - columnheader "Status":
            - strong: Status
          - columnheader "Actions":
            - strong: Actions
      - rowgroup:
        - row "Admin User admin@test.com admin Inactive Activate Delete":
          - cell "Admin User"
          - cell "admin@test.com"
          - cell "admin"
          - cell "Inactive"
          - cell "Activate Delete":
            - button "Activate"
            - button "Delete"
        - row "John Doe john@test.com user Active Deactivate Delete":
          - cell "John Doe"
          - cell "john@test.com"
          - cell "user"
          - cell "Active"
          - cell "Deactivate Delete":
            - button "Deactivate"
            - button "Delete"
        - row "Jane Smith jane@test.com user Inactive Activate Delete":
          - cell "Jane Smith"
          - cell "jane@test.com"
          - cell "user"
          - cell "Inactive"
          - cell "Activate Delete":
            - button "Activate"
            - button "Delete"
    `);
      await page.getByRole('button', { name: 'Activate' }).first().click();
      await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - heading "Admin — Manage Users" [level=4]
    - button "Logout"
    - table:
      - rowgroup:
        - row "Name Email Role Status Actions":
          - columnheader "Name":
            - strong: Name
          - columnheader "Email":
            - strong: Email
          - columnheader "Role":
            - strong: Role
          - columnheader "Status":
            - strong: Status
          - columnheader "Actions":
            - strong: Actions
      - rowgroup:
        - row "Admin User admin@test.com admin Active Deactivate Delete":
          - cell "Admin User"
          - cell "admin@test.com"
          - cell "admin"
          - cell "Active"
          - cell "Deactivate Delete":
            - button "Deactivate"
            - button "Delete"
        - row "John Doe john@test.com user Active Deactivate Delete":
          - cell "John Doe"
          - cell "john@test.com"
          - cell "user"
          - cell "Active"
          - cell "Deactivate Delete":
            - button "Deactivate"
            - button "Delete"
        - row "Jane Smith jane@test.com user Inactive Activate Delete":
          - cell "Jane Smith"
          - cell "jane@test.com"
          - cell "user"
          - cell "Inactive"
          - cell "Activate Delete":
            - button "Activate"
            - button "Delete"
    `);
      await page.getByRole('button', { name: 'Deactivate' }).nth(1).click();
      await page.screenshot({
            path: `test-results/screenshot-${Date.now()}.png`
      });


      const page2 = await page.context().newPage();


      await page2.goto('http://localhost:5173');
      await page.waitForTimeout(500) // Small delay after filling

      await page2.fill('input[type="email"]', 'john@test.com');
      await page2.fill('input[type="password"]', 'pass123');
      await page2.getByRole('button', { name: 'Login' }).click();


      // Take screenshot of first tab
      await page.screenshot({
            path: `test-results/admin-tab-${Date.now()}.png`
      });

      // Take screenshot of second tab
      await page2.screenshot({
            path: `test-results/user-tab-${Date.now()}.png`
      });



})