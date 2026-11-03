# MarkItBetter user guide

English, Thai and Japanese editions of the full user guide, using the approved
Reference theme.

**Live:** <https://jedt3d.github.io/MarkItBetter-Documents/>

- [English](reference/en/index.html)
- [ภาษาไทย](reference/th/index.html)
- [日本語](reference/ja/index.html)

Each edition contains fifteen complete chapters: installation, the MIB workflow,
files, navigation/search, editing, slash snippets, tables, supported Markdown,
Mermaid, preview/source navigation, **Preferences**, appearance, practical recipes,
keyboard reference, and troubleshooting. Language switching keeps the current
chapter. The home page and chapter navigation work without JavaScript.

## Release boundaries

Released instructions target public **v0.49.0**, checked on 4 November 2026.
The major Mermaid chapter distinguishes reviewed development behavior from the
next viewer revision. Neither is represented as released in v0.49.0. It includes
family coverage, source/title behavior, viewing and Find, international labels,
limits, errors and recovery, plus copyable flowchart, sequence, journey and ER
examples.

The app source repository is private. Verification uses the immutable release tag
and reviewed development revisions; private source files and working-tree edits
are not copied into this public repository. Only newly written user-facing prose,
synthetic examples and licensed web assets are published.

## No screenshots in this edition

Screenshots and the old design-preview images have been removed from the current
site. They are deferred until the open app issues have been revised. The inline
Mermaid examples are generated vector diagrams, not screenshots. Their zoom,
pan, Fit All and browser-content maximize controls belong to this guide and are
explicitly distinguished from the app's feature availability.

## Typography

Local IBM Plex Sans for Latin, Sans Thai Looped for Thai reading text and emphasis,
Sans Thai for large Thai headings, Sans JP for Japanese, and Mono for code and the
price. Font licences are retained in [assets/licenses](assets/licenses/NOTICE.txt).
Heading line-height is unitless: at least 1.2, with 1.4 for Thai/Japanese. The reader
can use normal browser zoom; tables and source blocks contain their own overflow.

Price **$13** and **free upgrades for life** are owner-supplied copy. No currency
conversion, checkout destination, subscription or activation process is invented.

## Edit and build

Use Node 22 or later. The only build dependency is MIT-licensed `marked@17.0.5`,
pinned in the lockfile; no Markdown or Mermaid JavaScript runtime ships to readers.

```sh
npm ci
npm run build
python3 -m http.server 4177 --bind 127.0.0.1
```

Open <http://127.0.0.1:4177/>. Edit chapter Markdown under `content/en`, `content/th`
and `content/ja`. `content/guide.json` defines the common chapter order and interface
copy. A heading suffix such as `{#content-width}` sets a stable cross-language
anchor in the generated site. Source examples remain copyable without rewriting
their text.

`npm run build` writes the static chapter pages, guide homes, contents files, and
redirects from the retired Edition/comparison routes. Keep all three editions in
sync when changing a feature or availability statement.

## Regenerate diagram examples

`content/examples.json` is the source for nine localized vector examples. Ordinary
builds use the committed SVGs. To regenerate them, serve the site locally and run:

```sh
MERMAID_JS=/path/to/mermaid-11.17.2/mermaid.min.js node tools/render_diagrams.mjs
npm run build
```

The renderer uses the existing `puppeteer-core` installation under
`HALLMARK_SKILL` (default `~/.agents/skills/hallmark`) and Chrome. Set `CHROME_PATH`
for another Chrome location. The Mermaid bundle is an authoring input, not a
published runtime. It renders trusted, synthetic sources after fonts are ready.

## Verify and publish

With the local server running, `npm run check` validates links/anchors, complete
editions, fonts, heading spacing, copy behavior, diagram controls, and content with
JavaScript disabled. Browser checks use the same existing Puppeteer/Chrome setup.
`GUIDE_BASE_URL` selects the deployed site for live verification; reports go under
ignored `.hallmark/`. `GUIDE_CAPTURE=1` retains internal inspection captures only.

Pages publishes the root of `main`. `.nojekyll` skips Jekyll processing; no custom
build workflow is required. Build and verify locally, inspect the staged files,
then push the static files and source. Confirm the deployed commit and live
behavior after publication. This repository does not build or release the MIB app.
