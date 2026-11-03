# Preferences の設定

歯車、**Command+, / Ctrl+,**、またはコマンドパレットから **Preferences** を開きます。文書の横に配置されるので、変更を見ながら調整できます。ここで説明する設定はすぐに反映され、別の Apply 操作はありません。

公開版のタブは **Editor**、**Preview**、**Focus**、**Tasks**、**Pop-ups**、**Code**、**Color** です。最初に開くタブは現在の編集・閲覧モードに対応します。日本語・タイ語のガイドでも、照合できるよう UI 名は英語を保ちます。

## 設定を探す・対象モードを確かめる

**Search settings…** は設定名や説明を絞り込みます。通常のタブ表示へ戻るには検索を消します。専用の操作が検索結果に出なければ、そのタブを直接開いてください。

Editor の調整には **EDIT**、Preview の調整には **PREVIEW** が必要です。対象モードで変化を見られるようにするためです。違うモードなら **Switch to Editor mode** または **Switch to Preview mode** が表示されます。操作できない部分が必ずしも未実装とは限りません。

## Editor

| 設定 | 選択肢・範囲 | 変更するもの |
| --- | --- | --- |
| Font Family | Mono または利用可能なインストール済み等幅書体 | ソース文字。インデントや表のパイプをそろえる |
| Font Size | 11–20 px | 文字サイズ。既定は 14 px |
| Line height | 1.2–2.2 | 単位なしの行間倍率。既定は 1.6 |
| Line length limit | 0–120 ch | ソース列幅。既定は 80 ch、0 は制限なし |
| Soft wrap | オン・オフ | 画面上の長い行の折返し。既定はオン |
| Indentation | 2・4・8 spaces | インデント幅。既定は 4 |
| Bracket completion | オン・オフ | 対になる括弧・引用符の挿入とタイプオーバー。既定はオン |
| Typewriter scrolling | オン・オフ | 入力行を画面中央付近へ。既定はオン |
| Highlight current line | オン・オフ | カーソル行を着色。既定はオフ |
| Show minimap | オン・オフ | 右側の文書概要。既定はオフ |

Editor の書体ピッカーは等幅書体を扱います。Preview の IBM Plex/Noto は別の設定で、プレビューの変更がソース書体を変えることはありません。

**Soft wrap と Line length limit は連動します。** 折返しをオフにすると有効な制限はゼロになり、長い行を横スクロールできます。再びオンにすると記憶した列へ戻ります。正の幅を設定すると折返しがオン、ゼロでオフになります。画面上の折返しは保存テキストに改行を追加しません。

日本語やタイ語では、まず既定の 1.6 から始め、結合記号や混在書体が窮屈なら広げます。この値は現在の文字サイズに掛かります。文字を大きくして行の高さだけ小さい固定値にする方法は避けます。

## Preview

| 操作 | 目的 |
| --- | --- |
| Match system appearance | 解決されたライト・ダーク表示に文書テーマを追従 |
| Theme | 明示的に選ぶ。選択するとシステム追従はオフ |
| Content width | Wide (90%) / Centered (60%)。現在のファイルを開いている間、自動規則を上書き |
| Font family | IBM Plex または Noto の書体ペア |
| Body style | Noto 選択時の Serif / Sans |

別のファイルを開くと内容幅は自動へ戻ります。設定が戻ったように見えたら、ファイルを切り替えたか確認してください。これは全体に永続する幅設定ではありません。

IBM Plex はループ付きのタイ語本文を読む出発点として使いやすい選択です。Noto の本文スタイルには異なる特徴があるため、実際の文章で確認します。この Web ガイドの書体方針が、MIB に新しい操作を追加するわけではありません。

## Focus と書きやすさ {#focus-and-writing-comfort}

**Focus mode** は編集対象の外を薄くします。**F8** または Preferences で切り替えます。**Focus scope** は **Line** または **Paragraph** で、既定は Paragraph。**Dimmed text opacity** は 10%–90%、既定 40% です。値が高いほど周辺の文字が見えます。

Focus と **Highlight current line** は別です。行を着色せずに文脈を残したり、薄くせず行だけ着色したりできます。**Typewriter scrolling** も独立しており、どこを薄くするかではなく、カーソル行を表示領域のどこへ置くかを変えます。一度に一つずつ調整すると結果の理由が分かります。

## Tasks {#tasks}

**Strike through completed tasks** と **Fade completed tasks** は EDIT と PREVIEW の両方に反映され、どちらも既定はオンです。オフにしてもタスクを未完了にはせず、ソースの marker も消しません。完了済みの項目を参照として読み続けたいときに調整します。

## Pop-ups

**Pop-up opacity** は slash、右クリック、表のメニューに適用します。30%–100% で、既定は不透明な 100%。背後のソースで文字が読みにくければ上げます。文書本体の透明度ではありません。

## Code {#code}

**Code colours** は PREVIEW のコードフェンスに **One (Dark / Light)** または **GitHub (Dark / Light)** を選びます。appearance が明暗の variant を決め、ブロックの面は文書テーマにも従います。未対応の言語は配色を選んでもプレーンのままになる場合があります。

## Color

**Color** にはエディター色、構文色、プレビュー色、カスタム CSS があります。Editor 側には EDIT、Preview 側には PREVIEW が必要です。少しずつ変更し、通常文字、選択、リンク、コード、タスクを見てから完成と判断します。

組込み色の編集は、元を上書きせず **(Custom)** を作ります。**Save Style… / Load Style…** は `.mib_style` をやり取りし、Editor と Preview のスタイルを区別します。復元できるコピーが欲しければ、プロジェクトの記録と一緒に保存します。

CSS は **Download Starter CSS Template** から始め、対応する selector を編集し、**Load CSS…** で読み込みます。**Clear CSS** で上書きを外します。CSS はテーマの後に適用されるので、picker が効かない理由になることがあります。[表示設定](appearance.html#custom-preview-css)に小さな例があります。

## 設定の保存と復元

多くの設定は変更時にローカルへ保存され、Markdown の metadata として各ファイルに書かれるものではありません。Preview 幅は上記のセッション例外です。公開版のこの操作にアカウント同期の手順はありません。

独自スタイルが読みにくくなったら、組込みテーマを選び、有効な CSS を消して該当モードを確認します。実験前に使えるスタイルを export してください。一つの色や幅のためにアプリの保存領域全体を削除する必要はありません。
