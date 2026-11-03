# Guide style and contents review

**Selected theme: Reference.** The [guide home](index.html) uses it by default.
The original [comparison](style-comparison.html) remains available for reference.
This is the approved style draft and proposed chapter plan. The complete guide
is still being written.

| | Reference | Edition |
| --- | --- | --- |
| Character | Cool paper, restrained green, compact reference | Warm paper, restrained rust, editorial reading |
| Navigation | Persistent chapter rail on desktop | Quiet header and a single reading column |
| Best suited to | Looking up commands and moving between tasks | Reading a chapter from beginning to end |
| English | [Preview](reference/en/index.html) | [Preview](edition/en/index.html) |
| ภาษาไทย | [ดูตัวอย่าง](reference/th/index.html) | [ดูตัวอย่าง](edition/th/index.html) |
| 日本語 | [表示](reference/ja/index.html) | [表示](edition/ja/index.html) |

Both use local IBM Plex fonts, looped Thai for reading text, Japanese Plex,
and Plex Mono for code. Both contain the same material: a real Mermaid viewer
capture, working diagram controls, copyable snippet examples, keyboard notes,
and the full proposed chapter plan.

## Mermaid is a major chapter

Chapter 9 contains nine topics: authoring a diagram; names and titles;
highlighted Source; maximize and restore; Find and source navigation;
supported families; international labels; errors and recovery; practical recipes.

The completed viewer is featured prominently as a development preview.
The released guide targets v0.49.0. The screenshot is an actual native MIB
capture, cropped without changing its UI or text. The separate interactive
diagram demonstrates controls for this HTML guide and does not imply that the
app has additional zoom or pan controls.

## Proposed contents

- [English outline](content/TABLE-OF-CONTENTS.en.md)
- [สารบัญภาษาไทย](content/TABLE-OF-CONTENTS.th.md)
- [日本語の目次](content/TABLE-OF-CONTENTS.ja.md)

There are fourteen chapters. The guide assumes familiarity with Markdown and
focuses on MIB workflows, keyboard use, editing, snippet fields, tables, preview,
diagrams, and practical reference material.

## After this review

Reference has been approved. It keeps the chapter index available while reading.
Heading line-height is at least 1.2 times the font size, with 1.4 for Thai and
Japanese headings so wrapped lines have enough room for their glyphs. This
applies at desktop and phone widths.

The next useful capture is the released app's slash menu with active snippet
fields. The full guide should also show preview-to-source navigation, table
editing, and Mermaid expansion and recovery using synthetic documents. Keep
released and upcoming screenshots clearly labelled throughout.

The approved draft is published from `main` to
<https://jedt3d.github.io/MarkItBetter-Documents/>. Subsequent guide content
continues in the selected Reference theme.
