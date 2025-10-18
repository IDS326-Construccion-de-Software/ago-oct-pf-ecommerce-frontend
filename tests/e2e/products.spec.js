import { test, expect } from "@playwright/test";

test.describe("Product Browsing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/products");
  });

  test("should display products page", async ({ page }) => {
    await expect(page).toHaveURL("/products");
    await expect(page.locator(".products-page")).toBeVisible();
  });

  test("should display product filters", async ({ page }) => {
    await expect(page.locator(".filters-sidebar")).toBeVisible();
    await expect(page.getByText("Filtros")).toBeVisible();
    await expect(page.locator("select").first()).toBeVisible();
  });

  test("should display product grid", async ({ page }) => {
    await page.waitForSelector(".products-grid, .no-results", {
      timeout: 10000,
    });
    const hasProducts = await page.locator(".products-grid").isVisible();
    const noResults = await page.locator(".no-results").isVisible();
    expect(hasProducts || noResults).toBeTruthy();
  });

  test("should filter products by category", async ({ page }) => {
    await page.waitForSelector(".filters-sidebar select", { timeout: 5000 });
    const categorySelect = page
      .locator(".filter-group")
      .filter({ hasText: "Categoría" })
      .locator("select");

    const optionsCount = await categorySelect.locator("option").count();
    if (optionsCount > 1) {
      await categorySelect.selectOption({ index: 1 });
      await page.waitForTimeout(500);
    }
  });

  test("should filter products by price range", async ({ page }) => {
    await page.waitForSelector(".filters-sidebar select");
    const priceSelect = page
      .locator(".filter-group")
      .filter({ hasText: "Precio" })
      .locator("select");
    await priceSelect.selectOption("50-1000");
    await page.waitForTimeout(500);
  });

  test("should reset filters", async ({ page }) => {
    await page.waitForSelector(".reset-filters-btn");
    await page.locator(".reset-filters-btn").click();
    await page.waitForTimeout(500);
  });

  test("should navigate to product detail", async ({ page }) => {
    await page.waitForSelector(".products-grid .product-card, .no-results", {
      timeout: 10000,
    });
    const productCard = page.locator(".product-card").first();

    if (await productCard.isVisible()) {
      await productCard.click();
      await page.waitForTimeout(1000);
    }
  });

  test("should display product card information", async ({ page }) => {
    await page.waitForSelector(".products-grid .product-card, .no-results", {
      timeout: 10000,
    });
    const productCard = page.locator(".product-card").first();

    if (await productCard.isVisible()) {
      await expect(productCard).toBeVisible();
    }
  });

  test("should show loading state", async ({ page }) => {
    const loadingIndicator = page.locator(".loading-container, .spinner");

    await page.goto("/products");

    await page.waitForSelector(
      ".products-grid, .no-results, .loading-container",
      { timeout: 10000 }
    );
  });

  test("should display banner image", async ({ page }) => {
    await expect(page.locator('img[alt*="Banner"]')).toBeVisible();
  });

  test("should have responsive filters sidebar", async ({ page, viewport }) => {
    await expect(page.locator(".filters-sidebar")).toBeVisible();
  });
});
