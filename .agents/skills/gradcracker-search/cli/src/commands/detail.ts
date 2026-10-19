import { BASE, htmlFetch, parseJobDetail, writeError } from "../helpers.js"

export interface DetailOpts {
  id: string
  format: "json" | "plain"
}

/**
 * Accept a full graduate-job URL, or "<hubId>/<jobId>". Gradcracker job pages live
 * under /hub/<employerId>/<slug>/graduate-job/<jobId>/<slug>; the server redirects to
 * the canonical slugs but only when the employer id is right, so a bare job id alone
 * cannot be resolved (a wrong employer id redirects to the employer directory).
 * `search` output always carries the full URL, so pass that.
 */
export function normalizeId(input: string): { id: string; url: string } | null {
  const full = input.match(/^https?:\/\/(?:www\.)?gradcracker\.com\/hub\/(\d+)\/[^\/]+\/graduate-job\/(\d+)\//i)
  if (full) return { id: full[2], url: input.split("?")[0] }
  const pair = input.match(/^(\d+)\/(\d+)$/)
  if (pair) return { id: pair[2], url: `${BASE}/hub/${pair[1]}/x/graduate-job/${pair[2]}/x` }
  return null
}

export async function runDetail(opts: DetailOpts): Promise<number> {
  const norm = normalizeId(opts.id)
  if (!norm) {
    writeError(`Could not parse a Gradcracker job from "${opts.id}". Pass the full job URL from search output (https://www.gradcracker.com/hub/<employerId>/<employer>/graduate-job/<jobId>/<slug>) or "<employerId>/<jobId>"; a bare job id cannot be resolved because the page path also needs the employer id.`, "BAD_ID")
    return 1
  }
  try {
    const html = await htmlFetch(norm.url)
    if (!html) {
      writeError("Job not found", "NOT_FOUND")
      return 1
    }
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)
    const job = parseJobDetail(html, norm.id, canonical ? canonical[1] : norm.url)
    if (opts.format === "plain") {
      const lines = [
        job.title,
        `${job.company || "—"} · ${job.location || "—"}`,
        "",
        job.deadline ? `Deadline: ${job.deadline}` : "",
        job.starting ? `Starting: ${job.starting}` : "",
        job.salary ? `Salary: ${job.salary}` : "",
        job.degreeRequired ? `Degree required: ${job.degreeRequired}` : "",
        "",
        job.description || "(no description)",
        "",
        `URL: ${job.url}`,
        job.applyUrl ? `Apply: ${job.applyUrl}` : "",
      ].filter((l) => l !== "")
      process.stdout.write(lines.join("\n") + "\n")
    } else {
      process.stdout.write(JSON.stringify(job, null, 2) + "\n")
    }
    return 0
  } catch (e) {
    writeError(e instanceof Error ? e.message : String(e), "DETAIL_FAILED")
    return 1
  }
}
