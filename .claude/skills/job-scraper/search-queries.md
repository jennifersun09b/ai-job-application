# Search Queries for Job Scraper

<!-- Customised by /setup 2026-09-08 for Zhuoyan Sun: UK/EU data scientist, applied AI, FDE, health data science -->

## Installed portal CLIs (primary for `/scrape`)

`/scrape` discovers every portal skill under `.agents/skills/*/SKILL.md` and runs its CLI first. Shipped country-agnostic CLIs include `linkedin-search` and `freehire-search`; Danish demos and any skill you add with `/add-portal` are included the same way. You do **not** need a matching `site:` line below for those CLIs to run.

The `site:` query templates in this file are the **WebSearch fallback** — for portals without a CLI, company career pages, or when a CLI fails.

**Language scope:** write every query category in every language listed in your CLAUDE.md Languages table (typically 1-2, sometimes more). A posting requiring a language you have *not* declared, as a job condition, is excluded before scoring; a posting requiring a *higher level* than you declared in a language you *do* work in is flagged for your own judgment, not excluded — see `04-job-evaluation.md`'s Language Gate, the single source of truth for this rule. Translate each category's keywords rather than machine-translating word-for-word (e.g. "Frontend Developer" -> "Desarrollador Frontend", not a literal word-for-word translation) if you work in more than one language.

## Search Sites

Primary (UK market):
- **linkedin.com/jobs** - LinkedIn job listings (filter: United Kingdom / London); covered by `linkedin-search` CLI
- **freehire.me** - tech job aggregator; covered by `freehire-search` CLI (`--country GB`)
- **gradcracker.com** - UK STEM graduate jobs and schemes; covered by `gradcracker-search` CLI (discipline + region pages; no free-text search, no posting dates - use `--order dateAdded --new` and `deadlineIso`)
- **glassdoor.co.uk** - **WebSearch fallback only, no CLI.** Glassdoor's terms of use prohibit automated access and `robots.txt` disallows `/search/`, `/jobview/` and paginated `/Job/*_IP*` pages, so this framework does not scrape it. Use the `site:` queries below and open matches in the browser; use Glassdoor primarily for company reviews and salary ranges during `/apply` and `/interview` research.
- **the-trackr.com** - Trackr application trackers (UK tech graduate schemes, internships, spring weeks); covered by `trackr-search` CLI. **Quota: 10 API requests per day**, cached 12h - `/scrape` should call only `uk-tech` `graduate-programmes` and `summer-internships` by default, with `--jobage 14` on the opening date.

Secondary (company career pages via Google):
- Direct Google searches with `site:` filters for known target companies

## Query Categories

Queries are written in English only (both declared languages are English and Mandarin; no target market posts in Mandarin). Combine with location terms London / United Kingdom / Remote; EU postings use the country name.

**Organize by function, not job title.** The same work is posted as Data Scientist, Insights Analyst, Product Analyst, Data Consultant or Decision Scientist depending on the employer.

### Priority 1: Data Scientist (product analytics, experimentation, healthcare)

Strongest and most desired direction; the TikTok analyst role and the UCL dissertation are the direct precedents.

```
site:linkedin.com/jobs "graduate data scientist" London
site:linkedin.com/jobs "junior data scientist" "United Kingdom"
site:linkedin.com/jobs "data scientist" (graduate OR associate OR "early career") London
site:linkedin.com/jobs "product analyst" OR "decision scientist" OR "insights analyst" London
site:linkedin.com/jobs "health data scientist" OR "clinical data scientist" "United Kingdom"
site:gradcracker.com/hub "data scientist" graduate-job
site:glassdoor.co.uk/Job "graduate data scientist" London
```
CLI equivalents: `linkedin-search -q "graduate data scientist" -l "London, United Kingdom" --jobage 14`; `gradcracker-search -q "data science" -l london --order dateAdded`; `trackr-search -t uk-tech --type graduate-programmes --category "Data Science"`; `freehire-search -q "data scientist" --country GB --jobage 14`.

### Priority 2: Applied AI / LLM evaluation / health AI

Domain expertise: LLM benchmark and rubric design, knowledge graphs, clinical NLP, UK Biobank causal ML.

```
site:linkedin.com/jobs "applied AI engineer" OR "AI engineer" graduate London
site:linkedin.com/jobs "LLM" (evaluation OR "AI quality" OR "applied scientist") London
site:linkedin.com/jobs "clinical AI" OR "medical AI" OR "healthcare AI" "United Kingdom"
site:linkedin.com/jobs "NLP" (clinical OR healthcare) "United Kingdom"
site:trackr "AI and Machine Learning"
```
CLI equivalents: `linkedin-search -q "applied AI engineer" -l "London, United Kingdom" --jobage 14`; `trackr-search -t uk-tech --type graduate-programmes --category "AI and Machine Learning"`; `gradcracker-search -q "machine learning" -l london`.

### Priority 3: Forward Deployed Engineer / AI solutions / data consulting

Adjacent: client-facing delivery is proven (BeiGene, Apple x Tmall, Ipsos), production engineering is the gap. Target graduate-friendly FDE tracks and consulting.

```
site:linkedin.com/jobs "forward deployed engineer" London
site:linkedin.com/jobs "forward deployed" (graduate OR associate OR "new grad") "United Kingdom"
site:linkedin.com/jobs "AI solutions engineer" OR "solutions engineer" AI London
site:linkedin.com/jobs "data science consultant" OR "AI consultant" graduate London
site:glassdoor.co.uk/Job "forward deployed engineer" London
```
CLI equivalents: `linkedin-search -q "forward deployed engineer" -l "London, United Kingdom" --jobage 14`; `freehire-search -q "forward deployed engineer" --country GB --jobage 14`.

### Priority 4: Wider net (EU, remote, graduate programmes, analyst tracks)

```
site:linkedin.com/jobs "data scientist" graduate (Amsterdam OR Berlin OR Copenhagen OR Dublin OR Paris OR Zurich)
site:linkedin.com/jobs "data scientist" remote "United Kingdom"
site:linkedin.com/jobs "graduate analyst" (data OR analytics OR strategy) London 2027
site:linkedin.com/jobs "graduate programme" (data OR technology OR "digital") "United Kingdom" 2027
site:novonordisk.com graduate programme data science
site:careers.google.com "data scientist" "university graduate"
site:jobs.apple.com "data scientist" health
site:jobs.bytedance.com "data scientist" graduate London
```
CLI equivalents: `linkedin-search -q "data scientist" -l "Remote" --jobage 14`; `linkedin-search -q "graduate data scientist" -l "Amsterdam, Netherlands" --jobage 14`; `trackr-search -t uk-tech --type summer-internships` (for 2027 internships as a fallback).

## Location Filter

- **Ideal:** London and Greater London (hybrid or onsite)
- **Acceptable:** any UK city (Cambridge, Oxford, Manchester, Edinburgh, Bristol, Brighton), fully remote UK, EU cities (Amsterdam, Berlin, Copenhagen, Dublin, Paris, Zurich, Munich)
- **Borderline:** USA (only for exceptional employers); roles requiring relocation with no relocation support
- **Too far:** none as a hard rule; Asia-Pacific is not currently targeted

## Language Filter

Both declared languages are English (fluent) and Mandarin (native). Apply `04-job-evaluation.md`'s Language Gate: a posting requiring another language as a job condition is excluded; Mandarin-speaking roles are a positive signal, not a requirement.

## Date Filter

Only include jobs posted within the last 14 days, or with an application deadline that has not yet passed. Gradcracker exposes deadlines only (use `deadlineIso`); Trackr exposes opening dates (use `--jobage` on the opening date). If a posting date cannot be determined, include it but flag as "date unknown".

## Portal budget

Per `/scrape` run: LinkedIn (4-6 queries), freehire (2-3), Gradcracker (2-3 pages), Trackr **at most 2 requests** (`uk-tech` graduate-programmes and summer-internships; 10-per-day API quota, 12h cache). Danish portals stay disabled.

## Adapting Queries

If the user specifies a focus area, select queries from the matching category and also generate 2-3 custom queries for that focus. For example:
- "/scrape [focus_area]" -> relevant category queries + custom focus-specific queries
