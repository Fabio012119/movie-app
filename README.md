## Movie App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install node modules development server:

```bash
npm run install
# or
yarn
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Decisions made

- To make the perceived user experience faster, a loading skeleton has been added to the movies list section.
- Tailwind CSS is used for styling
- To lint the project Biome.js is used [`@biomejs/biome`](https://www.npmjs.com/package/@biomejs/biome)
- E2E flow tests has been added. For the e2e test was used [`playwright`](https://www.npmjs.com/package/playwright)

## Run tests

```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```

The tests start automatically. If after the tests are completed you wish to see a report of your tests run:

## Show test report

```bash
npm run test-report
# or
yarn run test-report
# or
pnpm run test-report
# or
bun run test-report
```

Playwright will open a window at `http://localhost:9323` in which you can see the report of the test.
Along with a video of your app being tested by playwright bots and all the steps of the testing process.
