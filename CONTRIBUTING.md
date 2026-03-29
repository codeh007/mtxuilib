# Contributing

Thanks for contributing to `mtxuilib`.

## Development Setup

```bash
npm ci
npm run check
```

This repository uses:

- Node.js 22+
- npm 10+
- TypeScript for builds and type contracts
- Biome for linting and formatting
- Vitest for lightweight runtime checks

## Before Opening a Pull Request

Run the full validation suite:

```bash
npm run check
```

That command covers:

- linting
- type checking
- runtime tests
- public import smoke checks
- package build output generation

## Package Contract

- keep public imports stable under `mtxuilib/ui/*`, `mtxuilib/mt/*`, `mtxuilib/lib/*`, `mtxuilib/styles/*`, and other documented entrypoints
- avoid reintroducing monorepo-local assumptions from `gomtm`
- prefer cross-platform npm scripts and Node-based helper scripts over shell-specific commands

## Releases

Releases are tag-driven. See `RELEASING.md` for the exact workflow.
