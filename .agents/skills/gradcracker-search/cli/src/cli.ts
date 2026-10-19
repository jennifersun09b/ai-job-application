#!/usr/bin/env bun
// CLI for searching graduate jobs on Gradcracker (UK STEM careers site) via its
// public discipline/location search pages. Zero runtime dependencies.
// Personal use only: keep volume low and respect gradcracker.com's terms.

import { runSearch, type SearchOpts } from "./commands/search.js"
import { runDetail, type DetailOpts } from "./commands/detail.js"

interface Flags { _: string[]; [k: string]: string | boolean | string[] }

function parseFlags(argv: string[]): Flags {
  const flags: Flags = { _: [] }
  const alias: Record<string, string> = { q: "query", l: "location", n: "limit" }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith("-")) {
      const key = alias[a.replace(/^-+/, "")] ?? a.replace(/^-+/, "")
      const next = argv[i + 1]
      if (next === undefined || next.startsWith("-")) flags[key] = true
      else { flags[key] = next; i++ }
    } else (flags._ as string[]).push(a)
  }
  return flags
}

const HELP = `gradcracker-cli — search UK graduate jobs on Gradcracker

USAGE
  bun run src/cli.ts search [flags]
  bun run src/cli.ts detail <id|url> [--format json|plain]

SEARCH FLAGS
  --query, -q <text>     Discipline keyword or slug: "data science", "machine learning", "software",
                         "cyber security", "computer science", "web", "IT", "hardware", or an engineering
                         discipline (aerospace, chemical-process, civil-building, electronic-electrical,
                         mechanical-manufacturing). Text that is not a discipline is used as a title filter.
  --location, -l <text>  UK region or major city (london, scotland, manchester, ...). Default: all UK.
  --order <o>            relevance (default) | deadlines | start_date | dateAdded | grade_asc | grade_desc
  --new                  Only cards flagged "New" by Gradcracker.
  --jobage <days>        Accepted for contract compatibility but NOT supported by the portal (no posting
                         dates are published); use --order dateAdded and --new instead.
  --page <n>             1 only. Gradcracker paginates with a JavaScript "Show more" button.
  --limit, -n <n>        Cap results emitted (client-side).
  --format <fmt>         json (default) | table | plain.

EXAMPLES
  bun run src/cli.ts search -q "data science" -l london --format table
  bun run src/cli.ts search -q "machine learning" --order dateAdded --new --format table
  bun run src/cli.ts search -q "software" -l scotland --limit 10
  bun run src/cli.ts search -q "analyst" -l london --format table      # title filter across all disciplines
  bun run src/cli.ts detail 409/82568 --format plain
  bun run src/cli.ts detail https://www.gradcracker.com/hub/409/arcadis/graduate-job/82568/graduate-data-scientist

Personal use only — public pages, keep volume low.
`

const KNOWN: Record<string, Set<string>> = {
  search: new Set(["query", "location", "order", "new", "jobage", "page", "limit", "format", "help", "h"]),
  detail: new Set(["format", "help", "h"]),
}

function intFlag(name: string, raw: string | boolean | string[]): number | null {
  const val = typeof raw === "string" ? Number(raw.trim()) : NaN
  if (!Number.isInteger(val) || val < 1) {
    process.stderr.write(JSON.stringify({ error: `--${name} must be a whole number of at least 1, got "${raw}"`, code: "BAD_ARG" }) + "\n")
    return null
  }
  return val
}

async function main(): Promise<number> {
  const flags = parseFlags(process.argv.slice(2))
  const cmd = (flags._ as string[])[0]
  if (!cmd || flags.help || flags.h) { process.stdout.write(HELP); return cmd ? 0 : 1 }

  const known = KNOWN[cmd]
  if (known) for (const k of Object.keys(flags)) {
    if (k === "_" || known.has(k)) continue
    process.stderr.write(JSON.stringify({ error: `unknown flag --${k} for '${cmd}'; see --help`, code: "UNKNOWN_FLAG" }) + "\n")
    return 1
  }

  if (cmd === "search") {
    const fmt = (flags.format as string) || "json"
    const orders = ["relevance", "deadlines", "start_date", "dateAdded", "grade_asc", "grade_desc"]
    const order = typeof flags.order === "string" ? flags.order : "relevance"
    if (!orders.includes(order)) {
      process.stderr.write(JSON.stringify({ error: `--order must be one of ${orders.join(", ")}`, code: "BAD_ARG" }) + "\n")
      return 1
    }
    let page = 1, limit: number | undefined
    if (flags.page !== undefined) { const v = intFlag("page", flags.page); if (v === null) return 1; page = v }
    if (flags.limit !== undefined) { const v = intFlag("limit", flags.limit); if (v === null) return 1; limit = v }
    if (flags.jobage !== undefined) {
      const v = intFlag("jobage", flags.jobage); if (v === null) return 1
      process.stderr.write(JSON.stringify({ warning: "--jobage is not supported by Gradcracker (no posting dates); returning all results", code: "UNSUPPORTED_FILTER" }) + "\n")
    }
    const opts: SearchOpts = {
      query: typeof flags.query === "string" ? flags.query : undefined,
      location: typeof flags.location === "string" ? flags.location : undefined,
      order: order as SearchOpts["order"],
      newOnly: flags.new === true,
      page, limit,
      format: (["json", "table", "plain"].includes(fmt) ? fmt : "json") as SearchOpts["format"],
    }
    return runSearch(opts)
  }
  if (cmd === "detail") {
    const id = (flags._ as string[])[1]
    if (!id) { process.stderr.write(JSON.stringify({ error: "detail requires an <id|url>", code: "NO_ID" }) + "\n"); return 1 }
    const fmt = (flags.format as string) || "json"
    const opts: DetailOpts = { id, format: fmt === "plain" ? "plain" : "json" }
    return runDetail(opts)
  }
  process.stderr.write(JSON.stringify({ error: `Unknown command "${cmd}"`, code: "BAD_CMD" }) + "\n")
  return 1
}

main().then((c) => process.exit(c)).catch((e) => {
  process.stderr.write(JSON.stringify({ error: e instanceof Error ? e.message : String(e), code: "INTERNAL_ERROR" }) + "\n")
  process.exit(1)
})
