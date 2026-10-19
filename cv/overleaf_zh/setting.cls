%%%% 参考了 https://www.wondercv.com/ 的模板（2026-09 排版与字体优化版）
%%%% 字体：思源黑体 Noto Sans CJK SC（中文）+ Source Sans 3（英文/数字），同一设计体系
%%%% 编译：XeLaTeX
\ProvidesClass{setting}
\LoadClass[10pt]{article}

% disable indent globally
\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}

% use hyperlink for email and url
\usepackage{hyperref}
\usepackage{url}
\hypersetup{hidelinks}
\urlstyle{same}

%%%% 利用tikz来定位照片
\usepackage{graphicx}
\usepackage{tikz}
\usetikzlibrary{calc}

\RequirePackage{xltxtra}
\RequirePackage{xifthen}
\RequirePackage[fixed]{fontawesome5}
\RequirePackage{xcolor}
\RequirePackage[super]{nth}
\usepackage{calc}

%%%% 颜色
\definecolor{ICBlue}{RGB}{0,62,116}      % 主色：标题、图标、分隔线
\definecolor{SubGray}{RGB}{85,85,85}     % 次要信息：日期、地点、院系
\definecolor{SepGray}{RGB}{170,170,170}  % 分隔符

%%%% 字体
\usepackage{fontspec}
\usepackage{xeCJK}
% Source Sans 3（新版 TeX Live / Overleaf）；旧版发行版回退到 Source Sans Pro
\IfFontExistsTF{SourceSans3-Regular.otf}{%
  \setmainfont{SourceSans3}[
    Extension      = .otf ,
    UprightFont    = *-Regular ,
    BoldFont       = *-Semibold ,
    ItalicFont     = *-RegularIt ,
    BoldItalicFont = *-SemiboldIt ,
  ]
}{%
  \setmainfont{SourceSansPro}[
    Extension      = .otf ,
    UprightFont    = *-Regular ,
    BoldFont       = *-Semibold ,
    ItalicFont     = *-RegularIt ,
    BoldItalicFont = *-SemiboldIt ,
  ]
}
\setCJKmainfont{Noto Sans CJK SC}[BoldFont = * Bold]
\setCJKsansfont{Noto Sans CJK SC}[BoldFont = * Bold]
\xeCJKsetup{
  CJKecglue = {\hskip 0.18em plus 0.08em} ,  % 中英文之间统一小间距
}

\usepackage{relsize}
\usepackage{xspace}

\usepackage[
  a4paper,
  left=1.3cm,
  right=1.3cm,
  top=0.9cm,
  bottom=0.7cm,
  nohead
]{geometry}

% 正文 10.5pt（五号），行距在 resume.tex 中由 \baselinestretch 微调
\AtBeginDocument{\fontsize{10.5pt}{14pt}\selectfont}

%%%% 列表
\usepackage{enumitem}
\setlist{noitemsep}
\setlist[itemize]{
  topsep    = 0.15em ,
  itemsep   = 0.1em ,
  parsep    = 0pt ,
  leftmargin= 1.2em ,
  labelsep  = 0.5em ,
  label     = {\raisebox{0.12ex}{\scriptsize\textbullet}} ,
  after     = \vspace{0.45em} ,
}
\setlist[enumerate]{topsep=0.25em, leftmargin=*}

%%%% 章节标题：图标 + 标题 + 主色细线
\usepackage{titlesec}
\titleformat{\section}
  {\color{ICBlue}\fontsize{12.5pt}{15pt}\selectfont\bfseries\raggedright}
  {}{0em}
  {}
  [\vspace{0.15ex}{\color{ICBlue}\titlerule[0.7pt]}]
\titlespacing*{\section}{0pt}{0.6em}{0.35em}

\titleformat{\subsection}
  {\large\raggedright}
  {}{0em}
  {}
\titlespacing*{\subsection}{0cm}{*1}{*0.5}

\newcommand{\logosection}[2]{%
  \section{\texorpdfstring{\makebox[1.45em][l]{#1}}{}#2}%
}

%%%% 经历条目
% 日期区间：不再拉伸“至今”
\newcommand{\dateRange}[2]{#1\,--\,#2}

% 左侧内容 + 右侧日期/地点（右侧统一灰色）
\newcommand{\datedline}[2]{%
  {\par #1 \hfill {\color{SubGray}#2}\par}%
}

% 多项信息之间用灰色竖线分隔
\newcommand{\infosep}{\enspace{\color{SepGray}|}\enspace}
\newcommand{\biInfo}[2]{{#1\infosep #2}}
\newcommand{\tripleInfo}[3]{{#1\infosep #2\infosep #3}}

\newcommand{\role}[2]{%
  {\par \textit{#1} ~ #2 \par}%
  \vspace{0.5ex}%
}

%%%% 页眉：姓名 + 联系方式
\newcommand{\name}[1]{%
  \centerline{\fontsize{22pt}{26pt}\selectfont\bfseries #1}%
  \vspace{0.9ex}%
}

% 第三个必填参数（网址）请填写不带 https:// 的形式，例如 jennifersun09b.github.io/portfolio；页面上显示为 Portfolio 链接
% 可选参数 [..] 追加在联系方式行末尾（如 LinkedIn / GitHub）
\newcommand{\contactInfo}[4][]{%
  \centerline{\small
    {\color{ICBlue}\faPhone*}\ #2\infosep
    {\color{ICBlue}\faEnvelope}\ \href{mailto:#3}{#3}\infosep
    {\color{ICBlue}\faGlobe}\ \href{https://#4}{Portfolio}#1%
  }%
  \vspace{0.35ex}%
}

\newcommand{\basicContactInfo}[2]{%
  \centerline{\small
    {\color{ICBlue}\faPhone*}\ #1\infosep
    {\color{ICBlue}\faEnvelope}\ \href{mailto:#2}{#2}%
  }%
}
