import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display login page", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("h2")).toContainText("Inicia sesión");
    await expect(page.getByPlaceholder("Ingrese su correo")).toBeVisible();
    await expect(page.getByPlaceholder("Ingrese su contraseña")).toBeVisible();
  });

  test("should show validation error for invalid email", async ({ page }) => {
    await page.goto("/login");
    await page.getByPlaceholder("Ingrese su correo").fill("invalid-email");
    await page.getByPlaceholder("Ingrese su contraseña").fill("password123");
    await page.getByRole("button", { name: /iniciar sesión/i }).click();
    await expect(page.locator(".auth-error")).toContainText("Correo inválido");
  });

  test("should show validation error for empty password", async ({ page }) => {
    await page.goto("/login");
    await page.getByPlaceholder("Ingrese su correo").fill("test@example.com");
    await page.getByRole("button", { name: /iniciar sesión/i }).click();
    await expect(page.locator(".auth-error")).toContainText(
      "Ingrese su contraseña"
    );
  });

  test("should navigate to registration page", async ({ page }) => {
    await page.goto("/login");
    await page.getByText("Regístrate aquí").click();
    await expect(page).toHaveURL("/register");
    await expect(page.locator("h2")).toContainText("Crea tu cuenta");
  });

  test("should display registration form step 1", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByPlaceholder("Ingrese su nombre")).toBeVisible();
    await expect(page.getByPlaceholder("Ingrese su correo")).toBeVisible();
    await expect(page.getByPlaceholder("Cree una contraseña")).toBeVisible();
    await expect(page.getByPlaceholder("Repita su contraseña")).toBeVisible();
  });

  test("should validate password match in registration", async ({ page }) => {
    await page.goto("/register");
    await page.getByPlaceholder("Ingrese su nombre").fill("Test User");
    await page.getByPlaceholder("Ingrese su correo").fill("test@example.com");
    await page.getByPlaceholder("Cree una contraseña").fill("password123");
    await page.getByPlaceholder("Repita su contraseña").fill("different");
    await page.getByRole("button", { name: "Siguiente" }).click();
    await expect(page.locator(".auth-error")).toContainText(
      "Las contraseñas no coinciden"
    );
  });

  test("should navigate to registration step 2", async ({ page }) => {
    await page.goto("/register");
    await page.getByPlaceholder("Ingrese su nombre").fill("Test User");
    await page.getByPlaceholder("Ingrese su correo").fill("test@example.com");
    await page.getByPlaceholder("Cree una contraseña").fill("password123");
    await page.getByPlaceholder("Repita su contraseña").fill("password123");
    await page.getByRole("button", { name: "Siguiente" }).click();

    await expect(page.getByPlaceholder(/teléfono/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Registrarse" })
    ).toBeVisible();
  });

  test("should toggle password visibility", async ({ page }) => {
    await page.goto("/login");
    const passwordInput = page.getByPlaceholder("Ingrese su contraseña");
    const toggleButton = page.locator(".eye-btn").first();

    await expect(passwordInput).toHaveAttribute("type", "password");
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "text");
  });

  test("should navigate to forgot password", async ({ page }) => {
    await page.goto("/login");
    await page.getByText("¿Olvidaste tu contraseña?").click();
    await expect(page).toHaveURL("/new-password");
  });
});
