# -*- coding: utf-8 -*-
"""Cover letter builder taking a variable-length list of paragraphs."""
import os
import re

# f-ligatures (ff, fi, fl) render as single U+FB0x glyphs under tectonic/XeTeX and
# garble words like "efficiency" for ATS parsers. Break them with a zero-width
# kern. Applied to paragraph prose only, never to the template.
def _nolig(t):
    return re.sub(r"f(?=[fil])", r"f\\kern0pt ", t)

HEAD = r"""% Cover letter - @@label@@
\documentclass[letterpaper,11pt]{article}
\usepackage[empty]{fullpage}
\usepackage[hidelinks]{hyperref}
\usepackage[english]{babel}
\usepackage{parskip}
\setlength{\parskip}{6pt}
\usepackage{setspace}
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{0.95in}
\addtolength{\topmargin}{-.80in}
\addtolength{\textheight}{1.7in}
\urlstyle{same}
\raggedright
\setstretch{1.0}
\pagestyle{empty}
\begin{document}

Dear Hiring Manager,

"""
TAIL = r"""
\vspace{2pt}
Yours sincerely,

\vspace{8pt}
Zhuoyan Sun

\end{document}
"""
def build(spec, outdir):
    body = HEAD.replace("@@label@@", spec["label"])
    body += "\n\n".join(_nolig(p) for p in spec["paras"])
    body += "\n" + TAIL
    if spec.get("center"):
        body = body.replace("\\begin{document}", "\\begin{document}\n\\vspace*{\\fill}", 1).replace("\\end{document}", "\\vspace*{\\fill}\n\\end{document}", 1)
    p = os.path.join(outdir, spec["file"] + ".tex")
    open(p, "w").write(body)
    return p
