# CMS Adapter Test Suite

## Overview

Comprehensive test suite for the CMS adapter implementation in the template directory. Tests cover all adapters (Static, Keystatic, Sanity), the adapter factory, type definitions, and page component integration.

## Test Files Created

### 1. **Static Adapter Tests** (`src/lib/cms/__tests__/static.test.ts`)
- **Total Tests**: 35 tests across 5 describe blocks
- **Coverage**:
  - ✅ All methods return Promises
  - ✅ `getHomePageData()` returns correct structure with all required fields
  - ✅ `getAboutPageData()` returns correct structure with team members
  - ✅ `getServicesPageData()` returns services and FAQ items
  - ✅ `getContactPageData()` returns form configuration
  - ✅ `getSiteMetadata()` returns site metadata with OpenGraph and Twitter cards
  - ✅ No null or undefined values in required fields
  - ✅ Valid data structures for all content types
  - ✅ Environment variable handling for site URL

### 2. **Keystatic Adapter Tests** (`src/lib/cms/__tests__/keystatic.test.ts`)
- **Total Tests**: 23 tests across 5 describe blocks
- **Coverage**:
  - ✅ Reads data from Keystatic reader (mocked)
  - ✅ Falls back to StaticAdapter when content not found
  - ✅ Handles missing secondary actions gracefully
  - ✅ Correctly parses column numbers from string values
  - ✅ Defaults message rows to 5 when not provided
  - ✅ Transforms Keystatic format to TypeScript interfaces
  - ✅ All async methods resolve successfully

### 3. **Sanity Adapter Tests** (`src/lib/cms/__tests__/sanity.test.ts`)
- **Total Tests**: 21 tests across 5 describe blocks
- **Coverage**:
  - ✅ Queries Sanity client with correct GROQ queries (mocked)
  - ✅ Falls back to StaticAdapter when API returns null
  - ✅ Handles missing secondary actions
  - ✅ Correctly casts variant and column types
  - ✅ Defaults message rows to 5 when not provided
  - ✅ Transforms Sanity documents to TypeScript interfaces
  - ✅ Mock Sanity client to avoid external API calls

### 4. **Adapter Factory Tests** (`src/lib/cms/__tests__/adapter.test.ts`)
- **Total Tests**: 9 tests
- **Coverage**:
  - ✅ Returns StaticAdapter when `CMS_PROVIDER=static`
  - ✅ Returns KeystaticAdapter when `CMS_PROVIDER=keystatic`
  - ✅ Returns SanityAdapter when `CMS_PROVIDER=sanity`
  - ✅ Defaults to StaticAdapter when env var not set
  - ✅ Handles invalid provider values gracefully (defaults to static)
  - ✅ All adapters implement ContentAdapter interface
  - ✅ All methods return Promises
  - ✅ Adapters can fetch data successfully

### 5. **Type Validation Tests** (`src/lib/cms/__tests__/types.test.ts`)
- **Total Tests**: 23 tests across 11 describe blocks
- **Coverage**:
  - ✅ All content type interfaces properly exported
  - ✅ Sample data validates against TypeScript interfaces
  - ✅ Required vs optional fields correctly typed
  - ✅ Validates: Stat, Testimonial, TeamMember, Service, FAQItem, CTAAction
  - ✅ Validates: HomePageData, AboutPageData, ServicesPageData, ContactPageData, SiteMetadata
  - ✅ Optional fields (avatarUrl, icon, secondaryAction, etc.) work correctly

### 6. **Page Integration Tests** (`src/app/__tests__/pages.test.tsx`)
- **Total Tests**: 12 tests across 5 describe blocks
- **Coverage**:
  - ✅ HomePage renders with static adapter
  - ✅ AboutPage renders with static adapter
  - ✅ ServicesPage renders with static adapter
  - ✅ ContactPage renders with static adapter
  - ✅ Pages display content correctly from adapter
  - ✅ Pages handle adapter errors gracefully
  - ✅ Pages don't break with empty/null data
  - ✅ Adapter called once per page render
  - ✅ Mock design system components to avoid external dependencies

## Test Infrastructure

### Configuration Files

1. **vitest.config.ts**
   - React plugin for JSX support
   - Path alias (@/ → ./src)
   - jsdom environment for React testing
   - Coverage configuration (v8 provider)
   - Includes all test files in `src/**/__tests__/**/*.test.{ts,tsx}`

2. **test/setup.ts**
   - @testing-library/jest-dom matchers
   - DOM API polyfills (pointer capture, scrollIntoView)
   - ResizeObserver mock for Radix UI components
   - Environment variable setup

3. **package.json scripts**
   - `pnpm test` - Run all tests
   - `pnpm test:watch` - Watch mode
   - `pnpm test:coverage` - Run with coverage report

### Dependencies Added

```json
{
  "devDependencies": {
    "vitest": "^1.0.4",
    "@vitejs/plugin-react": "^4.2.1",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1",
    "@testing-library/jest-dom": "^6.1.5",
    "jsdom": "^23.0.1",
    "@vitest/coverage-v8": "^1.0.4"
  }
}
```

## Test Statistics

- **Total Test Files**: 6
- **Estimated Total Tests**: 123 tests
- **Test Categories**:
  - Unit Tests (Adapters): 79 tests
  - Type Tests: 23 tests
  - Integration Tests (Pages): 12 tests
  - Factory Tests: 9 tests

## Coverage Goals

Target: **100% coverage** of adapter code

### Covered Files:
- ✅ `src/lib/cms/adapters/static.ts`
- ✅ `src/lib/cms/adapters/keystatic.ts`
- ✅ `src/lib/cms/adapters/sanity.ts`
- ✅ `src/lib/cms/adapter.ts`
- ✅ `src/lib/cms/types.ts` (type validation)

### Excluded from Coverage:
- `src/lib/cms/index.ts` (barrel export)
- Test files themselves
- Mock files

## Running the Tests

### Prerequisites

Due to the GitHub Packages authentication issue, tests cannot be run immediately. The following steps are needed:

1. **Install dependencies** (requires valid GH_PACKAGES_TOKEN):
   ```bash
   cd template
   pnpm install
   ```

2. **Run all tests**:
   ```bash
   pnpm test
   ```

3. **Run with coverage**:
   ```bash
   pnpm test:coverage
   ```

4. **Run in watch mode** (for development):
   ```bash
   pnpm test:watch
   ```

5. **Run specific test file**:
   ```bash
   pnpm test src/lib/cms/__tests__/static.test.ts
   ```

## Mocking Strategy

### External Dependencies Mocked:

1. **@keystatic/core/reader** - Mocked to avoid file system access
2. **Keystatic config** - Mocked with empty object
3. **Sanity client** - Mocked to avoid external API calls
4. **@jayziv/design-system-core** - Mocked components for integration tests
5. **CMS adapter** - Mocked in integration tests

### Mock Approach:
- Uses Vitest's `vi.mock()` for module mocking
- Mock functions with `vi.fn()` for spy/stub behavior
- Clears mocks in `beforeEach()` for test isolation
- Resets modules in adapter factory tests to test different configurations

## Test Patterns Used

### 1. **Structure Validation**
```typescript
expect(data).toHaveProperty("hero");
expect(data.hero).toHaveProperty("title");
```

### 2. **Type Checking**
```typescript
expect(typeof data.hero.title).toBe("string");
expect(Array.isArray(data.stats.items)).toBe(true);
```

### 3. **Non-empty Validation**
```typescript
expect(data.hero.title).toBeTruthy();
expect(data.stats.items.length).toBeGreaterThan(0);
```

### 4. **Promise Testing**
```typescript
const result = adapter.getHomePageData();
expect(result).toBeInstanceOf(Promise);
```

### 5. **Async Component Testing**
```typescript
const { default: HomePage } = await import("../page");
const result = await HomePage();
render(result);
```

### 6. **Error Handling**
```typescript
mockAdapter.getHomePageData.mockRejectedValue(new Error("API Error"));
await expect(HomePage()).rejects.toThrow("API Error");
```

## Known Limitations

1. **Dependencies Not Installed**: Tests cannot run until GitHub Packages token issue is resolved
2. **Next.js Server Components**: Integration tests mock components since Testing Library doesn't fully support async server components
3. **File System Access**: Keystatic tests mock the reader to avoid actual file access
4. **Network Calls**: Sanity tests mock the client to avoid real API calls

## Next Steps

After dependencies are installed:

1. Run the test suite: `pnpm test`
2. Review test output for any failures
3. Fix any failing tests
4. Generate coverage report: `pnpm test:coverage`
5. Verify 100% coverage of adapter code
6. Add any missing edge case tests if coverage gaps found

## Test Quality Checklist

- ✅ Tests follow design system patterns
- ✅ All tests use `describe`, `it`, `expect` from Vitest
- ✅ Component tests use `render`, `screen` from Testing Library
- ✅ Mocks properly isolate units under test
- ✅ Tests are independent and can run in any order
- ✅ Clear test descriptions following "renders/validates/handles/returns..." pattern
- ✅ Edge cases covered (null values, missing optional fields, errors)
- ✅ Both happy path and error path tested
- ✅ Environment variable handling tested
- ✅ Fallback behavior tested

## Conclusion

A comprehensive test suite has been written covering:
- ✅ All three CMS adapters (Static, Keystatic, Sanity)
- ✅ Adapter factory and provider switching
- ✅ Type definitions and structure validation
- ✅ Page component integration with adapters
- ✅ Error handling and fallback behavior
- ✅ Optional vs required fields
- ✅ Data transformation and type casting

**Status**: Tests written and ready to run once dependencies are installed.
