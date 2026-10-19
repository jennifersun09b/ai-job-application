---
name: gradcracker-search
version: 1.0.0
description: >
  Use this skill to search UK graduate jobs, graduate schemes and STEM early-career
  roles on Gradcracker (gradcracker.com), the UK careers site for science, technology,
  engineering and maths students. Covers data science, AI/machine learning, software,
  cyber security, IT and engineering disciplines, filtered by UK region. Trigger phrases:
  graduate job, graduate scheme, grad scheme, STEM graduate, Gradcracker, entry-level UK,
  "graduate data scientist jobs in London", "graduate schemes closing soon".
context: fork
enabled: true  # set to false to keep this portal installed but have /scrape skip it
allowed-tools: Bash(bun run .agents/skills/gradcracker-search/cli/src/cli.ts *)
---

# Gradcracker Search Skill

Search live graduate-job listings on **Gradcracker**, the UK STEM graduate careers site.
Public pages, no login, **zero runtime dependencies** (plain `bun` + `fetch` + regex).

## ⚠️ Personal use only

Gradcracker's `robots.txt` allows the `/search/...` landing pages this skill uses and
disallows the free-text `/keyword-search` endpoint, which this skill therefore never
calls. Keep volume low (a handful of requests per run), do not use it commercially or
for bulk collection, and run it on your own responsibility.

## When to use this skill

- Find UK graduate jobs and graduate schemes in a STEM discipline, optionally by region
- List postings closing soon (`--order deadlines`) or recently added (`--order dateAdded --new`)
- Read the full description, deadline, salary and degree requirement of one posting

## Commands

### Search job listings

```bash
bun run .agents/skills/gradcracker-search/cli/src/cli.ts search [flags]
```

| Flag | Meaning |
|------|---------|
| `--query`, `-q <text>` | Discipline keyword or slug: `data science`, `machine learning`, `software`, `cyber security`, `computer science`, `web`, `IT`, `hardware`, `aerospace`, `chemical-process`, `civil-building`, `electronic-electrical`, `mechanical-manufacturing`. Any other text is applied as a **title filter** across all disciplines. |
| `--location`, `-l <text>` | UK region (`london`, `london-and-south-east`, `scotland`, `north-west`, ...) or a major city, which is mapped to its region. Default: all UK. |
| `--order <o>` | `relevance` (default), `deadlines`, `start_date`, `dateAdded`, `grade_asc`, `grade_desc` |
| `--new` | Only cards Gradcracker flags as "New" |
| `--jobage <days>` | Accepted for contract compatibility; **not supported** by the portal (no posting dates). A warning is written to stderr and all results are returned. |
| `--page <n>` | Only page 1 exists; the site loads more via a JavaScript button. Page 2+ returns an empty result set with a note. |
| `--limit`, `-n <n>` | Cap results (client-side) |
| `--format json\|table\|plain` | Default `json` |

### Fetch full job detail

```bash
bun run .agents/skills/gradcracker-search/cli/src/cli.ts detail <url | employerId/jobId> [--format json|plain]
```

Pass the `url` from search output. A bare job id cannot be resolved because the page
path also needs the employer id (see Notes).

## Usage examples

```bash
# Graduate data science roles in London, table view
bun run .agents/skills/gradcracker-search/cli/src/cli.ts search -q "data science" -l london --format table

# Newly added AI / machine learning roles anywhere in the UK
bun run .agents/skills/gradcracker-search/cli/src/cli.ts search -q "machine learning" --order dateAdded --new --format table

# Software roles in Scotland, closing soonest first
bun run .agents/skills/gradcracker-search/cli/src/cli.ts search -q software -l scotland --order deadlines --limit 10

# Title filter across all disciplines
bun run .agents/skills/gradcracker-search/cli/src/cli.ts search -q "analyst" -l london --format table

# Full posting
bun run .agents/skills/gradcracker-search/cli/src/cli.ts detail https://www.gradcracker.com/hub/409/arcadis/graduate-job/82568/graduate-data-scientist --format plain
```

## Output formats

| Format | Best for |
|--------|----------|
| `json` | Default; `{ meta, results }`. Each result has `id`, `title`, `company`, `companyUrl`, `location`, `date` (always `null`), `url`, plus `deadline`, `deadlineIso`, `salary`, `degreeRequired`, `disciplines`, `isNew`. |
| `table` | Quick scan: id, title, company, location, deadline |
| `plain` | Reading one posting from `detail` |

Errors go to **stderr** as `{ "error": "...", "code": "..." }` with exit code `1`.

## Notes

- **No posting dates.** Gradcracker publishes deadlines, not posting dates, so `date` is
  `null` and `--jobage` cannot filter. Use `--order dateAdded` plus `--new` for recency,
  and `deadlineIso` for urgency in `/rank`.
- **One page only.** Roughly 60 cards per discipline and region. Narrow with a region or
  a more specific discipline rather than paging.
- **Detail needs the employer id.** URLs are `/hub/<employerId>/<employer>/graduate-job/<jobId>/<slug>`; wrong employer ids redirect to the employer directory. Search output always carries the full URL.
- **Graduate jobs only.** Placements, internships and degree apprenticeships use other
  Gradcracker sections and are not covered by this version.
- Sub-discipline slugs are hard-coded in `helpers.ts`; if Gradcracker renames one, update
  `COMPUTING` there and in `url-reference.md`.
