import re, sys, pathlib, subprocess
from pypdf import PdfReader

TH = (29.7 - 2.4) / 2.54 * 72.27
BASE = [
 (r"\\documentclass\[letterpaper,11pt\]\{article\}", r"\\documentclass[a4paper,11pt]{article}"),
 (r"\\addtolength\{\\oddsidemargin\}\{-0\.6in\}\\addtolength\{\\evensidemargin\}\{-0\.6in\}"
  r"\\addtolength\{\\textwidth\}\{1\.2in\}\\addtolength\{\\topmargin\}\{-\.8in\}"
  r"\\addtolength\{\\textheight\}\{1\.75in\}",
  r"\\usepackage[a4paper,left=1.0cm,right=1.0cm,top=1.2cm,bottom=1.2cm]{geometry}"
  "\n\\\\newlength{\\\\cvgap}\\\\setlength{\\\\cvgap}{0pt}"),
 (r"\\raggedbottom", r""),
 (r" \$\|\$ \\textbf\{Languages\}", "\\\\\\\\\n\\\\textbf{Languages}"),
]
LADDER = ["soft","medium","snug","tight"]
PROFILES = {"soft":(4,-1,1.5,3,-4,-1), "medium":(1.5,-2.5,0.5,1.5,-5,-2.5),
            "snug":(-1,-3.8,-0.8,0,-6,-3.8), "tight":(-4,-5,-2,-2,-7,-5)}
SLOTS = [
 (r"(\\titleformat\{\\section\}\{\\vspace\{)[-\d.]+(pt\})",0),
 (r"(\\titlerule \\vspace\{)[-\d.]+(pt\}\])",1),
 (r"(\\resumeItem\}\[1\]\{\\item\\small\{\{#1 \\vspace\{)[-\d.]+(pt\}\}\}\})",2),
 (r"(\\resumeSubheading\}\[4\]\{\\vspace\{)[-\d.]+(pt\})",3),
 (r"(\\end\{tabular\*\}\\vspace\{)[-\d.]+(pt\}\})",4),
 (r"(\\resumeItemListEnd\}\{\\end\{itemize\}\\vspace\{)[-\d.]+(pt\}\})",5),
]
def base_fix(p):
    f=pathlib.Path(p); s=f.read_text()
    if "moderncv" in s: return False
    if "\\cvgap" not in s:
        for a,b in BASE: s=re.sub(a,b,s)
        parts=s.split("\\section{")
        if len(parts)>2: s=parts[0]+"\\section{"+"\\vspace{\\cvgap}\n\\section{".join(parts[1:])
        f.write_text(s)
    return True
def set_profile(p,prof):
    v=PROFILES[prof]; f=pathlib.Path(p); s=f.read_text()
    for pat,i in SLOTS: s=re.sub(pat, lambda m,x=v[i]: f"{m.group(1)}{x}{m.group(2)}", s)
    f.write_text(s)
def set_gap(p,v):
    f=pathlib.Path(p); f.write_text(re.sub(r"(\\setlength\{\\cvgap\}\{)[^}]*(\})",
        lambda m: f"{m.group(1)}{v:.1f}pt{m.group(2)}", f.read_text()))
def build(p):
    r=subprocess.run(["tectonic","--chatter","minimal",pathlib.Path(p).name],cwd="cv",
                     capture_output=True,text=True)
    if r.returncode!=0: return None,0,r.stderr[-250:]
    rd=PdfReader(f"cv/{pathlib.Path(p).stem}.pdf"); ys=[]
    rd.pages[0].extract_text(visitor_text=lambda t,cm,tm,fd,fs: ys.append(tm[5]) if t.strip() else None)
    return len(rd.pages),(max(ys)-min(ys) if ys else 0),None
def drop_imperial(p):
    f=pathlib.Path(p); s=f.read_text(); i=s.find("Imperial College London")
    if i<0: return False
    a=s.find("\\resumeItemListStart",i); b=s.find("\\resumeItemListEnd",a)
    if a<0 or b<0: return False
    f.write_text(s[:a]+s[b+len("\\resumeItemListEnd"):]); return True
def best_profile(tex):
    for prof in LADDER:
        set_profile(tex,prof); set_gap(tex,0)
        pages,span,err=build(tex)
        if err: return None,0,err
        if pages==1: return prof,span,None
    return None,0,"overflow"

rows=[]
for tex in sys.argv[1:]:
    name=pathlib.Path(tex).stem
    if not base_fix(tex): print(f"{name[:46]:46} skipped (moderncv)"); continue
    prof,span,err=best_profile(tex)
    if err and err!="overflow": print(f"{name[:46]:46} FAIL {err[:55]}"); continue
    cut=""
    if prof is None or LADDER.index(prof)>=2:      # snug or tight, or overflowing
        snapshot=pathlib.Path(tex).read_text()
        if drop_imperial(tex):
            p2,s2,e2=best_profile(tex)
            if p2 and (prof is None or LADDER.index(p2)<LADDER.index(prof)):
                prof,span,cut=p2,s2," cut:imperial-modules"
            else:
                pathlib.Path(tex).write_text(snapshot)
                if prof: set_profile(tex,prof); build(tex)
    if prof is None: print(f"{name[:46]:46} OVERFLOW — manual trim needed"); continue
    set_profile(tex,prof)
    gap=max(0.0,min((TH-16-span)/3.0,30.0)); set_gap(tex,gap)
    pages,span,_=build(tex)
    while pages and pages>1 and gap>0:
        gap=max(0.0,gap-4); set_gap(tex,gap); pages,span,_=build(tex)
    print(f"{name[:46]:46} {prof:6} gap={gap:5.1f} fill={span/TH*100:5.1f}% pages={pages}{cut}")
