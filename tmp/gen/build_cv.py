# -*- coding: utf-8 -*-
"""Generate tailored CVs on the exact resume2.pdf skeleton (jake-onepage).
Structure is fixed: Education(2) / Work Experience(3 x 3 bullets) /
Project Experience(1 x 3 bullets) / Skills(5 lines). Only text varies."""
import os, sys

PREAMBLE = r"""% Tailored CV - {label}
\documentclass[a4paper,11pt]{{article}}
\usepackage{{latexsym}}
\usepackage[empty]{{fullpage}}
\usepackage{{titlesec}}
\usepackage{{marvosym}}
\usepackage[usenames,dvipsnames]{{color}}
\usepackage{{verbatim}}
\usepackage{{enumitem}}
\usepackage[hidelinks]{{hyperref}}
\usepackage{{fancyhdr}}
\usepackage[english]{{babel}}
\usepackage{{tabularx}}
\ifdefined\pdfgentounicode
  \input{{glyphtounicode}}
  \pdfgentounicode=1
\fi
\pagestyle{{fancy}}
\fancyhf{{}}
\fancyfoot{{}}
\renewcommand{{\headrulewidth}}{{0pt}}
\renewcommand{{\footrulewidth}}{{0pt}}
\usepackage[a4paper,left=1.0cm,right=1.0cm,top=1.2cm,bottom=1.2cm]{{geometry}}
\newlength{{\cvgap}}\setlength{{\cvgap}}{{{cvgap}}}
\urlstyle{{same}}
\raggedright
\setlength{{\tabcolsep}}{{0in}}
\titleformat{{\section}}{{
  \vspace{{-1pt}}\scshape\raggedright\large
}}{{}}{{0em}}{{}}[\color{{black}}\titlerule \vspace{{-3.8pt}}]
\newcommand{{\resumeItem}}[1]{{
  \item\small{{
    {{#1 \vspace{{-0.8pt}}}}
  }}
}}
\newcommand{{\resumeSubheading}}[4]{{
  \vspace{{-2pt}}\item
    \begin{{tabular*}}{{0.97\textwidth}}[t]{{l@{{\extracolsep{{\fill}}}}r}}
      \textbf{{#1}} & #2 \\
      \textit{{\small#3}} & \textit{{\small #4}} \\
    \end{{tabular*}}\vspace{{-6pt}}
}}
\renewcommand\labelitemii{{$\vcenter{{\hbox{{\tiny$\bullet$}}}}$}}
\newcommand{{\resumeSubHeadingListStart}}{{\begin{{itemize}}[leftmargin=0.15in, label={{}}]}}
\newcommand{{\resumeSubHeadingListEnd}}{{\end{{itemize}}}}
\newcommand{{\resumeItemListStart}}{{\begin{{itemize}}}}
\newcommand{{\resumeItemListEnd}}{{\end{{itemize}}\vspace{{-3.8pt}}}}

\begin{{document}}

%----------HEADING----------
\begin{{center}}
    \textbf{{\Huge \scshape Zhuoyan Sun}} \\ \vspace{{3pt}}
    \small +44(0)7422426924 $|$ \href{{mailto:zhuoyansun41@gmail.com}}{{\underline{{zhuoyansun41@gmail.com}}}} $|$
    \href{{https://www.linkedin.com/in/zhuoyan-jennifer-sun-8b6558297}}{{\underline{{Linkedin}}}} $|$
    \href{{https://github.com/jennifersun09b}}{{\underline{{GitHub}}}} $|$
    \href{{https://jennifersun09b.github.io/portfolio/}}{{\underline{{Portfolio}}}}
\end{{center}}

%-----------EDUCATION-----------
\section{{\textbf{{Education}}}}
  \resumeSubHeadingListStart
    \resumeSubheading
      {{University College London}}{{Sep 2025 - Present}}
      {{MSc Health Data Science (Distinction Expected)}}{{London $|$ UK}}
      \resumeItemListStart
        \resumeItem{{\textbf{{Core Modules:}} {msc_modules}}}
      \resumeItemListEnd
    \resumeSubheading
      {{Imperial College London}}{{Sep 2021 - Jun 2024}}
      {{BSc Biological Sciences (Upper Second Class Honor)}}{{London $|$ UK}}
      \resumeItemListStart
        \resumeItem{{\textbf{{Core Modules:}} {bsc_modules}}}
      \resumeItemListEnd
  \resumeSubHeadingListEnd

%-----------EXPERIENCE-----------
\vspace{{\cvgap}}
\section{{\textbf{{Work Experience}}}}
  \resumeSubHeadingListStart
    \resumeSubheading
      {{Data Analyst Intern}}{{Sep 2026 - Present}}
      {{TikTok UK}}{{London $|$ UK}}
      \resumeItemListStart
{tiktok}
      \resumeItemListEnd
    \resumeSubheading
      {{Data Scientist Intern}}{{Jul 2026 - Sep 2026}}
      {{DS Digital Technology}}{{Hangzhou $|$ CN}}
      \resumeItemListStart
{dsd}
      \resumeItemListEnd
    \resumeSubheading
      {{Data Analyst Intern}}{{May 2025 - Aug 2025}}
      {{Ipsos Strategy3}}{{Beijing $|$ CN}}
      \resumeItemListStart
{ipsos}
      \resumeItemListEnd
  \resumeSubHeadingListEnd

%-----------PROJECTS-----------
\vspace{{\cvgap}}
\section{{\textbf{{Project Experience}}}}
  \resumeSubHeadingListStart
    \resumeSubheading
      {{{proj_title}}}{{Dec 2025 - Sep 2026}}
      {{University College London}}{{London $|$ UK}}
      \resumeItemListStart
{proj}
      \resumeItemListEnd
  \resumeSubHeadingListEnd

%-----------SKILLS-----------
\vspace{{\cvgap}}
\section{{\textbf{{Skills}}}}
 \begin{{itemize}}[leftmargin=0.15in, label={{}}]
    \small{{\item{{
     \textbf{{Programming}}{{: {s_prog}}} \\
     \textbf{{{s2_head}}}{{: {s2}}} \\
     \textbf{{{s3_head}}}{{: {s3}}} \\
     \textbf{{Data and Tools}}{{: {s_tools}}} \\
     \textbf{{Languages}}: English (fluent), Mandarin (native)
    }}}}
 \end{{itemize}}

\end{{document}}
"""

def bullets(items):
    return "\n".join("        \\resumeItem{%s}" % b for b in items)

def build(spec, outdir):
    body = PREAMBLE.format(
        label=spec["label"], cvgap=spec.get("cvgap", "0pt"),
        msc_modules=spec["msc_modules"], bsc_modules=spec["bsc_modules"],
        tiktok=bullets(spec["tiktok"]), dsd=bullets(spec["dsd"]),
        ipsos=bullets(spec["ipsos"]), proj_title=spec["proj_title"],
        proj=bullets(spec["proj"]), s_prog=spec["s_prog"],
        s2_head=spec["s2_head"], s2=spec["s2"],
        s3_head=spec["s3_head"], s3=spec["s3"], s_tools=spec["s_tools"])
    path = os.path.join(outdir, spec["file"] + ".tex")
    open(path, "w").write(body)
    return path
