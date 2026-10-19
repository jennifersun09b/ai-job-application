// Data source: Gradcracker public search pages (https://www.gradcracker.com/search/...).
// Gradcracker has no public JSON API and its free-text /keyword-search endpoint is
// disallowed by robots.txt, so this CLI uses the discipline + location "landing" URLs
// that robots.txt allows and parses the server-rendered job cards with regex.

export const BASE = "https://www.gradcracker.com"

export function writeError(error: string, code: string): void {
  process.stderr.write(JSON.stringify({ error, code }) + "\n")
}

const UA = "Mozilla/5.0 (compatible; gradcracker-cli/1.0)"

/** Fetch HTML with exponential backoff on 429/5xx. Returns "" on a 404. */
export async function htmlFetch(url: string): Promise<string> {
  const maxRetries = 6
  let delay = 500
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-GB,en;q=0.9",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
    })
    if (response.status === 429 || response.status >= 500) {
      if (attempt === maxRetries) throw new Error(`Request failed: ${response.status} ${response.statusText}`)
      const jitter = Math.floor(Math.random() * 500)
      await new Promise((r) => setTimeout(r, delay + jitter))
      delay = Math.min(delay * 2, 8000)
      continue
    }
    if (response.status === 404) return ""
    if (!response.ok) throw new Error(`Request failed: ${response.status} ${response.statusText}`)
    return response.text()
  }
  throw new Error("Request failed after max retries")
}

// ---- URL construction -------------------------------------------------------

/** Sub-discipline slugs under /search/computing-technology/ and engineering disciplines. */
const COMPUTING: Record<string, string> = {
  "data-science": "computing-technology/data-science-graduate-jobs",
  "ai-machine-learning": "computing-technology/ai-machine-learning-graduate-jobs",
  "computer-science": "computing-technology/computer-science-graduate-jobs",
  "cyber-security": "computing-technology/cyber-security-graduate-jobs",
  "software-systems": "computing-technology/software-systems-graduate-jobs",
  "web-development": "computing-technology/web-development-graduate-jobs",
  "information-technology": "computing-technology/information-technology-graduate-jobs",
  hardware: "computing-technology/hardware-graduate-jobs",
  aerospace: "aerospace/engineering-graduate-jobs",
  "chemical-process": "chemical-process/engineering-graduate-jobs",
  "civil-building": "civil-building/engineering-graduate-jobs",
  "electronic-electrical": "electronic-electrical/engineering-graduate-jobs",
  "mechanical-manufacturing": "mechanical-manufacturing/engineering-graduate-jobs",
  all: "all-disciplines/engineering-graduate-jobs",
}

/** Keyword -> discipline slug. Order matters: first match wins. */
const KEYWORDS: Array<[RegExp, string]> = [
  [/\b(data scien|data analy|statistic|analytics)/i, "data-science"],
  [/\b(machine learning|\bml\b|\bai\b|artificial intelligence|deep learning|nlp)/i, "ai-machine-learning"],
  [/\b(cyber|security)/i, "cyber-security"],
  [/\b(web|frontend|front-end)/i, "web-development"],
  [/\b(software|developer|programm|engineer(ing)? graduate)/i, "software-systems"],
  [/\b(computer science|computing)/i, "computer-science"],
  [/\b(\bit\b|information technology|devops|cloud)/i, "information-technology"],
  [/\b(hardware|embedded|fpga)/i, "hardware"],
  [/\b(aerospace|aeronautic)/i, "aerospace"],
  [/\b(chemical|process)/i, "chemical-process"],
  [/\b(civil|structural|building)/i, "civil-building"],
  [/\b(electronic|electrical)/i, "electronic-electrical"],
  [/\b(mechanical|manufactur)/i, "mechanical-manufacturing"],
]

export interface ResolvedQuery {
  disciplinePath: string
  disciplineKey: string
  /** True when the query did NOT map to a discipline and should be used as a title filter. */
  titleFilter: string | null
}

export function resolveDiscipline(query: string | undefined): ResolvedQuery {
  if (!query) return { disciplinePath: COMPUTING.all, disciplineKey: "all", titleFilter: null }
  const q = query.trim()
  const slug = q.toLowerCase().replace(/\s+/g, "-")
  if (COMPUTING[slug]) return { disciplinePath: COMPUTING[slug], disciplineKey: slug, titleFilter: null }
  for (const [re, key] of KEYWORDS) {
    if (re.test(q)) return { disciplinePath: COMPUTING[key], disciplineKey: key, titleFilter: null }
  }
  return { disciplinePath: COMPUTING.all, disciplineKey: "all", titleFilter: q }
}

/** Location slugs Gradcracker exposes as "-in-<slug>" suffixes. */
const LOCATIONS: Record<string, string> = {
  london: "london",
  "london-and-south-east": "london-and-south-east",
  "south-east": "london-and-south-east",
  "south-west": "south-west",
  "east-anglia": "east-anglia",
  "east-midlands": "east-midlands",
  "west-midlands": "west-midlands",
  midlands: "west-midlands",
  "north-east": "north-east",
  "north-west": "north-west",
  yorkshire: "yorkshire",
  scotland: "scotland",
  "north-wales": "north-wales",
  "south-wales": "south-wales",
  wales: "south-wales",
  "northern-ireland": "northern-ireland",
  "republic-of-ireland": "republic-of-ireland",
  ireland: "republic-of-ireland",
  europe: "europe",
  brighton: "brighton",
  manchester: "north-west",
  leeds: "yorkshire",
  birmingham: "west-midlands",
  bristol: "south-west",
  cambridge: "east-anglia",
  oxford: "london-and-south-east",
  edinburgh: "scotland",
  glasgow: "scotland",
  newcastle: "north-east",
  cardiff: "south-wales",
  belfast: "northern-ireland",
  dublin: "republic-of-ireland",
}

export function resolveLocation(location: string | undefined): string | null {
  if (!location) return null
  const slug = location.trim().toLowerCase().replace(/,.*$/, "").replace(/\s+/g, "-")
  if (slug === "uk" || slug === "united-kingdom" || slug === "all") return null
  return LOCATIONS[slug] ?? null
}

export type Order = "relevance" | "deadlines" | "start_date" | "dateAdded" | "grade_asc" | "grade_desc"

export function buildSearchUrl(disciplinePath: string, locationSlug: string | null, order: Order): string {
  const path = locationSlug ? `${disciplinePath}-in-${locationSlug}` : disciplinePath
  return `${BASE}/search/${path}?order=${encodeURIComponent(order)}`
}

// ---- Parsing ----------------------------------------------------------------

export interface JobCard {
  id: string
  title: string
  company: string | null
  companyUrl: string | null
  location: string | null
  /** Gradcracker does not expose a posting date; always null. See `isNew` and `deadline`. */
  date: string | null
  url: string
  deadline: string | null
  deadlineIso: string | null
  salary: string | null
  degreeRequired: string | null
  disciplines: string | null
  isNew: boolean
}

export interface JobDetail extends JobCard {
  starting: string | null
  hiringMultiple: string | null
  description: string | null
  applyUrl: string | null
}

function numericEntity(cp: number): string {
  return cp >= 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : ""
}

export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&plus;/g, "+")
    .replace(/&pound;/g, "£")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&rdquo;/g, "\u201d")
    .replace(/&ldquo;/g, "\u201c")
    .replace(/&hellip;/g, "\u2026")
    .replace(/&bull;/g, "\u2022")
    .replace(/&#(\d+);/g, (_, dec) => numericEntity(parseInt(dec, 10)))
    .replace(/&#[xX]([0-9a-fA-F]+);/g, (_, hex) => numericEntity(parseInt(hex, 16)))
    .replace(/&nbsp;/g, " ")
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
}

export function clean(html: string): string {
  return decodeHtmlEntities(stripTags(html))
}

/**
 * Turn an HTML fragment into a "label | value | label | value" token list so
 * card fields (Deadline, Salary, Location, Degree required) can be read
 * positionally regardless of the Tailwind class soup around them.
 */
function tokens(html: string): string[] {
  const noSvg = html.replace(/<svg[\s\S]*?<\/svg>/gi, " ")
  return noSvg
    .replace(/<[^>]+>/g, "|")
    .split("|")
    .map((t) => decodeHtmlEntities(t).replace(/\s+/g, " ").trim())
    .filter((t) => t.length > 0)
}

function fieldAfter(toks: string[], label: string): string | null {
  const i = toks.findIndex((t) => t.toLowerCase() === label.toLowerCase())
  if (i === -1 || i + 1 >= toks.length) return null
  const v = toks[i + 1]
  // Guard against reading the next label as a value.
  if (/^(deadline|salary|location|degree required|starting|hiring multiple candidates)$/i.test(v)) return null
  return v
}

const MONTHS: Record<string, string> = {
  january: "01", february: "02", march: "03", april: "04", may: "05", june: "06",
  july: "07", august: "08", september: "09", october: "10", november: "11", december: "12",
}

/** "November 6th, 2026" -> "2026-11-06". Returns null when unparseable ("Ongoing", "ASAP"). */
export function parseDeadline(text: string | null): string | null {
  if (!text) return null
  const m = text.match(/([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/)
  if (!m) return null
  const mm = MONTHS[m[1].toLowerCase()]
  if (!mm) return null
  return `${m[3]}-${mm}-${m[2].padStart(2, "0")}`
}

/** Parse the search page: one <article wire:key="<id>"> per job card. */
export function parseJobCards(html: string): JobCard[] {
  const results: JobCard[] = []
  const re = /<article\s+wire:key="(\d+)"([\s\S]*?)<\/article>/g
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    const id = m[1]
    const chunk = m[2]
    const link = chunk.match(/href="(https:\/\/www\.gradcracker\.com\/hub\/\d+\/[^"\/]+\/graduate-job\/\d+\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/i)
    if (!link) continue
    const url = decodeHtmlEntities(link[1]).split("?")[0]
    const title = clean(link[2])
    if (!title) continue

    const hub = chunk.match(/href="(https:\/\/www\.gradcracker\.com\/hub\/\d+\/[^"\/]+)"/i)
    const companyUrl = hub ? decodeHtmlEntities(hub[1]) : null
    const alt = chunk.match(/<img[^>]*\balt="([^"]*)"/i)
    let company = alt ? decodeHtmlEntities(alt[1]).trim() || null : null
    if (!company && companyUrl) {
      company = companyUrl.split("/").pop()!.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    }

    const h3 = chunk.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)
    const disciplines = h3 ? clean(h3[1]) || null : null

    const toks = tokens(chunk)
    const deadline = fieldAfter(toks, "Deadline")
    results.push({
      id,
      title,
      company,
      companyUrl,
      location: fieldAfter(toks, "Location"),
      date: null,
      url,
      deadline,
      deadlineIso: parseDeadline(deadline),
      salary: fieldAfter(toks, "Salary"),
      degreeRequired: fieldAfter(toks, "Degree required"),
      disciplines,
      isNew: /^New$/i.test(toks[0] ?? "") || />\s*New\s*<\/div>/i.test(chunk),
    })
  }
  return results
}

/** Parse a single graduate-job page. */
export function parseJobDetail(html: string, id: string, url: string): JobDetail {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  const titleTag = html.match(/<title>([\s\S]*?)<\/title>/i)
  const title = h1 ? clean(h1[1]) : titleTag ? clean(titleTag[1]).split("|")[0].trim() : "(untitled)"
  const company = titleTag ? (clean(titleTag[1]).split("|")[1] ?? "").trim() || null : null
  const og = html.match(/property="og:url"\s+content="([^"]+)"/i)
  const companyUrl = og ? decodeHtmlEntities(og[1]) : null

  // Overview list: <li><div>Label</div> value</li>
  const overview: Record<string, string> = {}
  const liRe = /<li>\s*<div[^>]*>([\s\S]*?)<\/div>\s*([\s\S]*?)<\/li>/gi
  let lm: RegExpExecArray | null
  while ((lm = liRe.exec(html)) !== null) {
    const label = clean(lm[1]).toLowerCase()
    const value = clean(lm[2])
    if (label && value && !overview[label]) overview[label] = value
  }

  let description: string | null = null
  const start = html.search(/<div class="job-description[^"]*">/i)
  if (start !== -1) {
    const end = html.indexOf('js__apply-button', start)
    const block = html.slice(start, end === -1 ? undefined : end)
    const withBreaks = block
      .replace(/<\s*br\s*\/?>/gi, "\n")
      .replace(/<\/(p|li|ul|ol|div|h\d)>/gi, "\n")
    description = decodeHtmlEntities(withBreaks.replace(/<[^>]+>/g, " "))
      .split("\n").map((l) => l.replace(/\s+/g, " ").trim()).join("\n")
      .replace(/\n{3,}/g, "\n\n").trim() || null
  }
  const apply = html.match(/href="([^"]+)"[^>]*class="[^"]*js__apply-button/i) ||
    html.match(/class="[^"]*js__apply-button[^"]*"[^>]*href="([^"]+)"/i)

  const deadline = overview["deadline"] ?? null
  return {
    id,
    title,
    company,
    companyUrl,
    location: overview["location"] ?? overview["locations"] ?? null,
    date: null,
    url,
    deadline,
    deadlineIso: parseDeadline(deadline),
    salary: overview["salary"] ?? null,
    degreeRequired: overview["degree required"] ?? null,
    disciplines: null,
    isNew: false,
    starting: overview["starting"] ?? null,
    hiringMultiple: overview["hiring multiple candidates"] ?? null,
    description,
    applyUrl: apply ? decodeHtmlEntities(apply[1]) : null,
  }
}
