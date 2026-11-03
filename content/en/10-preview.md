# Preview and source, connected

PREVIEW is an active reading view. You can follow links, search visible text, toggle tasks, and enter EDIT at a useful source position. The connection matters most when Markdown punctuation makes the source look very different from the result.

## Correct a passage from the rendered document

Double-click the word you want to change. MIB selects the corresponding source word when it can map the rendered text back to the document. Whitespace or a difficult mapping can fall back to a nearby source position; inspect the selected text before replacing it.

After editing, Esc returns to the caret's rendered block. This is more predictable than trying to preserve an absolute scrollbar offset across two representations with different heights. A long code block, expanded details element, or image can make their pixel positions very different.

Keyboard entry from PREVIEW has its own selection behavior, described in [The MIB workflow](workflow.html#enter-the-source-where-you-need-it). It is worth learning the difference between double-clicking a word, selecting text and pressing `i`, and appending with `a`.

## Interactive task lists

```markdown
- [ ] Prepare the release
  - [x] Review the examples
  - [ ] Check the links
```

Click a task control in PREVIEW to update its `[ ]` / `[x]` marker. Toggling a parent cascades to descendants. A parent can display a mixed state when only some children are complete; that state is derived from the children rather than stored as a new Markdown marker.

Use [Preferences → Tasks](preferences.html#tasks) to decide whether completed items fade or have a strikethrough. These are display choices. A teammate opening the file still sees ordinary GFM task lists.

## Read long technical documents

Use the Outline to jump by heading and Find to locate a phrase. Heading and footnote links scroll inside the preview. Collapse a `<details>` block when supporting material is distracting; expand it when you need the exact steps.

Preview content width is automatic by default and responds to the available panel area. A manual width choice in Preferences lasts for the current file-opening session. Changing files restores the automatic rule. See [Content width](appearance.html#content-width) for the 60%/90% choices.

## Check what readers will actually receive

Return to PREVIEW after structural edits to lists, footnotes, tables, or HTML wrappers. Code highlighting may appear after the basic document because grammars are loaded as needed; an unknown language should remain readable plain code.

The same document can render differently in another Markdown tool. Prefer ordinary source for shared notes and explicitly identify any MIB extras. The [upcoming Mermaid viewer](mermaid.html) adds diagram-specific Source, Find, and expansion behavior; those controls do not belong to v0.49.0's ordinary code fences.
