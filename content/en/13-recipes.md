# Recipes for real work

These starting points use portable Markdown and MIB's released editing tools. Copy the source, replace the sample facts, and check PREVIEW. Add Mermaid only when using a development/released version that actually includes its renderer.

## A README people can scan

```markdown
# Notes service

Stores project notes as Markdown files.

## Quick start

1. Copy the example configuration.
2. Set the local storage directory.
3. Start the service and check its health endpoint.

## Commands

| Task | Command |
| --- | --- |
| Run checks | `npm test` |
| Start locally | `npm run dev` |

## References

- [Decisions](./decisions.md)
- [Configuration](#configuration)

## Configuration

Record supported values and a minimal example here.
```

The commands above are sample project commands, not MIB CLI commands. Replace them with commands your project actually provides. Use the Outline to check that the structure tells a useful story before polishing the wording.

## A short architecture decision

```markdown
# ADR: keep notes as Markdown

## Context

People need to review changes in version control and edit offline.

## Decision

Store each note as an ordinary Markdown file.

## Consequences

- Editors can be changed without converting document content.
- Relative links need attention when files move.
- Rendering extensions must be agreed by the team.

## Review

- [ ] Confirm the constraints with the team
- [ ] Link the implementation discussion
```

Use a separate file for each decision once the collection grows. Link related decisions rather than embedding every detail in one diagram. The [Mermaid chapter](mermaid.html) provides a flowchart, sequence, journey, and ER starting point for the upcoming rendering workflow.

## A release checklist with evidence

```markdown
# Release checklist

- [ ] Confirm the version and intended changes
- [ ] Run the project's checks
- [ ] Record failures and unresolved items
- [ ] Review the user-facing notes
- [ ] Verify the distributed files

## Validation

| Check | Result | Evidence |
| --- | --- | --- |
| Unit tests | Pending | Add the actual report |
| Manual workflow | Pending | Record the tested version |
```

Do not convert “Pending” into “Passed” just because a command exists. Replace a status only after the check has actually run. Toggle tasks in PREVIEW while preserving the source as ordinary GFM, and use the table popup to add the evidence rows you need.

## An API note that stays maintainable

Use a table for method/path/purpose, then one heading per endpoint with a request example, expected response, error conditions, and version assumptions. Slash-menu Link, Table, Code block, and Collapsible entries are useful building blocks. Put long sample payloads in code fences and supporting notes in `<details>`.

Before sharing any recipe, save the document, inspect its preview, follow its relative links, and run the example commands against the system they describe. MIB formats the note; it cannot validate an external service's contract for you.
