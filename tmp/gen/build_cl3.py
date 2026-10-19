# -*- coding: utf-8 -*-
"""Cover letter: no header block, opens 'Dear Hiring Manager', signs off with name only."""
import os
TPL = r"""% Cover letter - @@label@@
\documentclass[letterpaper,11pt]{article}
\usepackage[empty]{fullpage}
\usepackage[hidelinks]{hyperref}
\usepackage[english]{babel}
\usepackage{parskip}
\usepackage{setspace}
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{0.95in}
\addtolength{\topmargin}{-.60in}
\addtolength{\textheight}{1.4in}
\urlstyle{same}
\raggedright
\setstretch{1.0}
\pagestyle{empty}
\begin{document}

Dear Hiring Manager,

@@p1@@

@@p2@@

@@p3@@

@@p4@@

@@p5@@

@@p6@@

@@p7@@

\vspace{6pt}
Yours sincerely,

\vspace{10pt}
Zhuoyan Sun

\end{document}
"""
def build(spec, outdir):
    b = TPL
    for k in ("label","p1","p2","p3","p4","p5","p6","p7"):
        b = b.replace("@@%s@@" % k, spec[k])
    p = os.path.join(outdir, spec["file"] + ".tex")
    open(p, "w").write(b)
    return p
