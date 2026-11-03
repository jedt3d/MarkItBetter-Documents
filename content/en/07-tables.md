# Tables that stay in Markdown

MIB edits GFM pipe tables as text. Structural commands help you change rows and columns without manually moving every separator, and PREVIEW lets you check the result as a reader.

## Create a useful starting table

Choose **Table** from the slash menu and fill the active fields, or paste this source:

```markdown
| Item | Owner | State |
| :--- | :--- | ---: |
| User guide | Docs | Draft |
| API notes | Platform | Ready |
```

The colons specify alignment. They belong in the delimiter row: `:---` is left aligned, `:---:` centered, and `---:` right aligned. The preview can scroll a table that is wider than the reading column.

## Open the table popup

Put the caret in the table and press **Command+/ / Ctrl+/**. The popup offers:

- **Insert Row Above** and **Insert Row Below**.
- **Insert Column Left** and **Insert Column Right**.
- **Delete Row** and **Delete Column**.

Use arrows and Enter, click an item, or press Esc to close. A caret on the blank line immediately above or below a table can be moved into its nearest cell when opening the popup. Check that cell before choosing a structural operation.

The header and delimiter rows are protected from Delete Row. Deleting the last remaining column removes the table. Each structural edit is one undoable change and realigns the edited table while preserving alignment colons.

## Add rows with Tab

At the **last cell of the last body row**, Tab appends a new row and selects its first field. Fill it, advance through its fields, and repeat at its end to continue adding rows.

This special behavior does not turn every existing table cell into spreadsheet navigation. Active snippet fields have their own Tab/Shift+Tab behavior; elsewhere Tab may indent. If you are outside an active field sequence, move the caret deliberately or use the popup.

An appended row may initially look unaligned in source. Use **Format Document** to align the source again. Formatting the whole document is separate from the popup's immediate, table-only realignment.

## Protect data while editing

Use inline code for identifiers and escape a literal pipe as `\|` where needed. Preview a table after changes to links or code containing punctuation. A monospace source font helps pipes line up, but text width can still differ for mixed scripts; rendered meaning matters more than visual spaces in the editor.

For numeric tables, keep a consistent number format and right-align the numeric column. MIB is a Markdown editor: the table does not calculate formulas or update financial values for you. Keep source calculations in the tool that owns them, then write the values you intend to document.
