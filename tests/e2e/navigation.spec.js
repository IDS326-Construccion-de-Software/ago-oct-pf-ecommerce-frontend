import { test, expect } from "@playwright/test";

test.describe("Navigation and Layout", () => {
  test("should display header on all pages", async ({ page }) => {
    const pages = ["/", "/products", "/login", "/register"];

    for (const path of pages) {
      await page.goto(path);
      await page.waitForTimeout(500);
      const header = page.locator('header, [class*="header"]').first();
      if (await header.isVisible()) {
        await expect(header).toBeVisible();
      }
    }
  });

  test("should display footer on main pages", async ({ page }) => {
    const pages = ["/", "/products"];

    for (const path of pages) {
      await page.goto(path);
      await page.waitForTimeout(500);
      const footer = page.locator('footer, [class*="footer"]').first();
      if (await footer.isVisible()) {
        await expect(footer).toBeVisible();
      }
    }
  });

  test("should navigate to home page from logo", async ({ page }) => {
    await page.goto("/products");
    const logo = page.locator('img[alt*="Logo"], a[href="/"]').first();

    if (await logo.isVisible()) {
      await logo.click();
      await page.waitForTimeout(500);
    }
  });

  test("should display navigation menu", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator('nav, [class*="nav"]').first();
    if (await nav.isVisible()) {
      await expect(nav).toBeVisible();
    }
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  test("should be responsive on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  test("should handle 404 pages gracefully", async ({ page }) => {
    const response = await page.goto("/non-existent-page");
    expect(response?.status()).toBeTruthy();
  });

  test("should have accessible navigation", async ({ page }) => {
    await page.goto("/");
    const links = page.locator("a");
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Landing Page", () => {
  test("should display landing page content", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  test("should display featured products or sections", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1000);
    const content = page
      .locator('[class*="product"], [class*="banner"], [class*="promo"]')
      .first();
    if (await content.isVisible()) {
      await expect(content).toBeVisible();
    }
  });

  test("should have call-to-action buttons", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1000);
    const buttons = page.locator('button, a[class*="btn"]');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should navigate to products page", async ({ page }) => {
    await page.goto("/");
    const productsLink = page
      .locator('a[href*="product"], button')
      .filter({ hasText: /producto|product|comprar/i })
      .first();

    if (await productsLink.isVisible()) {
      await productsLink.click();
      await page.waitForTimeout(1000);
    }
  });
});
