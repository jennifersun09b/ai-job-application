#!/usr/bin/env bun
// CLI for Trackr application trackers (the-trackr.com) via the public api.the-trackr.com
// JSON API. Zero runtime dependencies. Personal use only: the API allows 10 tracker requests
// per day per client, so results are cached in .cache/ and served from cache by default.

import { runSearch, type SearchOpts } from "./commands/search.js"
import { runDetail, type DetailOpts } from "./commands/detail.js"
import { INDUSTRIES, REGIONS, SEASONS, TRACKERS, TYPES, type Industry, type Region } from "./helpers.js"

interface Flags { _: string[]; [k: string]: string | boolean | string[] }
function parseFlags(argv: string[]): Flags {
  const flags: Flags = { _: [] }
  const alias: Record<string, string> = { q: "query", t: "tracker", n: "limit" }
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

const HELP = `trackr-cli — Trackr application trackers (graduate schemes, internships, spring weeks)

USAGE
  bun run src/cli.ts search [flags]
  bun run src/cli.ts detail <id> [--format json|plain]

SEARCH FLAGS
  --tracker, -t <slug>   ${Object.keys(TRACKERS).join(" | ")}   (default uk-tech)
  --region <r>           Override region: ${REGIONS.join(" | ")}
  --industry <i>         Override industry: ${INDUSTRIES.join(" | ")}
  --type <tab>           ${TYPES.slice(0, 5).join(" | ")} | ...   (default graduate-programmes)
  --season <year>        ${SEASONS.join(" | ")}   (default 2027)
  --query, -q <text>     Filter by programme name, company, category or discipline (client-side)
  --category <text>      Filter by Trackr category, e.g. "Data Science", "AI and Machine Learning"
  --open-only            Drop programmes marked closed
  --jobage <days>        Only programmes whose opening date is within the last N days
  --page <n>             1 only (the API returns a whole tracker per request)
  --limit, -n <n>        Cap results (client-side)
  --format <fmt>         json (default) | table | plain
  --refresh              Force a network fetch even if the cache is fresh (costs 1 of 10 daily requests)
  --cache-only           Never hit the network
  --max-age <hours>      Cache freshness window before refetching (default 12)

EXAMPLES
  bun run src/cli.ts search -t uk-tech --type graduate-programmes --category "Data Science" --format table
  bun run src/cli.ts search -t uk-tech --type summer-internships --open-only --jobage 14 --format table
  bun run src/cli.ts search -t uk-finance --type spring-weeks -q quant --limit 10
  bun run src/cli.ts detail 032gbd44r2 --format plain

QUOTA: api.the-trackr.com allows 10 /programmes requests per day per client and answers
with an empty list once spent. Each distinct tracker/type/season is one request; cached
copies are reused for --max-age hours (default 12). Personal use only.
`

const KNOWN: Record<string, Set<string>> = {
  search: new Set(["tracker", "region", "industry", "type", "season", "query", "category", "open-only", "jobage", "page", "limit", "format", "refresh", "cache-only", "max-age", "help", "h"]),
  detail: new Set(["format", "help", "h"]),
}
function bad(msg: string): number { process.stderr.write(JSON.stringify({ error: msg, code: "BAD_ARG" }) + "\n"); return 1 }
function intFlag(name: string, raw: unknown): number | null {
  const v = typeof raw === "string" ? Number(raw.trim()) : NaN
  return Number.isInteger(v) && v >= 1 ? v : (bad(`--${name} must be a whole number of at least 1, got "${raw}"`), null)
}

async function main(): Promise<number> {
  const flags = parseFlags(process.argv.slice(2))
  const cmd = (flags._ as string[])[0]
  if (!cmd || flags.help || flags.h) { process.stdout.write(HELP); return cmd ? 0 : 1 }
  const known = KNOWN[cmd]
  if (known) for (const k of Object.keys(flags)) {
    if (k === "_" || known.has(k)) continue
    process.stderr.write(JSON.stringify({ error: `unknown flag --${k} for '${cmd}'; see --help`, code: "UNKNOWN_FLAG" }) + "\n"); return 1
  }
  if (cmd === "search") {
    const tracker = typeof flags.tracker === "string" ? flags.tracker.toLowerCase() : "uk-tech"
    const base = TRACKERS[tracker]
    if (!base && !(typeof flags.region === "string" && typeof flags.industry === "string")) return bad(`unknown tracker "${tracker}"; use one of ${Object.keys(TRACKERS).join(", ")} or pass --region and --industry`)
    const region = (typeof flags.region === "string" ? flags.region : base.region) as Region
    const industry = (typeof flags.industry === "string" ? flags.industry : base.industry) as Industry
    if (!REGIONS.includes(region)) return bad(`--region must be one of ${REGIONS.join(", ")}`)
    if (!INDUSTRIES.includes(industry)) return bad(`--industry must be one of ${INDUSTRIES.join(", ")}`)
    const season = typeof flags.season === "string" ? flags.season : "2027"
    if (!SEASONS.includes(season)) return bad(`--season must be one of ${SEASONS.join(", ")}`)
    const type = typeof flags.type === "string" ? flags.type : "graduate-programmes"
    if (!TYPES.includes(type)) return bad(`--type must be one of ${TYPES.join(", ")}`)
    let page = 1, limit: number | undefined, jobage: number | undefined, maxAge = 12
    if (flags.page !== undefined) { const v = intFlag("page", flags.page); if (v === null) return 1; page = v }
    if (flags.limit !== undefined) { const v = intFlag("limit", flags.limit); if (v === null) return 1; limit = v }
    if (flags.jobage !== undefined) { const v = intFlag("jobage", flags.jobage); if (v === null) return 1; jobage = v }
    if (flags["max-age"] !== undefined) { const v = intFlag("max-age", flags["max-age"]); if (v === null) return 1; maxAge = v }
    const fmt = (flags.format as string) || "json"
    const o: SearchOpts = {
      tracker: base ? tracker : `${region}-${industry}`.toLowerCase().replace(/\s+/g, "-"),
      q: { region, industry, season, type },
      query: typeof flags.query === "string" ? flags.query : undefined,
      category: typeof flags.category === "string" ? flags.category : undefined,
      openOnly: flags["open-only"] === true, jobage,
      refresh: flags.refresh === true, cacheOnly: flags["cache-only"] === true, maxAgeHours: maxAge,
      page, limit, format: (["json", "table", "plain"].includes(fmt) ? fmt : "json") as SearchOpts["format"],
    }
    return runSearch(o)
  }
  if (cmd === "detail") {
    const id = (flags._ as string[])[1]
    if (!id) { process.stderr.write(JSON.stringify({ error: "detail requires an <id>", code: "NO_ID" }) + "\n"); return 1 }
    const o: DetailOpts = { id, format: (flags.format as string) === "plain" ? "plain" : "json" }
    return runDetail(o)
  }
  process.stderr.write(JSON.stringify({ error: `Unknown command "${cmd}"`, code: "BAD_CMD" }) + "\n"); return 1
}
main().then((c) => process.exit(c)).catch((e) => {
  process.stderr.write(JSON.stringify({ error: e instanceof Error ? e.message : String(e), code: "INTERNAL_ERROR" }) + "\n"); process.exit(1)
})
