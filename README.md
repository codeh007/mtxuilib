# mtxuilib

Standalone public UI component library extracted from gomtm.

## Status

This repository is being split out into an independent open-source package.
The immediate goal is to get the standalone repository, CI, and packaging pipeline online first.
Component/API cleanup will continue in follow-up commits.

## Install

```bash
npm install mtxuilib
```

## Development

```bash
npm install
npm run build
```

## Breaking changes during extraction

- Legacy `mt/ai/*` exports coupled to internal `mtmsdk` types were removed during the public extraction.
- Follow-up cleanup will continue in this standalone repository instead of the original monorepo.
