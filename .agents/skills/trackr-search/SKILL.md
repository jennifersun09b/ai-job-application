---
name: trackr-search
version: 1.0.0
description: >
  Use this skill to list graduate schemes, summer internships, industrial placements and
  spring weeks tracked by Trackr (the-trackr.com) for UK and US technology, finance, law
  and engineering, including which applications are currently open and their closing
  dates. Trigger phrases: Trackr, application tracker, graduate scheme tracker, "which
  grad schemes are open", "internships opening this week", spring week, off-cycle
  internship, UK tech graduate schemes 2027.
context: fork
enabled: true  # set to false to keep this portal installed but have /scrape skip it
allowed-tools: Bash(bun run .agents/skills/trackr-search/cli/src/cli.ts *)
---

# Trackr Search Skill

Read Trackr's live application trackers through the public JSON API that powers
`app.the-trackr.com`. No login is needed for tracker reads. **Zero runtime dependencies.**

## ⚠️ Quota and personal use

`api.the-trackr.com/programmes` allows **10 requests per day per client** and returns an
empty list (HTTP 200) once that budget is spent, with `RateLimit` headers saying when it
resets. Each distinct tracker + type + season is one request. The CLI therefore caches every
response under `cli/.cache/` and serves the cache for 12 hours by default; `--refresh`
spends a request. `robots.txt` on both hosts allows everything, but the trackers are Trackr's
curated product: personal use only, no bulk collection, no redistribution.

## When to use this skill

- See which UK tech graduate schemes or internships are open right now, with closing dates
- Find programmes that opened in the last N days (Trackr detects openings, job boards lag)
- Check whether a scheme sponsors visas or has a rolling deadline before `/apply`

## Commands

### Search a tracker

```bash
bun run .agents/skills/trackr-search/cli/src/cli.ts search [flags]
```

| Flag | Meaning |
|------|---------|
| `--tracker`, `-t <slug>` | `uk-tech` (default), `uk-finance`, `uk-law`, `uk-engineering`, `us-tech`, `us-finance`, `eu-finance`, `france-finance`, `germany-finance`, `italy-finance`, `hong-kong-finance` |
| `--region`, `--industry` | Override the tracker's API parameters (`UK, US, EU, France, Germany, Italy, Hong Kong` / `Finance, Tech, Law, Engineering`) |
| `--type <tab>` | `graduate-programmes` (default), `summer-internships`, `industrial-placements`, `off-cycle-internships`, `spring-weeks`, `insight-programmes`, `first-year-schemes`, ... |
| `--season <year>` | `2024`..`2028`, default `2027` (the 2026/27 recruiting cycle) |
| `--query`, `-q <text>` | Client-side filter on programme name, company, category, discipline |
| `--category <text>` | Trackr category, e.g. `"Data Science"`, `"AI and Machine Learning"`, `"Quant Developer"` |
| `--open-only` | Drop programmes marked closed |
| `--jobage <days>` | Only programmes whose **opening date** is within N days (this is the recency signal) |
| `--limit`, `-n`, `--format json\|table\|plain` | As in every portal skill |
| `--refresh`, `--cache-only`, `--max-age <hours>` | Cache control (see quota note) |

### Programme detail

```bash
bun run .agents/skills/trackr-search/cli/src/cli.ts detail <id> [--format json|plain]
```

Trackr has no per-programme endpoint; `detail` reads the id from the local cache, so run the
matching `search` first.

## Usage examples

```bash
# Open UK tech graduate schemes in data science, table view
bun run .agents/skills/trackr-search/cli/src/cli.ts search -t uk-tech --type graduate-programmes --category "Data Science" --open-only --format table

# Summer internships that opened in the last two weeks
bun run .agents/skills/trackr-search/cli/src/cli.ts search -t uk-tech --type summer-internships --jobage 14 --format table

# Quant roles in the UK finance tracker, spring weeks tab
bun run .agents/skills/trackr-search/cli/src/cli.ts search -t uk-finance --type spring-weeks -q quant --limit 10

# Force a fresh copy (spends 1 of 10 daily requests)
bun run .agents/skills/trackr-search/cli/src/cli.ts search -t uk-tech --type graduate-programmes --refresh

# One programme from the cache
bun run .agents/skills/trackr-search/cli/src/cli.ts detail 032gbd44r2 --format plain
```

## Output

`json` returns `{ meta, results }`. `meta` reports `source` (`cache` or `network`),
`fetchedAt`, and the API's remaining daily quota. Each result has `id`, `title`, `company`,
`location`, `date` (**opening date**), `url` (the employer's application page), plus
`closingDate`, `status`, `closed`, `rolling`, `categories`, `disciplines`, `degree`,
`sponsorsVisa`, `lastYearOpening`, `groupId`, `tracker`, `type`.

Errors go to stderr as `{ "error", "code" }` with exit 1. `RATE_LIMITED` means the daily
budget is spent and nothing is cached; `RATE_LIMITED_CACHE` is a warning that stale cache
was served.

## Notes

- Field mapping was derived from the app's bundled schema on 2026-09-07; unknown fields are
  kept under `raw` in `detail` output. If the API renames a field, update `mapProgramme` in
  `helpers.ts` and `url-reference.md`.
- `date` is the opening date, not a posting date. `/scrape`'s 14-day filter should use it
  together with `closingDate` for urgency.
- Trackr also tracks finance, law and engineering; `/scrape` should only call the trackers
  relevant to the profile to stay within quota.
