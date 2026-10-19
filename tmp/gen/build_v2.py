# -*- coding: utf-8 -*-
"""Build CVs from Zhuoyan's own LaTeX source (supplied verbatim 2026-09-28).
The template is her file with @@token@@ placeholders for the parts that get
tailored per application. Everything else - layout, header links, education,
job titles, Project Experience - is hers and must not be edited.

She compiles with pdfLaTeX (Overleaf). Locally we only have tectonic (XeTeX),
which renders f-ligatures as single U+FB0x glyphs that garble words like
"efficiency" for ATS parsers. _nolig() breaks them with a zero-width kern;
it is applied to the tailored prose only, never to the template (which
contains \\fi and other f-sequences).
"""
import os
import re

_DIR = os.path.dirname(os.path.abspath(__file__))
HEAD = open(os.path.join(_DIR, "template_v3.tex")).read()
# template_v4 = resume_2.pdf (2026-10-19): titles without "Intern"
HEAD_V4 = open(os.path.join(_DIR, "template_v4.tex")).read()


def _nolig(t):
    """Insert a zero-width kern before f-ligature pairs so the PDF text layer
    extracts as plain ASCII. 'efficiency' -> 'ef\\kern0pt ficiency'."""
    return re.sub(r"f(?=[fil])", r"f\\kern0pt ", t)


def items(bs):
    return "\n".join("        \\resumeItem{%s}" % b for b in bs)


# LOCKED sections - Zhuoyan's own wording from resume2.pdf. Never reworded per
# application. She corrected this on 2026-09-29 after tailored CVs had drifted.
LOCKED = ("tiktok",)


def _apply_locks(spec):
    """Force locked sections back to the master wording, whatever the spec says."""
    import spec_master
    changed = []
    for k in LOCKED:
        if spec.get(k) != spec_master.SPEC[k]:
            changed.append(k)
            spec = dict(spec)
            spec[k] = spec_master.SPEC[k]
    if changed:
        print("build_v2: restored LOCKED section(s) to master wording: %s" % ", ".join(changed))
    return spec


def build(spec, outdir):
    spec = _apply_locks(spec)
    vals = {}
    for k, v in spec.items():
        if k in ("file", "template"):
            vals[k] = v
        elif isinstance(v, str):
            vals[k] = _nolig(v)
        else:
            vals[k] = [_nolig(b) for b in v]
    for k in ("tiktok", "dsd", "ipsos"):
        vals[k] = items(vals[k])
    vals.setdefault("langs", _nolig("English (fluent), Mandarin (native)"))
    body = HEAD_V4 if spec.get("template") == "v4" else HEAD
    for k in ("msc", "bsc", "tiktok", "dsd", "ipsos",
              "prog", "h2", "s2", "h3", "s3", "tools", "langs"):
        body = body.replace("@@%s@@" % k, vals[k])
    p = os.path.join(outdir, spec["file"] + ".tex")
    open(p, "w").write(body)
    return p
