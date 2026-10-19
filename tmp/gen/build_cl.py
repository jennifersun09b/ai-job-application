# -*- coding: utf-8 -*-
import os
TPL = r"""% Cover letter - {label}
\documentclass[letterpaper,11pt]{{article}}
\usepackage[empty]{{fullpage}}
\usepackage[hidelinks]{{hyperref}}
\usepackage{{titlesec}}
\usepackage[english]{{babel}}
\usepackage{{parskip}}
\usepackage{{setspace}}
\addtolength{{\oddsidemargin}}{{-0.45in}}
\addtolength{{\evensidemargin}}{{-0.45in}}
\addtolength{{\textwidth}}{{0.9in}}
\addtolength{{\topmargin}}{{-.6in}}
\addtolength{{\textheight}}{{1.2in}}
\urlstyle{{same}}
\raggedright
\setstretch{{1.05}}
\pagestyle{{empty}}

\begin{{document}}

\begin{{center}}
    \textbf{{\Huge \scshape Zhuoyan Sun}} \\ \vspace{{3pt}}
    \small +44(0)7422426924 $|$ \href{{mailto:zhuoyansun41@gmail.com}}{{\underline{{zhuoyansun41@gmail.com}}}} $|$
    \href{{https://www.linkedin.com/in/zhuoyan-jennifer-sun-8b6558297}}{{\underline{{Linkedin}}}} $|$
    \href{{https://github.com/jennifersun09b}}{{\underline{{GitHub}}}} $|$
    \href{{https://jennifersun09b.github.io/portfolio/}}{{\underline{{Portfolio}}}}
\end{{center}}
\vspace{{2pt}}\hrule\vspace{{10pt}}

\noindent 21 September 2026

\noindent Hiring Team \\
{company} \\
{city}

\vspace{{6pt}}
\noindent\textbf{{Application for {role}}}

\vspace{{4pt}}
Dear Hiring Team,

{p1}

{p2}

{p3}

{p4}

{p5}

Thank you for considering my application. I would welcome the opportunity to discuss how my experience fits {closing}.

\vspace{{8pt}}
Yours sincerely,

\vspace{{14pt}}
Zhuoyan Sun

\end{{document}}
"""

def build(spec, outdir):
    path = os.path.join(outdir, spec["file"] + ".tex")
    open(path, "w").write(TPL.format(**spec))
    return path
