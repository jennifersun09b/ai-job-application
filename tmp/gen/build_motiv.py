# -*- coding: utf-8 -*-
"""Build a CV with a short Motivation paragraph under the header.
Used only for employers that ask for no cover letter (e.g. Novonesis)."""
import build_v2

ENLARGE = 2

def build(spec, outdir):
    p = build_v2.build(spec, outdir)
    tex = open(p).read()
    m = build_v2._nolig(spec["motivation"])
    block = ("\n%-----------MOTIVATION-----------\n"
             "\\section{\\textbf{Motivation}}\n"
             "\\vspace{-4pt}\n"
             "{\\small " + m + "}\n"
             "\\vspace{2pt}\n")
    sk = "%-----------TECHNICAL SKILLS-----------"
    if sk in tex:
        tex = tex.replace(sk, "\\enlargethispage{%d\\baselineskip}\n"%ENLARGE + sk, 1)
    anchor = "%-----------EDUCATION-----------"
    assert anchor in tex, "education anchor missing"
    tex = tex.replace(anchor, block + anchor, 1)
    open(p, "w").write(tex)
    return p
