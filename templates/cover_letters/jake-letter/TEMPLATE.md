# Template: jake-letter

- **Type:** Cover letter
- **Source extension:** .tex
- **Engine/toolchain:** tectonic (also pdfLaTeX)
- **Page limit:** 1 page(s)
- **Fonts:** Computer Modern (system font, shipped with TeX; matches the jake-onepage CV)
- **Class/packages:** article 11pt letterpaper; fullpage, hyperref, titlesec, babel, parskip, setspace (all standard)

## Compile command

    cd cover_letters && tectonic --chatter minimal <file>.tex

## Style rules

- Header is identical to the CV header so the two documents read as one set.
- Structure follows the user's own letters (see 06-cover-letter-templates.md, "Patterns Observed"): opening, why this company, two experience paragraphs, what I bring, thank-you close. **Prose, no bullet list.**
- Salutation "Dear Hiring Team," or a named person; close with "Yours sincerely," never "Kind regards".
- Body budget **330-380 words**. The user's historic letters run 460-690 words and would overflow; cut experience paragraphs first.
- Every company-specific claim verified independently before it goes in (writing-style rule 5).
- British spelling; no em-dashes; first person, active voice; at most one number per sentence.

## Known pitfalls

- `\hrule` after the header needs the `\vspace` around it or it collides with the name.
- Keep `\setstretch` at 1.05; raising it to fit "looks nicer" pushes the signature to page 2 at 380 words.
- `parskip` is loaded, so do not add blank `\\` lines between paragraphs; a blank line is enough.
