# Preferences settings

Open **Preferences** with the gear control, **Command+, / Ctrl+,**, or the command palette. The panel is docked beside the document so you can see changes as you make them. Changes apply immediately; there is no separate Apply step for the controls described here.

The released tabs are **Editor**, **Preview**, **Focus**, **Tasks**, **Pop-ups**, **Code**, and **Color**. The opening tab follows your current editing/reading mode. Names in this chapter match the English app UI, including when you read the guide in Thai or Japanese.

## Find a setting and understand mode gates

Use **Search settings…** to filter the settings by label or hint. Clear the search to return to a tab's normal layout. If a specialized control is not shown in the filtered results, open its tab directly.

Editor customization requires **EDIT** so you can see the editor change. Preview customization requires **PREVIEW** for the same reason. A **Switch to Editor mode** or **Switch to Preview mode** button is offered when needed. A disabled or gated section is not necessarily a missing feature.

## Editor

| Setting | Choices/range | What it changes |
| --- | --- | --- |
| Font Family | Mono preset or an available installed monospace family | Source text; keeps indentation and table pipes predictable |
| Font Size | 11–20 px | Editor text size; default 14 px |
| Line height | 1.2–2.2 | Unitless line spacing; default 1.6 |
| Line length limit | 0–120 ch | Source column width; default 80 ch; 0 disables the limit |
| Soft wrap | On/off | Wraps long source lines on screen; default on |
| Indentation | 2, 4, or 8 spaces | Indent size; default 4 |
| Bracket completion | On/off | Inserts/types over matching brackets and quotes; default on |
| Typewriter scrolling | On/off | Keeps the typing line near the middle; default on |
| Highlight current line | On/off | Tints the caret line; default off |
| Show minimap | On/off | Shows the document overview at the right; default off |

The font picker offers monospace families. The preview's IBM Plex/Noto choice is separate; selecting a preview face does not change the editor font.

**Soft wrap and Line length limit are coupled.** Turning wrapping off sets the active limit to zero and lets long lines scroll horizontally. Turning it on restores the remembered column. Setting a positive limit enables wrapping; setting zero disables it. This is one related layout choice, not two independent promises. Soft wrap does not add newlines to the saved text.

For Thai or Japanese editing, start with the default 1.6 line height and increase it if marks or mixed fonts feel crowded. A larger font with a tiny fixed line height is not a good way to create a compact editor. The line-height number here multiplies the current font size.

## Preview

| Control | Purpose |
| --- | --- |
| Match system appearance | Let the document theme follow the resolved light/dark appearance |
| Theme | Select a theme explicitly; choosing one turns system matching off |
| Content width | Wide (90%) or Centered (60%); overrides the automatic rule for the current file-opening session |
| Font family | IBM Plex or Noto preview pairing |
| Body style | Serif or Sans, shown for the Noto family |

Open another file to return content width to the automatic rule. If a width choice seems to reset, first check whether you changed documents. It is not stored as a permanent global width preference.

IBM Plex is a straightforward starting point for looped Thai reading text. Noto body choices have their own design characteristics; inspect actual Thai passages when choosing. The web guide's own looped-font policy is not a new control inside MIB.

## Focus and writing comfort

**Focus mode** dims text outside the active scope while editing. Toggle it with **F8** or in Preferences. **Focus scope** chooses **Line** or **Paragraph**; the default is Paragraph. **Dimmed text opacity** runs from 10% to 90%, with a default of 40%. A higher opacity leaves background text more visible.

Focus mode and **Highlight current line** are separate. You can keep context readable without a line tint, or use the tint without heavy dimming. **Typewriter scrolling** is also independent: it controls caret placement in the viewport, not which text is dimmed. Change one setting at a time when finding a comfortable combination.

## Tasks

**Strike through completed tasks** and **Fade completed tasks** affect their display in both EDIT and PREVIEW. Both default to on. Turning either off does not uncheck the task or remove its source marker. Use these controls when a completed checklist is still useful reference material and needs to remain easy to read.

## Pop-ups

**Pop-up opacity** applies to slash, right-click, and table menus. Its range is 30%–100%; the default is 100%, fully opaque. Raise it if source text behind a menu makes its labels hard to read. This setting changes menu presentation, not document transparency.

## Code

**Code colours** selects **One (Dark / Light)** or **GitHub (Dark / Light)** for fenced code in PREVIEW. The appearance determines the light/dark variant within that family. The code block's surface also follows the document's theme. An unknown language may remain plain even when a code-color family is selected.

## Color

The **Color** tab contains editor colors, syntax colors, preview colors, and custom preview CSS. Editor-side controls require EDIT; preview-side controls require PREVIEW. Change a small number of colors and check ordinary text, selection, links, code, and task states before treating a style as finished.

Editing a built-in color creates a **(Custom)** version instead of overwriting the built-in theme. **Save Style…** and **Load Style…** exchange `.mib_style` files; Editor and Preview styles are distinguished. Keep exported files with your project notes if you want a recoverable copy of a custom appearance.

For CSS, use **Download Starter CSS Template**, edit its supported selectors, and choose **Load CSS…**. **Clear CSS** removes the loaded override. Custom CSS applies after the theme, so it can explain why a color picker appears to have no visible effect. The [Appearance chapter](appearance.html#custom-preview-css) includes a restrained example.

## Save and recover your preferences

Most settings are saved locally as you change them. They are app preferences, not metadata inserted into every Markdown file. Preview width is the session-specific exception described above. There is no account-sync procedure in this released workflow.

If a custom appearance becomes difficult to read, select a built-in theme, clear custom CSS if active, and review the relevant mode's controls. Export useful styles before experimenting. Do not delete app storage just to solve a single color or width problem; use the corresponding controls first.
