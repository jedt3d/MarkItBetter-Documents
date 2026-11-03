# Slash menu and snippet fields

The slash menu inserts ordinary Markdown. Several entries include fields that you fill with Tab, which is useful for links, code blocks, tables, and other structures with repeated punctuation.

## Open, filter, and insert

1. In EDIT, type `/` at the start of a line or after whitespace.
2. Type part of a block name to filter across categories, or use Left/Right on the tab row.
3. Use Down to enter the block grid, arrows to move, and Enter to insert. Mouse selection also works.
4. The chosen block replaces the trigger slash and returns focus to the editor.

Esc closes the menu while leaving the typed slash. Typing inside an ordinary URL or identifier is not the same as opening the menu from a supported trigger position.

The tabs are **Essential**, **Basic**, **Lists**, **Media & Code**, and **Advanced**. Essential adapts to local insertion frequency and starts with a useful default selection. It is not a custom snippet library or a pinning interface in v0.49.0.

## Fill the fields

For **Link**, type the link label, press Tab, type the URL, and Tab out. **Shift+Tab** returns to an earlier field. A final Tab leaves the link with the caret after a space so you can continue the sentence.

For **Image**, the order is alt text, then path. For **Code block**, it is language, then body. For **Table**, the initial fields walk through the two headers and body cells. Esc ends active snippet navigation; a subsequent Esc returns to PREVIEW when no other interaction owns it.

## Copyable examples

These are finished Markdown examples. Copy one into a document, or build the same structure from the slash menu. Field markers such as `${text}` are implementation syntax; you do not write them into the final document.

### Link

```markdown
[API reference](https://example.com/api)
```

### Image reference

This is a source example only. Replace the path with a file in your saved document's project; the guide does not display a screenshot or image here.

```markdown
![Architecture diagram](./images/architecture.svg)
```

### Code block

````markdown
```ts
const status = "ready";
console.log(status);
```
````

### Table

```markdown
| Endpoint | Method | Purpose |
| --- | --- | --- |
| /health | GET | Service status |
| /notes | POST | Create a note |
```

### Collapsible content

```markdown
<details>
<summary>Deployment checklist</summary>

- [ ] Review configuration
- [ ] Run checks
- [ ] Record the version

</details>
```

Keep blank lines around Markdown inside the HTML wrapper. Raw HTML still follows the app's sanitization rules.

### Footnote

```markdown
The decision preserves portable Markdown.[^decision]

[^decision]: Record the reason and the date in the project note.
```

## When Tab does something else

Tab navigation depends on active fields. After you finish or cancel the snippet, the inserted text is regular source; Tab generally returns to indentation behavior. At the final cell of a table's final body row, a separate table command can append a row. See [Tables](tables.html) before expecting Tab to act like a spreadsheet in every cell.

The app also provides simple insertions for headings, quotes, dividers, lists, HTML blocks, and comments. Custom Smart Snippets, arbitrary variable expansion, and an editable Essential ranking are not features of the released slash menu.
