# Install and get oriented

MarkItBetter (MIB) is a desktop Markdown editor built around a simple rhythm: read the rendered document, enter the source when you need to change it, then return to reading. Your files remain ordinary text. This guide assumes you already understand Markdown and concentrates on the parts of MIB that make everyday work quicker.

The released instructions in this edition target **v0.49.0**. The [Mermaid chapter](mermaid.html) describes upcoming development work separately. A feature appearing in this guide does not make it available in an older installed app.

## Choose the right installer

Use the installer supplied through your official download or purchase channel. Match both the operating system and the processor; an operating-system name alone is not enough.

| Computer | v0.49.0 package |
| --- | --- |
| Mac with Apple Silicon | `MarkItBetter_aarch64.dmg` |
| Mac with Intel processor | `MarkItBetter_x64.dmg` |
| Windows on x64 | `MarkItBetter_0.49.0_x64-setup.exe` |
| Windows on ARM64 | `MarkItBetter_0.49.0_arm64-setup.exe` |
| Debian/Ubuntu on amd64 | `MarkItBetter_0.49.0_amd64.deb` |
| Debian/Ubuntu on arm64 | `MarkItBetter_0.49.0_arm64.deb` |

On macOS, open the disk image and install the app in Applications. On Windows, run the matching installer. On a Debian/Ubuntu system, install the downloaded package with your package manager. For example, from the directory containing the amd64 download:

```sh
sudo apt install ./MarkItBetter_0.49.0_amd64.deb
```

Use the filename you actually downloaded. If the operating system reports an installation or verification problem, check the source and package architecture before retrying. Keep the exact error when asking for help.

## Your first document

1. Launch MIB. A normal launch opens the welcome document in PREVIEW; opening a file through the operating system loads that file instead.
2. Use **Open File…**, the folder control, or **Command+O / Ctrl+O** to open a Markdown file.
3. Read it in PREVIEW. Double-click a word to edit that location, or use the keyboard workflow described in [The MIB workflow](workflow.html).
4. For a new document, choose **New File** from the app's controls or command palette. Save it to a real path before relying on relative images or document links.

MIB opens text and common markup/code files as well as Markdown. A PDF, archive, image, or video is not a text document to edit in MIB. Opening an image as the document and referencing an image from Markdown are different operations.

## Keyboard notation and updates

This guide writes Mac shortcuts with **Command** and **Option**. Most corresponding Windows/Linux bindings use **Ctrl** and **Alt**; the [keyboard reference](shortcuts.html) gives both forms and the relevant context. UI names such as **Preferences** and **Media & Code** remain in English so they match the app.

Check the installed version in **About MarkItBetter** when comparing behavior with the guide. The owner’s stated price is **$13**, with **free upgrades for life**. This guide does not introduce a separate subscription or activation procedure. Keep a copy of your documents and replace the app using the official installer when an update is available.
