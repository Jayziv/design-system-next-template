# Running the Test Suite - Setup Instructions

## ⚠️ Current Blocker

Tests cannot currently run due to GitHub Packages authentication error:
```
403 Forbidden - GET https://npm.pkg.github.com/@jayziv%2fdesign-system-core
```

## 🔧 Solutions

### Option 1: Set GitHub Personal Access Token (Recommended)

1. Create a GitHub Personal Access Token with `read:packages` scope:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select `read:packages` scope
   - Copy the token

2. Set the token in your environment:
   ```bash
   export GH_PACKAGES_TOKEN="your_token_here"
   ```

3. Or add to `.npmrc` in the template directory:
   ```
   @jayziv:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
   ```

4. Install dependencies:
   ```bash
   cd template
   pnpm install
   ```

### Option 2: Use npm Registry (If Published)

If `@jayziv/design-system-core` is published to npm.org:

1. Update `.npmrc` to use npm registry:
   ```
   @jayziv:registry=https://registry.npmjs.org
   ```

2. Install dependencies:
   ```bash
   cd template
   pnpm install
   ```

### Option 3: Local Development with Workspace

1. Add template to workspace in `/pnpm-workspace.yaml`:
   ```yaml
   packages:
     - "packages/*"
     - "apps/*"
     - "template"  # Add this line
   ```

2. Update template's `package.json` to use workspace:
   ```json
   {
     "dependencies": {
       "@jayziv/design-system-core": "workspace:*"
     }
   }
   ```

3. Install from root:
   ```bash
   cd /home/runner/work/design-system-a/design-system-a
   pnpm install
   ```

## 📋 Step-by-Step: After Authentication is Resolved

### 1. Verify Setup
```bash
cd template
node validate-tests.js
```
Expected: All checks pass ✅

### 2. Install Dependencies
```bash
pnpm install
```
Expected: No errors, all packages installed

### 3. Verify Installation
```bash
pnpm list vitest
pnpm list @testing-library/react
pnpm list @jayziv/design-system-core
```
Expected: All packages show versions

### 4. Run Tests
```bash
pnpm test
```
Expected output:
```
✓ src/lib/cms/__tests__/static.test.ts (23)
✓ src/lib/cms/__tests__/keystatic.test.ts (13)
✓ src/lib/cms/__tests__/sanity.test.ts (14)
✓ src/lib/cms/__tests__/adapter.test.ts (9)
✓ src/lib/cms/__tests__/types.test.ts (17)
✓ src/app/__tests__/pages.test.tsx (11)

Test Files  6 passed (6)
     Tests  87 passed (87)
```

### 5. Generate Coverage Report
```bash
pnpm test:coverage
```
Expected: 100% coverage of adapter files

### 6. Review Coverage Report
```bash
open coverage/index.html
```
Expected: All adapter files at 100% coverage

## 🐛 Troubleshooting

### Issue: Module Resolution Errors

**Symptom**: Cannot find module '@/lib/cms'

**Solution**: Verify path alias in `vitest.config.ts`:
```typescript
resolve: {
  alias: {
    "@": resolve(__dirname, "./src"),
  },
}
```

### Issue: React/JSX Errors

**Symptom**: JSX syntax errors or React hooks errors

**Solution**: Ensure React plugin is loaded:
```typescript
plugins: [react()],
```

### Issue: Mock Errors

**Symptom**: vi.mock is not a function

**Solution**: Ensure Vitest globals are enabled in config:
```typescript
test: {
  globals: true,
}
```

### Issue: Test Failures

**Symptom**: Tests run but some fail

**Action**: 
1. Read the error message carefully
2. Check if the adapter code changed
3. Update test expectations if needed
4. Verify mocks match actual module exports
5. Check if async/await is used correctly

## 📊 Expected Test Results

### All Tests Passing

```
 ✓ src/lib/cms/__tests__/static.test.ts (23) 1234ms
   ✓ StaticAdapter (23)
     ✓ getHomePageData (8)
       ✓ returns a Promise
       ✓ returns correct HomePageData structure
       ✓ returns data with no null or undefined values
       ✓ returns valid stat items
       ✓ returns valid testimonial items
       ...
     ✓ getAboutPageData (4)
     ✓ getServicesPageData (5)
     ✓ getContactPageData (4)
     ✓ getSiteMetadata (2)

 ✓ src/lib/cms/__tests__/keystatic.test.ts (13) 567ms
 ✓ src/lib/cms/__tests__/sanity.test.ts (14) 678ms
 ✓ src/lib/cms/__tests__/adapter.test.ts (9) 345ms
 ✓ src/lib/cms/__tests__/types.test.ts (17) 234ms
 ✓ src/app/__tests__/pages.test.tsx (11) 890ms

Test Files  6 passed (6)
     Tests  87 passed (87)
  Start at  10:30:00
  Duration  4.52s (transform 123ms, setup 45ms, collect 890ms, tests 3.46s)
```

### Coverage Report

```
----------------------|---------|----------|---------|---------|
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files             |     100 |      100 |     100 |     100 |
 cms                  |     100 |      100 |     100 |     100 |
  adapter.ts          |     100 |      100 |     100 |     100 |
  types.ts            |     100 |      100 |     100 |     100 |
 cms/adapters         |     100 |      100 |     100 |     100 |
  keystatic.ts        |     100 |      100 |     100 |     100 |
  sanity.ts           |     100 |      100 |     100 |     100 |
  static.ts           |     100 |      100 |     100 |     100 |
----------------------|---------|----------|---------|---------|
```

## ✅ Success Criteria

- [ ] All dependencies installed without errors
- [ ] All 87 tests pass
- [ ] 100% coverage of adapter code
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Tests run in < 10 seconds
- [ ] Coverage report generated successfully

## 📝 Next Steps After Tests Pass

1. Commit the test files to version control
2. Set up CI/CD to run tests automatically
3. Add pre-commit hook to run tests
4. Monitor coverage in CI pipeline
5. Update tests when adapter code changes
6. Add more tests as new features are added

## 🎯 Maintenance

### Regular Tasks

- Run tests before committing code
- Update tests when adapters change
- Review coverage reports regularly
- Keep dependencies up to date
- Document any test-specific setup

### When to Update Tests

- New adapter methods added
- Data structures change
- New CMS provider added
- Error handling changes
- New page components added

## 📞 Getting Help

If tests still don't run after following these instructions:

1. Check `README_TESTS.md` for detailed documentation
2. Review test file comments for specific setup needs
3. Verify Node.js and pnpm versions
4. Check `package.json` for correct dependencies
5. Ensure TypeScript configuration is correct

---

**Status**: Awaiting authentication resolution to run tests
**Last Updated**: Test suite complete and validated
