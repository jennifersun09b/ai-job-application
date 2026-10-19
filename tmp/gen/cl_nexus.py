# -*- coding: utf-8 -*-
SPEC = {
 "file":"cover_nexus_black_ai_engineer",
 "label":"Nexus Black AI Engineer",
 "paras":[
"I am writing to apply for the AI Engineer position at Nexus Black in London. I am completing an MSc in Health Data Science at University College London, after a BSc at Imperial College London, and I currently work as a data analyst at TikTok Shop UK. I am applying because of one line in your posting: own evaluation, define what correct means for a workflow, and hold the line. That is the work I have done most recently and the part of building with language models I care about most.",

"What attracts me most to Nexus Black is the standard you set for shipping. Building for a technician forty feet up a utility pole means a demo that mostly works is not a partial success, it is a failure with extra steps. I have worked to a version of that bar in healthcare, where a confidently wrong answer to a patient is worse than no answer, and it changes how you build: you decide what correct means before you see any output, and you assume the model will find the gap you left.",

"In my previous role at DS Digital Technology, a pharmaceutical client needed to know whether an AI agent could be trusted to answer patients' questions about bone metastasis, and had nothing to measure it against. I defined the standard: a 246-question golden dataset drawn from real consultations, and a six-dimension rubric with red-line rules covering the answers that fail outright regardless of how good the rest is. I built the eval harness around it, scoring more than 2,400 responses through an LLM-as-judge framework, with human review on a sample checking whether the judge could itself be trusted, because an unvalidated judge only moves the problem. The client adopted the rubric as their acceptance standard. Underneath it I shipped a Python system across six model APIs with retrieval and search augmentation, handling concurrency, retries, structured validation, checkpointing and resumable runs so it survived contact with reality rather than just the demo.",

"On agentic systems, I designed and shipped Jobwinner, which returns two scorecards from one cited evidence base: a disambiguation agent first, then five specialists running in parallel across domains, then two synthesizers reweighting the same findings through different lenses. Restricting each agent to domain-filtered evidence turned out to be the single most effective control on hallucination, which I would not have predicted before building it. It runs on Gemini Flash and Pro with Tavily and GitHub APIs, a FastAPI backend and ClickHouse, and every finding is cited back to a source. github.com/jennifersun09b/Jobwinner",

"I also build AI agents at TikTok Shop UK that automate recurring analytical and reporting workflows, used daily by operations teams, and I work with coding agents including Claude Code as normal practice rather than as a novelty. I treat what they return as a first draft to check, which is the only way I have found to get the speed without quietly shipping mistakes.",

"I should be clear about where I am short. My production experience comes from client engagements and research systems rather than years of shipping enterprise software, and I have no background in industrial, field-service or asset-heavy domains, so I would be learning the users' world from scratch. I would want to be on those site visits early for exactly that reason. What I would not be learning is how to define correctness for a workflow, build the harness that tests it, or tell the difference between a good demo and something that still works in week six.",

"Thank you for considering my application. I am London-based and hold the right to work in the UK without sponsorship until January 2029.",
 ],
}
