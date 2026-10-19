// Data source: Trackr's public JSON API (https://api.the-trackr.com), the same API the
// Angular app at app.the-trackr.com calls. No login is needed for tracker reads, but the
// /programmes endpoint is rate-limited to 10 requests per day per client and returns an
// empty array (HTTP 200) once the budget is spent. Every response is therefore cached on
// disk and served from cache by default.

import { mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

export const API = "https://api.the-trackr.com"
const UA = "Mozilla/5.0 (compatible; trackr-cli/1.0)"

export function writeError(error: string, code: string): void {
  process.stderr.write(JSON.stringify({ error, code }) + "\n")
}
export function writeWarning(warning: string, code: string): void {
  process.stderr.write(JSON.stringify({ warning, code }) + "\n")
}

// ---- Trackers ---------------------------------------------------------------

export type Region = "UK" | "US" | "EU" | "France" | "Germany" | "Italy" | "Hong Kong"
export type Industry = "Finance" | "Tech" | "Law" | "Engineering"
export const REGIONS: Region[] = ["UK", "US", "EU", "France", "Germany", "Italy", "Hong Kong"]
export const INDUSTRIES: Industry[] = ["Finance", "Tech", "Law", "Engineering"]
export const SEASONS = ["2024", "2025", "2026", "2027", "2028"]
export const TYPES = [
  "graduate-programmes", "summer-internships", "industrial-placements", "off-cycle-internships",
  "spring-weeks", "insight-programmes", "first-year-schemes", "pre-university", "full-time-programmes",
  "training-contracts", "vacation-schemes", "non-law-internships", "apprenticeships", "events",
]

/** Tracker slugs shown in the app's navigation -> API region/industry. */
export const TRACKERS: Record<string, { region: Region; industry: Industry }> = {
  "uk-tech": { region: "UK", industry: "Tech" },
  "uk-finance": { region: "UK", industry: "Finance" },
  "uk-law": { region: "UK", industry: "Law" },
  "uk-engineering": { region: "UK", industry: "Engineering" },
  "us-tech": { region: "US", industry: "Tech" },
  "us-finance": { region: "US", industry: "Finance" },
  "eu-finance": { region: "EU", industry: "Finance" },
  "france-finance": { region: "France", industry: "Finance" },
  "germany-finance": { region: "Germany", industry: "Finance" },
  "italy-finance": { region: "Italy", industry: "Finance" },
  "hong-kong-finance": { region: "Hong Kong", industry: "Finance" },
}

export interface Query { region: Region; industry: Industry; season: string; type: string }

export function buildUrl(q: Query): string {
  const p = new URLSearchParams({ region: q.region, industry: q.industry, season: q.season, type: q.type })
  return `${API}/programmes?${p.toString()}`
}

// ---- Cache ------------------------------------------------------------------

const HERE = dirname(fileURLToPath(import.meta.url))
export const CACHE_DIR = join(HERE, "..", ".cache")

export function cacheKey(q: Query): string {
  return `${q.region}_${q.industry}_${q.season}_${q.type}`.replace(/[^A-Za-z0-9_-]/g, "-") + ".json"
}

export interface Cached { fetchedAt: string; url: string; ratelimit: RateLimit | null; body: unknown }

export function readCache(q: Query): Cached | null {
  const f = join(CACHE_DIR, cacheKey(q))
  if (!existsSync(f)) return null
  try { return JSON.parse(readFileSync(f, "utf8")) as Cached } catch { return null }
}
export function writeCache(q: Query, c: Cached): void {
  mkdirSync(CACHE_DIR, { recursive: true })
  writeFileSync(join(CACHE_DIR, cacheKey(q)), JSON.stringify(c))
}
export function cacheAgeHours(c: Cached): number {
  return (Date.now() - new Date(c.fetchedAt).getTime()) / 36e5
}
/** All cached bodies, newest first (used by `detail` to find a programme by id). */
export function allCached(): Cached[] {
  if (!existsSync(CACHE_DIR)) return []
  return readdirSync(CACHE_DIR).filter((f) => f.endsWith(".json"))
    .map((f) => ({ f, t: statSync(join(CACHE_DIR, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t)
    .map(({ f }) => { try { return JSON.parse(readFileSync(join(CACHE_DIR, f), "utf8")) as Cached } catch { return null } })
    .filter((c): c is Cached => c !== null)
}

// ---- Fetch ------------------------------------------------------------------

export interface RateLimit { remaining: number | null; limit: number | null; resetSeconds: number | null; raw: string[] }

/** Parse IETF draft `RateLimit: "10-in-1day"; r=0; t=86226` headers (the API sends two policies). */
export function parseRateLimit(headers: Headers): RateLimit | null {
  // Fetch's Headers joins repeated headers with ", ", so split back into policies
  // ('"1000-in-1day"; r=960; t=72, "10-in-1day"; r=0; t=86226').
  const raw: string[] = []
  headers.forEach((v, k) => { if (k.toLowerCase() === "ratelimit") raw.push(...v.split(/,\s*(?=")/)) })
  if (raw.length === 0) return null
  // Take the most restrictive policy (smallest remaining).
  let best: RateLimit | null = null
  for (const v of raw) {
    const r = v.match(/\br=(\d+)/); const t = v.match(/\bt=(\d+)/); const q = v.match(/"(\d+)-in-/)
    const rl: RateLimit = { remaining: r ? +r[1] : null, limit: q ? +q[1] : null, resetSeconds: t ? +t[1] : null, raw }
    if (!best || (rl.remaining ?? Infinity) < (best.remaining ?? Infinity)) best = rl
  }
  return best
}

export class RateLimitedError extends Error {
  constructor(public resetSeconds: number | null) {
    super(`Trackr API daily quota exhausted (10 tracker requests per day)${resetSeconds ? `; resets in ~${Math.ceil(resetSeconds / 3600)}h` : ""}`)
  }
}

/** GET JSON with backoff on 429/5xx. Detects the quota-exhausted "200 + []" response. */
export async function apiFetch(url: string): Promise<{ body: unknown; ratelimit: RateLimit | null }> {
  const maxRetries = 4
  let delay = 500
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/json" },
      signal: AbortSignal.timeout(30000),
    })
    if (res.status === 429 || res.status >= 500) {
      if (attempt === maxRetries) throw new Error(`Request failed: ${res.status} ${res.statusText}`)
      await new Promise((r) => setTimeout(r, delay + Math.floor(Math.random() * 500)))
      delay = Math.min(delay * 2, 8000)
      continue
    }
    if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText} ${await res.text().catch(() => "")}`.trim())
    const ratelimit = parseRateLimit(res.headers)
    const body = await res.json()
    if (Array.isArray(body) && body.length === 0 && ratelimit && ratelimit.remaining === 0) {
      throw new RateLimitedError(ratelimit.resetSeconds)
    }
    return { body, ratelimit }
  }
  throw new Error("Request failed after max retries")
}

// ---- Records ----------------------------------------------------------------

export interface Programme {
  id: string
  title: string
  company: string | null
  companyId: string | null
  location: string | null
  /** Opening date (ISO) when known; the contract's `date` field. */
  date: string | null
  url: string
  closingDate: string | null
  status: string | null
  closed: boolean | null
  rolling: boolean | null
  categories: string[]
  disciplines: string[]
  degree: string | null
  sponsorsVisa: boolean | null
  lastYearOpening: string | null
  groupId: string | null
  tracker: string
  type: string
  raw: Record<string, unknown>
}

type Rec = Record<string, unknown>
const str = (v: unknown): string | null => (typeof v === "string" && v.trim() ? v.trim() : typeof v === "number" ? String(v) : null)
const bool = (v: unknown): boolean | null => (typeof v === "boolean" ? v : null)
const arr = (v: unknown): string[] => Array.isArray(v) ? v.filter((x) => typeof x === "string") : typeof v === "string" && v ? [v] : []
function iso(v: unknown): string | null {
  const s = str(v); if (!s) return null
  const d = new Date(s); return isNaN(d.getTime()) ? s : d.toISOString().slice(0, 10)
}

/** The API returns either `{programmes:[...], groups:[...]}` or a bare array. */
export function extractProgrammes(body: unknown): Rec[] {
  if (Array.isArray(body)) return body as Rec[]
  if (body && typeof body === "object" && Array.isArray((body as Rec).programmes)) return (body as Rec).programmes as Rec[]
  return []
}

export function mapProgramme(r: Rec, tracker: string, type: string): Programme {
  const locs = arr(r.locations)
  return {
    id: str(r.id) ?? "",
    title: str(r.name) ?? str(r.title) ?? "(untitled)",
    company: str(r.companyName) ?? str(r.company) ?? null,
    companyId: str(r.companyId),
    location: str(r.location) ?? (locs.length ? locs.join("; ") : null),
    date: iso(r.openingDate),
    url: str(r.url) ?? `https://app.the-trackr.com/${tracker}`,
    closingDate: iso(r.closingDate),
    status: str(r.status),
    closed: bool(r.closed),
    rolling: bool(r.rolling),
    categories: arr(r.categories ?? r.category),
    disciplines: arr(r.disciplines),
    degree: str(r.degree),
    sponsorsVisa: bool(r.sponsorsVisa),
    lastYearOpening: iso(r.lastYearOpening),
    groupId: str(r.groupId),
    tracker, type, raw: r,
  }
}

export interface Filters { query?: string; category?: string; openOnly: boolean; jobage?: number }

export function applyFilters(items: Programme[], f: Filters): Programme[] {
  let out = items
  if (f.query) {
    const words = f.query.toLowerCase().split(/\s+/).filter(Boolean)
    out = out.filter((p) => { const hay = `${p.title} ${p.company ?? ""} ${p.categories.join(" ")} ${p.disciplines.join(" ")}`.toLowerCase(); return words.every((w) => hay.includes(w)) })
  }
  if (f.category) { const c = f.category.toLowerCase(); out = out.filter((p) => p.categories.some((x) => x.toLowerCase().includes(c))) }
  if (f.openOnly) out = out.filter((p) => p.closed !== true && !/closed|expired/i.test(p.status ?? ""))
  if (f.jobage !== undefined) {
    const cutoff = Date.now() - f.jobage * 86400e3
    out = out.filter((p) => p.date !== null && new Date(p.date).getTime() >= cutoff)
  }
  return out
}
