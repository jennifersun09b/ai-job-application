# gradcracker-cli

Zero-dependency Bun CLI for Gradcracker's public graduate-job search pages. See `../SKILL.md` for usage and `../url-reference.md` for the parsing anchors.

```bash
bun install            # dev types only
bun run typecheck
bun run test           # includes live smoke tests
bun run src/cli.ts search -q "data science" -l london --format table
```
