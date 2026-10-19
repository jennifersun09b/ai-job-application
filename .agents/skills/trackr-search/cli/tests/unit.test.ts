import { describe, test, expect } from "bun:test";
import { runCLI } from "./helpers";
import { applyFilters, extractProgrammes, mapProgramme, parseRateLimit, buildUrl } from "../src/helpers";

const rec = { id: "abc123", groupId: "g1", name: "Graduate Data Scientist", companyId: "acme", companyName: "Acme",
  url: "https://acme.example/jobs/1", openingDate: "2026-09-01T00:00:00.000Z", closingDate: "2026-10-31T00:00:00.000Z",
  closed: false, rolling: false, location: "London", categories: ["Data Science"], disciplines: ["Maths"], sponsorsVisa: true };

describe("trackr helpers", () => {
  test("extractProgrammes accepts both response shapes", () => {
    expect(extractProgrammes({ programmes: [rec], groups: [] }).length).toBe(1);
    expect(extractProgrammes([rec]).length).toBe(1);
    expect(extractProgrammes([]).length).toBe(0);
  });
  test("mapProgramme fills contract fields", () => {
    const p = mapProgramme(rec, "uk-tech", "graduate-programmes");
    expect(p.id).toBe("abc123"); expect(p.title).toBe("Graduate Data Scientist"); expect(p.company).toBe("Acme");
    expect(p.date).toBe("2026-09-01"); expect(p.closingDate).toBe("2026-10-31"); expect(p.url).toMatch(/acme/);
    expect(p.categories).toEqual(["Data Science"]); expect(p.sponsorsVisa).toBe(true);
  });
  test("applyFilters query/category/open-only", () => {
    const items = [mapProgramme(rec, "uk-tech", "graduate-programmes"), mapProgramme({ ...rec, id: "x", name: "Quant Dev", closed: true, categories: ["Quant Developer"] }, "uk-tech", "graduate-programmes")];
    expect(applyFilters(items, { query: "data scientist", openOnly: false }).length).toBe(1);
    expect(applyFilters(items, { category: "quant", openOnly: false }).length).toBe(1);
    expect(applyFilters(items, { openOnly: true }).length).toBe(1);
  });
  test("parseRateLimit picks the most restrictive policy", () => {
    const h = new Headers(); h.append("ratelimit", '"1000-in-1day"; r=960; t=72'); h.append("ratelimit", '"10-in-1day"; r=0; t=86226');
    const rl = parseRateLimit(h)!; expect(rl.remaining).toBe(0); expect(rl.limit).toBe(10); expect(rl.resetSeconds).toBe(86226);
  });
  test("buildUrl encodes the four required params", () => {
    expect(buildUrl({ region: "Hong Kong", industry: "Finance", season: "2027", type: "summer-internships" }))
      .toBe("https://api.the-trackr.com/programmes?region=Hong+Kong&industry=Finance&season=2027&type=summer-internships");
  });
});

describe("trackr CLI (offline)", () => {
  test("bogus flag exits 1 with JSON error", async () => {
    const r = await runCLI(["search", "--bogus", "x", "--cache-only"]);
    expect(r.exitCode).toBe(1); expect(JSON.parse(r.stderr).code).toBe("UNKNOWN_FLAG");
  });
  test("unknown tracker exits 1 with BAD_ARG", async () => {
    const r = await runCLI(["search", "-t", "mars-tech", "--cache-only"]);
    expect(r.exitCode).toBe(1); expect(JSON.parse(r.stderr).code).toBe("BAD_ARG");
  });
  test("detail without id exits 1", async () => {
    const r = await runCLI(["detail"]); expect(r.exitCode).toBe(1);
  });
});

// Live test: costs one of the 10 daily API requests, so it only runs when asked for.
describe.if(process.env.TRACKR_LIVE === "1")("trackr CLI (live)", () => {
  test("uk-tech graduate programmes return results", async () => {
    const r = await runCLI(["search", "-t", "uk-tech", "--type", "graduate-programmes", "--limit", "3"]);
    expect(r.exitCode).toBe(0);
    const d = JSON.parse(r.stdout); expect(d.results.length).toBeGreaterThan(0);
    for (const p of d.results) { expect(p.id).toBeTruthy(); expect(p.title).toBeTruthy(); expect(p.url).toBeTruthy(); }
  });
});
