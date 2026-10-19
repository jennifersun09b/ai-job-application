# -*- coding: utf-8 -*-
import re
# Companies established as hard-excluded from prior research this session
KNOWN_BAD = {
 "ohogroup": "defence AI client (verified in posting body 2026-09-19)",
}
# Job-board aggregators that republish other people's postings (ghost-job risk)
AGGREGATOR = ["jobright", "hiredbuddy", "talent.com", "jobs via", "jooble", "adzuna"]
# Recruitment agencies / staffing firms - real jobs, but not the direct employer
AGENCY = ["harnham","la fosse","annapurna","marlin selection","data idols","datatech",
 "mthree","skillful","bearcroft","technology & risk recruitment","srg","oho group",
 "cv-bridge","citylife","opus recruitment","radley james","oliver bernard","hays",
 "information tech consultants","quant capital","evidencia","haystack","understanding recruitment",
 "sthree","robert walters","michael page","reed","adecco","randstad","women in data",
 "developrec","fortray","base career","quantum","targetjobs","stott and may","x4"]
PUBLIC_SECTOR = ["public sector","civil service","local authority","ministry","council",
 "hm revenue","home office","cabinet office","dwp","nhs england","nhs trust"]
SENIOR_RE = re.compile(r'\b(senior|sr\.?|lead|principal|staff|head|director|vp|chief|manager|architect)\b', re.I)
INTERNAL_RE = re.compile(r'internal applicant|internal only', re.I)

def flags(title, company, location="", cats=""):
    t=(title or ""); c=(company or "").lower(); blob=f"{t} {c} {cats}".lower()
    out={}
    key=re.sub(r'[^a-z0-9]+','',c)
    if key in KNOWN_BAD: out["exclude"]="known-bad: "+KNOWN_BAD[key]
    if INTERNAL_RE.search(t): out["exclude"]="internal applicants only"
    if SENIOR_RE.search(t):   out["exclude"]="senior/lead title"
    if any(a in c for a in AGGREGATOR): out["exclude"]="job aggregator repost (ghost-job risk)"
    if any(a in c for a in AGENCY):     out["agency"]=True
    if any(p in blob for p in PUBLIC_SECTOR): out["public_sector"]=True
    return out
