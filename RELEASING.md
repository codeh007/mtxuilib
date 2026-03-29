# Releasing mtxuilib

`mtxuilib` uses an explicit tag-driven release flow.

## Steps

1. Update `package.json` to the new version.
2. Run:

   ```bash
   npm ci
   npm run check
   ```

3. Commit the version change.
4. Create a matching git tag:

   ```bash
   git tag v0.8.35
   ```

5. Push the branch and tag:

   ```bash
   git push origin main --follow-tags
   ```

## What GitHub Actions Does

The `publish.yml` workflow will:

- verify that the pushed tag matches `package.json`
- install dependencies with `npm ci`
- rerun the full validation suite with `npm run check`
- create the npm tarball with `npm pack`
- publish the exact tarball to npm with provenance
- create a GitHub Release for the tag and attach the tarball

If the workflow fails, fix the issue in a new commit or tag instead of editing published artifacts by hand.
