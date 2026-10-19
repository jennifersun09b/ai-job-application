> **Superseded 19 Oct 2026 by `interview_prep_plan_v2.md`** (adds the DA track and the interviewer-panel review; fixes the visa answer: partner visa, no sponsorship needed). The syllabus detail below is still valid.

# Interview Master Plan: Data Scientist, AI Engineer, Agent Engineer

**For:** Zhuoyan (Jennifer) Sun | **Written:** 16 Oct 2026 | **Runs:** Mon 19 Oct to Sun 13 Dec 2026 (8 weeks; a 4-week fast track is in section 9)

**Time budget assumed:** about 20 hours a week (2 h each weekday after TikTok, 5 h each weekend day). If you have less time, use the fast track and drop the items marked *(stretch)*.

---

## 0. The short version

1. **Three roles, one core.** All three test Python, how you talk about your projects, and behavioural answers. The differences are on top of that core:
   - **Data Scientist:** SQL, statistics, A/B tests and product cases.
   - **AI Engineer:** LLM basics, RAG, AI system design, and practical coding.
   - **Agent Engineer:** AI Engineer content plus tool calling, orchestration, agent evaluation and reliability.
2. **LeetCode is a smaller share than you think.** For DS roles, **SQL is the most important "LeetCode" skill**. The `Database` tag (310 problems) matters more to you than `Dynamic Programming` (686). For AI and agent roles, coding rounds are usually *practical* (parse this data, call this API, add retries, chunk and retrieve), not puzzles. You need **about 75 algorithm problems plus SQL 50**, not 300.
3. **Your best weapon is your own work.** You have real stories that most graduates don't: the BeiGene LLM benchmark, the TikTok agent built with Claude Code, the causal-ML dissertation, and the NHS RAG agent. Interviewers will dig into these for 10-20 minutes. Know every number and every design choice.
4. **Your known gaps** (from your own notes): agents and multi-agent design, cost and latency, system design, and speaking too long about technical detail. The plan puts these in weeks 4-7.
5. **Calibrated to big tech.** Section 1A compares Google, Microsoft, Amazon, Meta, TikTok, OpenAI and Anthropic job descriptions and interview formats. Short version: big-tech DS means SQL plus experimentation plus causal inference plus product cases; big-tech AI engineering means LLM apps plus evals plus production reliability; big-tech *software-engineering* loops need about 40 extra harder LeetCode problems (DP, graphs, tries), which you should only add if you get one of those interviews.
6. **Practise out loud.** About 70% of your time should go to solving and speaking, and about 30% to reading.

---

## 1. What each role actually tests

I drew this from 2026 third-party interview guides and candidate reports (sources at the end), checked against the postings you saved in `documents/applications/`. The weights are my estimates, not published figures.

| Area | Data Scientist | AI Engineer | Agent Engineer |
|---|---|---|---|
| SQL | **High** (often the first screen) | Low-Medium | Low |
| Python and pandas data work | **High** | **High** | **High** |
| Algorithms (LeetCode-style) | Low-Medium (easy and medium; arrays, strings, hash maps) | Medium (mediums; plus practical problems) | Medium (practical, plus async and retries) |
| Probability and statistics | **High** | Low | Low |
| A/B testing and causal inference | **High** | Low | Low (but agent A/B evals do come up) |
| Classical ML (metrics, leakage, trees, calibration) | **High** | Medium | Low-Medium |
| Product sense and metric cases | **High** (product DS) | Low | Low |
| LLM basics (transformers, tokens, decoding, fine-tuning vs RAG) | Low-Medium | **High** | **High** |
| RAG design and evaluation | Low | **High** | **High** |
| Agents: tool use, orchestration, memory, MCP | Low | Medium-High | **Very high** |
| LLM and agent evals (LLM-as-judge, golden sets, regression suites) | Medium | **High** | **Very high** |
| AI system design (latency, cost, guardrails, monitoring) | Low (ML design at most) | **High** (the top-weighted round in 2026) | **High** |
| Customer decomposition and scoping (FDE-style) | Medium (consulting DS) | Medium | High (FDE titles) |
| Project deep dive | **High** | **High** | **High** |
| Behavioural (STAR) | **High** | **High** | **High** |

### Typical loops

**Data Scientist (UK graduate or junior):** an online test (numerical or logic, sometimes HireVue), then a **SQL and Python screen** (joins, aggregates, window functions, pandas), then a take-home or case study, then technical interviews (stats, ML, A/B), then behavioural or final. Candidate-report aggregates put Python in about 47% of reported DS loops and SQL in about 40%. A take-home or assessment appears in about 58% of reports. Consulting DS roles (QuantumBlack, BCG X, Faculty) add a **business case** and often **pair programming in pandas**. Faculty candidates report a 90-minute pandas exercise, then "how would you deploy this", then system design.

**AI Engineer:** recruiter call, then a coding screen (often *domain-flavoured*: tokeniser, chunking, JSON parsing, rate limiter), then an onsite with ML/LLM basics, **AI system design** (design a RAG assistant, design a multi-agent system), a project deep dive, and behavioural. Guides call system design "the highest-stakes and most under-prepared round" in 2026. Your Pangaea round was exactly this pattern: 30 minutes of live coding on text and data problems.

**Agent Engineer / Forward Deployed Engineer:** practical coding, then a **decomposition** round (a vague customer problem: break it down and scope it; little code), then a build round with an unfamiliar API ("Learning" round at Palantir), then agent design and evals, then customer-facing behavioural. OpenAI-style FDE loops reportedly weight case, customer empathy and business sense at about half the evaluation.

**A reality check on Agent Engineer titles.** Your saved agent postings ask for experience: Healx "at least 2 years", Planday "3-5 years". Pure agent-engineer roles are rarely entry level, and they clash with your rule to skip 1+ year postings. **Don't build a separate track for them.** Agent skills are what make you stand out in **AI Engineer, FDE and Applied AI graduate roles**, and that is where the plan points them.

---

## 1A. What the big-name companies ask for (the benchmark)

Big companies set the bar that smaller UK employers copy, so the plan is calibrated against them. Sources: official careers and interview-prep pages where I could reach them (Amazon's applied-scientist prep page; Microsoft and Google postings mirrored on job boards), plus third-party guides for Meta, TikTok and Google's process. Checked 16 Oct 2026.

### 1A.1 Job descriptions

| Company and role | What the JD asks for | Entry-level for you? |
|---|---|---|
| **Google, Data Scientist, University Graduate 2026** (Bengaluru listing; Google's London DS roles are mostly senior) | Master's in a quantitative field; statistical software (R/Python); internship or work experience with data; **"quantitative methodologies with statistics and causal inference"**. Duties: large, complex datasets, non-routine problems, combining **experimentation, statistical-econometric and ML methods**, presenting recommendations | **Yes**, and it reads almost like your CV (MSc plus causal inference). Watch for a London cohort. |
| **Google, Data Scientist (mid / senior, incl. London Shopping)** | 3+ years SQL plus Python/R (mid); 5-8 years for senior | No. Use only as the content benchmark (SQL, product analytics). |
| **Google, Software Engineer, Early Career** | Degree; **data structures and algorithms** (through coursework, research or internships); coding in Python/Java/C++/JS; new item: **experience using AI productivity tools** in your workflow. ML and NLP are preferred, not required | Yes, but it's a **software-engineering loop** (see 1A.3). |
| **Google Cloud, Forward Deployed Engineer (GenAI), London** | 2-8 years depending on level (one partner role: 1 year with an advanced degree); RAG and vector DBs; **multi-agent frameworks (LangGraph, CrewAI, Google ADK) with ReAct and self-reflection**; **MCP, tool calling, OAuth**; LLM metrics such as **tokens per second and cost per request**; leading customer discovery sessions | No (years). Use it as the **agent syllabus checklist**: every bold item is in section 5. |
| **Microsoft, Data Scientist (Applied AI / ML Engineering)** (US listing) | Master's plus 1 year DS experience, or a PhD. Builds **production LLM services (prompting, tool use/agents, RAG, embeddings)**, end-to-end evaluation, monitoring, CI/CD, Responsible AI. Preferred: **LLM evaluation design (golden sets, human-in-the-loop review, A/B tests)** and quality dashboards; Python plus one of C#/Java/Go/TypeScript; SQL | Borderline (needs 1 year). This is the clearest big-tech description of the **AI Engineer** job. Your BeiGene work matches its evaluation line almost word for word. |
| **Amazon, Data Scientist / Applied Scientist (UK)** | DS: Master's; SQL plus Python/R; statistics. Applied Scientist: PhD, or Master's plus 4+ years | DS II and Applied Scientist: no. Use Amazon for its **behavioural method** (Leadership Principles). |
| **Meta, Data Scientist, Product Analytics** | SQL, product sense, experimentation, statistics; Product DS at Meta **does not build ML models** | Mostly experienced hires. Use it as the **product-case benchmark**. |
| **TikTok / ByteDance, Data Scientist** (San Jose listing) | SQL on large datasets, Python/R, **designing and interpreting A/B tests**, dashboards; each listed with about 1 year of experience | Graduate roles exist. A London candidate in May 2026 was asked **how to evaluate a TikTok Shop launch in the Netherlands before running an A/B test**, which is very close to your current job. |
| **OpenAI FDE (London)** / **Anthropic FDE (London)** | OpenAI 5+ years, Anthropic 4+ years; customer-facing; production Python/JS; built LLM systems; 25-50% travel | No. They show what FDE skills grow into: scoping, customer empathy, evals. |

**What this means for you:**
1. The **graduate-level big-tech roles you can realistically target** are Google DS University Graduate, Google SWE Early Career (only if you take on the heavier coding prep below), and TikTok/ByteDance graduate DS or DA roles. Most other big-tech AI titles ask for 1-8 years.
2. **The big-tech DS bar is SQL plus experimentation plus causal inference plus product sense.** Your dissertation is a genuine advantage at Google, which names causal inference explicitly.
3. **The big-tech AI Engineer bar (Microsoft, Google Cloud) is LLM apps plus evals plus production reliability.** Evals are your strongest card. Production (CI/CD, monitoring, a second language such as TypeScript) is your gap.

### 1A.2 How their interviews are scored

| Company | Format | What it changes in your prep |
|---|---|---|
| **Amazon** (official prep page) | 1-2 technical phone screens (60 min, with a senior leader), then a **loop of four 55-minute interviews**. Each interviewer asks **2-3 Leadership Principles questions** plus technical questions; the Applied Scientist loop includes a **"tech talk"**. A Bar Raiser from outside the team can veto. "No brain teasers"; they focus on the what, how and **why** of your decisions. | Map every STAR story to Leadership Principles (6.4 below). Expect follow-ups on one story for 10 minutes, so embellishment collapses; use real metrics. Prepare a **20-minute tech talk** on the dissertation or BeiGene. |
| **Google** | Online assessment or technical screen, then 4-6 rounds, then a hiring committee. Scored on **general cognitive ability, role-related knowledge, leadership** (stepping up, then stepping back) and **"Googleyness"** (comfort with ambiguity, bias to action, collaboration). Both **hypothetical** ("what would you do if...") and behavioural questions. | Practise thinking out loud on open problems. Prepare hypothetical answers, not only STAR. Leadership stories should show you stepping in without a title (TikTok agent, HUAWEI). |
| **Meta (Product DS)** | Technical screen (SQL plus product), then an onsite with case studies, SQL and behavioural. Cases split into **analytical reasoning** (before launch: metrics, experiment design) and **analytical execution** (after launch: read the data, find the cause). One guide estimates about 80% of the loop is cases. | Product-case practice goes up from "a few" to **2 a week from week 3**. "Why Meta?" should be about working with PMs and product decisions, not ML. |
| **Microsoft** | Recruiter screen, then a technical screen or OA, then a virtual onsite, then a hiring-manager talk and team match. Loops differ by team. Behavioural carries more weight than at other big-tech firms; **growth mindset** and collaboration are the culture words. | Prepare "a time you learned from failure" and "a time you changed your mind from feedback". For AI roles: coding plus AI system design plus evaluation. |
| **TikTok / ByteDance** | Recruiter, then 1-2 technical screens (SQL plus a LeetCode-style medium; then a résumé deep dive with maths and A/B), then an onsite (SQL, product sense, experimentation, behavioural). Reported SQL examples: a **7-day rolling average of DAU**, **users whose session length grew most week on week**. | Window-function SQL at speed; metric design for feeds and e-commerce launches; be ready for one LeetCode medium as well. |

### 1A.3 If you apply for a big-tech *engineering* role (Google SWE Early Career, Microsoft or Amazon SDE with AI)

These are **software-engineering loops**: medium-to-hard algorithm problems with complexity analysis, plus system design at the onsite. For these only, the Tier 3 tags in section 2 become **required**:
- **Dynamic Programming** (about 15 problems: 1-D, 2-D grid, knapsack, LIS/LCS, edit distance)
- **Graphs** (BFS/DFS, topological sort, Union-Find, Dijkstra once)
- **Trie** and **Backtracking** (about 5 each)
- One **hard** a week from week 4

That adds about **40 problems** and 3-4 weeks. **My recommendation:** don't do this by default. Do it only if you get a Google, Microsoft or Amazon engineering interview, and then switch to the 4-week fast track (section 9) with the add-on. Your strongest big-tech odds are **Google DS University Graduate** and **TikTok DS/DA**, which need SQL, statistics and cases, not hard DP.

---

## 2. Your LeetCode screenshot: which tags to do and which to skip

### Tier 1: must do (all three roles)
| Tag (count in screenshot) | Why |
|---|---|
| **Database (310)** | The DS SQL screen. Do the **LeetCode "SQL 50" study plan** in full, plus 20-30 harder ones. |
| **Array (2274), String (896), Hash Table (844)** | 80% of DS coding screens and most practical AI-engineering problems |
| **Sorting (540), Counting (215)** | Top-k, frequency, ranking: the pattern behind "top K codes" and "most common queries" |
| **Two Pointers (264), Sliding Window (175)** | Very common mediums; sliding window is also how text chunking with overlap works |
| **Prefix Sum (277)** | Running totals, which is the same idea as SQL window functions |
| **Heap (Priority Queue) (222)** | Top-k retrieval, merging ranked lists (how RRF works), scheduling |
| **Stack (182)** | Parsing (brackets, JSON-like structures, LLM output parsing) |
| **Binary Search (357)** | Standard medium; also "time-based key-value store" (caching and versioning) |
| **Probability and Statistics (7), Reservoir Sampling (4), Randomized (12), Rejection Sampling (2)** | Small tags, but classic **DS interview favourites**. Do all of them. |

### Tier 2: should do (AI and Agent Engineer especially)
| Tag | Why |
|---|---|
| **Design (136)** | LRU Cache, Time Based Key-Value Store, Insert Delete GetRandom. Caches and rate limiters show up in AI-engineering rounds. |
| **Tree / Binary Tree (270/181), DFS (349), BFS (260)** | Standard mediums; also how you walk a knowledge graph or a document tree |
| **Graph Theory (190), Topological Sort (40)** | Agent task dependencies (a DAG of tool calls) map directly onto topological sort |
| **Linked List (82)** | Only the classics (reverse, merge, cycle, LRU) |
| **Greedy (483) and interval problems** | Merge Intervals family: date ranges, medication episodes, sessions |
| **Matrix (285), Simulation (218)** | Grid BFS; "simulate this process" practical problems |
| **Monotonic Stack (76) / Monotonic Queue (26)** | One or two each (Daily Temperatures, Sliding Window Maximum) |
| **Data Stream (24)** | Find Median from Data Stream; streaming token or log problems |
| **Trie (61)** | Implement Trie (autocomplete, prefix search) |
| **Recursion (51), Memoization (44)** | Needed for trees and light DP |

### Tier 3: light touch, only for engineering-heavy AI roles *(stretch)*
**Dynamic Programming (686):** only the 6-8 classics (Climbing Stairs, House Robber, Coin Change, Longest Increasing Subsequence, Word Break, **Edit Distance**, which also comes up in NLP). **Backtracking (114):** Subsets, Combination Sum, Permutations. **Union-Find (99):** one problem. **Bit Manipulation (297):** Single Number only. **Concurrency (9):** read about Python `asyncio` instead (parallel LLM calls), which is more useful.

### Skip entirely
Segment Tree, Binary Indexed Tree, Ordered Set, Suffix Array, Rolling Hash, String Matching (advanced), Game Theory, Minimax, Number Theory, Geometry, Combinatorics (beyond basic probability), Bitmask, Divide and Conquer (beyond merge sort), Shortest Path (Dijkstra once at most), Minimum Spanning Tree, Eulerian Circuit, Strongly Connected Component, Biconnected Component, Meet in the Middle, Radix, Bucket and Counting Sort as topics, Sweep Line, Brainteaser, Interactive, Shell. **No graduate DS or AI role you're targeting expects these.**

### The 75-problem list (in order; ★ = do twice)
- **Week 1, Arrays and hashing:** Two Sum★, Contains Duplicate, Valid Anagram, Group Anagrams★, Top K Frequent Elements★, Product of Array Except Self, Longest Consecutive Sequence, Majority Element, Ransom Note, First Unique Character in a String
- **Week 2, Two pointers, sliding window, prefix sum:** Valid Palindrome, Two Sum II, 3Sum★, Container With Most Water, Best Time to Buy and Sell Stock★, Longest Substring Without Repeating Characters★, Longest Repeating Character Replacement, Subarray Sum Equals K★, Range Sum Query - Immutable, Contiguous Array
- **Week 3, Stack, binary search, heap:** Valid Parentheses★, Min Stack, Evaluate Reverse Polish Notation, Daily Temperatures, Binary Search, Search in Rotated Sorted Array, Koko Eating Bananas, Time Based Key-Value Store★, Kth Largest Element in an Array★, K Closest Points to Origin, Merge k Sorted Lists, Find Median from Data Stream
- **Week 4, Linked list, design, intervals:** Reverse Linked List, Merge Two Sorted Lists, Linked List Cycle, **LRU Cache★**, Insert Delete GetRandom O(1), Implement Trie, Merge Intervals★, Insert Interval, Non-overlapping Intervals, Meeting Rooms II *(premium; skip if locked)*
- **Week 5, Trees and graphs:** Maximum Depth of Binary Tree, Invert Binary Tree, Same Tree, Binary Tree Level Order Traversal★, Validate BST, Lowest Common Ancestor of a BST, Kth Smallest Element in a BST, Number of Islands★, Rotting Oranges, Clone Graph, **Course Schedule★** (topological sort), Course Schedule II
- **Week 6, Sampling, probability, light DP:** Linked List Random Node (reservoir), Random Pick with Weight★, Implement Rand10() Using Rand7() (rejection), Shuffle an Array, Climbing Stairs, House Robber, Coin Change, Longest Increasing Subsequence, Word Break, Edit Distance
- **Weeks 7-8:** timed mixed review. Re-solve every ★ problem cold in 20 minutes or less, plus 10 unseen mediums from the Tier 1 and 2 tags.

**Targets by week 8:** easy in 10 minutes or less, medium in 25 minutes or less, out loud, with tests you wrote yourself. SQL medium in 10 minutes or less.

### SQL patterns you must be able to write without looking anything up
Joins (including the **anti-join** `LEFT JOIN ... WHERE b.id IS NULL`), `GROUP BY`/`HAVING`, conditional aggregation `SUM(CASE WHEN ...)`, CTEs, **window functions** (`ROW_NUMBER`, `RANK`, `DENSE_RANK`, `LAG`/`LEAD`, running `SUM() OVER`), **top-N per group**, de-duplication, **retention and cohort** tables, **funnel conversion**, **gaps and islands** (consecutive days), median and percentiles, self-joins, date maths, and NULL behaviour in `COUNT`/`AVG`/`NOT IN`.
Practice sources: LeetCode **SQL 50** (weeks 1-3), then DataLemur and StrataScratch for company-style questions (weeks 4-6). Re-do 10 SQL questions in **pandas** (`groupby`, `merge`, `pivot_table`, `rank`, `shift`, `rolling`, `pd.to_datetime`). LeetCode's "30 Days of Pandas" plan covers this.

### Practical coding problems you already have
`documents/applications/pangaea-data_ai-engineer/interview_prep/` has 13 runnable problems with tests: extract medications, negation detection, record merge, parse LLM JSON, **retry with backoff**, **chunk and retrieve**, entity eval metrics, **LRU cache with TTL**, **rate limiter**, debug-this. Run `python mock_timer.py` from that folder. These are the best match for AI and agent coding rounds. Do all 13 by week 6, and re-do 6 of them timed in week 7.

### Things to write from scratch in NumPy or plain Python (ML coding rounds)
Logistic regression with gradient descent, k-means, train/test split plus k-fold CV, **ROC-AUC from scratch**, precision/recall/F1, a bootstrap confidence interval, a permutation test, **cosine-similarity top-k**, **BM25**, softmax, **scaled dot-product attention**, a text chunker with overlap, a minimal **agent loop with tool calling** (raw API, no framework), and an async batch of LLM calls with a concurrency limit.

---

## 3. Data Scientist technical syllabus

### 3.1 Probability and statistics (weeks 1-3)
- Probability: conditional probability, Bayes (the medical-test false-positive classic), expectation and variance, linearity of expectation, common distributions (Bernoulli, binomial, Poisson, normal, exponential), independence vs correlation
- Inference: CLT, standard error, confidence intervals, what a p-value is and **is not**, type I and II errors, power
- Tests: t-tests (paired and unpaired), chi-square, Mann-Whitney, **permutation and bootstrap** (you have real experience here), ANOVA
- Multiple testing: Bonferroni, Benjamini-Hochberg (your 120-contrast dissertation is a strong example)
- Regression: OLS assumptions, interpreting coefficients, interactions, multicollinearity; logistic regression and **odds ratios**
- Classics to rehearse: Simpson's paradox, survivorship and selection bias, regression to the mean, base-rate fallacy

### 3.2 A/B testing and causal inference (weeks 2-3; your strongest area, so polish it)
- The design framework, in this order: **business goal**, then hypothesis, then primary metric plus **guardrail metrics**, then randomisation unit, then **sample size** (rule of thumb n ≈ 16σ²/δ² per arm at α = 0.05 and 80% power), then duration (a full weekly cycle; novelty effects), then analysis, then the launch decision
- Pitfalls: **peeking**, sample-ratio mismatch, novelty and primacy effects, network effects (marketplaces: merchants and buyers interfere, which is TikTok Shop's world), conflicting metrics, heterogeneous effects
- When you can't randomise: difference-in-differences, propensity scores and overlap weighting, **doubly robust estimation**, causal forests, instrumental variables, regression discontinuity, E-values. You can answer these from first-hand dissertation work. Say so.

### 3.3 Machine learning (weeks 3-4)
Bias-variance, L1/L2 regularisation, trees vs random forests vs gradient boosting (why boosting often wins, and why it **didn't** in your dissertation: AUC 0.714-0.718 across all models), class imbalance, **metric choice** (precision/recall, ROC-AUC vs PR-AUC, log loss, **calibration**, decision curves), cross-validation and **leakage** (time-based splits, target leakage), feature engineering, missing data, k-means, PCA, model monitoring and drift. Be ready for "how would you explain this model to a clinician or a merchant".

### 3.4 Product sense and cases (weeks 4-6)
- **Metric design:** North Star metric, then input metrics, then guardrails. Practise defining success for a feature in 2 minutes.
- **Diagnosing a metric drop:** check the data pipeline, then internal vs external causes, then segment (region, platform, new vs returning, merchant tier), then locate the funnel step, then form a hypothesis, then test it.
- Practice prompts: *GMV for a marketplace fell 8% week on week. Why?* | *Should we lower the free-delivery threshold? Design the test.* | *How do you measure whether an AI customer-support bot is working?* | *Predict hospital appointment no-shows: what data, model, metric and deployment?* | *A model's AUC is great offline but the business sees no lift. Why?*
- **Take-homes:** state assumptions first, produce a clean notebook with a one-page executive summary at the top, cover limitations and next steps. Lead with the recommendation.

---

## 4. AI Engineer technical syllabus

Start from what you've already studied: UCL AMLH weeks 7-10 (`~/Desktop/UCL/AIML/`), the S10 RAG lab and the patient-question coursework (`~/Desktop/UCL/AIML_p/`), and `~/Desktop/UCL/nhs-rag-agent/docs/INTERVIEW_PREP.md`. Don't relearn those from zero; review them and fill the gaps.

### 4.1 LLM basics (week 4)
Tokenisation (BPE) and why token counts drive cost, embeddings, the **transformer** (self-attention, Q/K/V, multi-head, positional encoding, causal mask), the **KV cache**, decoding (greedy, beam, temperature, top-p), context windows and "lost in the middle", pretraining vs SFT vs RLHF/DPO, **prompting vs RAG vs fine-tuning** (a decision table you can draw), LoRA/QLoRA, quantisation, hallucination causes, structured outputs and JSON schemas, prompt injection.

### 4.2 RAG (week 5; you've built one, so make it airtight)
Ingestion and cleaning (your NHS lesson: image-credit lines with 1,500-token URLs), chunking strategies and overlap, embedding choice, vector indexes (flat vs HNSW vs IVF), **hybrid BM25 plus dense with RRF**, cross-encoder **reranking**, query rewriting, metadata filters, citations, **evaluation** (hit@k, MRR, nDCG, faithfulness, answer relevance, LLM-as-judge), and failure modes.
Your measured NHS numbers: BM25 hit@1 0.77, dense 0.78, **hybrid RRF 0.83 (MRR 0.867)**, rerank 0.815 at 1.5 s/query. Be ready to explain **why reranking didn't help** (domain shift of the MS MARCO cross-encoder, the latency trade-off). That honest answer impresses interviewers.

### 4.3 Evaluation (weeks 4-6; your differentiator)
Golden datasets, rubric design, **LLM-as-judge and its biases** (position, verbosity, self-preference; check against human labels, measure inter-rater agreement), pairwise vs pointwise scoring, regression suites in CI, online metrics, red-line and safety rules. Your BeiGene work (246 questions, 6-dimension rubric with red lines, 2,400+ scored responses, blinded paired A/B for the knowledge graph) is a complete eval-design story. Rehearse the 2-minute and 10-minute versions.

### 4.4 Production: cost, latency, reliability (week 6; known gap)
Time to first token vs total latency, streaming, **prompt caching**, batching, model routing (a small model for easy cases), retries with exponential backoff and jitter, timeouts, rate limits, idempotency, fallbacks, observability and tracing, cost per request, plus deployment basics: FastAPI endpoint, Docker, environment variables and secrets, logging. Faculty-style rounds have asked candidates to build a simple model endpoint, so **build one FastAPI endpoint around your RAG retriever** (about 2 hours).

### 4.5 AI system design (weeks 5-7; known gap, highest-weighted round)
**Answer template (in order):**
1. **Clarify:** users, the decision being supported, scale, latency budget, risk level (clinical = high)
2. **Define success and evals first:** offline golden set, online metrics, guardrails
3. **Baseline:** could rules, search or a classifier do it? (Interviewers love this.)
4. **Architecture:** draw the boxes (ingest, index, retrieve, generate, validate, log)
5. **Model choice and prompt or retrieval design**
6. **Safety:** guardrails, human in the loop, prompt injection, PII
7. **Cost and latency:** numbers, caching, routing
8. **Monitoring and iteration:** drift, feedback loop, regression suite
9. **Trade-offs and what you'd do with more time**

**Practise these 8 designs** (one per session, 45 minutes, out loud, drawn in Excalidraw):
1. A Q&A assistant over NICE clinical guidelines for GPs
2. A support agent for e-commerce merchants (refunds, listing issues, policy questions)
3. A document-extraction pipeline for insurance claims with citations and an audit trail (V7-style)
4. An agent that generates and triages drug-repurposing hypotheses over a knowledge graph (Healx-style)
5. An LLM evaluation platform for a team shipping weekly prompt changes
6. Semantic search over 1M job postings
7. Classic ML: a churn-prediction or fraud-detection system (for DS loops)
8. Summarising patient consultation threads safely, from your BeiGene data

---

## 5. Agent Engineer additions (weeks 5-6)

- **The core loop:** LLM, tools, state, stop condition. Write one **from scratch with the raw Anthropic or OpenAI API** (no framework) before touching a framework. You must be able to explain what a framework hides.
- **Workflows vs agents:** Anthropic's *Building Effective Agents* describes prompt chaining, routing, parallelisation, orchestrator-workers and evaluator-optimizer, plus autonomous agents. Know when **not** to use an agent (Healx's posting literally says "where an agentic approach genuinely adds value, and where it doesn't").
- **Tool design:** clear names and descriptions, JSON schemas, narrow tools, idempotent writes, errors returned to the model, MCP (Model Context Protocol) servers, and **auth for tools (OAuth scopes, least privilege)**. Google Cloud's FDE postings list "MCP, tool-calling and OAuth-based authentication" together.
- **Serving metrics** (named in Google Cloud postings): tokens per second, time to first token, cost per request, cost per successful task
- **Planning and reasoning patterns:** ReAct, plan-and-execute, reflection and self-critique, routing
- **Memory and context:** short-term (conversation), long-term (vector store, summaries), context-window budgeting, context compaction
- **Multi-agent orchestration:** supervisor-worker, handoffs, shared state, and the cost of extra agents (more tokens, more failure points)
- **Reliability:** max-step limits, loop detection, timeouts, retries, human-approval checkpoints for irreversible actions, sandboxing
- **Agent evals:** task success rate, **trajectory and tool-call accuracy**, cost and latency per task, regression suites, LLM-as-judge on the final state. The "hardest skill to fake", per hiring guides.
- **Failure modes to name:** wrong tool, hallucinated arguments, infinite loops, context overflow, **prompt injection through tool outputs**, over-eager actions
- **Frameworks (know one well and the others by name):** LangGraph, OpenAI Agents SDK, Google ADK (Healx uses it), Claude Agent SDK, LlamaIndex
- **Your evidence:** the TikTok CPS agent built with Claude Code (multi-step, with a validation step, 40-50% time saved) and the NHS RAG agent (router tool plus red-flag guardrail). See suggestion 3 in section 10: run the NHS agent live so you can talk about real behaviour, not just architecture.

---

## 6. Behavioural interview

### 6.1 Story bank (8 core stories from your actual record)
Use STAR, **90-120 seconds each**, ending with a result and a lesson. Lead with the headline first, because your known habit is over-explaining.

| # | Story | Best for |
|---|---|---|
| 1 | **TikTok CPS agent (Claude Code):** after 3-5 manual configurations you saw the logic, proposed an agent to a sceptical supervisor, built a multi-step version with a validation step, delivered before the same-day deadline, and cut time by about 40-50% | Initiative, earning trust, efficiency, "using AI in your work" |
| 2 | **BeiGene benchmark at DS Digital:** an ambiguous client brief became a 246-question benchmark, a 6-dimension rubric with red lines, a 6-LLM pipeline and 2,400+ scored responses | Ambiguity, end-to-end ownership, client work, defining success |
| 3 | **Dissertation null result:** the one surviving effect failed the timing check, so you reported likely reverse causation | Integrity, a disappointing result, rigour, "a time you were wrong" |
| 4 | **Radiology NLP team lead (UCL):** organised the team, built the pipeline, PubMedBERT beat the baselines | Leadership, teamwork |
| 5 | **Ipsos expert interviews to quantitative framework** (use the interview count and job title **as written on your current CV**) | Stakeholders, messy qualitative data, communication |
| 6 | **Westlake pipeline about 60% faster** (check the figure against your records before quoting it) | Process improvement, technical ownership |
| 7 | **HUAWEI Connect team leader:** a team supporting 20,000+ attendees | Leadership under pressure, operations |
| 8 | **Learning a new domain fast:** biology to data science, or ramping up on bone-metastasis medicine or UK e-commerce operations | Learning agility, "why the career change" |

**Two gaps to write this week:** (a) **conflict or a difficult teammate**: the NLP group project is the likely source; (b) **prioritising competing deadlines**: your dissertation overlapped with the DS Digital internship (Jul-Sep 2026), which is a real and strong example.

**Never use:** Apple x Tmall (not your work), Grand Pharmaceutical Group, IQVIA, or the old $20M Ipsos figure.

### 6.2 Questions you will definitely get
- **Tell me about yourself (60-90 s):** now (TikTok DA intern plus UCL MSc), then what got you here (Imperial biology, then DS Digital LLM evaluation and Ipsos analytics), then why this role. Write **3 versions**: DS, AI Engineer, FDE.
- **Why this company / why this role:** one product fact, one reason it fits your work, one thing you want to learn. Research it fresh each time.
- **Why data science / AI after biology?**
- **Your weakness:** "I used to over-explain technical detail to non-technical audiences. I now lead with the answer and keep to three points. At TikTok I present a one-line conclusion first." (True per your profile, and shows you're fixing it.)
- **A time you failed, disagreed, persuaded someone, or got critical feedback**
- **How do you use AI tools in your work?** Name Claude Code specifically, plus how you verify its output.
- **Visa:** "I have the right to work in the UK until January 2029 without sponsorship; I'd only need sponsorship for employment beyond that." (Only true if you file the Graduate visa by 31 Dec 2026; see section 10.)
- **Salary:** have a researched range ready for each role.

### 6.3 Questions to ask them (pick 2-3)
What does success look like at 3 and 6 months? How do you evaluate model or agent quality before shipping? What does the team do when an offline metric and business outcomes disagree? How much of the role is customer-facing? What's the biggest data-quality problem right now?

### 6.4 Big-company behavioural frameworks

**Amazon Leadership Principles mapped to your stories** (prepare 2 stories for each principle marked ★; Amazon interviewers usually cover 2-3 principles each):

| Leadership Principle | Your story |
|---|---|
| ★ Customer Obsession | BeiGene: started from 4,800+ real patient threads, not the client's assumptions |
| ★ Ownership | TikTok CPS agent; BeiGene end-to-end benchmark |
| Invent and Simplify | TikTok agent (manual configuration into a multi-step agent) |
| Are Right, A Lot | Dissertation: the timing check overturned the one significant effect |
| ★ Learn and Be Curious | Biology to data science; learning bone-metastasis medicine quickly |
| ★ Insist on the Highest Standards | BeiGene red-line rules; dissertation sensitivity analyses |
| ★ Dive Deep | Dissertation null result; NHS RAG cleaning (1,500-token URLs found by inspecting the data) |
| Have Backbone; Disagree and Commit | Proposing the agent to a sceptical supervisor; reporting the null result instead of a weak "finding" |
| ★ Deliver Results | TikTok agent before the same-day deadline, 40-50% time saved |
| ★ Earn Trust | TikTok sceptical supervisor; presenting honest limitations to clients |
| Bias for Action | Building the agent after 3-5 manual examples instead of continuing by hand |
| Frugality | The NHS RAG baseline (TF-IDF/BM25 before paying for LLM calls) |
| Think Big | Rubric designed to be reused as the client's acceptance standard |

**Google:** besides STAR, rehearse **hypotheticals** using the same structure each time (clarify, options, choose, risks, how you'd measure). Examples: "Your analysis contradicts what a senior PM believes. What do you do?" "You have two weeks and the data is incomplete. How do you proceed?" Show **emergent leadership**: you stepped in, then handed over.

**Microsoft:** have a crisp **growth-mindset** story (feedback you acted on, for example learning to lead with the conclusion) and a collaboration story.

**Meta and TikTok:** behavioural rounds focus on cross-functional work with PMs and moving fast. Use TikTok BP&O stakeholder work and the agent story.

### 6.5 UK graduate formats
- **HireVue / one-way video:** 30 s of thinking time, 1.5-3 minutes per answer. Practise with a timer and record yourself.
- **Assessment centre:** group exercise (make sure you speak in the first 5 minutes, build on others' points, keep time) and a presentation (one slide with the recommendation first).
- **Strengths-based questions** ("what energises you?"): answer honestly from your "What excites you" list: messy data into decisions, trustworthy healthcare AI, working with the problem owner.

---

## 7. Project deep dives: know these cold

For each project, prepare: a 30-second pitch, a 2-minute version and a 10-minute whiteboard version, plus answers to "why this method?", "what would you do differently?", "what broke?" and "how did you validate it?".

| Project | Numbers to know | Hard questions to expect |
|---|---|---|
| **Dissertation (UK Biobank)** | 458,840 baseline; AUC 0.714-0.718; 71,428 causal; 24 transitions, 120 joint contrasts; E-values, QBA, NHEFS validation | Why didn't XGBoost beat logistic regression? What do doubly robust estimators protect against? What is overlap and why weight by it? How do you handle immortal-time or reverse causation? |
| **BeiGene LLM eval (DS Digital)** | 246 questions; 6 dimensions plus red lines; 6 LLM APIs; 2,400+ responses; KG with 123 entities and 161 relations; 4,800+ threads mined | How did you validate the judge? How did you pick the 246? Why blinded paired A/B? How do you stop judge bias? |
| **TikTok CPS agent** | 40-50% time saved; multi-step with a validation step; built with Claude Code | What did the validation step check? What happens when it's wrong? How would you scale it to more teams? |
| **NHS RAG agent** | hybrid hit@1 0.83, MRR 0.867; rerank 0.815 at 1.5 s; router 28% top-1 | Why was the router so weak? Why didn't reranking help? How would you evaluate generation? Cost per query? |
| **Radiology NLP** | PubMedBERT beat TF-IDF plus kNN | Label noise? Why domain-specific pretraining helps |

---

## 8. Week-by-week plan (8 weeks)

**Weekday template (2 h):** 40 min coding (1-2 LeetCode or SQL problems) | 50 min concept topic for the week | 20 min speaking one STAR story or a concept explanation **out loud** | 10 min mistake log.
**Weekend template (about 5 h per day):** 1 timed mock (60-90 min) | 2 h build or deep dive | 1 h review mistakes | 1 h behavioural or case practice.

| Week | Dates | Coding | SQL / pandas | Concepts | Speaking and building | Done when... |
|---|---|---|---|---|---|---|
| **1** | 19-25 Oct | Arrays and hashing (10) | SQL 50: select, joins, aggregates | Probability and stats basics | Write 8 STAR stories plus the 2 gap stories; **map them to Amazon's Leadership Principles (6.4)**; 3 versions of "tell me about yourself" | **Diagnostic** on Sat: 1 SQL set, 2 LeetCode mediums, 1 recorded behavioural answer. Write down baseline times. |
| **2** | 26 Oct-1 Nov | Two pointers, sliding window, prefix sum (10) | SQL 50: subqueries, window functions | **A/B testing**, inference, multiple testing | Dissertation deep dive (2-min and 10-min versions) | Can design an A/B test aloud in 5 min, including sample size |
| **3** | 2-8 Nov | Stack, binary search, heap (12) | SQL 50 finished, plus retention, funnels, gaps and islands, **TikTok-style rolling 7-day DAU**; start **2 Meta-style product cases a week** (one reasoning, one execution) | **ML basics**, metrics, calibration, leakage; logistic regression and AUC from scratch | BeiGene deep dive | SQL medium in 10 min or less; can explain ROC vs PR-AUC and calibration |
| **4** | 9-15 Nov | Linked list, design (**LRU**), intervals (10) | DataLemur and StrataScratch (company-style); pandas versions | **LLM basics**; attention from scratch; LLM-as-judge and evals | **Mock 1: full DS loop** (SQL, stats, case, behavioural) | Mock score recorded; top 3 weaknesses written down |
| **5** | 16-22 Nov | Trees and graphs, **topological sort** (12) | 2 product cases a week | **RAG** in depth; system designs 1-3 | **Run the NHS agent live**; FastAPI endpoint; Pangaea problems 1-7 | Can whiteboard RAG with eval numbers |
| **6** | 23-29 Nov | Sampling, probability, light DP (10) | Metric-drop diagnosis cases | **Agents** (loop, tools, MCP, multi-agent, evals, failure modes); **cost and latency**; system designs 4-6 | Build a raw-API agent with 2 tools and an eval of 10 tasks; Pangaea problems 8-13 | Can explain workflows vs agents and agent evals in 3 minutes |
| **7** | 30 Nov-6 Dec | Timed mixed: all ★ problems, plus unseen | Timed SQL sets | System designs 7-8; FDE **decomposition** cases | **Mock 2: AI Engineer loop**; **Mock 3: FDE decomposition**; record 5 HireVue-style answers | Every ★ problem done in 20 min or less; no "um" spirals in recordings |
| **8** | 7-13 Dec | 10 unseen mediums, timed | 1 take-home simulation (3 h) | Fill gaps from the mistake log; **big-company modules (1A)**: an Amazon-style loop (Leadership Principles in every round plus a 20-min tech talk), Google hypotheticals, a TikTok "evaluate a market launch" case | **Mock 4: weakest round again**; company-specific prep for live applications | Ready: story bank, 3 intros, 8 designs, ★ list, questions to ask |

**From week 4 onward,** any real interview takes priority. Pause the plan and use `/interview <company>` in this repo for a company-specific pack, then come back to the plan.

---

## 9. Fast track (4 weeks, if an interview is coming sooner)

| Week | Focus |
|---|---|
| 1 | Story bank plus intros; SQL 50 (half); arrays, hashing, two pointers, sliding window; stats and A/B testing |
| 2 | SQL 50 finished plus window-function patterns; stack, heap, binary search, LRU; ML basics; dissertation and BeiGene deep dives |
| 3 | LLM basics, RAG, evals; system designs 1-4; Pangaea practical problems; run the NHS agent live |
| 4 | Agents, cost and latency; designs 5-6; 3 full mocks (DS, AI, FDE); timed ★ review |

---

## 10. Suggestions

1. **Apply for the Graduate visa before 31 December 2026.** Your interview answer "right to work until January 2029 without sponsorship" depends on it. Applications from 1 Jan 2027 get 18 months, not 2 years. Put it in your calendar now; it's more important than any LeetCode problem.
2. **Don't treat Agent Engineer as its own track.** Those postings mostly ask for 2-5 years. Put agent skills inside AI Engineer, FDE and Applied AI graduate applications, where they make you stand out.
3. **Run the NHS RAG agent live** (the API key wasn't set as of late September, so the agent and generation eval have never actually run). Get real answers, a generation-eval score and cost per query, and if you can, put the Streamlit app online. "Here's the demo" beats any explanation.
4. **Practise coding without AI help** (live rounds usually ban it), but also do one session *with* Claude Code, because some 2026 pair-programming rounds now allow AI and judge how well you direct and verify it.
5. **Ask every recruiter about the format:** "Which rounds are there, what language and tools for the technical rounds, and is documentation allowed?" One Faculty candidate was marked down for looking at docs in a round they thought was open-book.
6. **Keep a mistake log** (`documents/interview_mistake_log.md`): date, question, what went wrong, the fix. Review it every Sunday. This is the single highest-value habit.
7. **Mock with real people.** Peer platforms (Pramp or interviewing.io), UCL Careers mock interviews, and classmates. Use Claude for daily drilling, but get at least 2 human mocks in weeks 7-8.
8. **Fix the leading-with-detail habit:** for every answer, say the conclusion in one sentence first. Record yourself once a week and count how long it takes you to get to the point.

---

## 11. Resources (free or cheap; pick one per topic)

- **SQL:** LeetCode SQL 50; DataLemur; StrataScratch
- **Pandas:** LeetCode "30 Days of Pandas"
- **Algorithms:** LeetCode, NeetCode video explanations for the 75 problems above
- **Stats and A/B:** *Trustworthy Online Controlled Experiments* (Kohavi et al.), chapters 1-3 and 21; your `~/Desktop/UCL/2019.openintro.statistics.pdf`
- **ML:** your UCL AMLH lectures weeks 1-5; *An Introduction to Statistical Learning* for quick review
- **LLMs and RAG:** your UCL AMLH weeks 7-10; nhs-rag-agent `docs/INTERVIEW_PREP.md` and `docs/ARCHITECTURE.md`; Jay Alammar's *The Illustrated Transformer*
- **Agents:** Anthropic, *Building Effective Agents*; Model Context Protocol docs; the LangGraph or OpenAI Agents SDK quickstart (pick one)
- **System design:** Chip Huyen, *AI Engineering* (chapters on evaluation and inference optimisation)
- **Behavioural:** your story bank above; `.claude/skills/job-application-assistant/07-interview-prep.md` (see the warning in the chat summary about stale stories in that file)

---

## Sources (web research, 16 Oct 2026)

These are mostly third-party prep guides and anonymous candidate reports, so treat them as indicative, not official.

- Dataford, Data Scientist role guide: https://dataford.io/roles/data-scientist
- Coursera, Data science interview prep guide: https://www.coursera.org/resources/data-science-interview-prep-guide
- Glassdoor, Stream graduate interview report (London): https://www.glassdoor.co.uk/Interview/Stream-Interview-E2892026-RVW103000377.htm
- Interview Query, Don't use LeetCode for DS interviews: https://www.interviewquery.com/p/dont-use-leetcode-for-data-science
- Interview Query, Statistics and A/B testing questions: https://www.interviewquery.com/p/statistics-ab-testing-interview-questions
- StrataScratch, A/B testing interview guide: https://www.stratascratch.com/blog/ab-testing-data-science-interview-questions-guide
- MentorCruise, AI engineer interview rounds: https://mentorcruise.com/blog/ai-engineer-interview-questions-how-to-prepare-for-every-round/
- Pensero, AI engineer interview questions 2026: https://pensero.ai/blog/ai-engineer-interview-questions
- Codemia, Perplexity engineer guide: https://codemia.io/guides/perplexity-software-engineer
- Lyzr, What is an agent engineer: https://www.lyzr.ai/blog/what-is-an-agent-engineer/
- KORE1, Hiring an AI agent engineer 2026: https://www.kore1.com/how-to-hire-ai-agent-engineer-2026/
- The AI Career Lab, Agentic AI jobs guide: https://theaicareerlab.com/blog/agentic-ai-jobs-guide-2026
- Exponent, Palantir FDE interview: https://www.tryexponent.com/guides/palantir-forward-deployed-engineer-interview
- techinterview.org, What the FDE interview tests: https://www.techinterview.org/post/3233477236/forward-deployed-engineer-interview/
- Exponent, Databricks FDE interview: https://www.tryexponent.com/guides/databricks-forward-deployed-engineer-interview
- Dataford, Faculty data scientist guide: https://dataford.io/interview-guides/facultyai/data-scientist
- Glassdoor, Faculty interview report: https://static.glassdoor.co.uk/Interview/Faculty-ai-Interview-E1660422-RVW102614539.htm
- WeAreDevelopers, Graduate AI Engineer posting: https://www.wearedevelopers.com/en/jobs/ext/5679711/graduate-ai-engineer
- TARGETjobs, Competency-based interview questions: https://targetjobs.co.uk/careers-advice/interviews-and-assessment-centres/how-answer-competency-based-interview-questions
**Big-company sources (added 16 Oct 2026):**
- Amazon, Applied Scientist interview prep (official): https://amazon.jobs/content/en/how-we-hire/applied-scientist-interview-prep
- Amazon, in-person interview guidance (official): https://amazon.jobs/en-gb/landing_pages/in-person-interview
- Google, Data Scientist University Graduate 2026 (mirror): https://jobs.anitab.org/companies/google-24698/jobs/72499007-data-scientist-university-graduate-2026
- Google, Data Scientist University Graduate 2026 (Google Careers): https://www.google.com/about/careers/applications/jobs/results/123165944951251654-data-scientist-university-graduate-2026
- Google, Senior Data Scientist, Shopping (London/Zürich): https://www.google.com/about/careers/applications/jobs/results/73748104125260486-senior-data-scientist-product-google-shopping?location=London
- Google, Software Engineer Early Career (mirror): https://jobs.anitab.org/companies/google-24698/jobs/89986001-software-engineer-early-career-campus
- Google Cloud, Forward Deployed Engineer, Applied AI (mirror): https://jobs.anitab.org/companies/google-24698/jobs/85932848-forward-deployed-engineer-applied-ai-google-cloud
- Google Cloud, Partner FDE (mirror): https://jobs.anitab.org/companies/google-24698/jobs/86784418-partner-forward-deployed-engineer-google-cloud
- Google hiring criteria (third-party): https://www.carrus.io/blog/the-google-interview-process
- Microsoft, Data Scientist (Applied AI / ML Engineering) (mirror): https://jobs.anitab.org/companies/microsoft/jobs/66729972-data-scientist-applied-ai-ml-engineering
- Microsoft interview process (third-party): https://igotanoffer.com/en/advice/microsoft-interview-process
- Microsoft AI Engineer questions (third-party): https://www.interviewquery.com/prep-guides/microsoft-ai-engineer
- Amazon DS interview (third-party): https://igotanoffer.com/blogs/tech/amazon-data-science-interview
- Meta DS interview (third-party): https://www.tryexponent.com/guides/meta-data-scientist-interview
- Meta DS interview (third-party): https://datalemur.com/blog/meta-data-scientist-interview-guide
- TikTok DS interview (third-party): https://codemia.io/guides/tiktok-data-scientist
- TikTok DS interview (third-party): https://prepfully.com/interview-guides/tiktok-data-scientist-interview-process
- TikTok DS posting (mirror): https://www.wearedevelopers.com/jobs/ext/7106324/data-scientist-multiple-positions
- OpenAI, FDE London (official): https://openai.com/careers/forward-deployed-engineer-london-london-uk/
- Anthropic, FDE (mirror): https://jobs.generalcatalyst.com/companies/anthropic/jobs/63014770-forward-deployed-engineer
- Your saved postings: Healx AI Engineer (Agentic Systems), Planday ML Engineer (Agentic AI), QuantumBlack Data Scientist I, Revolut Graduate DS and Analyst 2027, V7 FDE (`documents/applications/`)
