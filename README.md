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
