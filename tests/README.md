# E2E Testing Suite

This directory contains end-to-end tests for the eCommerce application using Playwright.

## Test Structure

```
tests/e2e/
├── auth.spec.js          # Authentication flows (login, register)
├── products.spec.js      # Product browsing and filtering
├── cart.spec.js          # Shopping cart operations
├── orders.spec.js        # Order management
└── navigation.spec.js    # Navigation and layout
```

## Running Tests

### Local Development

```bash
# Run all tests
npm run test:e2e

# Run tests with UI mode
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug mode
npm run test:e2e:debug

# Run specific browser
npm run test:e2e:chromium
npm run test:e2e:firefox
npm run test:e2e:webkit

# Run mobile tests
npm run test:e2e:mobile
```

### Regression Testing

```bash
# Run full regression suite
npm run test:regression

# Run regression for CI
npm run test:regression:ci

# View test report
npm run test:report
```

## Test Configuration

Tests are configured in `playwright.config.js`:

- **baseURL**: http://localhost:5173
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5, iPhone 12
- **Retries**: 2 retries on CI, 0 locally
- **Parallel**: Full parallel execution
- **Reports**: HTML, JSON, JUnit, List

## CI/CD Integration

Tests run automatically on:
- Push to main, develop, or fix branches
- Pull requests
- Daily schedule (00:00 UTC)
- Manual trigger via GitHub Actions

## Test Reports

After running tests, view reports:

```bash
npm run test:report
```

Reports are generated in `test-results/` directory:
- HTML report: `test-results/html/index.html`
- JSON report: `test-results/results.json`
- JUnit report: `test-results/junit.xml`

## Writing Tests

### Best Practices

1. **Use data-testid attributes** for stable selectors
2. **Wait for elements** before interactions
3. **Use soft assertions** for multiple checks
4. **Keep tests independent** - no dependencies between tests
5. **Clean up after tests** - reset state when needed

### Example Test

```javascript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    await page.click('button');
    await expect(page.locator('.result')).toBeVisible();
  });
});
```

## Prerequisites

Before running tests:

1. **Backend running**: `http://localhost:5215`
2. **Frontend running**: `http://localhost:5173`
3. **Dependencies installed**: `npm install`
4. **Browsers installed**: `npx playwright install`

## Debugging

### Debug specific test

```bash
npx playwright test auth.spec.js --debug
```

### Run with trace

```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

### View test in UI mode

```bash
npm run test:e2e:ui
```

## Continuous Integration

GitHub Actions workflow (`.github/workflows/e2e-tests.yml`):

- Runs on multiple browsers in parallel
- Includes mobile testing
- Uploads test artifacts
- Generates test reports
- Runs on schedule (daily)

## Troubleshooting

### Tests timing out

Increase timeout in `playwright.config.js`:

```javascript
use: {
  actionTimeout: 15000,
  navigationTimeout: 30000,
}
```

### Flaky tests

- Add explicit waits
- Use `waitForLoadState('networkidle')`
- Increase retry count

### Backend not available

Ensure backend is running:

```bash
cd BE/Revenge.API
dotnet run
```

## Coverage

Tests cover:
- ✅ User authentication (login/register)
- ✅ Product browsing and filtering
- ✅ Shopping cart operations
- ✅ Order management
- ✅ Navigation and layout
- ✅ Responsive design (mobile/tablet)
- ✅ Error handling

## Future Enhancements

- [ ] Visual regression testing
- [ ] Performance testing
- [ ] Accessibility testing with @axe-core/playwright
- [ ] API testing integration
- [ ] Database seeding for tests
- [ ] Screenshot comparison
