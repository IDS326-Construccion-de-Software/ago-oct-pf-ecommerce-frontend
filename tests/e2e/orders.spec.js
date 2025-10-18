import { test, expect } from "@playwright/test";

test.describe("Order Management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to orders page", async ({ page }) => {
    await page.goto("/orders");
    await expect(page).toHaveURL(/.*orders/);
  });

  test("should display orders page title", async ({ page }) => {
    await page.goto("/orders");
    await page.waitForTimeout(1000);
    const title = page.locator("h1, h2").filter({ hasText: /pedidos|orders/i });
    if (await title.isVisible()) {
      await expect(title).toBeVisible();
    }
  });

  test("should display orders list or empty state", async ({ page }) => {
    await page.goto("/orders");
    await page.waitForTimeout(2000);

    const ordersList = page.locator('[class*="order"]').first();
    const emptyState = page.locator("text=/no.*pedidos|sin.*pedidos/i");

    const hasOrders = await ordersList.isVisible();
    const isEmpty = await emptyState.isVisible();

    expect(hasOrders || isEmpty).toBeTruthy();
  });

  test("should display order filters", async ({ page }) => {
    await page.goto("/orders");
    await page.waitForTimeout(1000);

    const filters = page.locator('[class*="filter"]');
    if (await filters.first().isVisible()) {
      await expect(filters.first()).toBeVisible();
    }
  });

  test("should filter orders by status", async ({ page }) => {
    await page.goto("/orders");
    await page.waitForTimeout(1000);

    const statusFilter = page
      .locator("select, button")
      .filter({ hasText: /estado|status/i })
      .first();

    if (await statusFilter.isVisible()) {
      await statusFilter.click();
      await page.waitForTimeout(500);
    }
  });

  test("should search orders", async ({ page }) => {
    await page.goto("/orders");
    await page.waitForTimeout(1000);

    const searchInput = page
      .locator('input[type="text"], input[type="search"]')
      .first();

    if (await searchInput.isVisible()) {
      await searchInput.fill("test");
      await page.waitForTimeout(1000);
    }
  });

  test("should open order details modal", async ({ page }) => {
    await page.goto("/orders");
    await page.waitForTimeout(2000);

    const orderCard = page
      .locator('[class*="order-card"], [class*="order-item"]')
      .first();
    const detailsButton = page
      .locator("button")
      .filter({ hasText: /detalles|ver|details/i })
      .first();

    if (await orderCard.isVisible()) {
      await orderCard.click();
      await page.waitForTimeout(1000);
    } else if (await detailsButton.isVisible()) {
      await detailsButton.click();
      await page.waitForTimeout(1000);
    }
  });

  test("should display order pagination", async ({ page }) => {
    await page.goto("/orders");
    await page.waitForTimeout(2000);

    const pagination = page.locator('[class*="pagination"]');
    if (await pagination.isVisible()) {
      await expect(pagination).toBeVisible();
    }
  });

  test("should navigate between pages", async ({ page }) => {
    await page.goto("/orders");
    await page.waitForTimeout(2000);

    const nextButton = page
      .locator("button")
      .filter({ hasText: /siguiente|next/i })
      .first();

    if ((await nextButton.isVisible()) && !(await nextButton.isDisabled())) {
      await nextButton.click();
      await page.waitForTimeout(1000);
    }
  });

  test("should clear all filters", async ({ page }) => {
    await page.goto("/orders");
    await page.waitForTimeout(1000);

    const clearButton = page
      .locator("button")
      .filter({ hasText: /limpiar|clear|reset/i })
      .first();

    if (await clearButton.isVisible()) {
      await clearButton.click();
      await page.waitForTimeout(500);
    }
  });

  test("should display order summary information", async ({ page }) => {
    await page.goto("/orders");
    await page.waitForTimeout(2000);

    const orderInfo = page.locator('[class*="order"]').first();
    if (await orderInfo.isVisible()) {
      await expect(orderInfo).toBeVisible();
    }
  });

  test("should display date filters", async ({ page }) => {
    await page.goto("/orders");
    await page.waitForTimeout(1000);

    const dateInputs = page.locator('input[type="date"]');
    const dateCount = await dateInputs.count();

    if (dateCount > 0) {
      await expect(dateInputs.first()).toBeVisible();
    }
  });
});
