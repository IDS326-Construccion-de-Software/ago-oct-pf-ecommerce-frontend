export const TEST_USERS = {
  validUser: {
    email: "test@example.com",
    password: "TestPassword123!",
    name: "Test User",
  },
  invalidUser: {
    email: "invalid@example.com",
    password: "wrongpassword",
  },
};

export const TEST_PRODUCTS = {
  sampleProduct: {
    name: "Test Product",
    price: 99.99,
    category: "Electronics",
  },
};

export const TIMEOUTS = {
  short: 2000,
  medium: 5000,
  long: 10000,
  veryLong: 30000,
};

export const API_ENDPOINTS = {
  baseURL: "http://localhost:5215/api",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    testAuth0: "/auth/test-auth0",
  },
  products: {
    getAll: "/product",
    getById: (id) => `/product/${id}`,
  },
  categories: {
    getAll: "/category",
  },
  cart: {
    getByUser: (userId) => `/cart/user/${userId}`,
    getById: (id) => `/cart/${id}`,
  },
  orders: {
    getAll: "/order",
    getById: (id) => `/order/${id}`,
  },
};

export const SELECTORS = {
  auth: {
    emailInput: 'input[type="email"]',
    passwordInput: 'input[type="password"]',
    submitButton: 'button[type="submit"]',
    errorMessage: ".auth-error",
    successMessage: ".success-message",
  },
  navigation: {
    header: 'header, [class*="header"]',
    footer: 'footer, [class*="footer"]',
    logo: 'img[alt*="Logo"]',
    cartIcon: '[class*="cart"]',
  },
  products: {
    grid: ".products-grid",
    card: ".product-card",
    filters: ".filters-sidebar",
    addToCart: "button",
  },
  cart: {
    items: ".cart-item",
    total: '[class*="total"]',
    checkout: "button",
  },
  orders: {
    list: '[class*="order"]',
    card: '[class*="order-card"]',
    filters: '[class*="filter"]',
  },
};

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  products: "/products",
  cart: "/cart",
  orders: "/orders",
  profile: "/profile",
};

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const TEST_DATA = {
  validEmail: "test@example.com",
  invalidEmail: "invalid-email",
  shortPassword: "123",
  validPassword: "SecurePass123!",
  emptyString: "",
  longString: "a".repeat(1000),
};
