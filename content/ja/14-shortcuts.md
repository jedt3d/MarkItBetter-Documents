# キーボードショートカット

操作対象が重要です。同じキーでも、フォーカスに応じてメニュー、検索、スニペット、エディターを操作します。Mac は **Command / Option**、Windows/Linux は通常 **Ctrl / Alt** です。

## ファイルと移動

| 操作 | Mac | Windows/Linux |
| --- | --- | --- |
| ファイルを開く | Command+O | Ctrl+O |
| Save / Save As | Command+S / Command+Shift+S | Ctrl+S / Ctrl+Shift+S |
| Quick Open | Command+P | Ctrl+P |
| Outline | Command+Shift+O | Ctrl+Shift+O |
| Command palette | Command+Shift+P | Ctrl+Shift+P |
| Preferences | Command+, | Ctrl+, |
| Favorites | Command+1 | Ctrl+1 |
| Files | Command+2 | Ctrl+2 |
| 現在のモードで検索 | Command+F | Ctrl+F |
| ウィンドウを閉じる | Command+W | Ctrl+W |

新規作成はボタンかパレットの **New File** を使います。このガイドは未実装のキーを割り当てません。閉じる操作では未保存内容の確認が出る場合があります。

## ソース編集

| EDIT の操作 | Mac | Windows/Linux |
| --- | --- | --- |
| 太字 / 斜体 | Command+B / Command+I | Ctrl+B / Ctrl+I |
| インラインコード | Command+E | Ctrl+E |
| リンク | Command+K | Ctrl+K |
| 取り消し線 | Command+Shift+X | Ctrl+Shift+X |
| 見出し 1–6 | Option+Command+1…6 | Alt+Ctrl+1…6 |
| 下付き / 上付き | Command+Shift+, / Command+Shift+. | Ctrl+Shift+, / Ctrl+Shift+. |
| タスク切替 | Command+Enter | Ctrl+Enter |
| 文書・選択の整形 | Option+Command+F | Alt+Ctrl+F |
| 表のポップアップ | Command+/ | Ctrl+/ |
| HTML コメント | Command+' | Ctrl+' |
| 行の複製 | Command+Shift+D | Ctrl+Shift+D |
| 行を上下へ移動 | Option+Up/Down | Alt+Up/Down |
| インデント / 解除 | Command+] / Command+[ | Ctrl+] / Ctrl+[ |
| 次の一致を選択 | Command+D | Ctrl+D |
| 一致をすべて選択 | Command+Shift+L | Ctrl+Shift+L |
| 行へ移動 | Option+Command+G | Alt+Ctrl+G |
| Undo / Redo | Command+Z / Command+Shift+Z | Ctrl+Z / Ctrl+Shift+Z |
| Focus mode | F8 | F8 |

キーボード設定によって F8 に Fn が必要です。OS、window manager、国際配列が修飾キーを先に受け取る場合もあります。アプリへ届かないときは表示されたコマンドやパレットを使い、システム側の割当てを確認します。

## フォーカスに依存するキー {#focus-sensitive-keys}

| 状態 | キー | 結果 |
| --- | --- | --- |
| 選択がある PREVIEW | `i` | 選択ソースの直後で編集 |
| 有効な選択がない PREVIEW | `i` または `a` | 文書末尾で編集 |
| 操作中の overlay・field がない EDIT | Esc | 保存先があれば保存し PREVIEW へ |
| Slash menu | 矢印 / Enter / Esc | 移動・挿入・終了 |
| 有効なスニペット | Tab / Shift+Tab / Esc | 次・前・フィールド移動終了 |
| 最終データ行の最後のセル | Tab | 行を追加 |
| PREVIEW Find | Enter / Shift+Enter | 次・前の一致 |
| EDIT 検索欄 | Enter / Shift+Enter | 次の一致・検索語に改行 |
| EDIT 置換欄 | Enter | 一件置換 |

IME の入力確定を終えてからモードを切り替えます。フォーカスのある検索欄や Preferences は文書より先にキーを扱います。今後のビューアー固有のフォーカスと復元は [Mermaid の章](mermaid.html)を参照してください。
