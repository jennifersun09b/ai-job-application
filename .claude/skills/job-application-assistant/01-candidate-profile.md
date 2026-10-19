---
framework_version: 1.1.1
---

# Candidate Profile

<!-- Populated by /setup (documents-folder path) on 2026-09-08 from documents/cv, documents/diplomas
     and documents/applications. Re-run /setup after updating documents/cv/ - the resume changes often. -->

## Identity
- **Name:** Zhuoyan Sun (goes by Jennifer)
- **Location:** London, UK (open to any UK region, EU countries, remote; USA lowest priority)
- **Languages:**
  | Language | Level |
  |----------|-------|
  | English | Fluent (professional working proficiency; two UK degrees, UK work) |
  | Mandarin Chinese | Native |
- **CV language:** English

- **Status:** Data Analyst Intern at TikTok Shop UK (London) since Sep 2026; MSc Health Data Science (UCL) completing Sep 2026, Distinction expected. Actively applying for graduate and early-career roles for 2026-2027.
- **Work authorisation (updated 2026-10-18):** holds a UK **partner (couple) visa** - does **not** need visa sponsorship now or in future. Answer "require sponsorship now/in future" = **No**; "right to work in the UK" = **Yes**. It is not ILR/settled status, so "indefinite/permanent right to work" and "UK/Irish citizen or settled" gates still fail, as does SC clearance (5 years' continuous UK residence). Postings that refuse sponsorship are no longer a hard fail. Visa expiry date not yet on file - ask if a form requires it. Do not put visa details in cover letters.
- **LinkedIn headline:** "MSc Health Data Science at UCL | Data Scientist / Applied AI | Data Analyst Intern at TikTok Shop UK"
- **Links:** LinkedIn https://www.linkedin.com/in/zhuoyan-jennifer-sun-8b6558297 · GitHub https://github.com/jennifersun09b · Portfolio https://jennifersun09b.github.io/portfolio/

## Education
- **MSc Health Data Science** (Sep 2025 - Sep 2026) - University College London, Institute of Health Informatics. Distinction expected.
  - Dissertation: "Cardiovascular Risk Prediction and Longitudinal Lifestyle Change in UK Biobank: Predictive and Causal Machine-Learning Models" - 458,840 participants for baseline risk prediction (logistic regression vs three tree ensembles, AUC 0.714-0.718, near-perfect calibration); doubly robust causal forests on 71,428 participants estimating 24 single-domain lifestyle transitions and 120 joint contrasts; sensitivity analyses for timing, overlap and unmeasured confounding (E-values, QBA); external validation in NHEFS; results delivered in an interactive Streamlit tool.
  - Topics: Data Science and Statistics, Advanced Data Science and Statistics, Artificial Intelligence in Healthcare, Advanced Machine Learning for Healthcare, AI in Healthcare group project
- **BSc Biological Sciences** (Sep 2021 - Jun 2024) - Imperial College London. Upper Second-Class Honours (2:1).
  - Final-year project: "Structural and Dynamic Analysis of Rare Genetic Variants in C9 and their Membrane-Binding Mechanisms Revealed by Molecular Dynamics Simulations" (Python pipeline over hundreds of GB of simulation output)
  - Topics: Mathematics, Bioinformatics, Programming and Statistics, Computational Omics, Integrative Systems Biology

## Professional Experience
- **Data Analyst Intern, Business Planning & Operations** (Sep 2026 - Present) - **TikTok Shop UK** (London, UK)
  - Analyses merchant growth and operations data in SQL and Python to identify performance drivers across the UK marketplace and surface insights for new-market growth strategy
  - Builds KPI frameworks and dashboards used by e-commerce operations teams to set targets and track strategy initiatives
  - Presents findings and recommendations to cross-functional operations, product and commercial stakeholders
- **Data Scientist Intern (title on CV; internal title Applied AI Engineer)** (Jul 2026 - Sep 2026) - **DS Digital Technology** (Hangzhou, China)
  - BeiGene (BeOne) medical-AI engagement: designed a 246-question bone-metastasis patient benchmark and 6-dimension safety rubric with red-line rules, used as the acceptance standard for evaluating patient-facing AI answers; built a Python pipeline calling 6 LLM APIs with retrieval and search augmentation, producing and scoring 2,400+ responses via an LLM-as-judge framework; co-built a medically reviewed knowledge graph (123 entities, 161 relations) and designed blinded paired A/B tests of its effect; mined 4,800+ patient consultation threads with a regex + LLM extraction pipeline
  - Apple x Tmall audience programme: re-validated 12 audience segments across Tmall data platforms, rebuilt deprecated tags to reproduce a ~60M-user segment, designed the Excel data framework and a Playwright API collector, and ran a repeated-measures statistical analysis (Friedman, RCBD ANOVA, permutation, Nemenyi, CLR scale-vs-shape, PCA + Ward clustering) across 12 segments x 15 ad touchpoints, producing per-segment media playbooks
  - Presented evaluation reports and recommendations to pharma and consumer-tech client stakeholders
- **Associate Strategy Analyst** (May 2025 - Aug 2025) - **Ipsos Strategy3** (Beijing, China)
  - Analysed healthcare and consumer datasets and 100+ expert interviews; built a structured coding framework turning interview transcripts into quantitative variables
  - Built market-sizing and forecasting models estimating $20M revenue potential across emerging health-product segments
  - Turned findings into executive dashboards and recommendations with research and strategy teams
- **Primary Intelligence Consultant** (Apr 2025 - Aug 2025, remote) - **IQVIA** - desk research, quantitative and qualitative analysis for client proposals and reports
- **Business Development Consultant** (Jan 2025 - Apr 2025) - **Grand Pharmaceutical Group** (Beijing) - ophthalmic market research and a business model for expansion into eye-disease therapeutics
- **Research Data Analyst** (Sep 2024 - Dec 2024) - **Westlake University** (Hangzhou) - multi-omics analysis of epigenetic change in ageing skin stem cells; refactored and parallelised the pipeline in Python/R, cutting processing time by ~60%, and added version-controlled scripts for reproducibility
- **Research Data Analyst** (2024) - **University of Science and Technology of China** - spatial transcriptomics pipeline for medulloblastoma (spot detection, filtering, clustering); tuning decoding parameters improved decoding accuracy by ~60%

## Independent and Academic Projects
- **Clinical NLP & LLM Pipeline for Radiology Reports** (UCL, Jan 2026 - Jul 2026, group project, team lead): Hugging Face Transformers pipeline parsing radiology reports into structured features; fine-tuned ClinicalBERT/PubMedBERT-style models (PubMedBERT beat TF-IDF + kNN baselines); evaluation framework surfacing vision-language failure modes against text-derived signals and patient data
- **Causal ML for Cardiovascular Risk Simulation** (UCL dissertation, Dec 2025 - Sep 2026): see Education; Streamlit app deployed
- **Consumer feedback mining** (earlier project): Reddit/YouTube/Twitter feedback analysed with embeddings, clustering and LLMs to identify user intent

## Technical Skills
- **Primary:** Python (pandas, NumPy, SciPy, scikit-learn), SQL, statistics and experimental design (hypothesis testing, non-parametric and permutation tests, A/B testing, causal inference: causal forests, doubly robust estimation, overlap weighting, E-values), LLM evaluation (benchmark design, LLM-as-judge rubrics, blinded A/B), predictive modelling (logistic regression, XGBoost, LightGBM, random forests, calibration, decision curves)
- **Secondary:** PyTorch, Hugging Face Transformers, clinical NLP (ClinicalBERT/PubMedBERT), RAG and knowledge graphs, R (tidyverse, ggplot2), JavaScript, Linux shell, Playwright/RPA automation, TensorFlow (coursework level)
- **Domain:** healthcare and clinical data (UK Biobank, EHR-style consultation text, radiology reports), pharma market analysis, bioinformatics (multi-omics, spatial transcriptomics, molecular dynamics), consumer-tech marketing analytics, e-commerce merchant analytics
- **Software:** Git/GitHub, Docker, Streamlit, AWS (basic), Jupyter, Power BI, Excel, Claude Code, OpenAI-compatible and Anthropic LLM APIs, GROMACS, Seurat/Scanpy/DESeq2 (bioinformatics)

## Certifications
- None listed yet (add via /setup --section skills)

## Publications
- None yet (dissertation may be submitted for publication)

## Awards
- Conference Team Leader, HUAWEI Connect Shanghai (Sep 2023) - led a team supporting 20,000+ attendees
- Volunteer and representative roles: Urban Nature Volunteer, Natural History Museum (2023-2024); Undergraduate Wellbeing Representative, Imperial (2023-2024)

## Behavioral Profile
<!-- Self-assessment inferred from interview prep notes and cover letters; no formal instrument. Review before relying on it. -->
- **Analytical and evidence-first** - prefers to define the metric and the test before drawing a conclusion; comfortable reporting null results honestly (dissertation)
- **Curious problem-framer** - repeatedly describes enjoying "taking an unclear business or clinical problem and turning it into a testable workflow"
- **Strengths:** structured reasoning under ambiguity, fast learning across domains (biology to consumer tech), bilingual stakeholder communication, ownership of end-to-end deliverables
- **Growth areas:** limited production-engineering experience (no deployed service at scale); early-career, so stories are project-scale rather than team-leadership scale; tends to over-explain technical detail to non-technical audiences
- **Thrives in:** small, fast-moving teams with measurable outcomes and direct contact with the problem owner (client, clinician, merchant); dislikes pure maintenance work or roles with no analytical judgement

## What Excites You
- Turning messy real-world data into decisions people act on (media budgets, clinical safety rules, merchant strategy)
- Evaluating and grounding AI systems so they are safe and trustworthy, especially in healthcare
- Working directly with the people who own the problem rather than behind a ticket queue

## Seniority Band (confirmed 2026-09-11)
**Target entry-level and graduate roles.** She has no full-time post-graduation experience - her record is internships and research assistant posts - so postings pitched at mid-level are a low-probability stretch and postings pitched at senior, lead, principal or staff are out of scope entirely.

Screening rule:
- **Apply:** graduate schemes, "Graduate X", "Junior X", "X I", "Associate X", and postings asking for 0-1 years
- **Stretch, apply only when the match is otherwise exceptional:** postings asking 2-3 years, or labelled "Mid" / "Mid-Senior"
- **Skip:** "Senior", "Lead", "Principal", "Staff", "Manager", or 4+ years required. Do not spend a tailoring cycle on these.

Check the posting **body**, not only the title. Several roles with neutral titles (Forward Deployed Engineer, Machine Learning Engineer) turned out to demand 3+ years or Lead/Principal seniority once the body was read.

## Role Priority (confirmed 2026-09-11, in order)
1. **Data Scientist**
2. **Data Analyst**
3. **Forward Deployed Engineer**
4. **Applied AI Engineer** / AI Engineer / ML Engineer

Search and rank in this order. Data Analyst is a genuine target, not a fallback, and graduate Data Analyst roles in research and consulting businesses suit her profile particularly well.

## Target Sectors (confirmed 2026-09-11)
**In scope:** technology, healthtech, biotech, consulting, healthcare and life sciences.
- Technology and e-commerce: TikTok/ByteDance, Google, Apple, Amazon, Just Eat, Ocado, Bending Spoons, Lovable
- Healthtech, biotech and pharma: Novo Nordisk, AstraZeneca, GSK, Pangaea Data, Curenetics, Flatiron, Healx, Quantium Health, BenevolentAI, NHS analytics
- Consulting and AI-native: QuantumBlack, BCG X, Faculty, Palantir, Coforge, Isidor, Cursor, V7, Anthropic/OpenAI solutions teams, Ipsos and market-research analytics
- Finance and insurance data science as a secondary net only: JPMorgan, Zopa, ClearScore, CFC

## Language as a Selling Point
Native Mandarin plus professional experience in China (DS Digital Technology, Ipsos Strategy3, Westlake, USTC, Grand Pharmaceutical) is an **asset to surface, not hide**. She is open to roles where Chinese is used or where the employer has China or APAC exposure. Name it in cover letters where the employer has an APAC footprint, a China market, or Chinese-language data.

## Public Profiles
GitHub (https://github.com/jennifersun09b) and the portfolio (https://jennifersun09b.github.io/portfolio/) are **tidy and presentable**, publicly accessible, and safe to link in every CV. Recruiters can be pointed at them.

## Logistics (confirmed 2026-09-11)
- **Salary:** no minimum. Do not filter on pay.
- **Location:** any location acceptable. UK, EU, remote, relocation all fine. Location is not a scoring factor.
- **Travel:** any amount acceptable. Do not flag travel percentage as a concern.
- **Availability:** can start at any time. "Available immediately" is accurate.

## Deal-breakers
- **Government and defence are excluded.** No defence contractors, national security, military, or public-sector-facing roles, regardless of fit. This also rules out anything gated on UK Security Vetting (SC/DV).
- Postings that explicitly refuse visa sponsorship now and in future (eligibility gate)
- Roles requiring security clearance
- Pure BI-reporting or data-entry roles with no modelling or analytical judgement
- Senior, lead, principal and staff-level postings (see Seniority Band above)
- No constraint on salary, location, travel or start date

## References
- Available on request (supervisors at UCL Institute of Health Informatics; manager at DS Digital Technology; Ipsos Strategy3). Add names and contact details here once confirmed with each referee.

More references available upon request.
