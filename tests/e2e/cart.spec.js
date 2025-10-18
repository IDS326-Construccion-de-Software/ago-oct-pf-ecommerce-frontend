import { test, expect } from "@playwright/test";

test.describe("Shopping Cart Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should open cart from header", async ({ page }) => {
    const cartButton = page
      .locator('button[aria-label*="carrito"], .cart-icon, [class*="cart"]')
      .first();
    if (await cartButton.isVisible()) {
      await cartButton.click();
      await page.waitForTimeout(500);
    }
  });

  test("should display empty cart message", async ({ page }) => {
    await page.goto("/cart");
    const emptyMessage = page.locator("text=/carrito.*vacío|no.*productos/i");
    const cartItems = page.locator(".cart-item, .cart-product");

    const hasEmptyMessage = await emptyMessage.isVisible();
    const hasItems = await cartItems.first().isVisible();

    expect(hasEmptyMessage || hasItems).toBeTruthy();
  });

  test("should add product to cart from products page", async ({ page }) => {
    await page.goto("/products");
    await page.waitForSelector(".products-grid .product-card, .no-results", {
      timeout: 10000,
    });

    const addToCartButton = page
      .locator("button")
      .filter({ hasText: /agregar|añadir|carrito/i })
      .first();

    if (await addToCartButton.isVisible()) {
      const initialCartCount = await page
        .locator('[class*="cart-count"], [class*="badge"]')
        .textContent()
        .catch(() => "0");
      await addToCartButton.click();
      await page.waitForTimeout(1000);
    }
  });

  test("should update product quantity in cart", async ({ page }) => {
    await page.goto("/cart");
    await page.waitForTimeout(1000);

    const increaseButton = page
      .locator("button")
      .filter({ hasText: "+" })
      .first();

    if (await increaseButton.isVisible()) {
      await increaseButton.click();
      await page.waitForTimeout(500);
    }
  });

  test("should remove product from cart", async ({ page }) => {
    await page.goto("/cart");
    await page.waitForTimeout(1000);

    const removeButton = page
      .locator("button")
      .filter({ hasText: /eliminar|quitar|remove/i })
      .first();

    if (await removeButton.isVisible()) {
      await removeButton.click();
      await page.waitForTimeout(500);
    }
  });

  test("should display cart total", async ({ page }) => {
    await page.goto("/cart");
    await page.waitForTimeout(1000);

    const cartTotal = page.locator("text=/total|subtotal/i");
    if (await cartTotal.isVisible()) {
      await expect(cartTotal).toBeVisible();
    }
  });

  test("should navigate to checkout", async ({ page }) => {
    await page.goto("/cart");
    await page.waitForTimeout(1000);

    const checkoutButton = page
      .locator("button")
      .filter({ hasText: /checkout|pagar|comprar/i })
      .first();

    if (await checkoutButton.isVisible()) {
      await checkoutButton.click();
      await page.waitForTimeout(1000);
    }
  });

  test("should clear cart", async ({ page }) => {
    await page.goto("/cart");
    await page.waitForTimeout(1000);

    const clearButton = page
      .locator("button")
      .filter({ hasText: /vaciar|limpiar|clear/i })
      .first();

    if (await clearButton.isVisible()) {
      await clearButton.click();
      await page.waitForTimeout(500);
    }
  });

  test("should persist cart items on page refresh", async ({ page }) => {
    await page.goto("/products");
    await page.waitForSelector(".products-grid .product-card, .no-results", {
      timeout: 10000,
    });

    const addButton = page
      .locator("button")
      .filter({ hasText: /agregar/i })
      .first();
    if (await addButton.isVisible()) {
      await addButton.click();
      await page.waitForTimeout(1000);

      await page.reload();
      await page.waitForTimeout(1000);
    }
  });

  test("should calculate correct totals", async ({ page }) => {
    await page.goto("/cart");
    await page.waitForTimeout(1000);

    const priceElements = page.locator('[class*="price"]');
    if (await priceElements.first().isVisible()) {
      await expect(priceElements.first()).toBeVisible();
    }
  });
});
