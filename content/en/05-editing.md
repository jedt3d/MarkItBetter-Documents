# Edit with precision

EDIT mode gives you the Markdown source, including its delimiters, links, and code fences. Use direct selection and text commands when a change needs to be exact, then return to PREVIEW to inspect the result.

## Formatting shortcuts

Select text and use **Command+B / Ctrl+B** for bold, **Command+I / Ctrl+I** for italic, or **Command+E / Ctrl+E** for inline code. Repeating a toggle on already wrapped text removes that formatting. **Command+K / Ctrl+K** creates a link, using the selection as its label and selecting the URL field.

Use **Option+Command+1…6 / Alt+Ctrl+1…6** for heading levels. Repeating the current level removes it. **Command+Shift+X / Ctrl+Shift+X** toggles strikethrough; **Command+Enter / Ctrl+Enter** cycles a line into an unchecked task, a checked task, and back to unchecked.

## Change several places at once

Select an identifier, then press **Command+D / Ctrl+D** to add its next occurrence to the selection. **Command+Shift+L / Ctrl+Shift+L** selects matching occurrences. Review the selections before typing: every active selection is changed together.

On macOS, Option-click adds a caret and Option-drag creates a rectangular selection. The corresponding Alt gestures are described in the [keyboard reference](shortcuts.html); some desktop environments intercept Alt-mouse actions before an app receives them. Rectangular selection is most predictable with a monospace editor font and short, visible lines.

Double-click selects a word. Double-click in leading whitespace selects a line; triple-click selects a Markdown block. On a heading, triple-click selects its section through the next heading of the same or higher level. These larger selections are useful for reorganizing a note, but inspect the selected extent before cutting.

## Move and format source

**Option+Up/Down / Alt+Up/Down** moves a line. **Command+Shift+D / Ctrl+Shift+D** duplicates it. **Command+' / Ctrl+'** toggles an HTML comment. The table popup uses a different shortcut, **Command+/ / Ctrl+/**.

Use **Option+Command+F / Alt+Ctrl+F** to format the document. With a nonempty selection, MIB formats the selected fragment, expanded to whole lines. Formatting tidies source spacing and table alignment; it does not mean switching to rich-text editing. One Undo reverts the formatting operation.

For constructs whose meaning depends on another part of the document—footnote definitions or a continued list—formatting the whole document gives the formatter the full context. The engines load on first use; if the document changes while they load, a stale result is discarded. Retry formatting after your edits settle.

## Keep display settings separate from file contents

Soft wrap changes how a long source line is displayed. It does not insert a newline into the file. Indentation and Return change actual text. If a document looks different in another editor, inspect the source before assuming soft wrap modified it.

Use [Preferences](preferences.html) to adjust indentation, line height, bracket completion, focus, and typewriter scrolling. Use Undo for text edits; changing a display preference is a separate operation.
