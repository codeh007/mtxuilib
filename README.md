# mtxuilib

Standalone React/Next UI component library extracted from `gomtm` and published as the public `mtxuilib` npm package.

## What This Repository Provides

- reusable UI primitives under `mtxuilib/ui/*`
- higher-level `mt/*` building blocks used by `gomtmui`
- shared helpers under `mtxuilib/lib/*`
- packaged styles under `mtxuilib/styles/*`

`mtxuilib` now lives in this standalone repository. Downstream apps should consume the published npm package instead of a monorepo-local copy.

## Install

```bash
npm install mtxuilib
```

Peer dependencies:

- `next@^15`
- `react@^19.2`
- `react-dom@^19.2`

## Usage

```tsx
import "mtxuilib/styles/globals.css";
import { Button } from "mtxuilib/ui/button";
import { cn } from "mtxuilib/lib/utils";

export function Example() {
  return <Button className={cn("w-full", "justify-start")}>Open</Button>;
}
```

Common public entrypoints:

- `mtxuilib/ui/*`
- `mtxuilib/mt/*`
- `mtxuilib/prompt-kit/*`
- `mtxuilib/store/*`
- `mtxuilib/lib/*`
- `mtxuilib/styles/*`

## Local Development

```bash
npm ci
npm run check
```

Useful commands:

- `npm run lint` - Biome checks for source, tests, docs, and workflow files
- `npm run typecheck` - TypeScript contract check for the package source
- `npm test` - Vitest runtime checks for stable utility exports
- `npm run test:smoke` - consumer-style public import smoke check
- `npm run build` - clean `dist/`, compile TypeScript, and copy packaged styles
- `npm run check` - full validation pipeline used by CI

## CI/CD

- `ci.yml` runs on every push and pull request
- the CI pipeline performs `npm ci`, `npm run check`, and `npm pack --dry-run`
- `publish.yml` runs on version tags like `v0.8.35`
- release publishing uses `npm publish --provenance` and creates a matching GitHub Release with the packed tarball attached

## Release Flow

1. Update `package.json` to the target version.
2. Run `npm ci && npm run check` locally.
3. Commit the change and create a tag such as `v0.8.35`.
4. Push the commit and tag.
5. Wait for `publish.yml` to publish to npm and create the GitHub Release.

Detailed contributor and release notes live in `CONTRIBUTING.md` and `RELEASING.md`.
