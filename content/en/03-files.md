# Files and working folders

Use **Favorites** for places you revisit and **Files** for browsing the directory you are working in. These panels are navigation tools over real files, so a rename or move changes the filesystem location of the document.

## Set up a working folder

1. Put a small project in its own directory, for example `project-notes`.
2. Add that folder through Favorites, or open a document inside it.
3. Show Favorites with **Command+1 / Ctrl+1** and Files with **Command+2 / Ctrl+2**.
4. Select the folder you want to browse. Use the Files panel to open documents and navigate into subfolders.

The panel layout can be resized. Hide a panel when you need more room for a wide table or diagram. Preview width is also calculated from the available space; [Appearance](appearance.html#content-width) explains why the reading column can change when both panels are open.

## Open by name

**Command+P / Ctrl+P** opens Quick Open. It searches the selected Favorites folder, or otherwise the current document's directory. Type part of a filename or path, use the arrow keys, and press Enter. A filter such as `notes/` narrows the list by folder as well as by filename.

Quick Open is a file finder. It does not search every sentence inside every document. Use [Find](navigation.html#find-in-preview-and-edit) for text in the current document.

## Organize files

Use the new-file/new-folder controls or the corresponding command-palette entries. In Files, the row's context menu offers **Rename…** and **Move to Trash**. Check the selected row before confirming an operation. If the open document is renamed or moved through MIB, its path is updated. If its file is removed, the text can remain in the editor, but it needs **Save As…** to acquire a valid destination again.

The released Files panel also supports dragging a row onto a folder to move it inside. Dragging a row onto Favorites bookmarks it instead. These are different outcomes: bookmark a file when you want quicker access, and move it when you want to change its location.

Use the **Sort** control to organize the listing. Date display and text excerpts are presentation options; sorting by a date does not necessarily mean that date is currently shown. A filter changes the visible list, not the names or contents of the files.

## Keep relative references together

```text
project-notes/
  overview.md
  decisions.md
  images/
    architecture.svg
```

In `overview.md`, a relative document link can be written as `[Decisions](./decisions.md)`. An image can use `![Architecture](./images/architecture.svg)`. Both examples depend on the saved document's directory. Keep the image under that directory for the released local-asset rules.

When reorganizing a project, review its relative links. Moving a file changes the base directory used to interpret them; a correct link before a move may point somewhere else afterward. Keep backups or version-control commits for material you cannot easily recreate.
