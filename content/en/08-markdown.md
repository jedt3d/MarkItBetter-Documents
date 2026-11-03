# The supported Markdown dialect

The released app reads CommonMark plus GFM and a small set of explicit extras. Existing Markdown knowledge carries over, but a construct supported by another editor is not automatically part of MIB.

## Everyday source

```markdown
## Configuration

Use **bold**, *italic*, `inline code`, and ~~obsolete text~~.

> Keep the reason beside the decision.

1. Open the note.
2. Make the change.

- [ ] Review the example
- [x] Save the document
```

Headings, lists, quotes, links, images, fenced/indented code, and horizontal rules use normal Markdown. GFM adds pipe tables, strikethrough, task lists, and autolinks. [Tasks](preview.html#interactive-task-lists) can also be toggled directly in PREVIEW.

## Links, images, and anchors

```markdown
[External reference](https://example.com)
[Another note](./decisions.md)
[Configuration section](#configuration)
![Descriptive alt text](./images/architecture.svg)
```

Save the current document before expecting relative references to resolve. Keep local images in its directory or a subdirectory. The released app's local-image access is intentionally scoped; a path climbing outside that directory can fail. Reopen a newly saved document if its relative assets have not acquired a usable base directory.

Heading slugs preserve letters from Thai and Japanese, lower-case where applicable, remove punctuation, and turn spaces into hyphens. Give sections distinct names to make hand-written links predictable. HTTP/HTTPS links open in your browser; relative Markdown links stay in the app.

## Small MIB extras

| Source | Meaning |
| --- | --- |
| `H~2~O` | Subscript |
| `x^2^` | Superscript |
| `[[Ctrl + S]]` | A keyboard chip in PREVIEW |
| `:smile:` | A recognized emoji shortcode |
| `[^note]` and `[^note]: text` | A footnote reference and definition |

Keyboard chips contain literal text, with no nested Markdown; an unclosed or empty chip stays plain. Footnotes use definitions elsewhere in the document, rather than an inline `^[text]` form. The editor can display some extras as plain source even when PREVIEW renders them.

## Code and HTML

A fenced code block's language selects syntax highlighting. Common aliases such as `js`, `ts`, `py`, and `sh` are useful. An unsupported language remains a readable plain code block. Code colors can be changed in [Preferences → Code](preferences.html#code).

`<details>` and `<summary>` provide collapsible content. HTML is sanitized: scripts and event handlers are removed, and embedded active content is restricted. Do not rely on arbitrary JavaScript, iframes, or a pasted web widget working inside a Markdown document.

Inline SVG is supported within the released sanitization limits. Scripted SVG, `foreignObject`, external references, and some `<use>`-based drawings do not survive. A flattened, passive vector export is easier to share reliably.

## Check compatibility before sharing

Mermaid diagrams are **upcoming**; v0.49.0 shows their fenced source as code. Math rendering, wiki-links, and callout/admonition syntax are not part of the released dialect described here. Do not use this guide's website renderer as proof that a syntax extension works in your installed MIB version.

For portable notes, start with ordinary Markdown, check PREVIEW, and open a representative file in the other tool your team uses. Keep the original source when trying a new renderer or extension.
