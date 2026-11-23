# QA Automation Test Task

Automated tests for the [SauceDemo](https://www.saucedemo.com/) website and the
[JSONPlaceholder](https://jsonplaceholder.typicode.com/) API, written with Playwright and TypeScript.
The repo also has a Postman collection and two SQL queries.

```
ui/        UI tests, steps and page objects
api/       API tests and API clients
shared/    settings (URLs and logins)
postman/   Postman collection and environment
sql/       SQL queries
```

## Setup

You need Node.js 20 or newer.

```bash
npm ci
npx playwright install chromium
cp .env.example .env
```

## Run the tests

| What | Command |
| --- | --- |
| All tests | `npm test` |
| Only UI tests | `npm run test:ui` |
| Only API tests | `npm run test:api` |
| One file | `npx playwright test api/tests/posts.spec.ts` |
| One test by name | `npx playwright test -g "GET /users/5"` |
| Postman collection | `npm run test:postman` |

## Open the report

```bash
npm run report
```

This opens the HTML report from the last run.

## CI

GitHub Actions runs all tests on every push to `main`, on pull requests, every night, and by hand from the
Actions tab. The reports are saved with each run.

It needs these settings in the repo, under **Settings → Secrets and variables → Actions**:

- Variables: `UI_BASE_URL`, `API_BASE_URL`
- Secrets: `SAUCE_STANDARD_USER`, `SAUCE_PROBLEM_USER`, `SAUCE_PASSWORD`

## Design decisions

- **Structure:** page objects hold all the selectors, step classes join page actions into named business steps, and API clients hold all the URLs. Tests get them through fixtures, so a test only says what to check. URLs and logins come from `.env`, not from code.
- **Login:** each user logs in once before the tests (a setup project), and the session is saved and reused (`storageState`). Tests do not share data, so they run in parallel.
- **Prices:** the test reads the item prices from the page and works out the item total, tax and total itself.
- **problem_user:** this user has a known bug: typing in Last Name changes First Name, so checkout cannot continue. The test still runs every time, but it is marked as "expected to fail". The bug stays visible in the report and the build stays green. When the bug is fixed, the test tells us, and we remove the mark.
- **POST that is not saved:** JSONPlaceholder answers `201` to a new post but does not really save it, so reading it back gives `404`. The test checks what the service really does: the create response is correct and the read-back gives `404`. This is how the fake service works, not a bug, so it is not marked as failing.
- **Skipped:** login tests with wrong data, a test that starts with a full cart, and other browsers. They would add more tests but show nothing new about the design.
- **With 500 tests and five engineers:** split the fixtures by area, keep known bugs in one list linked to tickets, spread CI runs over several machines, add lint rules that block raw selectors and fixed waits, and give each folder an owner (CODEOWNERS).

## Assumptions

- Tax is 8% of the item total, rounded to the cent.
- `DEFECT-1` is a made-up ticket number. There is no real bug tracker.
- The SauceDemo logins are public demo values, so they are in `.env.example`. The real `.env` is not committed.
- The Postman collection picks a random user and prints its id. The missing post id is `9999`.
- The SQL finds United Package by its name and uses the current product price, because there is no price history.
