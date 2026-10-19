# -*- coding: utf-8 -*-
"""Merge portal-agent output, dedupe against tracker/seen, filter, score."""
import json, os, re, sys, datetime

SCRATCH = "/private/tmp/claude-501/-Users-jennifersun-ai-job-search/767d0611-2814-495e-939a-ea562b3479b7/scratchpad"
TODAY = datetime.date(2026, 9, 22)

def norm(s):
    s = (s or "").lower()
    for w in [" inc."," inc"," llc"," ltd."," ltd"," plc"," group"," limited"]:
        s = s.replace(w, "")
    return re.sub(r'[^a-z0-9]+', '', s)

# --- hard exclusions -------------------------------------------------------
DEFENCE = ["bae","babcock","mbda","frazer-nash","frazer nash","leonardo","thales",
    "qinetiq","dstl","raytheon","lockheed","northrop","awe ","ministry of defence",
    "gchq","airbus defence","defence","defense","military","submarine","nuclear weapons",
    "rolls-royce submarines","naval","army","royal air force","aerospace and defence"]
CLEARANCE = ["security clearance","sc cleared","dv cleared","security vetting",
    "must be eligible for sc","bpss","developed vetting"]
SENIOR = ["senior","lead ","principal","staff ","head of","director","vp ",
    "manager","architect","chief","expert","ii)","iii"]
RECRUITER = ["jobright","hiredbuddy","cv-bridge","citylife","base career","fortray",
    "oho group","opus recruitment","radley james","develop","targetjobs","hays",
    "quant capital","technology & risk recruitment","evidencia","haystack","reply"]

def excluded(title, company, extra=""):
    t, c = (title or "").lower(), (company or "").lower()
    blob = f"{t} {c} {extra}".lower()
    if any(k in blob for k in DEFENCE):   return "defence"
    if any(k in blob for k in CLEARANCE): return "clearance"
    if any(k in t for k in SENIOR):       return "seniority"
    return None

# --- scoring ---------------------------------------------------------------
ROLE = [ (["data scientist","data science"], 35),
         (["ai engineer","machine learning engineer","ml engineer","applied ai",
           "llm engineer","ai/ml"], 33),
         (["forward deployed"], 30),
         (["data analyst","product analyst","decision scientist","insights analyst",
           "analytics"], 27),
         (["analyst","consultant"], 20) ]
ENTRY = [ (["graduate","new grad","campus"], 20),
          (["junior","associate","entry","intern ","trainee"," i "], 18),
          (["2027","2026 start"], 14) ]
HEALTH = ["health","clinical","medical","nhs","bio","genom","pharma","patient",
          "care","therapeu","diagnos","life science","med tech","medtech"]
CONSULT = ["consult","advisory","strategy","mckinsey","bain","bcg","deloitte","pwc",
           "ey ","kpmg","accenture","capgemini","cognizant","zs","oliver wyman","baringa"]
TECH = ["tech","software","platform","digital","ai","data","cloud","saas","product",
        "google","apple","amazon","meta","microsoft","spotify","monzo","wise","ocado",
        "deliveroo","bytedance","tiktok","stripe","datadog"]

def score(title, company, location, date, categories=""):
    t = (title or "").lower(); c = (company or "").lower()
    blob = f"{t} {c} {categories}".lower()
    s = 0; why = []
    for kws, pts in ROLE:
        if any(k in t for k in kws): s += pts; why.append(f"role+{pts}"); break
    for kws, pts in ENTRY:
        if any(k in t for k in kws): s += pts; why.append(f"entry+{pts}"); break
    if   any(k in blob for k in HEALTH):  s += 15; why.append("healthtech+15")
    elif any(k in blob for k in CONSULT): s += 14; why.append("consulting+14")
    elif any(k in blob for k in TECH):    s += 12; why.append("tech+12")
    else: s += 6
    loc = (location or "").lower()
    if "london" in loc: s += 8
    elif any(k in loc for k in ["united kingdom","england","uk","cambridge","oxford",
                                "manchester","bristol","edinburgh","remote"]): s += 6
    if date:
        try:
            d = datetime.date.fromisoformat(str(date)[:10])
            age = (TODAY - d).days
            s += 10 if age <= 3 else 8 if age <= 7 else 4 if age <= 14 else 0
            why.append(f"age{age}d")
        except Exception: pass
    return s, why
