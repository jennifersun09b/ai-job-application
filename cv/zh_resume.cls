% zh_resume.cls -- Chinese resume class providing the commands used by the
% \logosection / \datedline template (\name, \contactInfo, \dateRange,
% \tripleInfo, \biInfo). Compile with XeLaTeX / tectonic.
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{zh_resume}[2026/09/26 Chinese resume class]

\LoadClass[10pt]{article}
\AtBeginDocument{\fontsize{10.5pt}{13.5pt}\selectfont}

\RequirePackage[a4paper, left=1.4cm, right=1.4cm, top=1.0cm, bottom=1.0cm]{geometry}
\RequirePackage{xeCJK}
\RequirePackage{fontawesome5}
\RequirePackage{enumitem}
\RequirePackage{titlesec}
\RequirePackage{xcolor}
\RequirePackage[hidelinks]{hyperref}

% ---- Fonts ----
\setCJKmainfont{Songti SC}[BoldFont = Songti SC Bold, ItalicFont = Songti SC]
\xeCJKsetup{CJKecglue={\hskip 0.2em plus 0.1em}}
\linespread{1.0}

% ---- Page ----
\pagestyle{empty}
\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}
\raggedright
\urlstyle{same}

\definecolor{accent}{HTML}{1F3A5F}

% ---- Lists ----
\setlist[itemize]{leftmargin=1.4em, topsep=1pt, itemsep=0pt, parsep=0.5pt, label={\small\textbullet}}
\setlist[itemize,2]{label={\tiny$\circ$}}

% ---- Header ----
\newcommand{\name}[1]{%
  \centerline{\Huge\bfseries #1}%
  \vspace{1.0ex}}

\newcommand{\contactInfo}[3]{%
  \centerline{\small
    \faPhone*\ #1 \quad
    \faEnvelope\ \href{mailto:#2}{#2} \quad
    \faLink\ \href{#3}{#3}}%
  \vspace{0.4ex}}

% ---- Sections ----
\newcommand{\logosection}[2]{%
  \vspace{0.8ex}%
  {\large\color{accent}\makebox[1.7em][l]{#1}\textbf{#2}}\par
  \vspace{-0.9ex}{\color{accent}\rule{\linewidth}{0.6pt}}\par
  \vspace{0.3ex}}

% ---- Entries ----
\newcommand{\datedline}[2]{\par #1 \hfill #2 \par}
\newcommand{\dateRange}[2]{#1 -- #2}
\newcommand{\biInfo}[2]{#1 \enspace{\color{gray}|}\enspace #2}
\newcommand{\tripleInfo}[3]{#1 \enspace{\color{gray}|}\enspace #2 \enspace{\color{gray}|}\enspace #3}
