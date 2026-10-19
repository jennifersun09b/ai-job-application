# trackr-cli

Zero-dependency Bun CLI for Trackr's public tracker API. See `../SKILL.md` for usage and
`../url-reference.md` for endpoints and the 10-requests-per-day quota.

```bash
bun install                 # dev types only
bun run typecheck
bun run test                # offline unit tests; TRACKR_LIVE=1 bun run test adds one live call
bun run src/cli.ts search -t uk-tech --type graduate-programmes --format table
```
