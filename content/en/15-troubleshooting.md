# Troubleshooting and availability

Start with the installed version, the current mode, and a small example. A report that says “v0.49.0, EDIT, after inserting a Link snippet” is much easier to act on than “the keyboard stopped working.”

## A key does something unexpected

Close the current menu or search interaction and try again with the document focused. Esc may finish a snippet before it can return to PREVIEW. Tab may indent after snippet fields have ended. PREVIEW's `i` uses the selected text when possible and otherwise appends; use double-click for a precise word correction.

Check the [context-sensitive shortcuts](shortcuts.html#focus-sensitive-keys), the operating system's modifier handling, and IME composition. Preserve an example before trying repeated Replace All or large structural edits.

## A file will not open or save

Confirm that it is a text file and that the destination is writable. An image, PDF, archive, or video should not be opened as Markdown. An untitled document needs a Save As location. If a file was deleted or moved outside MIB, verify its current path before saving.

Keep the editor open when saving fails. Copy important text to another safe destination, retain the error message, and avoid discarding the buffer until the saved copy is confirmed. After a successful save, reopen a copy if you need to verify what is on disk.

## Local images or links are missing

Save the document to a real project directory, put the asset in that directory or a subfolder, and check filename case and Markdown syntax. A relative path depends on the current document's folder. Reopen the document after a first Save As if its relative assets still do not resolve.

The released local-image scope can reject paths outside the document directory. For a useful support example, provide a tiny folder with a sample `.md` file and a harmless asset using a simple relative path. Do not send a private project just to demonstrate a broken link.

## Text is crowded or a setting seems ignored

Check the relevant mode gate in [Preferences](preferences.html). Editor line height and preview CSS are different layers. Inspect real Thai/Japanese lines after changing fonts, keep reading text legible, and avoid fixed line heights smaller than the chosen font.

A loaded custom stylesheet can override theme pickers. Use **Clear CSS** to inspect the baseline, then restore the smallest needed rule. If preview width resets after opening a different file, that is the released session-override behavior. If a fixed document theme ignores the toolbar's system/light/dark choice, review **Match system appearance**.

## A code block remains plain

Check the fence's language name. Unknown grammars are intentionally readable plain code, and supported highlighting can appear after the initial preview. Use **Preferences → Code** for the code-color family. HTML scripts and active embedded widgets are restricted even when the surrounding Markdown is valid.

## Released versus upcoming

| Availability | What to expect |
| --- | --- |
| Released v0.49.0 | PREVIEW/EDIT, local text files, Favorites/Files, Quick Open/Outline/palette, slash fields, table editing, supported Markdown, Preferences and styles |
| Reviewed Mermaid development work | Centered frames, highlighted Source, app-content maximize/restore, diagram families and international typography; not in v0.49.0 |
| Further Mermaid revision | Fit All, zoom/pan, and hover-revealed actions are under revision; integration/qualification remains pending |
| Outside the released guide | Custom Smart Snippets, arbitrary Mermaid extensions, wiki-link/callout/math rendering, and other unannounced features |

Seeing Mermaid code in v0.49.0 is expected. Consult the [major Mermaid chapter](mermaid.html) for preparation and compatibility, and check actual release notes before treating an upcoming capability as installed.

## Prepare a useful report

Record the app version, OS and architecture, current mode, exact steps, expected result, actual result, and any visible error. Reduce the source to the smallest document that still reproduces the problem. For typography, retain the actual characters and font preset; for a diagram, retain its exact fence and configuration.

Use your official support channel and remove secrets, personal paths, access tokens, and private document content from examples. Update through the official distribution channel when a release addresses the problem, then retry the same minimized example.
