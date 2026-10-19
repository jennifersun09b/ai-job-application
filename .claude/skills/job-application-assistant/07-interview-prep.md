---
framework_version: 1.0.0
---

# Interview Preparation Guide

<!-- Populated by /setup 2026-09-08 from documents/applications (TikTok and Curenetics interview notes, project summary, cover letters) and the internship folders. Facts verified against 01-candidate-profile.md. Numbers marked (verify) should be re-checked before use. -->

## STAR Format

Structure answers as: **Situation** (context), **Task** (your responsibility), **Action** (what you did), **Result** (outcome). Keep answers to 1-2 minutes. End with what you learned or would do differently.

## Ready-Made STAR Examples

### 1. BeiGene medical-AI benchmark (turning an ambiguous brief into a measurable system)
**S:** A pharmaceutical client asked whether their brand knowledge could make general LLMs answer bone-metastasis patient questions more safely. No question set, no metric, no baseline existed; the client had not decided the use case.
**T:** Define what "good" meant and build the measurement before anyone built a knowledge base.
**A:** Mined 4,800+ real patient consultation threads with a regex plus LLM extraction pipeline to find the questions patients actually ask; selected 246 that were both frequently asked and improvable by client evidence; wrote a 6-dimension rubric (coverage, accuracy, completeness, safety, traceability, consistency) with five red-line rules and per-question anchors; built the Python pipeline calling 6 LLM APIs with search augmentation, checkpointing and parallel runs; scored 2,400+ responses with an LLM-as-judge.
**R:** Baseline mean 61/100 with a 2% pass rate, and one platform scoring 100 on traceability against 33 for others because it never invented citations. That single comparison set the knowledge-base strategy (cite from a whitelist, never fabricate). Reports went to client stakeholders and shaped the roadmap.
**Use for:** "ambiguous requirements", "tell me about a project you owned end to end", "how do you define success", "working with a client"

### 2. Apple x Tmall audience analysis (statistical rigour that changed the recommendation)
**S:** Twelve customer segments, fifteen ad channels, one number per cell: reach, click-through index and cost bucket. The client wanted to know whether segments needed different media plans.
**T:** Decide whether the segments genuinely differed, and in what way, with no replication.
**A:** Treated channels as blocks and compared segments with Friedman, Quade, RCBD ANOVA and permutation tests, checking additivity before trusting F. Found five data defects first (Excel serial corruption, zeros that were missing values, duplicate columns) and repaired them by explicit rule. Then divided out each segment's volume with a centred log-ratio transform and re-tested.
**R:** Every omnibus test rejected "all the same" at p below 1e-14, but after removing volume the reach mix no longer differed (p about 0.88) while click-through still did (eta squared 63%). Translation: budget is the lever for reach, creative is the lever for engagement. Twelve channel plans became one budget ladder plus creative variants, validated by clustering against a shuffle null.
**Use for:** "a time your analysis changed a decision", "explain a complex analysis to a non-technical person", "attention to detail", "handling messy data"

### 3. UK Biobank dissertation (honest results under pressure to find an effect)
**S:** Estimating whether lifestyle changes cause lower cardiovascular risk in 71,428 UK Biobank participants, with 24 transitions and 120 joint contrasts.
**T:** Produce defensible causal estimates and a working tool, within a dissertation timeline.
**A:** Doubly robust causal forests with overlap weighting; pre-specified sensitivity analyses for outcome timing, overlap and unmeasured confounding (E-values, quantitative bias analysis); external validation in NHEFS; baseline risk models in 458,840 participants (AUC 0.714-0.718, calibration slopes 0.92-0.99); Streamlit tool integrating both streams.
**R:** Most transitions showed no effect and the one that survived multiple-testing correction failed the timing check, so I reported it as likely reverse causation rather than a finding. Narrow intervals turned nulls into informative bounds (effects excluded beyond about one percentage point). Distinction expected.
**Use for:** "tell me about a time you were wrong or a result disappointed you", "how do you ensure rigour", "explain causal inference vs prediction", "biggest technical challenge"

### 4. Ipsos market sizing (stakeholders and messy qualitative data)
**S:** A client needed a market-entry view built largely from 100+ expert interviews.
**T:** Turn transcripts into evidence a strategy team could size and present.
**A:** Designed a structured coding framework converting interviews into quantitative variables; cleaned and analysed in Excel and SQL; integrated with secondary market data into a market-sizing model; co-built executive dashboards with the strategy team.
**R:** Identified roughly $20M of revenue potential across product segments; the recommendations went to the client. Learned to lead with the decision, not the method, when presenting to executives.
**Use for:** "working with non-technical stakeholders", "influencing without authority", "communication", "consulting mindset"

### 5. Onboarding at DS Digital Technology (asking the uncomfortable question)
**S:** First week on the Apple project. The plan assumed last year's audience segments were still valid, and the deprecated platform tags made the numbers non-comparable.
**T:** Get up to speed while the previous analyst was leaving, and flag anything that did not make sense.
**A:** Asked the manager directly whether price rather than segment membership drove purchases, whether new product formats changed the segments, and why the internal AI targeting tool was assumed to be worse than manual selection. Then rebuilt the deprecated tag from substitute tags to reproduce a segment of about 60M users and documented the mismatch (gender mix had shifted) rather than hiding it.
**R:** The manager confirmed the price question had been tested the previous year (switchback design), recorded my other questions as open items, and the rebuilt segment became the working definition. Established a habit of writing assumptions down before analysing.
**Use for:** "disagreeing with a manager or senior colleague", "learning a new domain quickly", "questioning assumptions", "handling handover with incomplete documentation"

### 6. Westlake and USTC pipelines (making other people's work reproducible)
**S:** Two research groups had slow, hard-to-reproduce bioinformatics pipelines (multi-omics ageing analysis; spatial transcriptomics of medulloblastoma).
**T:** Improve reliability and speed without changing the science.
**A:** Refactored Python/R workflows, parallelised the heavy steps, put scripts under version control; for the spatial pipeline, tuned spot-detection and filtering thresholds that were corrupting downstream cell-type annotation.
**R:** About 60% faster processing at Westlake and about 60% better spot-decoding accuracy at USTC (verify both figures against your own records before quoting); results presented to senior scientists.
**Use for:** "improving a process", "working independently", "technical debt", "delivering for researchers or domain experts"

### 7. Clinical NLP group project (leading peers)
**S:** UCL group project building a transformer pipeline over radiology reports with a mixed-skill team.
**T:** Lead the team and ship a working pipeline plus evaluation.
**A:** Organised meetings and split the work; built the Hugging Face pipeline; fine-tuned ClinicalBERT/PubMedBERT-style models; compared against TF-IDF plus kNN baselines; designed the evaluation framework surfacing vision-language failure modes.
**R:** PubMedBERT beat the baselines; presentations to technical and non-technical audiences received positive feedback. Honest lesson: a classifier at about 0.63 accuracy taught more about label noise than about the model.
**Use for:** "leadership", "teamwork", "a project that did not fully succeed", "what a simple baseline taught you"

## Most-Asked Behavioural Questions and Which Story Answers Them

Prepare one story per row; the numbers refer to the STAR examples above. Rows marked **GAP** need a story you have not written down yet.

| Question family (asked in most UK graduate and tech interviews) | Story |
|---|---|
| Tell me about yourself / walk me through your CV | 30-second version: Imperial biology to UCL health data science, three internships (Ipsos, DS Digital, TikTok), the thread is turning unclear questions into decisions with data |
| Why this company / why this role | Customise per company; template in 06-cover-letter-templates.md |
| A time you dealt with ambiguity or unclear requirements | 1 |
| Your most technically challenging project | 3 or 2 |
| A time your analysis changed a decision | 2, 4 |
| A time you made a mistake or a result disappointed you, and what you did | 3 (reverse causation), 7 (0.63 classifier) |
| A time you disagreed with a manager or senior colleague | 5 |
| Explain something technical to a non-technical audience | 2 (scale vs shape), 4 |
| Leadership / leading a team | 7 |
| Working in a team with conflict or a weak member | **GAP** - write one from the NLP group project or the TikTok role |
| Prioritising under time pressure / competing deadlines | **GAP** - dissertation plus internship overlap in summer 2026 is the obvious candidate |
| Learning something new fast | 5, 2 (Tmall platforms in two weeks) |
| Attention to detail / data quality | 2 (five defect classes), TikTok data-cleaning story from interview notes |
| Influencing without authority / stakeholder management | 4, 1 |
| Receiving critical feedback and acting on it | **GAP** |
| Failure to meet a goal | **GAP** - do not reuse 3; interviewers want a personal miss |
| Ethics, privacy or safety judgement | 1 (red-line rules), 3 (UK Biobank ethics section) |
| Strengths and weaknesses | Strength: framing problems and measuring honestly. Weakness: over-explaining method before the decision; mitigation: write the one-line answer first |
| Where do you see yourself in five years | Data scientist or applied-AI engineer owning problems end to end, ideally with a health or consumer-tech product; visa sponsorship secured |

## Common Tough Questions

### "Why are you leaving TikTok / why so many short roles?"
> They are internships during a one-year MSc, each chosen to test a different application of data science: pharma strategy, applied AI for clients, e-commerce operations. I am now looking for the first permanent role where I can build depth. Keep it factual; never criticise an employer.

### "You don't have production engineering experience."
> True. I have built and run pipelines with checkpointing, retries and monitoring, deployed a Streamlit app, and automated data collection, but I have not owned a production service. I would expect to learn deployment practices from the team, and I bring the evaluation and reliability mindset that production systems need.

### "You need visa sponsorship."
> I currently have the right to work in the UK without sponsorship and would need Skilled Worker sponsorship in about two years. State it plainly and early; do not let it surface at offer stage.

### "Why data science and not medicine or biology?"
> Imperial showed me the questions I cared about were quantitative; the molecular dynamics project was a data pipeline problem. Health data science lets me keep the domain and work on the part I am good at.

### "What's your biggest weakness?"
> I explain the method before the conclusion. I now write the one-sentence answer first and put the method in an appendix; the Apple report was the first time I did that deliberately.

### "Why this company specifically?"
> Customise per company. Must reference a specific product, team, dataset or public statement, verified. Never generic.

## Questions You Should Ask Interviewers

### About the Role
- "What does a typical week look like, and how much of it is analysis versus stakeholder work?"
- "What would success look like in the first six months?"
- "What is the hardest data problem the team has right now?"

### About the Team
- "How big is the team and how is work divided between data scientists and engineers?"
- "How do analyses reach decision makers here, and how often are they acted on?"
- "How do you onboard new graduates?"

### About Tech and Growth
- "What is the current stack for experimentation and model deployment?"
- "How does the team evaluate LLM or ML systems before they ship?"
- "Is there a path from analysis into owning models in production?"

### About Culture and Sponsorship
- "How would you describe the leadership style in this team?"
- "What is the balance between new work and maintenance?"
- "Does the company sponsor Skilled Worker visas for graduates?"

## Phone/Video Interview Tips
- Have this file open; say the one-line result first, then the story.
- It is fine to take five seconds before answering.
- End with: "Is there anything about my background you would like me to expand on?"

## After the Application (Best Practice)

### Follow-Up Etiquette
- Do not call to "stand out". If a timeline was given, respect it. After two weeks of silence a brief status enquiry is fine; `/outcome followup` drafts it.

### Thank-You Notes
- After any interview or update, send two or three sentences of thanks within 24 hours.

## Roleplay Guidelines
When the user asks for interview practice:
1. Ask which role and company to simulate and read that application's archive.
2. Warm up with "tell me about yourself", then the three most likely behavioural rows above, then role-specific technical questions.
3. Score each answer on structure (STAR), a concrete number, and a one-line takeaway; suggest the tighter version.
