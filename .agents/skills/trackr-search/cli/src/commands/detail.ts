import { allCached, extractProgrammes, mapProgramme, writeError, type Programme } from "../helpers.js"

export interface DetailOpts { id: string; format: "json" | "plain" }

/** Trackr has no per-programme endpoint; look the id up in every cached tracker response. */
export function findCached(id: string): Programme | null {
  const wanted = id.replace(/^https?:\/\/app\.the-trackr\.com\/[^?]*\?.*\bid=/, "")
  for (const c of allCached()) {
    const m = c.url.match(/region=([^&]+)&industry=([^&]+)&season=([^&]+)&type=([^&]+)/)
    const tracker = m ? `${decodeURIComponent(m[1])}-${decodeURIComponent(m[2])}`.toLowerCase().replace(/\s+/g, "-") : "unknown"
    const type = m ? decodeURIComponent(m[4]) : "unknown"
    for (const r of extractProgrammes(c.body)) {
      if (String(r.id) === wanted) return mapProgramme(r, tracker, type)
    }
  }
  return null
}

export async function runDetail(o: DetailOpts): Promise<number> {
  const p = findCached(o.id)
  if (!p) {
    writeError(`Programme "${o.id}" not found in the local cache. Run a search for its tracker first (e.g. search --tracker uk-tech --type graduate-programmes); Trackr has no per-programme endpoint.`, "NOT_FOUND")
    return 1
  }
  if (o.format === "plain") {
    const r = p.raw
    const lines = [
      p.title, `${p.company ?? "—"} · ${p.location ?? "—"}`, "",
      `Tracker: ${p.tracker} / ${p.type}`,
      p.date ? `Opens: ${p.date}` : "", p.closingDate ? `Closes: ${p.closingDate}` : p.rolling ? "Closes: rolling" : "",
      p.status ? `Status: ${p.status}` : p.closed !== null ? `Status: ${p.closed ? "closed" : "open"}` : "",
      p.categories.length ? `Categories: ${p.categories.join(", ")}` : "",
      p.disciplines.length ? `Disciplines: ${p.disciplines.join(", ")}` : "",
      p.degree ? `Degree: ${p.degree}` : "", p.sponsorsVisa !== null ? `Sponsors visa: ${p.sponsorsVisa ? "yes" : "no"}` : "",
      p.lastYearOpening ? `Last year opened: ${p.lastYearOpening}` : "",
      typeof r.process === "string" && r.process ? `Process: ${r.process}` : "",
      typeof r.description === "string" && r.description ? `\n${r.description}` : "",
      typeof r.notes === "string" && r.notes ? `\nNotes: ${r.notes}` : "",
      "", `URL: ${p.url}`,
    ].filter((l) => l !== "")
    process.stdout.write(lines.join("\n") + "\n")
  } else {
    process.stdout.write(JSON.stringify(p, null, 2) + "\n")
  }
  return 0
}
