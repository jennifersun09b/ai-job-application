import {
  buildSearchUrl, htmlFetch, parseJobCards, resolveDiscipline, resolveLocation,
  writeError, type JobCard, type Order,
} from "../helpers.js"

export interface SearchOpts {
  query?: string
  location?: string
  order: Order
  newOnly: boolean
  page: number
  limit?: number
  format: "json" | "table" | "plain"
}

function renderTable(cards: JobCard[]): string {
  if (cards.length === 0) return "No results."
  const rows = cards.map((c) =>
    `${c.id.padEnd(7)} ${(c.title || "").slice(0, 44).padEnd(44)} ${(c.company || "—").slice(0, 24).padEnd(24)} ${(c.location || "—").slice(0, 20).padEnd(20)} ${c.deadlineIso || c.deadline || "—"}`,
  )
  const header = "ID".padEnd(7) + " " + "TITLE".padEnd(44) + " " + "COMPANY".padEnd(24) + " " + "LOCATION".padEnd(20) + " DEADLINE"
  return [header, "-".repeat(header.length), ...rows].join("\n")
}

export async function runSearch(opts: SearchOpts): Promise<number> {
  try {
    const { disciplinePath, disciplineKey, titleFilter } = resolveDiscipline(opts.query)
    const locationSlug = resolveLocation(opts.location)
    if (opts.location && !locationSlug && !/^(uk|united kingdom|all)$/i.test(opts.location.trim())) {
      writeError(
        `Unknown location "${opts.location}". Gradcracker only filters by UK region: london, london-and-south-east, south-west, east-anglia, east-midlands, west-midlands, north-east, north-west, yorkshire, scotland, north-wales, south-wales, northern-ireland, republic-of-ireland, europe (major cities are mapped to their region).`,
        "BAD_LOCATION",
      )
      return 1
    }
    // Gradcracker renders one page and loads more via a Livewire "Show more"
    // button; there is no public page parameter. Page 2+ is therefore empty.
    if (opts.page > 1) {
      process.stdout.write(JSON.stringify({ meta: { count: 0, page: opts.page, note: "Gradcracker has no page parameter; only page 1 is available" }, results: [] }, null, 2) + "\n")
      return 0
    }
    const url = buildSearchUrl(disciplinePath, locationSlug, opts.order)
    const html = await htmlFetch(url)
    let cards = parseJobCards(html)
    if (titleFilter) {
      const words = titleFilter.toLowerCase().split(/\s+/).filter(Boolean)
      cards = cards.filter((c) => words.every((w) => (c.title + " " + (c.disciplines || "")).toLowerCase().includes(w)))
    }
    if (opts.newOnly) cards = cards.filter((c) => c.isNew)
    if (opts.limit !== undefined && opts.limit >= 0) cards = cards.slice(0, opts.limit)

    if (opts.format === "table") {
      process.stdout.write(renderTable(cards) + "\n")
    } else if (opts.format === "plain") {
      process.stdout.write(cards.map((c) => `${c.title} — ${c.company || "—"} — ${c.location || "—"} — deadline ${c.deadline || "—"}\n${c.url}`).join("\n\n") + "\n")
    } else {
      process.stdout.write(JSON.stringify({
        meta: { count: cards.length, page: 1, discipline: disciplineKey, location: locationSlug, order: opts.order, titleFilter, source: url },
        results: cards,
      }, null, 2) + "\n")
    }
    return 0
  } catch (e) {
    writeError(e instanceof Error ? e.message : String(e), "SEARCH_FAILED")
    return 1
  }
}
