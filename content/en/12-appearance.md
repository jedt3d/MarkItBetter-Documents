# Appearance and reading comfort

The app window, document theme, preview fonts, and fenced-code colors are related but separate choices. Adjust the layer that is causing the problem instead of changing every setting together.

## Window appearance and document themes

The toolbar appearance control cycles the app chrome between **system**, **light**, and **dark**. The toolbar, panels, and dialogs use that appearance. Document panes follow the theme system.

In Preferences, **Match system appearance** lets the panes follow the resolved appearance. Selecting an explicit **Theme** turns matching off. If changing the toolbar appearance leaves the document unchanged, check whether you have deliberately selected a fixed document theme.

## Content width

The automatic rule uses the window and the open side panels:

| Situation | Automatic preview width |
| --- | --- |
| Ordinary/narrow window | Wide (90% of the panel) |
| Wide/fullscreen window, zero or one side panel | Centered (60%) |
| Wide/fullscreen window, both side panels | Wide (90%) |

The wide-window threshold is 75% of the screen width. A manual **Content width** choice lasts until a different file is opened. It is useful for one wide table or technical note; it is not a permanent replacement for the automatic layout.

The upcoming Mermaid viewer is capped by this effective content column. Document width and the diagram's own geometry work together; enlarging one does not necessarily make a compact diagram stretch.

## Choose fonts for the text you actually read

MIB's preview family selector offers IBM Plex and Noto, with a Noto body-style choice. The editor uses its own installed monospace font selection. Test all the scripts in your document, not just a Latin heading.

For this guide, Latin uses **IBM Plex Sans**, Thai reading text uses **IBM Plex Sans Thai Looped**, large Thai headings may use **IBM Plex Sans Thai**, Japanese uses **IBM Plex Sans JP**, and source uses **IBM Plex Mono** with script fallbacks. Body emphasis keeps the looped Thai face. The guide's headings use at least 1.2 times font size, with 1.4 for Thai/Japanese.

These are the guide's typography choices, not an assertion that every corresponding font is installed on every reader's computer or that MIB has a new per-language font panel. In the app, choose its available preset and inspect real paragraphs, combining marks, code, and tables.

## Custom preview CSS

Start from **Preferences → Color → Download Starter CSS Template**. It lists the preview's supported selectors. Save your edits as a CSS file and use **Load CSS…** from the same tab. A small override is easier to understand and reverse than a complete imported website stylesheet.

```css
.preview {
  line-height: 1.8;
}

.preview h1,
.preview h2,
.preview h3 {
  line-height: 1.4;
}

.preview p {
  margin-block: 0.8em;
}
```

Use unitless line height so it scales with the selected font. Keep table and code overflow behavior intact. Prefer the template's theme variables for colors when you want a style to remain useful in both light and dark appearances.

Loaded CSS wins over theme rules. If a picker seems ineffective or a heading becomes crowded, use **Clear CSS** to check the baseline, then reintroduce the relevant rule. Export `.mib_style` files for theme colors and retain your CSS separately; they are different customization materials.
