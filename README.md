# MarkItBetter user guide draft

The owner selected **Reference** for the online user guide.
The root page uses that theme; the original two-style comparison remains
available at [style-comparison.html](style-comparison.html).
Audience: developers and power users who already know Markdown.

| Proposal | English | ไทย | 日本語 |
| --- | --- | --- | --- |
| Reference: cool paper and a persistent chapter index | [View](reference/en/index.html) | [ดูตัวอย่าง](reference/th/index.html) | [表示](reference/ja/index.html) |
| Edition: warm paper and a spacious reading column | [View](edition/en/index.html) | [ดูตัวอย่าง](edition/th/index.html) | [表示](edition/ja/index.html) |

The [guide page](index.html) opens Reference. Each language has a
separate edition and a working language switcher. The pages demonstrate style,
navigation, an actual Mermaid-viewer screenshot, interactive diagram controls,
and copyable slash-menu examples. They are not the complete user guide yet.

## Proposed table of contents

- [English](content/TABLE-OF-CONTENTS.en.md)
- [ภาษาไทย](content/TABLE-OF-CONTENTS.th.md)
- [日本語](content/TABLE-OF-CONTENTS.ja.md)

The fourteen-chapter outline gives Mermaid a major chapter with nine detailed
topics. Built-in slash-menu snippets and field navigation are documented;
the deferred custom Smart Snippets system is not presented as shipped.

## Feature and release boundaries

The released guide targets public **v0.49.0**. The completed, independently
reviewed Mermaid viewer is featured as a **development preview**, with its
release boundary stated in the first screen and its chapter. It is not
misrepresented as part of v0.49.0.

The Mermaid card image is a crop of a real retained native MIB capture. Pixels
and UI text have not been repainted. The separate browser diagram demonstrates
guide controls; its zoom/pan controls do not claim additional MIB app controls.
All documents and examples use synthetic content.

Price **$13** and **free upgrades for life** are owner-supplied product copy.
No currency conversion, subscription period, checkout URL or activation flow is
invented.

## Fonts and assets

IBM Plex Sans for Latin; IBM Plex Sans Thai Looped for Thai reading text and
labels; IBM Plex Sans Thai for large Thai headings; IBM Plex Sans JP for
Japanese; IBM Plex Mono for code and the price. Font files are local, with
their SIL Open Font License notices in [assets/licenses](assets/licenses).
The guide does not fetch fonts from a CDN.

Heading line-height is unitless and scales with its font: at least **1.2** for
all headings, **1.4** for Thai and Japanese. Desktop and phone hero overrides
use the same token. A fixed `1.2rem` would be too small for large headings.

## Local preview

```sh
python3 -m http.server 4177 --bind 127.0.0.1
```

Open `http://127.0.0.1:4177/`. The pages are static and also work as files;
clipboard availability follows the browser's secure-context rules.

`python3 tools/build_demo.py` regenerates the Reference home, six localized demo pages and
the three Markdown outlines. `tools/render_diagrams.mjs` prepares the sample
SVGs using the public Mermaid11.17.2 browser bundle named by `MERMAID_JS`;
the published static pages do not need the Mermaid runtime.

## GitHub Pages publication

Site: <https://jedt3d.github.io/MarkItBetter-Documents/>.
Pages publishes the repository root from `main`. The site is already static;
`.nojekyll` skips Jekyll processing, and no custom build workflow is needed.
Push approved changes to `main` to update the site.

The current publication is the approved Reference style draft and proposed
chapter plan, not the complete user guide. Keep development features clearly
marked and refresh release boundaries and screenshots as the guide is completed.
