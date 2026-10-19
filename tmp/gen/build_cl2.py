# -*- coding: utf-8 -*-
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

\begin{center}
    \textbf{\Huge \scshape Zhuoyan Sun} \\ \vspace{3pt}
\small
+44(0)7422426924 $|$
\href{mailto:zhuoyansun41@gmail.com}{\underline{zhuoyansun41@gmail.com}} $|$
\href{https://www.linkedin.com/in/zhuoyan-jennifer-sun-8b6558297}{\underline{Linkedin}} $|$
\href{https://github.com/jennifersun09b}{\underline{GitHub}} $|$
\href{https://jennifersun09b.github.io/portfolio/}{\underline{Portfolio}}
\end{center}
\vspace{4pt}\hrule\vspace{10pt}

Dear Hiring Team,

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
