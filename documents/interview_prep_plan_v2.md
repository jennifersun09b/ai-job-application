# Interview Plan v2: Data Analyst, Data Scientist, AI / Agent Engineer

**For:** Zhuoyan (Jennifer) Sun | **Written:** Mon 19 Oct 2026 | **Runs:** 19 Oct to 13 Dec 2026 (8 weeks)
**Replaces:** `interview_prep_master_plan.md` (16 Oct). The old file's syllabus detail still holds. This version:
- adds a **Data Analyst** track
- maps your **LeetCode tag list** to each role
- adds a **question bank** for each role
- has the plan **reviewed by a simulated interviewer panel**, with the panel's changes built into the final schedule (section 8)
- fixes the stale visa answer (you're on a partner visa now)

**Time budget:** about 15 h a week (1.5 h on weekdays after TikTok, 4 h on each weekend day). The panel cut this down from 20 h, which isn't realistic alongside a full-time job. Items marked *(stretch)* can be dropped.

---

## 0. The short version

1. **One core, three add-ons.** Every role tests SQL or Python, your project deep dives and behavioural answers. On top of that:
   - **DA:** SQL speed, business cases and dashboards
   - **DS:** statistics, A/B testing, ML and product sense
   - **AI / Agent Engineer:** LLM basics, RAG, agents, evals and AI system design
2. **Your strongest big-company lanes are DS and DA** (Google DS University Graduate, TikTok/ByteDance graduate DS/DA, Amazon DA/BIE). Big-company AI Engineer titles mostly ask for 1-5 years. Agent skills are what make your DS and AI-graduate applications stand out, so treat them as a differentiator, not a separate lane.
3. **LeetCode:** `Database` is your most important tag. Do about **130 SQL problems** (DA needs the most) and about **75 algorithm problems** (DS and AI). Hard DP and graphs are an **add-on only for Amazon or Google engineering loops**.
4. **Your record is unusually strong for a graduate**: an LLM benchmark adopted by a pharma client, an agent your team adopted at TikTok, and causal ML on 458k people. Interviewers will spend 10-20 minutes on each, so most of your marks are won or lost there.
5. **The panel's biggest changes:** start mocks in week 2 rather than week 4; fix your public evidence in week 1 (the NHS RAG agent isn't on GitHub yet); add a DA module; build one public agent project with a real eval; collect hard numbers on the TikTok agent.

---

## 1. What big-company job descriptions ask for

Searched 16-19 Oct 2026. Official postings where reachable, otherwise job-board mirrors and third-party guides (sources at the end).

### 1.1 Data Analyst

| Company / role | What the JD asks for | Entry-level? |
|---|---|---|
| **TikTok Shop, Data Analyst Project Intern (EMEA DS), London** | SQL and Python; "common data statistics and analysis methods"; degree in computing, statistics or maths | Intern level. Graduate DA/DS roles follow the same pattern |
| **TikTok LIVE, Senior Data Analyst, London** | 5+ years; SQL plus Python; Tableau, Power BI or Looker | No. Use it as the content benchmark |
| **TikTok Shop, Senior DS, Operations, London** | 3+ years; SQL plus Tableau; Python/R preferred; **A/B testing, probability, regression** | No. It shows the operations-analytics content you already do |
| **Amazon, Data Analyst, Vendor Experience & Operations, London** | Bachelor's; **Excel; SQL**; making business recommendations | Yes (5 years is *preferred*, not required) |
| **Amazon, BIE, AMXL Analytics, London** | Redshift/SQL; **Tableau or QuickSight**; data modelling | Borderline. BIE is the more technical DA title |
| **Google, Data Analyst, News Partnerships, London** | 3 years in analytics; statistics plus SQL/Python; spreadsheets **or pipelines and automated workflows**; Master's preferred | Stretch (3 years) |

**DA skills, ranked:**
1. **SQL** (every posting)
2. Excel / spreadsheets
3. BI tools (Tableau, Power BI, Looker, QuickSight)
4. Statistics and A/B basics
5. Turning analysis into recommendations
6. Python
7. Automating workflows (Google lists it outright, and your TikTok agent is exactly this)

### 1.2 Data Scientist

| Company / role | What the JD asks for |
|---|---|
| **Google, DS University Graduate 2026** | Master's; R/Python; **statistics and causal inference**; combining experimentation, econometric and ML methods; presenting recommendations. Reads almost like your CV |
| **Meta, DS Product Analytics** | SQL, product sense, experimentation, statistics. Product DS at Meta doesn't build ML models |
| **TikTok/ByteDance DS** | SQL on large data; Python/R; **designing and interpreting A/B tests**; dashboards |
| **Amazon DS (UK)** | Master's; SQL plus Python/R; statistics; Leadership Principles behavioural bar |
| **Microsoft, DS (Applied AI)** | Master's plus 1 year; production LLM services, RAG, **LLM evaluation (golden sets, human review, A/B tests)** |

**DS skills, ranked:**
1. SQL
2. Statistics and experimentation
3. Causal inference
4. Product sense and metrics
5. Classical ML and evaluation
6. Python/pandas
7. Communication

### 1.3 AI Engineer / Agent Engineer

| Company / role | What the JD asks for |
|---|---|
| **Google Cloud, FDE (GenAI), London** | RAG and vector DBs; **multi-agent frameworks (LangGraph, CrewAI, ADK)**; ReAct and self-reflection; **MCP, tool calling, OAuth**; tokens per second and cost per request; customer discovery |
| **Amazon, Agentic AI Engineer** (guides) | Agent loops, tool calling, memory, RAG, **evaluating non-deterministic systems**; agent system design; **standard SDE coding bar** |
| **Microsoft AI, MTS Applied AI (Health), London** | Has designed and shipped LLM products to production |
| **Avanade, Agentic AI Engineer** (Microsoft ecosystem) | Python, **FastAPI**, **Docker**, hands-on with GPT/Claude/Gemini/Llama |
| **London AI-native startups** | LLM APIs, lightweight agents, orchestration (LangGraph, Temporal) |

**AI/Agent skills, ranked:**
1. Python engineering
2. LLM APIs and tool calling
3. RAG
4. **Evals**
5. Agent design (workflows vs agents, multi-agent)
6. Production basics (FastAPI, Docker, latency, cost, monitoring)
7. AI system design
8. Algorithms (heavier at Amazon and Google)

### 1.4 Your evidence vs the requirements

| Skill | DA | DS | AI/Agent | Your evidence | Gap |
|---|---|---|---|---|---|
| SQL | ●●● | ●●● | ● | TikTok merchant data daily; Ipsos | **Speed under a timer**, and hard window functions |
| Excel / BI dashboards | ●●● | ● | – | Power BI; TikTok KPI dashboards | No public dashboard; no Tableau or Looker |
| Statistics / A/B | ●● | ●●● | ● | Permutation tests, causal forests, E-values; blinded A/B at DS Digital | Practising textbook A/B *design questions* out loud |
| Causal inference | ● | ●●● | – | Dissertation (doubly robust, overlap weighting, QBA) | None. **This is your edge** |
| Product / business cases | ●●● | ●●● | ● | TikTok market-entry and KPI work | Structured case practice under time pressure |
| Classical ML | ● | ●●● | ●● | LR vs tree ensembles, calibration, decision curves | Explaining the theory from first principles |
| Python / pandas | ●● | ●●● | ●●● | Every project | Live coding **without AI help** |
| Algorithms | ● | ●● | ●●(●) | Little LeetCode history | **Biggest DS/AI gap** |
| LLM basics / RAG | – | ● | ●●● | NHS RAG agent (hybrid RRF hit@1 0.83); 6-LLM pipeline | Explaining transformer internals |
| Evals (LLM-as-judge) | – | ●● | ●●● | 246-question benchmark, 6-dimension rubric, 2,400+ responses | Judge-vs-human agreement numbers |
| Agents / tool use / MCP | – | ● | ●●● | TikTok agent (Claude Code); NHS router agent | Multi-agent design; no public agent with a live eval |
| Production (FastAPI, Docker, CI) | – | ● | ●●● | Docker, Streamlit, basic AWS | **No deployed service.** Build one endpoint |
| AI system design | – | ● | ●●● | – | **Practise 8 designs** |
| Stakeholder communication | ●●● | ●●● | ●● | Client presentations at DS Digital and Ipsos; TikTok cross-functional work | Habit of over-explaining. Lead with the answer |

●●● = core for the role, ●● = often tested, ● = sometimes, – = rarely

---

## 2. Typical interview rounds for each role

These are typical patterns. **Always ask the recruiter:** "Which rounds are there, what tools and language for the technical rounds, and are docs or AI allowed?"

### 2.1 Data Analyst

| Stage | Format | Big-company examples |
|---|---|---|
| Online assessment | Timed SQL (HackerRank/CodeSignal), sometimes Excel, stats MCQ, numerical reasoning | Amazon DA OA (SQL, Excel, stats/A/B); Revolut (4-question SQL test, reported as "pretty hard") |
| Recruiter or HM screen (30-45 min) | Background, why us, tools, one SQL or metric question | Google recruiter call (25-30 min) |
| Live SQL (45-60 min) | 2-4 queries on a shared schema, **explained aloud** | Google: joins, subqueries, HAVING vs WHERE, ask about the data first; Revolut: 7-day moving average |
| Business / metric case | "Metric X dropped, why?", "how would you measure feature Y?", dashboard design | Google: traffic drop, measuring a new feature, cleaning messy data for a non-technical stakeholder |
| Take-home (some firms) | Dataset → analysis → slides or a dashboard in 3-6 h | Common at UK scale-ups and consultancies |
| Behavioural / final | Stakeholders, influencing with data, ownership | Amazon: Leadership Principles in every round, Bar Raiser |

### 2.2 Data Scientist

| Stage | Format | Big-company examples |
|---|---|---|
| Recruiter screen | Background, motivation, logistics | All |
| Technical screen (45-60 min) | SQL plus probability/statistics, sometimes one LeetCode easy/medium | Meta: SQL and probability; TikTok: SQL plus a LeetCode medium |
| Onsite: SQL / coding | Window functions, cohort, retention, funnels; pandas | Meta: rank users by engagement, rolling 7-day average with missing dates; TikTok: 7-day rolling DAU |
| Onsite: statistics and experimentation | A/B design, sample size, pitfalls, causal inference without randomisation | Google names causal inference in the JD |
| Onsite: product case | Analytical reasoning (before launch) and analytical execution (after launch) | Meta ("product thinking over fancy maths"); TikTok: evaluate a TikTok Shop market launch before an A/B test |
| Onsite: ML (ML-heavy teams) | Model choice, metrics, leakage, ML system design | Amazon, Microsoft |
| Behavioural / HM | Influencing product direction with data | Meta, Amazon LPs, Google "Googleyness" and hypotheticals |

### 2.3 AI Engineer / Agent Engineer

| Stage | Format | Big-company examples |
|---|---|---|
| Recruiter screen or OA | Sometimes 2 algorithm problems | Amazon OA |
| Coding screen (60 min) | LeetCode medium **or** practical coding (parse JSON, rate limiter, chunker, retry with backoff) | Amazon: "k most frequent elements in a stream" (heap and hash map); startups prefer practical problems |
| Coding onsite (1-2 rounds) | Clean code, tests, complexity | Amazon holds agent engineers to the **standard SDE bar** (graphs, heaps, DP) |
| LLM / agent depth (60 min) | Transformers, sampling, tool calling, memory, RAG, fine-tuning vs prompting; deep follow-ups on what you've built | Amazon: "explain function calling from tool schema to executed action"; "when would you use multiple agents instead of one?" |
| AI system design (45-60 min) | Design a RAG or agent system with evals, guardrails, cost and latency | Amazon: refund-issuing customer-service agent; "your agent loops forever on a failing tool call" |
| Take-home (startups) | Build a small agent, then discuss it | LangChain-style: take-home → discussion → applied design |
| Project deep dive / tech talk | 15-20 min presentation of your work | Amazon science loops |
| Behavioural / Bar Raiser | LPs; customer focus for FDE roles | Amazon Bar Raiser can veto |

---

## 3. Your LeetCode tag list, mapped to each role

**Key:** M = must do, S = should do, L = light touch (2-3 classics), – = skip. "Amazon/Google eng" = engineering loops at the SDE bar (add-on only).

| Tag (count) | DA | DS | AI/Agent | Amazon/Google eng |
|---|---|---|---|---|
| **Database (310)** | **M (about 130)** | **M (about 90)** | S (SQL 50) | S |
| Array (2274), String (896), Hash Table (844) | S (easy) | M | M | M |
| Sorting (540), Counting (215) | S | M | M | M |
| Two Pointers (264), Sliding Window (175) | L | M | M | M |
| Prefix Sum (277) | L | M | M | M |
| Math (710) | L | S | L | S |
| Heap / Priority Queue (222) | – | S | M | M |
| Stack (182) | – | S | M | M |
| Binary Search (357) | – | S | M | M |
| Probability & Statistics (7), Reservoir Sampling (4), Randomized (12), Rejection Sampling (2) | L | **M (all)** | S | S |
| Design (136) | – | L | **M** (LRU, rate limiter, KV store) | M |
| Tree (270), Binary Tree (181), DFS (349), BFS (260) | – | S | M | M |
| Graph Theory (190), Topological Sort (40) | – | L | S (task DAGs) | M |
| Linked List (82), Queue (58) | – | L | S | M |
| Greedy (483) and intervals | – | L | S | M |
| Matrix (285), Simulation (218) | – | L | S | M |
| Monotonic Stack (76) / Queue (26), Data Stream (24) | – | – | L | S |
| Trie (61) | – | – | L | S |
| Recursion (51), Memoization (44) | – | L | S | M |
| Dynamic Programming (686) | – | L (6 classics) | L (8 classics) | **M (about 20)** |
| Backtracking (114) | – | – | L | S |
| Union-Find (99), Shortest Path (43) | – | – | – | L |
| Bit Manipulation (297), Enumeration (163) | – | – | – | L |
| Concurrency (9) | – | – | Read about Python `asyncio` instead | L |
| Segment Tree, BIT, Ordered Set, Suffix Array, Rolling Hash, String Matching, Game Theory, Minimax, Number Theory, Geometry, Combinatorics, Bitmask, Divide & Conquer, MST, Eulerian, SCC, Biconnected, Meet in the Middle, Radix/Bucket/Counting Sort, Sweep Line, Brainteaser, Interactive, Shell, Quickselect | – | – | – | – |

### 3.1 SQL list (Database tag), in order

1. **LeetCode SQL 50 study plan** (weeks 1-2), all of it.
2. **Classic interview SQL** (week 3), all real LeetCode problems:
   - 176 Second Highest Salary
   - 177 Nth Highest Salary
   - 178 Rank Scores
   - 180 Consecutive Numbers
   - 184 Department Highest Salary
   - **185 Department Top Three Salaries**
   - 197 Rising Temperature
   - **262 Trips and Users**
   - **550 Game Play Analysis IV** (retention)
   - **601 Human Traffic of Stadium** (gaps and islands)
   - 602 Friend Requests II
   - 1164 Product Price at a Given Date
   - 1193 Monthly Transactions I
   - 1204 Last Person to Fit in the Bus
   - **1321 Restaurant Growth** (rolling 7-day window)
   - 1341 Movie Rating
   - 1934 Confirmation Rate
3. **Company-style** (weeks 3-6): 30 on DataLemur and StrataScratch, filtered to Amazon, Meta, Google and TikTok.
4. **Timed sets** (weeks 5-8): one set a week of **4 questions in 45 minutes** (Revolut and Amazon OA format). Say your assumptions before you write.
5. **pandas:** LeetCode "30 Days of Pandas", plus 10 SQL problems redone in pandas.

**Patterns to know cold:**
- anti-join
- conditional aggregation
- CTEs
- `ROW_NUMBER` / `RANK` / `DENSE_RANK`
- `LAG` / `LEAD`
- running sums and rolling windows (including **missing dates**, via a calendar table)
- top-N per group
- de-duplication
- retention and cohort tables
- funnels
- gaps and islands
- median
- self-joins
- date maths
- NULL traps in `COUNT`, `AVG` and `NOT IN`
- **For DA/BIE:** query execution order, indexes and partitions at a high level, and star schema (fact and dimension tables)

### 3.2 Algorithm list (about 75; ★ = do twice)

Same list as the 16 Oct plan, section 2:
- **Weeks 1-2:** arrays and hashing; two pointers, sliding window, prefix sum
- **Week 3:** stack, binary search, heap
- **Week 4:** linked list, design (**LRU Cache★**), intervals
- **Week 5:** trees and graphs (**Course Schedule★**)
- **Week 6:** sampling, probability, light DP (Random Pick with Weight★, Implement Rand10() Using Rand7(), Edit Distance)
- **Weeks 7-8:** timed review

**Target by week 8:** easy in 10 min or less, medium in 25 min or less, out loud, with tests you wrote yourself.

### 3.3 Practical coding (AI/Agent rounds)
- Do the 13 practice problems in `documents/applications/pangaea-data_ai-engineer/interview_prep/`: parse LLM JSON, retry with backoff, chunk and retrieve, LRU cache with TTL, rate limiter, and the rest.
- Write these from scratch:
  - ROC-AUC
  - k-fold CV
  - bootstrap CI
  - permutation test
  - cosine top-k
  - BM25
  - softmax
  - scaled dot-product attention
  - a chunker with overlap
  - a **raw-API agent loop with tool calling**
  - async LLM calls with a concurrency limit

### 3.4 Engineering add-on (only if an Amazon or Google engineering loop is booked)
- About 20 DP problems: 1-D, grid, knapsack, LIS, LCS, edit distance, word break.
- About 10 graph problems: BFS/DFS, topological sort, Union-Find, Dijkstra once.
- About 5 Trie, about 5 backtracking.
- One hard a week.
- Takes about 3 weeks. Switch to it the day an interview is booked.

---

## 4. Question bank (what they'll actually ask you)

### 4.1 SQL / pandas (DA, DS)
- Daily active users and a **7-day rolling average** of DAU, including days with no activity.
- Users whose completed spend in the **first 7 days after sign-up** is over £100 (Revolut-style).
- Product with the highest **CTR** from an events table (aggregate first, then divide).
- **Day-1 and day-7 retention** by sign-up cohort.
- Top 3 merchants by GMV **per category** each month.
- Funnel: view → add to cart → purchase conversion by traffic source.
- Users active **3 or more consecutive days** (gaps and islands).
- Month-over-month GMV growth per merchant with `LAG`.
- "What's wrong with this query?" (a NULL in `NOT IN`, a fan-out join double-counting revenue).
- "Before you write anything: what would you ask about this table?" (grain, duplicates, time zone, test accounts).

### 4.2 Statistics and probability (DS, some DA)
- Explain a p-value to a PM. What it is **not**.
- Type I vs type II error, power, and what drives sample size.
- The 95% CI covers 0. What do you tell the business?
- **Bayes:** a test is 99% sensitive and 95% specific, prevalence 1%. What's P(disease | positive)?
- Expected number of rolls to get a 6; to get two 6s in a row.
- Generate a uniform random number with an unfair coin; rand10 from rand7.
- Simpson's paradox with an example from your own data domain.
- When to use Mann-Whitney or a permutation test instead of a t-test. (You have real examples: use them.)
- Multiple testing: you ran 120 contrasts. How did you control false discoveries?
- Correlation vs causation. Name 3 ways to estimate a causal effect without randomisation.

### 4.3 A/B testing and causal inference (DS)
- Design an A/B test for a lower free-shipping threshold on TikTok Shop. Cover the unit, primary and guardrail metrics, sample size, duration and risks.
- **Marketplace interference:** buyers and merchants interact. Why does user-level randomisation break, and what do you do instead (geo, switchback, cluster)?
- The test is significant on day 3. Can you stop? (Peeking, sequential testing.)
- The sample ratio is 52/48. What happened?
- The treatment raised GMV but lowered retention. Ship or not?
- **You can't run an A/B test for a new-market launch. How do you measure its impact?** (Diff-in-diff, synthetic control, matched markets.)
- Explain doubly robust estimation to an engineer in 60 seconds.
- What's an E-value? Why did you use one?

### 4.4 Product and business cases (DA, DS)
- UK GMV is down 8% week on week. Walk me through the diagnosis.
- Define a **North Star metric** and 3 guardrails for TikTok Shop merchant growth.
- Design a dashboard for the ops lead: which 5 numbers, what cadence, which alerts?
- How do you know whether an **AI customer-support bot** is working?
- How do you prioritise which low-performing merchants to target for an ads programme? (Close to your TikTok work. Talk about the method, not internal data.)
- A stakeholder wants a number by tomorrow and the data is messy. What do you do?
- Critique this chart. (Truncated axes, dual axes, missing denominators.)
- Excel: VLOOKUP/XLOOKUP vs INDEX-MATCH, pivot tables, a quick what-if model (Amazon DA OA).

### 4.5 Machine learning (DS, AI)
- Logistic regression vs gradient boosting. **Why didn't boosting beat LR in your dissertation** (AUC 0.714-0.718)?
- ROC-AUC vs PR-AUC; when calibration matters more than discrimination.
- Explain decision curve analysis.
- Name 3 ways leakage gets into a longitudinal dataset.
- The model is great offline but has no business lift. Why?
- Class imbalance: what do you actually do?
- Bias-variance; L1 vs L2.
- How would you monitor a deployed model for drift?

### 4.6 LLM / RAG / evals (AI, some DS)
- Walk through what happens from prompt to token, including the **KV cache**.
- Temperature vs top-p. Why is greedy decoding sometimes worse?
- Prompting vs RAG vs fine-tuning: draw the decision table.
- Your hybrid RRF got hit@1 0.83 and reranking dropped it to 0.815. **Why, and what would you try next?**
- How did you **validate the LLM judge** at DS Digital? Agreement with clinicians? Position and verbosity bias?
- How did you build the 246 questions? How do you know they cover real patient needs?
- Why a **blinded paired** A/B for the knowledge graph rather than unpaired?
- Prompt injection through retrieved documents: how do you defend against it?
- Hallucination: how do you measure faithfulness?

### 4.7 Agents (AI/Agent)
- Explain function calling end to end, from the tool schema to the executed action.
- **Workflow vs agent:** when *not* to use an agent?
- When would you use multiple agents instead of one? What does it cost?
- Your agent loops forever on a failing tool call. Diagnose it and fix it.
- How do you evaluate an agent? (Task success, **trajectory and tool-call accuracy**, cost and latency per task, regression suite.)
- Memory: what goes in context, what goes in a store, and how do you compact?
- MCP: what is it and why does it matter? How do you scope auth for a tool (OAuth, least privilege)?
- **Your TikTok agent:** what are the steps? What does the validation step check? What's the error rate? What happens when it's wrong? How many people use it?

### 4.8 AI system design (AI/Agent)
1. A customer-service agent that can **issue refunds safely** (Amazon)
2. A Q&A assistant over NICE guidelines for GPs
3. A support agent for TikTok Shop merchants (listing issues, policy questions)
4. A document-extraction pipeline with citations and an audit trail
5. An LLM-evaluation platform for a team that ships prompt changes weekly
6. An agentic recommendation system, and how to evaluate its quality and safety (Amazon)
7. Semantic search over 1M documents
8. Classic ML: a churn or fraud system (for DS loops)

**Answer template:**
1. Clarify
2. Success metrics and evals **first**
3. Baseline
4. Architecture
5. Model and retrieval
6. Safety
7. Cost and latency (with numbers)
8. Monitoring
9. Trade-offs

### 4.9 Behavioural (all roles)
- Tell me about yourself: 3 versions (DA, DS, AI), **60-90 s**.
- Why this company / why this role / why data after biology?
- A time you took initiative without being asked (TikTok agent).
- A time you dealt with ambiguity (BeiGene brief to benchmark).
- A time you were wrong, or your result was disappointing (dissertation null result).
- A time you disagreed, or had to convince a sceptic (TikTok supervisor).
- A time you had competing deadlines (dissertation alongside DS Digital, Jul-Sep 2026).
- A conflict in a team (UCL group project).
- How do you use AI tools in your work? (Name **Claude Code**, and say how you verify its output.)
- **Visa:** "I have the right to work in the UK and won't need sponsorship, now or in the future." (Partner visa. Don't volunteer more detail.)

**Never use:** the Apple x Tmall work, Grand Pharmaceutical, IQVIA, or the old $20M Ipsos figure.

---

## 5. Project deep dives: your fact sheets

For each project, write a **one-page fact sheet** in week 1 and rehearse 3 versions: 30 s, 2 min and 10 min. Each sheet covers:
- Problem → your role → method → numbers → what broke → what you'd do differently → business impact

| Project | Numbers you have | Numbers you still need (collect; never invent) |
|---|---|---|
| **TikTok agent (Claude Code)** | 40-50% time saved; multi-step with a validation step; delivered before a same-day deadline | Number of merchants or configs per run; validation error rate; number of users or teams; hours saved per week |
| **BeiGene / DS Digital eval** | 246 questions; 6 dimensions plus red lines; 6 LLM APIs; 2,400+ responses; KG 123 entities and 161 relations; 4,800+ threads mined | Judge-vs-human agreement (if never measured, say so and explain how you'd measure it); which model won and by how much; the A/B result |
| **Dissertation** | 458,840 baseline; AUC 0.714-0.718; 71,428 causal; 24 transitions and 120 contrasts; E-values, QBA, NHEFS validation | A one-sentence "so what" for a non-technical audience |
| **NHS RAG agent** | Hybrid RRF hit@1 0.83, MRR 0.867; rerank 0.815 at 1.5 s/query; router top-1 28% | Live agent run: generation-eval score, cost per query, latency |
| **Patient-question classification** | PubMedBERT beat TF-IDF + kNN | Exact macro-F1 for each model |

**Confidentiality rule (panel point):** don't share internal TikTok or client numbers beyond what's on your CV. Say "I can't share the exact figures, but the approach was...". Interviewers respect this, and leaking data is an instant red flag.

---

## 6. Draft schedule given to the panel (before review)

| Week | Draft focus |
|---|---|
| 1-2 | SQL 50; arrays, hashing, two pointers; statistics and A/B; story bank |
| 3 | Heap, stack, binary search; ML basics; product cases |
| 4 | Design, intervals; LLM basics and evals; **first mock** |
| 5 | Trees and graphs; RAG; system designs 1-3 |
| 6 | Light DP; agents; cost and latency |
| 7-8 | Timed review; more mocks; company-specific prep |

20 h a week; DS and AI tracks only.

---

## 7. Interviewer panel review

> These are **simulated** interviewers. I'm role-playing typical big-company bar-setters using the research in sections 1-2, not real employees of these companies. Each one reviewed your CV (resume_2.pdf), GitHub, portfolio and the draft schedule in section 6.

### 7.1 Google: Data Scientist interviewer (Product Analytics, London)

**Verdict on the draft: 6.5/10. Good content, weak calibration.**
- ✅ Causal inference and experimentation are a real advantage. Your JD match to the DS University Graduate role is the strongest of any big-company role here.
- ❌ **Probability is barely there.** Google and Meta screens open with probability. Add about 30 classic questions (Bayes, expectation, conditional probability) in weeks 1-3, around 10 minutes a day.
- ❌ **No hypotheticals.** Google asks "what would you do if...", not only STAR. Rehearse 6 of them using clarify → options → choose → risks → measure.
- ❌ **Over-explaining will cost you.** I score clarity of thinking. Give a 1-sentence answer, then structure, then detail. Record yourself weekly and time how long you take to get to the point (target under 15 s).
- ⚠️ **"Explain a causal forest to a PM in 60 seconds"** is a question I'd ask. Your dissertation must be pitchable with no jargon.

### 7.2 Amazon: Data Analyst / BIE hiring manager, plus Bar Raiser

**Verdict: 5/10 for DA as drafted, because there's no DA track.**
- ❌ **The DA OA tests Excel and SQL speed.** SQL 50 isn't enough for a 4-question timed test. Do about 130 SQL problems with weekly timed sets, plus one Excel session (pivots, XLOOKUP, a quick model).
- ❌ **No dashboard evidence.** Every DA and BIE posting names Tableau, QuickSight or Power BI. Your TikTok dashboards are internal. Build **one public analytics project** (public e-commerce dataset: cohort retention, funnel, a GMV driver tree, plus a dashboard and a one-page memo). It doubles as a take-home rehearsal.
- ❌ **Leadership Principles need about 15 stories, not 8.** Bar Raisers dig 3-4 levels down ("what exactly did *you* do?", "what data?", "what would you change?"). Thin stories collapse. Expand the bank to 15 and map each to 2 LPs.
- ⚠️ **Titles.** Your CV says "Data Analyst" and "Applied AI engineer". Big-company background checks verify title, dates and employment type. If asked, describe each role accurately as it is in your contract (for example, that the TikTok role is an internship). Being upfront is never a problem. Being caught out is.
- ⚠️ **Minor CV polish an interviewer will notice:** "Upper Second Class Honor" (UK usage is "Honours"), and "Applied AI engineer" is lower-case. Your call.

### 7.3 TikTok Shop: Data Scientist hiring manager (London)

**Verdict: 7/10. You're closer to an offer here than anywhere else.**
- ⭐ **Your fastest big-company route may be TikTok itself.** Ask your manager this month about graduate or return-offer routes and internal DA/DS openings. Internal referrals skip the CV screen, which is your weakest stage.
- ❌ **Marketplace experimentation is missing.** Buyer-merchant interference, switchback and geo tests, and "evaluate a market launch without an A/B test" (a reported London question) all need to be in the plan.
- ❌ **TikTok asks one LeetCode medium in DS screens.** Fine as drafted, but make sure arrays, hashing and sliding window are timed by week 4.
- ⚠️ **In outside interviews, talk about the method, not internal numbers.**

### 7.4 AI / Agent Engineer interviewer (Amazon agentic AI / AI-native startup)

**Verdict: 6/10. Strong eval story, but the agent evidence can't be checked.**
- ✅ The BeiGene eval work is better than most graduates'. Lead with it.
- ❌ **I can't see your agent.** The TikTok agent is internal, and the NHS RAG agent isn't on GitHub and has never run live. Fix this in weeks 1 and 4: push it, run it with an API key, record a generation-eval score, cost per query and latency.
- ❌ **Build one public agent project with an eval harness** (week 6). For example, a SQL-analytics agent over a public dataset with 2-3 tools, a validation step and a **20-task eval** (task success, tool-call accuracy, cost per task). It shows what your TikTok agent does without revealing anything internal, and it's exactly the "build an agent" take-home format.
- ❌ **Production gap.** Wrap the retriever in **FastAPI plus Docker** with a health check, logging and one test. 2-3 hours, and it removes the "never deployed anything" objection.
- ❌ **Amazon's agentic roles keep the SDE coding bar.** If you get an Amazon engineering loop, the DP and graph add-on (3.4) is required, not optional.
- ⚠️ **Mocks start too late.** A first mock in week 4 leaves no time to fix what it finds. Do a short mock every week from week 2, and at least 3 with real people (UCL Careers, peers, interviewing.io or Pramp).

### 7.5 Portfolio and GitHub (all four agreed)
- The portfolio site is a client-rendered React app. A plain fetch sees only the page title. Recruiters with JavaScript will see it, but link previews and crawlers won't. Add a static text summary or `<noscript>` content.
- `cvd-webapp` and `Jobwinner` have no repo description. Add one line each, plus a README with a screenshot and how to run it.
- Pin `nhs-rag-agent` once it's pushed. Each README should have a results table near the top: interviewers skim for numbers.

### 7.6 Combined verdict

| | DA | DS | AI/Agent |
|---|---|---|---|
| Draft plan coverage | 4/10 | 7/10 | 6/10 |
| After the changes below | 8/10 | 8.5/10 | 7.5/10 |
| Biggest remaining risk | SQL speed | Product-case fluency | Coding at the SDE bar; no production experience |

**Changes adopted in the final schedule:**
1. Add a DA track: about 130 SQL problems, Excel, dashboard critique, one public analytics project
2. Probability drills from week 1
3. Weekly mocks from week 2, at least 3 with people
4. Fix GitHub and portfolio in week 1; NHS agent live in week 4
5. A public agent project with a 20-task eval in week 6
6. FastAPI plus Docker endpoint
7. 15 Leadership Principle stories
8. Marketplace experimentation and launch-without-A/B cases
9. Google hypotheticals
10. TikTok internal-route conversation
11. Time budget cut to 15 h a week
12. Project fact sheets, with missing numbers collected rather than invented

---

## 8. Final 8-week schedule (post-review)

**Weekday (about 90 min):**
- 30 min: SQL or LeetCode, timed
- 10 min: one probability question
- 35 min: the week's concept
- 15 min: **speak out loud** (one story, or one concept in 60 s)

**Saturday (about 4 h):** 1 h mock → 2 h build/project → 1 h mistake review
**Sunday (about 4 h):** 1.5 h cases (product, metric or system design) → 1 h stories → 1 h timed SQL set → 30 min plan next week and update the mistake log

| Week | Dates | SQL / coding | Concepts | Build / evidence | Speaking and mocks | Done when... |
|---|---|---|---|---|---|---|
| **1** | 19-25 Oct | SQL 50 (first 25); arrays and hashing (10) | Probability basics; descriptive stats; CIs | **GitHub fix:** push and pin `nhs-rag-agent`, add descriptions and READMEs, static text on the portfolio. **5 fact sheets** (section 5) | 15-story bank drafted; 3 intros. **Ask your TikTok manager about graduate/return routes** | **Diagnostic (Sat):** 4 SQL in 45 min, 2 mediums, 1 recorded intro. Baseline written down |
| **2** | 26 Oct-1 Nov | SQL 50 done (windows); two pointers, sliding window, prefix sum (10) | **A/B design**, power, sample size, peeking, SRM, multiple testing | Collect the missing TikTok-agent numbers (from your own records or by asking; never estimate) | **Mock 1** (45 min: SQL plus 2 behavioural, with Claude or a peer). Dissertation 60 s / 2 min / 10 min | A/B test designed out loud in 5 min |
| **3** | 2-8 Nov | Classic SQL list (3.1 #2); stack, binary search, heap (12) | **Marketplace experiments**; launch without A/B (DiD, synthetic control); ML basics, calibration, leakage | **DA project starts:** public e-commerce data; cohorts, funnel, GMV driver tree | **Mock 2:** product case plus metric drop. 2 Google hypotheticals | SQL medium in 10 min or less; ROC vs PR-AUC explained in 60 s |
| **4** | 9-15 Nov | DataLemur/StrataScratch (10); linked list, design (LRU★), intervals (10); pandas (10) | **LLM basics** (attention, KV cache, decoding); **evals and LLM-as-judge** | **NHS agent live:** API key, generation eval, cost/query, latency. DA dashboard plus a one-page memo | **Mock 3 (human): full DS loop.** Excel session (pivots, XLOOKUP) | Mock 3 scored; top 3 weaknesses logged |
| **5** | 16-22 Nov | **Timed set #1** (4 SQL in 45 min); trees and graphs (12) | **RAG** in depth; system designs 1-3 | **FastAPI plus Docker** endpoint around the retriever (health check, logging, 1 test). Pangaea problems 1-7 | **Mock 4: AI practical coding plus RAG design.** BeiGene 10-min deep dive | RAG whiteboarded with your own eval numbers |
| **6** | 23-29 Nov | Timed set #2; sampling, probability, light DP (10) | **Agents**: workflows vs agents, tool calling, MCP, multi-agent, memory, failure modes; cost and latency; designs 4-6 | **Public agent project:** 2-3 tools, a validation step, a **20-task eval** (success, tool accuracy, cost/task). Pangaea problems 8-13 | **Mock 5 (human): Amazon-style.** An LP question in every round; a Bar Raiser drilling one story 4 levels deep | Agent evals explained in 3 min; 15 LP stories hold up to follow-ups |
| **7** | 30 Nov-6 Dec | Timed set #3; all ★ problems cold, plus 5 unseen mediums | Designs 7-8; FDE decomposition cases | **3-hour take-home simulation** (DA or DS) | **Mock 6 (human): AI/Agent loop.** 5 HireVue-style recordings | Every ★ in 20 min or less; answer-first in under 15 s in recordings |
| **8** | 7-13 Dec | Timed set #4; 10 unseen mediums | Gaps from the mistake log | Polish READMEs and the portfolio with final numbers | **Mock 7: weakest round again.** Company packs (`/interview <company>`) for live processes | Readiness gates (8.1) all passed |

**Real interviews come first.** The moment one is booked, pause the plan and run `/interview <company>`. If it's an Amazon or Google engineering loop, switch to the add-on in 3.4.

### 8.1 Readiness gates (go/no-go)

| Gate | DA | DS | AI/Agent |
|---|---|---|---|
| SQL | 4 mediums in 45 min, explained aloud | Same | SQL 50 done |
| Coding | Easy Python in 10 min | Medium in 25 min | Medium in 25 min; practical problem in 30 min with tests |
| Statistics | p-value, CI, A/B basics | A/B design in 5 min; causal methods; 30 probability questions | – |
| Cases | Metric drop and dashboard design in 10 min | Product case: reasoning and execution | 8 system designs; 3 FDE decompositions |
| Evidence | Public DA project plus memo | Dissertation deep dive | NHS agent live; public agent with eval; FastAPI endpoint |
| Behavioural | 15 stories, 3 intros, answer-first | Same, plus 6 hypotheticals | Same |

### 8.2 Tracking
- **Mistake log:** `documents/interview_mistake_log.md`, with the date, the question, what went wrong and the fix. Review it every Sunday.
- **Mock scorecard** (1-4 per area: problem-solving, communication, technical accuracy, structure). Re-mock any area scored 2 or below.
- Keep **applying while you prepare.** Interviews only come from applications. Per your 19 Oct strategy rules, prioritise healthtech, consultancies and graduate schemes that test before reading CVs.

---

## 9. Resources (one per topic)
- **SQL:** LeetCode SQL 50 → DataLemur → StrataScratch
- **pandas:** LeetCode 30 Days of Pandas
- **Algorithms:** NeetCode videos for the 75-problem list
- **Probability:** *Heard on the Street* chapter 4 (or any 40-question probability set)
- **A/B testing:** Kohavi et al., *Trustworthy Online Controlled Experiments*, chapters 1-3 and 21
- **ML:** your UCL AMLH weeks 1-5; *An Introduction to Statistical Learning*
- **LLMs/RAG:** UCL AMLH weeks 7-10 (`~/Desktop/UCL/AIML/`); `nhs-rag-agent/docs/INTERVIEW_PREP.md`; *The Illustrated Transformer*
- **Agents:** Anthropic, *Building Effective Agents*; MCP docs; one framework quickstart (LangGraph or the Claude Agent SDK)
- **System design:** Chip Huyen, *AI Engineering* (evaluation and inference chapters)
- **Product cases:** Meta "analytical reasoning vs execution" guides (Exponent, DataLemur)

---

## Sources (searched 16-19 Oct 2026; third-party guides are indicative, not official)

**Data Analyst**
- TikTok Shop DA Project Intern (EMEA DS), London: https://www.itjobboard.co.uk/job/16801905/data-analyst-project-intern-tiktok-shop-emea-data-science-2026-start-bs-ms/
- TikTok LIVE Senior Data Analyst / TikTok Shop listings: https://www.themuse.com/jobs/tiktok/tiktok-shop-senior-data-analyst-strategist-london
- Amazon DA, Vendor Experience & Operations, London: https://mintel.dejobs.org/london-gbr/data-analyst-vendor-experience-and-operations/05EDE3DBAB5045A58E5FEFB4D2153905/job/
- Amazon BIE, AMXL Analytics, London: https://amazon.dejobs.org/london-gbr/business-intelligence-engineer-amxl-analytics/154F05D745954AC9A502FAB6B6146F4C/job
- Google DA, News Partnerships, London: https://themuse.com/jobs/google/data-analyst-news-partnerships-compliance-operations
- Google DA interview guide: https://www.interviewquery.com/blog-google-data-analyst-interview
- Revolut DA four-question SQL round: https://prachub.com/interview-experiences/revolut-data-analyst-interview-experience-a-brutal-four-question-sql-round
- Amazon BIE candidate reports (Glassdoor): https://www.glassdoor.com.au/Interview/Amazon-Interview-E6036-RVW81754170.htm

**Data Scientist**
- Google DS University Graduate 2026: https://www.google.com/about/careers/applications/jobs/results/123165944951251654-data-scientist-university-graduate-2026
- Meta DS loop (candidate report): https://prachub.com/interview-experiences/meta-data-scientist-interview-sql-product-sense-and-the-full-loop-76db979a35
- Meta DS guide: https://codemia.io/guides/meta-data-scientist
- TikTok DS guide: https://codemia.io/guides/tiktok-data-scientist
- Amazon Applied Scientist prep (official): https://amazon.jobs/content/en/how-we-hire/applied-scientist-interview-prep

**AI / Agent Engineer**
- Amazon Agentic AI Engineer guide: https://codemia.io/guides/amazon-agentic-ai-engineer
- Amazon Agentic AI Engineer (Dataford): https://dataford.io/interview-guides/amazon/agentic-ai-engineer
- PracHub Amazon agentic guide: https://prachub.com/interview-guide/amazon-agentic-ai-engineer-interview-questions-guide-2026
- MentorCruise AI engineer rounds: https://mentorcruise.com/blog/ai-engineer-interview-questions-how-to-prepare-for-every-round/
- Microsoft AI MTS Applied AI (Health), London: https://microsoft.ai/job/member-of-technical-staff-applied-ai-software-engineer-health/
- Microsoft AI Senior Applied Scientist, Copilot Agents, London: https://microsoft.ai/job/senior-applied-scientist-copilot-agents/
- Google Cloud FDE (mirror): https://jobs.anitab.org/companies/google-24698/jobs/85932848-forward-deployed-engineer-applied-ai-google-cloud
- UPenn Career Services, AI engineer questions 2026: https://careerservices.upenn.edu/blog/2026/06/25/45-ai-engineer-interview-questions-answers-2026-guide/

The full 16 Oct source list is in `interview_prep_master_plan.md`.
