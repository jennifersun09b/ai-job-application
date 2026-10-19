import { describe, test, expect } from "bun:test";
import { runCLI, parseJSON } from "./helpers";
import { parseJobCards, parseDeadline, resolveDiscipline, resolveLocation } from "../src/helpers";

describe("gradcracker helpers", () => {
  test("parseDeadline handles ordinal dates", () => {
    expect(parseDeadline("November 6th, 2026")).toBe("2026-11-06");
    expect(parseDeadline("Ongoing")).toBeNull();
  });
  test("resolveDiscipline maps keywords and falls back to a title filter", () => {
    expect(resolveDiscipline("data science").disciplineKey).toBe("data-science");
    expect(resolveDiscipline("machine learning").disciplineKey).toBe("ai-machine-learning");
    expect(resolveDiscipline("quant researcher").titleFilter).toBe("quant researcher");
  });
  test("resolveLocation maps cities to regions", () => {
    expect(resolveLocation("London, United Kingdom")).toBe("london");
    expect(resolveLocation("manchester")).toBe("north-west");
    expect(resolveLocation("UK")).toBeNull();
  });
  test("parseJobCards reads a minimal card", () => {
    const html = `<article wire:key="1"><div>New</div><figure><a href="https://www.gradcracker.com/hub/9/acme"><img alt="Acme &amp; Co"></a></figure>
      <h2><a href="https://www.gradcracker.com/hub/9/acme/graduate-job/1/grad-ds">Graduate DS</a></h2><h3>Maths.</h3>
      <div>Deadline</div><div>June 1st, 2027</div><div>Salary</div><div>£30k</div><div>Location</div><div>London</div><div>Degree required</div><div>2:1</div></article>`;
    const [c] = parseJobCards(html);
    expect(c.id).toBe("1"); expect(c.title).toBe("Graduate DS"); expect(c.company).toBe("Acme & Co");
    expect(c.deadlineIso).toBe("2027-06-01"); expect(c.location).toBe("London"); expect(c.isNew).toBe(true);
  });
});

describe("gradcracker CLI (live)", () => {
  test("search returns results with id/title/url", async () => {
    const r = await runCLI(["search", "-q", "data science", "-l", "london", "--limit", "3"]);
    const d = parseJSON<{ results: Array<{ id: string; title: string; url: string }> }>(r);
    expect(d.results.length).toBeGreaterThan(0);
    for (const j of d.results) { expect(j.id).toBeTruthy(); expect(j.title).toBeTruthy(); expect(j.url).toMatch(/gradcracker\.com/); }
  });
  test("bogus flag exits 1 with JSON error", async () => {
    const r = await runCLI(["search", "--bogus", "x"]);
    expect(r.exitCode).toBe(1);
    expect(JSON.parse(r.stderr).code).toBe("UNKNOWN_FLAG");
  });
  test("detail without id exits 1", async () => {
    const r = await runCLI(["detail"]);
    expect(r.exitCode).toBe(1);
  });
  test("detail by full URL returns a description", async () => {
    const r = await runCLI(["detail", "https://www.gradcracker.com/hub/409/arcadis/graduate-job/82568/graduate-data-scientist"]);
    const d = parseJSON<{ title: string; description: string | null; deadlineIso: string | null }>(r);
    expect(d.title).toMatch(/Data Scientist/);
    expect((d.description || "").length).toBeGreaterThan(200);
  });
});
