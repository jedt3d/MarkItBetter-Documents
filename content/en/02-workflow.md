# The MIB workflow

PREVIEW is the reading state; EDIT exposes the Markdown source. Switching modes is part of normal work, so you can correct a sentence without spending the rest of the session inside the editor.

## Enter the source where you need it

For a precise correction, **double-click a word in PREVIEW**. MIB enters EDIT and selects the corresponding source word. Double-clicking whitespace places the caret near the preceding word. This is useful when a rendered link, list item, or paragraph has hidden Markdown punctuation around it.

The released preview keyboard behavior needs a little care:

| Action in PREVIEW | Result |
| --- | --- |
| Select text, then press `i` | Enter EDIT just after the selected text's source position |
| Press `i` with no usable selection | Enter EDIT at the document end |
| Press `a` | Enter EDIT at the document end |
| Choose **Switch to EDIT** in the command palette | Resume the editor's existing selection/caret |

If exact placement matters, double-click the word you intend to change. You do not need to estimate its line number from the rendered document.

## Return to reading

Press **Esc** from ordinary EDIT mode to save a document that already has a path and return to PREVIEW near the caret's block. The rendered view follows the place you were working on.

Esc belongs to the currently active interaction first. A slash menu closes before a mode switch. An active snippet ends its field navigation first. A search field closes its search panel first. Finish or dismiss that interaction, then press Esc again to return to PREVIEW. See [Snippets](snippets.html) and [Navigation](navigation.html) for the specific sequences.

## Understand saving

For a document with a filename, MIB saves after a three-second idle period, when leaving EDIT for PREVIEW, and when the editing window loses focus. **Command+S / Ctrl+S** is still useful before moving a file or sharing it.

An untitled buffer stays in memory until you choose a location. Use **Save As…** or the save shortcut and complete the file dialog. Changing modes does not silently choose a filename for you. Closing an unsaved document offers the normal save/discard/cancel decision; a save error is a reason to keep the text open and preserve a copy.

## Try a complete editing cycle

Create a document with this content and save it as `release-notes.md`:

```markdown
# Release notes

The reader comes first.

- [ ] Check the examples
- [ ] Review the wording
```

Return to PREVIEW, double-click **reader**, replace it with **document**, and press Esc. Confirm both the rendered sentence and the saved text. Then toggle a task in PREVIEW: MIB changes the standard `[ ]` / `[x]` marker in the source, rather than storing an application-only task state.

For longer sessions, use [Focus and Typewriter settings](preferences.html#focus-and-writing-comfort) to adjust the editing environment. Those controls change how you work, while the document remains portable Markdown.
