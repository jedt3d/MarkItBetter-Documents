# Keyboard reference

The context column matters. A key can operate on a menu, search field, snippet, or editor depending on focus. **Command** and **Option** are Mac modifiers; **Ctrl** and **Alt** are their common Windows/Linux counterparts below.

## Files and navigation

| Action | Mac | Windows/Linux |
| --- | --- | --- |
| Open file | Command+O | Ctrl+O |
| Save / Save As | Command+S / Command+Shift+S | Ctrl+S / Ctrl+Shift+S |
| Quick Open | Command+P | Ctrl+P |
| Outline | Command+Shift+O | Ctrl+Shift+O |
| Command palette | Command+Shift+P | Ctrl+Shift+P |
| Preferences | Command+, | Ctrl+, |
| Favorites panel | Command+1 | Ctrl+1 |
| Files panel | Command+2 | Ctrl+2 |
| Find in current mode | Command+F | Ctrl+F |
| Close window | Command+W | Ctrl+W |

Use **New File** from the controls or palette; this guide does not assign an undocumented new-file chord. A close operation can ask about unsaved text.

## Source editing

| Action in EDIT | Mac | Windows/Linux |
| --- | --- | --- |
| Bold / italic | Command+B / Command+I | Ctrl+B / Ctrl+I |
| Inline code | Command+E | Ctrl+E |
| Insert link | Command+K | Ctrl+K |
| Strikethrough | Command+Shift+X | Ctrl+Shift+X |
| Heading 1–6 | Option+Command+1…6 | Alt+Ctrl+1…6 |
| Subscript / superscript | Command+Shift+, / Command+Shift+. | Ctrl+Shift+, / Ctrl+Shift+. |
| Toggle task | Command+Enter | Ctrl+Enter |
| Format document/selection | Option+Command+F | Alt+Ctrl+F |
| Table popup | Command+/ | Ctrl+/ |
| Toggle HTML comment | Command+' | Ctrl+' |
| Duplicate line | Command+Shift+D | Ctrl+Shift+D |
| Move line up/down | Option+Up/Down | Alt+Up/Down |
| Indent / outdent | Command+] / Command+[ | Ctrl+] / Ctrl+[ |
| Next selected occurrence | Command+D | Ctrl+D |
| All selected occurrences | Command+Shift+L | Ctrl+Shift+L |
| Go to line | Option+Command+G | Alt+Ctrl+G |
| Undo / redo | Command+Z / Command+Shift+Z | Ctrl+Z / Ctrl+Shift+Z |
| Focus mode | F8 | F8 |

Function keys may require Fn depending on keyboard settings. Operating systems, window managers, and international layouts can intercept a modifier chord. If a binding never reaches the app, use the visible command or command palette and check the system shortcut configuration; do not assume the document is broken.

## Focus-sensitive keys

| Context | Key | Result |
| --- | --- | --- |
| PREVIEW, selected text | `i` | Edit after the selected source text |
| PREVIEW, no usable selection | `i` or `a` | Edit at document end |
| EDIT, no active overlay/field | Esc | Save an existing-path document and return to PREVIEW |
| Slash menu | Arrows / Enter / Esc | Navigate, insert, or close |
| Active snippet | Tab / Shift+Tab / Esc | Next field, previous field, end navigation |
| Final body cell of final table row | Tab | Append a row |
| PREVIEW Find | Enter / Shift+Enter | Next / previous match |
| EDIT search field | Enter / Shift+Enter | Next match / insert query newline |
| EDIT replace field | Enter | Replace one match |

Finish IME composition before relying on a mode shortcut. A selected search field or open Preferences panel owns its keys before document editing does. See the [Mermaid chapter](mermaid.html) for the separate upcoming viewer's focus and restore behavior.
