# Navigate without leaving the keyboard

MIB has three useful navigation surfaces: Quick Open for files, the Outline for headings, and the command palette for actions. Their shortcuts look similar but serve different purposes.

## Choose the right surface

| Need | Mac | Windows/Linux |
| --- | --- | --- |
| Open a file dialog | Command+O | Ctrl+O |
| Find a file by name/path | Command+P | Ctrl+P |
| Jump to a document heading | Command+Shift+O | Ctrl+Shift+O |
| Run an app command | Command+Shift+P | Ctrl+Shift+P |

In the searchable overlays, type to filter, move with Up/Down, press Enter to choose, and Esc to dismiss. The command palette includes mode changes, file actions, formatting, panel visibility, and Preferences. Some entries depend on the current mode or whether a document has a path.

The Outline is especially useful for a long technical note with repeated subsections. Search the heading text instead of scrolling through every paragraph. Use the Files panel for folders; the Outline does not replace file navigation.

## Find in PREVIEW and EDIT

**Command+F / Ctrl+F** searches the representation you are viewing.

In **PREVIEW**, the Find bar searches rendered text without taking you into EDIT. Enter advances and Shift+Enter moves backward. Esc closes the bar. This is the right choice when you remember the words a reader sees but not the Markdown punctuation around them.

In **EDIT**, search and replace operate on source. The panel supports case-sensitive matching, regular expressions, single replacement, and Replace All. Enter in the search field advances to the next match; **Shift+Enter inserts a newline into the query** for multiline literal search. It is not the preview's “previous match” shortcut in this context. Use the previous/next buttons when appropriate.

A nonempty single-line editor selection can seed a newly opened search. An invalid regular expression is shown as invalid rather than being applied. Before Replace All, inspect the query, case/regex settings, replacement, and match count. Undo is available, but checking the scope first is safer for a technical document containing similar identifiers.

## Follow links

Links such as `[Configuration](#configuration)` jump to a heading within the preview. Heading anchors use GitHub-style slugs; punctuation is removed and repeated headings receive numbered suffixes. For an important repeated section, give it a distinct heading rather than guessing a duplicate suffix.

Relative Markdown links open the corresponding document in the app. They need a saved current document so there is a directory to resolve against. HTTP/HTTPS links open in the system browser.

## IME and overlay focus

When an overlay has focus, its arrows and Enter belong to that overlay. Close it before expecting the editor's caret to move. With Thai or Japanese input methods, finish composition before using a mode-changing key. MIB uses the command-palette shortcut above; do not substitute a Double-Shift gesture from another editor's muscle memory.
