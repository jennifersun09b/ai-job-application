# Twenty First Group – Recruiter Screening Prep

**Call:** 15 minutes, Google Hangouts/Meet, with the recruiter
**Role:** Data Scientist, Technology Solutions squad (London, Farringdon/Clerkenwell, hybrid ~3 days)
**Their stated focus:** your previous experience and, *most importantly*, what excites you about the job

> 15 分钟很短。每个回答控制在 **30–90 秒**。先说结论，再给一个例子，然后停下来。
> 不要背稿，记住 **关键词和顺序** 就够了。

---

## 0. Ten-second cheat sheet (keep this visible)

| Topic | Key words |
|---|---|
| TFG | 2013, 21st Club (football) + 15th Club (golf) → TFG 2021; B2B sports intelligence |
| Engine | Intelligence Engine: probabilistic modelling, simulation, optimisation; APIs, feeds, apps |
| Rankings | World Sports Rankings: Quality / Jeopardy / Connection |
| Labs | TFG Labs: agentic AI for sports decisions |
| Clients | Premier League, Ryder Cup, European Tour, Sky Sports, Sky Bet, TGL, Tottenham |
| My hooks | ① calibrated probabilities people act on ② models → products ③ small client-facing squads |
| My numbers | AUC 0.714–0.718, calibration near-perfect, 458,840 people · 2,400+ responses, 246 questions, client acceptance standard · TikTok agent 40–50% time saved |
| Visa | Right to work without sponsorship until Jan 2029 |

---

## 1. Motivation (the main part of the call)

### Q1. "What excites you about this role?" ⭐ MOST IMPORTANT

**Structure:** one-line summary → three reasons, each with *their* thing + *my* proof → close.

> "Honestly, it's the combination of three things.
>
> **First, the type of modelling.** The job is about probabilistic models and uncertainty, and the output doesn't just sit in a report. It goes into a broadcast, a fan product or a betting market, where people act on the number straight away. That means the probability has to be *well calibrated*: if the model says 30%, it should happen about 30% of the time. That's exactly what I focused on in my dissertation. My cardiovascular risk model only had moderate discrimination, an AUC of around 0.71, but the calibration was almost exact, and I'd argue that's what makes a probability safe to show someone.
>
> **Second, the models become products.** From what I've read, the Intelligence Engine pushes insight out through APIs, feeds and apps, and TFG Labs is experimenting with agentic AI. I like building the whole thing end to end. At TikTok I built an AI agent with Claude Code that automates part of my own analytics workflow and cut the time for that task by about 40 to 50 percent. At DS Digital I built the full evaluation pipeline for a medical AI agent. I enjoy seeing something I built actually being used.
>
> **Third, the way you work.** Small squads that mix data science, engineering and design, close to the client, with real deadlines like a tournament weekend. That's where I've done my best work. For example, the benchmark I designed for a pharma client became their official acceptance standard.
>
> So it's a role where my modelling, my engineering habits and my client experience all get used at once, in a domain that's genuinely fun."

**中文提示：**
- 三点各说一句 TFG 的事 + 一句你的证据，**不要只说自己**。
- "calibrated" 是全篇关键词，一定要用一句话解释清楚（"says 30% → happens 30% of the time"）。
- 如果时间紧，第三点可以压缩成一句。

---

### Q2. "Why Twenty First Group?" / "What do you know about us?"

> "You started in 2013 as 21st Club in football and 15th Club in golf, and became Twenty First Group in 2021 as you moved into more sports. You work B2B: with clubs and investors, leagues and federations, broadcasters, and betting companies.
>
> What stood out to me is that the same core intelligence is reused across very different clients. The Intelligence Engine does the probabilistic modelling and simulation, and that can feed a head-coach search for a club, live graphics for Sky Sports, or player markets for Sky Bet. I also looked at the World Sports Rankings, especially the idea of **Jeopardy**, measuring how uncertain a title or relegation race is. That's a nice way of turning a probability into something fans actually care about.
>
> And TFG Labs working on agentic AI for sports decisions is very close to what I've been doing with LLM pipelines and agents."

**中文提示：** 说出 **一个具体的东西**（比如 Jeopardy ranking）比列一堆客户名字更有说服力。

---

### Q3. "Why sport, coming from healthcare?"

> "I actually think the problems are very similar. In both, the data is noisy, the outcome is uncertain, and somebody has to make a decision under pressure: a clinician, or a sporting director. In both, a wrong probability has real consequences. What I've learned in healthcare is to be careful with uncertainty, check calibration, and be honest when a result is null. That transfers directly.
>
> The difference I like about sport is the speed. You see whether you were right within a weekend, not after ten years of follow-up. And personally I follow sport: mainly swimming, tennis and volleyball."

**中文提示：**
- 不要说 "I've always been a huge football fan"，不真实。
- 如果对方追问你喜欢的运动，准备好**一个具体例子**（比如最近看的一场网球比赛或游泳赛事），用一句话说你觉得有意思的数据点。

---

### Q4. "Do you follow golf?" (Golf is a nice-to-have in the JD)

> "Not closely, to be honest. It's the sport I know least, and I said that in my cover letter too. I'd want to learn it properly rather than pretend. From what I've read, the key measure is **strokes gained**: comparing each shot to how many strokes an average player would need from that position. That's quite a natural fit for how I think, because it's basically a baseline expectation model. I'd be excited to learn shot-level data."

**中文提示：**
- **Strokes gained 是什么：** 从某个位置（比如离洞 150 码的球道上），平均球员需要 X 杆完成这一洞。你打完一杆后，剩下需要的平均杆数是 Y。这一杆的 strokes gained = X − Y − 1。正数说明比平均水平好。
- 你只需要会一句话解释，不需要深入。
- 态度：**诚实 + 好奇 + 能快速学**。

---

## 2. Experience

### Q5. "Walk me through your background." (~90 seconds)

> "Sure. I did my undergraduate in Biological Sciences at Imperial. The part I enjoyed most was computational. My final-year project used molecular dynamics simulations, and I wrote a Python pipeline to process hundreds of gigabytes of simulation output. That's where I realised I liked the data side more than the lab side.
>
> After that I worked as a research data analyst, and then as a Strategy Analyst Intern at Ipsos in Beijing. There I built market-sizing and forecasting models and turned 80-plus expert interviews into structured quantitative data. It was my first real client-facing role.
>
> Then I started my MSc in Health Data Science at UCL, where I'm expecting a Distinction. My dissertation combined prediction and causal machine learning on UK Biobank data, around 459,000 people, and I deployed the results as a Streamlit app.
>
> Over the summer I was a Data Scientist Intern at DS Digital Technology, building an evaluation pipeline for a patient-facing medical AI agent for a pharma client.
>
> And since September I've been a Data Analyst Intern at TikTok Shop UK, doing merchant analytics in SQL and Python and building AI agents that automate parts of our workflow.
>
> So the common thread is taking messy, uncertain data, building a model, and turning it into something people actually use. That's why this role appeals to me."

**中文提示：**
- 按**时间顺序**讲，每段一两句，最后一句**回扣到这个岗位**。
- 不要提 Grand Pharmaceutical 和 IQVIA。
- 你的 TFG 简历上 Ipsos 职位写的是 **"Strategy Analyst Intern"**，面试时要保持一致。

---

### Q6. "Tell me about a project you're proud of."

**Option A: Dissertation** (best for this role, because it's about probabilistic modelling)

> "My dissertation. I predicted cardiovascular events for about 459,000 UK Biobank participants, comparing logistic regression with three tree-based models. The interesting finding was that the fancy models didn't really win: all of them had an AUC around 0.71 to 0.72. But calibration was almost perfect, so the predicted probabilities could be trusted at face value.
>
> Then I went further and used doubly robust causal forests on about 71,000 people to estimate how risk would change if someone changed their lifestyle, for example stopping smoking or becoming more active. I tested how sensitive the results were to unmeasured confounding and validated externally on a separate US dataset. Several results were null, and I reported them as null rather than overselling them.
>
> Finally I built a Streamlit app where you can change the inputs and see the modelled effect. I'm proud of it because it went all the way from raw data to a tool someone can actually use, and I stayed honest about the uncertainty."

**Option B: BeiGene benchmark** (best if they ask about clients or impact)

> "At DS Digital I worked on a patient-facing medical AI agent for a pharma client. The question was simple: is this AI safe enough to answer patients? I designed a 246-question benchmark and a six-dimension safety rubric with red-line rules, built a Python pipeline that ran six different LLM APIs with retrieval augmentation, and scored over 2,400 responses using an LLM-as-judge approach. We also built a medically reviewed knowledge graph and ran blinded A/B tests to check whether grounding actually improved answers. The client adopted the benchmark as their official acceptance standard. That's what I'm proud of: it turned a vague question into a measurable standard."

**中文提示：** 默认用 **Option A**。如果 recruiter 问 "impact" 或 "client"，切换到 **Option B**。

---

### Q7. "What are you doing at TikTok?"

> "I'm a Data Analyst Intern in Business Planning and Operations at TikTok Shop UK. Day to day I query and clean merchant and transaction data in SQL and Python to understand what's driving marketplace performance, build KPI frameworks and dashboards for the operations teams, and present findings to operations, product and commercial stakeholders.
>
> One thing I'm particularly happy with: my supervisor asked me to configure a merchant campaign by hand, matching the right setup to each merchant. After a few examples I could see the underlying logic, so I proposed automating it. I built an AI agent with Claude Code, with a multi-step process and a validation step to check accuracy. My supervisor was sceptical at first, but I delivered it before the same-day deadline, and it cut the time for that task by about 40 to 50 percent."

**中文提示：**
- 这个故事证明了 **initiative + engineering + validation（不盲目相信 AI）**，正好对应 TFG Labs 的 agentic AI 方向。
- **不要编**商户数量或使用人数，不知道就不说。

---

### Q8. "Have you worked with probabilistic models or uncertainty?"

> "Yes, quite a lot. Three examples:
>
> 1. **Calibration:** in my dissertation I didn't just look at AUC. I checked calibration curves and decision curves, because if you're going to act on a probability, it needs to mean what it says.
> 2. **Uncertainty in causal estimates:** with causal forests I estimated individual treatment effects with confidence intervals, and ran sensitivity analyses, E-values and quantitative bias analysis, to see how strong an unmeasured confounder would need to be to change my conclusion.
> 3. **Evaluation under uncertainty:** at DS Digital, LLM outputs are noisy, so I used blinded paired A/B tests and repeated scoring instead of trusting a single run.
>
> In sport I can see the same thing in win probabilities and match simulations: you need the full distribution, not just the most likely outcome."

**中文提示：** 如果 recruiter 不是技术背景，**只讲第 1 点**，然后说一句 sport 的连接即可。

---

### Q9. "Have you worked with clients or non-technical stakeholders?"

> "Yes. At Ipsos I presented findings, assumptions and limitations directly to client stakeholders through dashboards and recommendations. At DS Digital I presented evaluation reports to the pharma client, and the benchmark became their acceptance standard. At TikTok I present to operations, product and commercial teams, and they do challenge the reasoning, which is good.
>
> One thing I've learned is that I sometimes go too deep into technical detail. So now I lead with the decision and the 'so what', and keep the method in the appendix unless someone asks."

**中文提示：** 最后一段同时回答了潜在的 **"weakness"** 问题，而且显示自我觉察。

---

## 3. Logistics

### Q10. "What's your right-to-work situation?"

> "I'm currently on a Student visa, and I'm switching to the Graduate visa, which gives me the right to work in the UK **without sponsorship until January 2029**. So there's nothing you'd need to do on the sponsorship side for over two years."

**⚠️ 重要：** Graduate visa **必须在 2026 年 12 月 31 日之前申请**，才能拿到 2 年（到 2029 年 1 月）。2027 年以后申请只有 18 个月。

---

### Q11. "When could you start?" / "What's your notice period?"

> "[Fill in after checking your TikTok internship contract] My internship at TikTok has a notice period of ___, so I could start around ___. I'm flexible and happy to discuss."

**中文提示：** 今晚**一定要查清楚**合同里的 notice period，给一个具体答案，不要含糊。

---

### Q12. "What are your salary expectations?"

**Step 1: deflect politely**
> "I'm mainly focused on finding the right role, and I'm flexible. Could you share the budgeted range for this position?"

**Step 2: if pushed**
> "Based on what I've seen for graduate data scientist roles in London, somewhere in the range of £__ to £__, but I'm open depending on the overall package."

**中文提示：**
- 伦敦 graduate DS 一般大约 **£35–45k**（参考，未核实 TFG 的具体薪资）。
- 如果被问 **current salary**：TikTok 实习是 **£30,000**。
- JD 提到有 **private health insurance + bonus**，可以说 "open depending on the overall package"。

---

### Q13. "Are you OK with hybrid, about three days a week in the office?"

> "Yes, absolutely. I'm based in London, and I actually prefer being in the office a few days a week, especially when I'm new and learning from the team."

---

### Q14. "Are you interviewing elsewhere?"

> "Yes, I'm in a few other processes, mainly data science roles, but this is one of my top choices because of the combination of modelling and sport."

**中文提示：** 简短、诚实，不要报具体公司名字。

---

### Q15. "Why are you leaving TikTok?"

> "It's an internship, so it has a natural end point, and I'm looking for a permanent data science role. I've enjoyed it a lot, but I want to work more on modelling and probabilistic work, and less on reporting."

**中文提示：** **不要说 TikTok 的坏话**。重点放在 "move toward more modelling"。

---

## 4. Possible extra questions

### "What's your biggest weakness?"
> "I sometimes over-explain technical details to non-technical people. I've been working on leading with the conclusion and the decision first, then adding detail only if asked. Presenting at TikTok to commercial stakeholders has really helped with that."

### "Why data science rather than consulting or analysis?"
> "I like building the model myself, not just interpreting someone else's numbers. But I also like being close to the decision. This role combines both."

### "What does a typical day look like for you right now?"
> SQL + Python analysis in the morning, building or improving the agent, then a stakeholder sync or presentation.

### "What's your Python/SQL level?"
> "Strong. I use both every day at TikTok, and I've built full pipelines in Python with concurrency, retries, validation and checkpointing at DS Digital."

---

## 5. Questions to ask (pick 2, ~2 minutes)

1. **"What does the interview process look like after this call? Is there a technical task?"** (always ask)
2. **"What kind of projects would a new data scientist in Technology Solutions work on in the first few months?"**
3. "How does the Technology Solutions squad work with TFG Labs? Is agentic AI starting to show up in client products?"
4. "How much of the squad's work is one-off projects versus recurring products?"
5. "How big is the data science team, and who would I report to?"

**中文提示：** recruiter 可能不懂技术细节，所以 **1 和 2 最安全**。第 3、4 题适合在后面面试 hiring manager 时问。

---

## 6. Before the call: checklist

- [ ] Test Google Meet/Hangouts: camera, microphone, quiet room, good lighting
- [ ] Check your TikTok internship **notice period**
- [ ] Decide your **salary range**
- [ ] Open your TFG CV + cover letter (`cv/main_twentyfirstgroup_data_scientist.pdf`, `cover_letters/cover_twentyfirstgroup_data_scientist.pdf`)
- [ ] Say Q1 (excites me) and Q5 (background) **out loud 2–3 times**
- [ ] Glance at twentyfirstgroup.com/tfg-world-sports-rankings
- [ ] Have a glass of water and this doc open
- [ ] Join **2 minutes early**

**最后：** 15 分钟主要看 **enthusiasm + clear communication + logistics 没问题**。语速放慢，笑一笑，表现出真的对这个岗位感兴趣就很好 💪
