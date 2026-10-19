import {
  applyFilters, apiFetch, buildUrl, cacheAgeHours, extractProgrammes, mapProgramme, readCache,
  RateLimitedError, writeCache, writeError, writeWarning, type Filters, type Programme, type Query,
} from "../helpers.js"

export interface SearchOpts extends Filters {
  tracker: string
  q: Query
  refresh: boolean
  cacheOnly: boolean
  maxAgeHours: number
  page: number
  limit?: number
  format: "json" | "table" | "plain"
}

function renderTable(items: Programme[]): string {
  if (items.length === 0) return "No results."
  const rows = items.map((p) =>
    `${p.id.padEnd(12)} ${(p.title || "").slice(0, 44).padEnd(44)} ${(p.company || "—").slice(0, 22).padEnd(22)} ${(p.date || "—").padEnd(10)} ${(p.closingDate || (p.rolling ? "rolling" : "—")).padEnd(10)} ${p.status || (p.closed ? "closed" : "—")}`)
  const header = "ID".padEnd(12) + " " + "PROGRAMME".padEnd(44) + " " + "COMPANY".padEnd(22) + " " + "OPENS".padEnd(10) + " " + "CLOSES".padEnd(10) + " STATUS"
  return [header, "-".repeat(header.length), ...rows].join("\n")
}

export async function runSearch(o: SearchOpts): Promise<number> {
  try {
    const url = buildUrl(o.q)
    let cached = readCache(o.q)
    let source: "cache" | "network" = "cache"
    let ratelimit = cached?.ratelimit ?? null
    const stale = !cached || cacheAgeHours(cached) > o.maxAgeHours
    if ((o.refresh || stale) && !o.cacheOnly) {
      try {
        const r = await apiFetch(url)
        cached = { fetchedAt: new Date().toISOString(), url, ratelimit: r.ratelimit, body: r.body }
        writeCache(o.q, cached); ratelimit = r.ratelimit; source = "network"
      } catch (e) {
        if (e instanceof RateLimitedError && cached) {
          writeWarning(`${e.message}; serving cached results from ${cached.fetchedAt}`, "RATE_LIMITED_CACHE")
        } else if (e instanceof RateLimitedError) {
          writeError(`${e.message}. No cached copy exists for ${url}`, "RATE_LIMITED"); return 1
        } else throw e
      }
    }
    if (!cached) { writeError(`No cached data for ${url} and --cache-only was set`, "NO_CACHE"); return 1 }
    if (o.page > 1) {
      process.stdout.write(JSON.stringify({ meta: { count: 0, page: o.page, note: "the API returns the full tracker in one response; only page 1 exists" }, results: [] }, null, 2) + "\n")
      return 0
    }
    let items = extractProgrammes(cached.body).map((r) => mapProgramme(r, o.tracker, o.q.type))
    items = applyFilters(items, o)
    if (o.limit !== undefined) items = items.slice(0, o.limit)

    if (o.format === "table") process.stdout.write(renderTable(items) + "\n")
    else if (o.format === "plain") process.stdout.write(items.map((p) => `${p.title} — ${p.company ?? "—"} — opens ${p.date ?? "?"} closes ${p.closingDate ?? (p.rolling ? "rolling" : "?")}\n${p.url}`).join("\n\n") + "\n")
    else process.stdout.write(JSON.stringify({
      meta: { count: items.length, page: 1, tracker: o.tracker, ...o.q, source, fetchedAt: cached.fetchedAt, ratelimit: ratelimit ? { remaining: ratelimit.remaining, limit: ratelimit.limit, resetSeconds: ratelimit.resetSeconds } : null, url },
      results: items.map(({ raw, ...p }) => p),
    }, null, 2) + "\n")
    return 0
  } catch (e) {
    writeError(e instanceof Error ? e.message : String(e), "SEARCH_FAILED"); return 1
  }
}
