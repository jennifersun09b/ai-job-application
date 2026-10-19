# Template: jake-onepage

- **Type:** CV
- **Source extension:** .tex
- **Engine/toolchain:** tectonic (XeTeX engine; also compiles with pdflatex on Overleaf)
- **Page limit:** 1 page(s)
- **Page size: A4** (`a4paper`), margins set by `geometry` at 1.0cm left/right and 1.2cm top/bottom. Never go back to `letterpaper` - the candidate applies in the UK and EU.
- **Fonts:** Computer Modern (system font - shipped with every TeX distribution; no bundled fonts)
- **Class/packages:** article 11pt a4paper; latexsym, fullpage, geometry, titlesec, marvosym, color, verbatim, enumitem, hyperref, fancyhdr, babel, tabularx (all standard). The `\pdfgentounicode` ATS hook is guarded with `\ifdefined` so XeTeX/tectonic and pdfLaTeX both work.

## Compile command

    cd cv && tectonic --chatter minimal <file>.tex

(Overleaf equivalent: pdfLaTeX. Local verification: `python3 tools/verify_pdf.py cv/<file>.pdf --pages 1 --contains "zhuoyansun41@gmail.com"`.)

## Style rules

- Section order is fixed: Education, Work Experience, Project Experience, Skills. No profile statement section; the user prefers the original layout.
- Exactly **three bullets** per experience and per project entry. Most recent role first.
- Each bullet <= ~225 characters so it wraps to at most two lines; never let a single word spill onto a third line. Action verb first, one technology name, one outcome or number.
- Dates as ASCII ranges with a single hyphen and space (`Sep 2025 - Sep 2026`, `Jul 2026 - Present`), never `--`.
- Degree in progress must say so: `MSc Health Data Science (Distinction expected)` with the closed date range; BSc carries its classification.
- Location as `City, Country` (`London, UK`; `Hangzhou, China`), commas not bars.
- Skills block: **five lines**, each ending in `\\` so every group starts its own line. Four bold group labels using the posting's own headings where truthful, then a fifth line that is **`\textbf{Languages}: English (fluent), Mandarin (native)` on its own**. Never join Languages onto the fourth line with `$|$` - it reads as a formatting error.

## Filling the page evenly

The page must look evenly filled, not crammed at the top with a gap at the foot, and not so compressed that the lines crowd each other. Two controls do this:

1. **`\cvgap`** - a length declared in the preamble and inserted before every section after the first. After the first clean compile, measure how much of the text block the content actually occupies and set `\cvgap` to roughly a third of the unused height, capped at 30pt. Recompile and confirm the page count is still 1; if it spilled, step `\cvgap` back down.
2. **The vertical rhythm constants** - the six `\vspace` values in `\titleformat{\section}`, the `\titlerule`, `\resumeItem`, `\resumeSubheading`, the `tabular*` trailer and `\resumeItemListEnd`. Four calibrated profiles exist, loosest first:

   | profile | section | titlerule | resumeItem | subheading | tabular\* | listEnd |
   |---------|---------|-----------|------------|------------|-----------|---------|
   | soft    | 4       | -1        | 1.5        | 3          | -4        | -1      |
   | medium  | 1.5     | -2.5      | 0.5        | 1.5        | -5        | -2.5    |
   | snug    | -1      | -3.8      | -0.8       | 0          | -6        | -3.8    |
   | tight   | -4      | -5        | -2         | -2         | -7        | -5      |

   **Pick the loosest profile that still fits on one page**, then set `\cvgap`. Most CVs land on `snug`. A CV that only fits at `tight` is too dense: cut per the order below and retry from `soft` rather than shipping a cramped page.

   Target fill is 96 to 97 percent of the text block. Below about 90 percent the page looks empty and `\cvgap` should be raised.
- British spelling throughout (analysed, modelling, optimisation). No em-dashes, no semicolons in bullets.
- Header must keep email and phone as literal text (ATS); LinkedIn, GitHub and Portfolio as `\href` links.

## Known pitfalls

- `$\times$`, `$\sim$`, `\%`, `\$`, `\&` must be escaped as shown; an apostrophe inside a Python-generated string is safest as `\textquotesingle`.
- If the page overflows, first drop to a tighter rhythm profile (see the table above). If it still overflows at `snug`, cut content in this order: Imperial modules line, then the project bullet least relevant to this posting, then the second Ipsos bullet. Never shrink fonts or margins; `geometry` is already at 1.0cm sides.
- Do not add `\raggedbottom`, and do not expect `\flushbottom` or a bare `\vfill` to spread the content. LaTeX leaves the final page ragged whatever you do, which is exactly why the explicit `\cvgap` length exists.
- Some older CVs were 6-line wrappers that `\input` another CV to inherit its body. Do not create new ones: a wrapper cannot carry its own `\cvgap` or rhythm profile, so it silently inherits a layout tuned for a different document and often spills to two pages. Write each CV as a standalone file.
- The user's generator lives outside the repo at `/Users/jennifersun/Desktop/resume_tex/build3.py`; when `/apply` produces a tailored CV, write the full `.tex` to `cv/` rather than editing the generator.
