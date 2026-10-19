# -*- coding: utf-8 -*-
import spec_master
SPEC = dict(spec_master.SPEC)
SPEC.update({
 "file":"main_accurx_product_analyst",
 # DS Digital: keep the BeiGene medical-agent work only; lead on experimentation and metric design
 "dsd":[
  "Designed a 246-question benchmark and 6-dimension rubric with clinical experts, adopted as the acceptance standard for measuring the quality of patient-facing AI answers",
  "Ran blinded paired A/B tests to measure whether a medically reviewed knowledge base improved answer quality, and reported which changes were and were not supported by the data",
  "Built a Python pipeline calling 6 LLM APIs with retrieval, scoring 2,400+ responses with an LLM-as-judge framework, and presented findings and priorities to stakeholders",
 ],
 "ipsos":[
  "Structured and analysed data from 80+ healthcare professional interviews to identify user needs and behaviour patterns",
  "Built market-sizing and forecasting models to size opportunities and assess competitive dynamics",
  "Translated analytical findings into dashboards and clear recommendations for non-technical stakeholders",
 ],
 "prog":"SQL, Python, R, Linux shell",
 "h2":"Product Analytics and Experimentation",
 "s2":"A/B testing and experiment design, hypothesis testing, causal inference, KPI definition and tracking, dashboarding and data storytelling, segmentation",
 "h3":"Machine Learning and AI",
 "s3":"scikit-learn, XGBoost, PyTorch, Hugging Face Transformers, LLM evaluation, RAG, clinical NLP",
 "tools":"pandas, NumPy, Power BI, Excel, Matplotlib, Git, Docker, Streamlit, Claude Code",
})
