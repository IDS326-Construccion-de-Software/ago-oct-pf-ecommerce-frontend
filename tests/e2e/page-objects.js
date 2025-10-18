export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = "/") {
    await this.page.goto(path);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  async takeScreenshot(name) {
    await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: true,
    });
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async isElementVisible(selector) {
    return await this.page.locator(selector).isVisible();
  }

  async clickElement(selector) {
    await this.page.locator(selector).click();
  }

  async fillInput(selector, value) {
    await this.page.locator(selector).fill(value);
  }

  async getText(selector) {
    return await this.page.locator(selector).textContent();
  }
}

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = 'input[type="email"]';
    this.passwordInput = 'input[type="password"]';
    this.loginButton = 'button[type="submit"]';
    this.errorMessage = ".auth-error";
    this.registerLink = "text=Regístrate aquí";
  }

  async login(email, password) {
    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async goToRegister() {
    await this.clickElement(this.registerLink);
  }
}

export class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.productGrid = ".products-grid";
    this.productCard = ".product-card";
    this.filtersSidebar = ".filters-sidebar";
    this.categoryFilter = "select";
    this.addToCartButton = "button";
  }

  async getProductCount() {
    return await this.page.locator(this.productCard).count();
  }

  async filterByCategory(category) {
    await this.page.locator(this.categoryFilter).first().selectOption(category);
  }

  async addFirstProductToCart() {
    const addButton = this.page
      .locator(this.addToCartButton)
      .filter({ hasText: /agregar/i })
      .first();
    await addButton.click();
  }

  async clickProduct(index = 0) {
    await this.page.locator(this.productCard).nth(index).click();
  }
}

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = ".cart-item";
    this.removeButton = "button";
    this.quantityInput = 'input[type="number"]';
    this.checkoutButton = "button";
    this.totalPrice = '[class*="total"]';
  }

  async getCartItemsCount() {
    return await this.page.locator(this.cartItems).count();
  }

  async removeItem(index = 0) {
    const removeBtn = this.page
      .locator(this.removeButton)
      .filter({ hasText: /eliminar/i })
      .nth(index);
    await removeBtn.click();
  }

  async updateQuantity(index, quantity) {
    await this.page
      .locator(this.quantityInput)
      .nth(index)
      .fill(quantity.toString());
  }

  async proceedToCheckout() {
    const checkout = this.page
      .locator(this.checkoutButton)
      .filter({ hasText: /checkout|pagar/i })
      .first();
    await checkout.click();
  }

  async getTotalPrice() {
    return await this.getText(this.totalPrice);
  }
}

export class OrdersPage extends BasePage {
  constructor(page) {
    super(page);
    this.ordersGrid = '[class*="order"]';
    this.orderCard = '[class*="order-card"]';
    this.filterStatus = "select";
    this.searchInput = 'input[type="text"]';
    this.pagination = '[class*="pagination"]';
  }

  async getOrdersCount() {
    return await this.page.locator(this.orderCard).count();
  }

  async filterByStatus(status) {
    await this.page.locator(this.filterStatus).selectOption(status);
  }

  async searchOrder(query) {
    await this.fillInput(this.searchInput, query);
  }

  async openOrderDetails(index = 0) {
    await this.page.locator(this.orderCard).nth(index).click();
  }

  async goToNextPage() {
    const nextBtn = this.page
      .locator("button")
      .filter({ hasText: /siguiente/i })
      .first();
    await nextBtn.click();
  }
}
