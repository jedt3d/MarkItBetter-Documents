#!/usr/bin/env python3
"""Build the review-only static guide proposals. No deployment or app changes."""
from pathlib import Path
import html
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
HERO_ONLY = '--hero-only' in sys.argv
esc = html.escape

CHAPTERS = [
 ('workflow', ['The MIB workflow','เวิร์กโฟลว์ของ MIB','MIB のワークフロー'],[
  ['Preview first; i to edit; Escape to read','Autosave, untitled files and precise preview-to-source navigation'],
  ['เริ่มจากโหมดอ่าน กด i เพื่อแก้ไข และ Esc เพื่อกลับมาอ่าน','การบันทึกอัตโนมัติ ไฟล์ที่ยังไม่ตั้งชื่อ และการไปยังต้นฉบับจากพรีวิว'],
  ['プレビューを起点に、i で編集、Esc で読む','自動保存、未保存ファイル、プレビューからソースへの移動']]),
 ('files', ['Files and working folders','ไฟล์และโฟลเดอร์งาน','ファイルと作業フォルダー'],[
  ['Open, save, tabs, recent files and Favorites','Quick-open and local Markdown links'],
  ['เปิดและบันทึกไฟล์ แท็บ ไฟล์ล่าสุด และรายการโปรด','เปิดไฟล์อย่างรวดเร็วและใช้ลิงก์ Markdown ภายในเครื่อง'],
  ['開く、保存、タブ、最近使ったファイル、お気に入り','クイックオープンとローカル Markdown リンク']]),
 ('navigation', ['Navigate without leaving the keyboard','นำทางด้วยคีย์บอร์ด','キーボードで移動する'],[
  ['Command palette, heading outline and quick-open','Find in preview; find and replace in the editor'],
  ['แถบคำสั่ง สารบัญหัวข้อ และการเปิดไฟล์อย่างรวดเร็ว','ค้นหาในพรีวิว รวมถึงค้นหาและแทนที่ในโหมดแก้ไข'],
  ['コマンドパレット、見出しアウトライン、クイックオープン','プレビュー内検索とエディターの検索・置換']]),
 ('editing', ['Edit with precision','แก้ไขข้อความอย่างแม่นยำ','正確に編集する'],[
  ['Multi-cursor, rectangular selection and line operations','Focus mode, formatting and undo'],
  ['หลายเคอร์เซอร์ การเลือกแบบคอลัมน์ และการจัดการบรรทัด','โหมดโฟกัส การจัดรูปแบบต้นฉบับ และการเลิกทำ'],
  ['複数カーソル、矩形選択、行操作','フォーカスモード、整形、元に戻す']]),
 ('snippets', ['Slash menu and snippet fields','เมนู / และช่องกรอกใน snippet','スラッシュメニューと入力フィールド'],[
  ['Insert links, images, code, tables and collapsible blocks','Tab and Shift+Tab through fields; Escape finishes'],
  ['แทรกลิงก์ รูปภาพ โค้ด ตาราง และบล็อกพับเก็บได้','ใช้ Tab และ Shift+Tab เลื่อนช่องกรอก แล้วกด Esc เพื่อจบ'],
  ['リンク、画像、コード、表、折りたたみブロックを挿入','Tab と Shift+Tab で移動し、Esc で終了']]),
 ('tables', ['Tables that stay in Markdown','จัดการตารางใน Markdown','Markdown のまま表を編集する'],[
  ['Caret-anchored row and column commands','Tab to add a row; format to align the source'],
  ['เพิ่มหรือลบแถวและคอลัมน์จากเมนูข้างเคอร์เซอร์','กด Tab เพื่อเพิ่มแถว แล้วจัดรูปแบบให้ต้นฉบับเรียงตรงกัน'],
  ['カーソル位置から行・列を操作','Tab で行を追加し、整形でソースをそろえる']]),
 ('markdown', ['The supported Markdown dialect','รูปแบบ Markdown ที่รองรับ','対応する Markdown 記法'],[
  ['Tasks, footnotes, highlights, code and collapsible content','Working examples and safe HTML limitations'],
  ['งาน เชิงอรรถ ไฮไลต์ โค้ด และเนื้อหาพับเก็บได้','ตัวอย่างที่ใช้ได้จริงและข้อจำกัดของ HTML ที่ปลอดภัย'],
  ['タスク、脚注、ハイライト、コード、折りたたみ','動作例と安全な HTML の制限']]),
 ('preview', ['Preview and source, connected','พรีวิวที่เชื่อมกับต้นฉบับ','プレビューとソースをつなぐ'],[
  ['Reading width, panels, task checkboxes and source navigation','Move between reading and editing without losing your place'],
  ['ความกว้างพื้นที่อ่าน แผงข้อมูล ช่องทำเครื่องหมาย และตำแหน่งต้นฉบับ','สลับอ่านและแก้ไขโดยไม่หลงตำแหน่ง'],
  ['読み幅、パネル、タスクチェック、ソース位置への移動','読み取りと編集を、位置を保ったまま切り替える']]),
 ('mermaid', ['Diagram workflows with Mermaid','สร้างและอ่านแผนภาพด้วย Mermaid','Mermaid で図を扱う'],[
  ['Diagram cards, titles, highlighted Source and maximize/restore','Families, international labels, Find, errors and compatibility limits'],
  ['กรอบแผนภาพ ชื่อ Source พร้อมสีไวยากรณ์ และการขยายหรือคืนขนาด','ชนิดแผนภาพ ข้อความหลายภาษา การค้นหา ข้อผิดพลาด และข้อจำกัด'],
  ['図のカード、タイトル、構文強調された Source、拡大と復元','図の種類、多言語ラベル、検索、エラー、互換性の制限']]),
 ('images', ['Images and links','รูปภาพและลิงก์','画像とリンク'],[
  ['Image and link snippets; local references','Paths, alt text and troubleshooting missing assets'],
  ['snippet สำหรับรูปภาพและลิงก์ รวมถึงการอ้างอิงไฟล์ในเครื่อง','พาธ ข้อความทดแทนรูป และการแก้ปัญหาไฟล์ไม่แสดง'],
  ['画像・リンクの挿入とローカル参照','パス、代替テキスト、表示されない画像の確認']]),
 ('appearance', ['Make the reading space yours','ปรับพื้นที่อ่านให้เหมาะกับคุณ','読みやすい環境に整える'],[
  ['Preview font presets, light/dark appearance and editor fonts','Thai looped body text, Japanese and custom preview styles'],
  ['ชุดฟอนต์พรีวิว ธีมสว่างหรือมืด และฟอนต์ในโหมดแก้ไข','ฟอนต์ไทยมีหัวสำหรับเนื้อหา ภาษาญี่ปุ่น และสไตล์พรีวิวที่ปรับเอง'],
  ['プレビュー書体、ライト・ダーク表示、エディター書体','タイ語のループ付き本文、日本語、プレビューのスタイル設定']]),
 ('recipes', ['Recipes for real work','ตัวอย่างเวิร์กโฟลว์ใช้งานจริง','実務で使うレシピ'],[
  ['A README, technical notes and a release checklist','A diagram-assisted architecture note, marked by availability'],
  ['README บันทึกทางเทคนิค และเช็กลิสต์ก่อนเผยแพร่','บันทึกสถาปัตยกรรมพร้อมแผนภาพ โดยระบุสถานะการรองรับ'],
  ['README、技術メモ、リリース用チェックリスト','利用状況を明示した、図付きアーキテクチャノート']]),
 ('shortcuts', ['Keyboard reference','คู่มือคีย์ลัด','キーボードショートカット'],[
  ['Mode switching, navigation, editing, tables and snippet fields','macOS keys and documented Windows/Linux equivalents'],
  ['สลับโหมด นำทาง แก้ไข ตาราง และช่องกรอกใน snippet','ปุ่มบน macOS และปุ่มเทียบเท่าบน Windows/Linux ตามเอกสาร'],
  ['モード切替、移動、編集、表、入力フィールド','macOS キーと、文書化された Windows/Linux の対応']]),
 ('help', ['Troubleshooting and what is next','แก้ปัญหาและฟีเจอร์ที่จะตามมา','困ったときと今後の機能'],[
  ['Saving, fonts, local assets and rendering problems','Released versus completed development features; updates and help'],
  ['ปัญหาการบันทึก ฟอนต์ ไฟล์ในเครื่อง และการแสดงผล','แยกฟีเจอร์ที่เผยแพร่แล้วจากฟีเจอร์ที่พัฒนาเสร็จ พร้อมข้อมูลอัปเดต'],
  ['保存、書体、ローカル画像、描画の問題','公開済み機能と開発完了機能の区別、更新情報、サポート']]),
]
by_slug = {chapter[0]: chapter for chapter in CHAPTERS}
install = ('install',['Install and get oriented','ติดตั้งและเริ่มใช้งาน','インストールと最初の設定'],[
 ['Installation, first launch and platform notes','The $13 price and free-upgrades-for-life policy'],
 ['การติดตั้ง เปิดใช้งานครั้งแรก และข้อควรทราบของแต่ละแพลตฟอร์ม','ราคา $13 และนโยบายอัปเกรดฟรีตลอดอายุการใช้งาน'],
 ['インストール、初回起動、プラットフォームごとの注意点','$13 の価格と生涯無料アップグレードの方針']])
mermaid_scope = [
 ['Write a fenced Mermaid block and see the diagram','Titles, accessible names and untitled fallbacks','Keep highlighted Source below the visible diagram','Maximize, restore, Escape, focus and reading position','Find in labels and source; return to the editor','Mermaid11.17.2 families, aliases and approved compatibility limits','Thai, Japanese, mixed scripts and long labels','Local errors, diagram bounds, recovery and troubleshooting','Flowchart, sequence, architecture and project-note recipes'],
 ['เขียนบล็อก Mermaid แล้วดูผลเป็นแผนภาพ','ชื่อแผนภาพ ชื่อสำหรับการเข้าถึง และกรณีที่ไม่ได้ตั้งชื่อ','เปิด Source พร้อมสีไวยากรณ์ใต้แผนภาพที่ยังมองเห็น','ขยาย คืนขนาด กด Esc และรักษาโฟกัสกับตำแหน่งอ่าน','ค้นหาในป้ายข้อความและต้นฉบับ แล้วกลับไปแก้ไข','ชนิดแผนภาพของ Mermaid11.17.2 ชื่อเรียก และข้อจำกัดที่อนุมัติแล้ว','ภาษาไทย ญี่ปุ่น ข้อความหลายภาษา และป้ายข้อความยาว','ข้อผิดพลาดเฉพาะแผนภาพ ขอบเขต การกู้คืน และการแก้ปัญหา','ตัวอย่าง flowchart, sequence, สถาปัตยกรรม และบันทึกโครงการ'],
 ['Mermaid コードブロックを書いて図を表示','タイトル、アクセシブル名、無題のフォールバック','図を見ながら、下に構文強調された Source を表示','最大化、復元、Esc、フォーカスと読んでいた位置','ラベルとソースを検索してエディターへ戻る','Mermaid11.17.2 の図の種類、別名、承認済み互換性制限','タイ語、日本語、混在スクリプト、長いラベル','図ごとのエラー、描画範囲、復旧、トラブルシューティング','フローチャート、シーケンス、構成図、プロジェクトノートの例']]
by_slug['mermaid'] = ('mermaid',by_slug['mermaid'][1],mermaid_scope)
markdown = by_slug['markdown']
by_slug['markdown'] = ('markdown',markdown[1],[markdown[2][i]+by_slug['images'][2][i] for i in range(3)])
CHAPTERS = [install]+[by_slug[key] for key in ['workflow','files','navigation','editing','snippets','tables','markdown','mermaid','preview','appearance','recipes','shortcuts','help']]
LANGS = ['en','th','ja']
NAMES = {'en':'English','th':'ไทย','ja':'日本語'}
COPY = {
 'en': dict(title='Know Markdown. Master MarkItBetter.',lead='Workflows, snippets and diagrams, built around your keyboard.',guide='User guide',contents='Proposed contents',explore='Explore the guide',compare='Compare designs',intro='For developers and power users who already know Markdown.',upgrade='Free upgrades for life',shot='Actual MIB viewer. Source stays below the diagram. Development preview.',rail='In this guide',workflow='Read. Edit. Keep your place.',workflow_text='Preview is the resting state. Enter the source when you need it.',action='Action',key='Key',keys=['Edit from preview','Save and return to preview','Open a file by name','Move to the next snippet field'],mermaid='Diagrams belong in the document.',mermaid_text='Keep the Mermaid source, inspect the result, and open the whole frame for a closer look.',status='Completed development feature. Not included in the public v0.49.0 release.',features=[('Source, always yours','Exact, highlighted Mermaid below the visible diagram.'),('Room to inspect','Maximize the frame; Escape returns to your place.'),('Readable labels','International text and documented family support.')],webcaption='Interactive guide example. Drag to pan; use Fit All to reset.',diagram_name='A Markdown workflow',fit='Fit All',zoom_in='Zoom in',zoom_out='Zoom out',maximize='Maximize example',restore='Restore example',source='Mermaid source',snippets='Skip the boilerplate.',snippet_intro='Type / to insert a block, then fill its fields with Tab.',tabs=['Link','Table','Code'],instructions=['Choose Link. Enter the label, press Tab, then enter the URL.','Choose Table. Tab moves through cells and adds another row at the end.','Choose Code block. Enter a language, then Tab into the code.'],copy='Copy',copied='Copied',copy_error='Copy failed; select the code',preview_label='Rendered example',read='Built to read, in your language.',read_text='The same guide, in three editions. Thai body text uses the looped face; code uses IBM Plex Mono.',specimen='Keep the source. Understand the result.',toc_intro='The chapter plan for review. Open a row to see its scope.',upcoming='Development preview',footer='Style demo and chapter outline for review. Released guide: v0.49.0. Mermaid: completed development preview.',repo='Documentation repository',fonts='Font licences',skip='Skip to content',chapter_ref='Complete chapter plan',labels=['Write Markdown','Preview','Read the source','Inspect the diagram']),
 'th': dict(title='รู้จัก Markdown แล้ว ใช้ MIB ให้คล่อง',lead='เวิร์กโฟลว์ snippet และแผนภาพ ที่ใช้ได้คล่องจากคีย์บอร์ด',guide='คู่มือผู้ใช้',contents='สารบัญที่เสนอ',explore='สำรวจคู่มือ',compare='เปรียบเทียบสไตล์',intro='สำหรับนักพัฒนาและผู้ใช้ที่คุ้นเคยกับ Markdown อยู่แล้ว',upgrade='อัปเกรดฟรีตลอดอายุการใช้งาน',shot='ภาพจริงจาก MIB โดย Source อยู่ใต้แผนภาพ ฟีเจอร์ในรุ่นพัฒนา',rail='เนื้อหาในคู่มือ',workflow='อ่าน แก้ไข แล้วกลับมาที่เดิม',workflow_text='เริ่มจากพรีวิว แล้วเข้าไปแก้ต้นฉบับเมื่อต้องการ',action='การใช้งาน',key='ปุ่ม',keys=['เข้าโหมดแก้ไขจากพรีวิว','บันทึกและกลับไปพรีวิว','เปิดไฟล์ด้วยชื่อ','ไปช่องกรอกถัดไปใน snippet'],mermaid='แผนภาพเป็นส่วนหนึ่งของเอกสาร',mermaid_text='เก็บต้นฉบับ Mermaid ไว้ ดูผลลัพธ์ และขยายทั้งกรอบเพื่อตรวจรายละเอียด',status='พัฒนาเสร็จแล้ว แต่ยังไม่รวมในรุ่นสาธารณะ v0.49.0',features=[('ต้นฉบับยังอยู่ครบ','Source พร้อมสีไวยากรณ์อยู่ใต้แผนภาพที่ยังมองเห็น'),('ขยายดูรายละเอียด','ขยายทั้งกรอบ แล้วกด Esc เพื่อกลับตำแหน่งเดิม'),('อ่านข้อความได้ชัดเจน','รองรับข้อความหลายภาษา พร้อมเอกสารระบุชนิดแผนภาพ')],webcaption='ตัวอย่างโต้ตอบในคู่มือ ลากเพื่อเลื่อน และกด Fit All เพื่อดูทั้งหมด',diagram_name='เวิร์กโฟลว์ Markdown',fit='Fit All',zoom_in='ขยาย',zoom_out='ย่อ',maximize='ขยายตัวอย่างเต็มพื้นที่',restore='คืนขนาดตัวอย่าง',source='ต้นฉบับ Mermaid',snippets='ลดเวลาพิมพ์โครงสร้างซ้ำ',snippet_intro='พิมพ์ / เพื่อแทรกบล็อก แล้วใช้ Tab กรอกช่องต่าง ๆ',tabs=['ลิงก์','ตาราง','โค้ด'],instructions=['เลือก Link พิมพ์ข้อความลิงก์ กด Tab แล้วกรอก URL','เลือก Table ใช้ Tab เลื่อนช่อง และเพิ่มแถวใหม่เมื่อถึงช่องสุดท้าย','เลือก Code block ระบุภาษา แล้วกด Tab เพื่อเริ่มพิมพ์โค้ด'],copy='คัดลอก',copied='คัดลอกแล้ว',copy_error='คัดลอกไม่ได้ กรุณาเลือกข้อความ',preview_label='ผลลัพธ์ตัวอย่าง',read='อ่านสะดวก ในภาษาของคุณ',read_text='คู่มือเดียวกัน แยกเป็นสามภาษา เนื้อหาภาษาไทยใช้ฟอนต์มีหัว ส่วนโค้ดใช้ IBM Plex Mono',specimen='เก็บต้นฉบับให้ครบ แล้วอ่านผลลัพธ์ให้เข้าใจ',toc_intro='โครงร่างบทสำหรับตรวจทาน เปิดแต่ละแถวเพื่อดูขอบเขต',upcoming='ฟีเจอร์รุ่นพัฒนา',footer='ตัวอย่างสไตล์และโครงร่างบทสำหรับตรวจทาน คู่มือรุ่นเผยแพร่ v0.49.0 และตัวอย่าง Mermaid ที่พัฒนาเสร็จแล้ว',repo='คลังเอกสาร',fonts='ใบอนุญาตฟอนต์',skip='ข้ามไปเนื้อหา',chapter_ref='โครงร่างทุกบท',labels=['เขียน Markdown','ดูพรีวิว','อ่านต้นฉบับ','ตรวจแผนภาพ']),
 'ja': dict(title='Markdown を、もっと自在に。',lead='キーボードで使いこなす、ワークフローとスニペット、そして図。',guide='ユーザーガイド',contents='目次案',explore='ガイドを見る',compare='デザインを比較',intro='Markdown を使い慣れた開発者とパワーユーザーへ。',upgrade='アップグレードは生涯無料',shot='実際の MIB 画面。図の下に Source を表示。開発版のプレビューです。',rail='ガイドの内容',workflow='読む。編集する。元の位置へ。',workflow_text='プレビューが出発点。必要なときだけソースを編集します。',action='操作',key='キー',keys=['プレビューから編集へ','保存してプレビューへ戻る','名前でファイルを開く','次の入力フィールドへ'],mermaid='図も、ドキュメントの一部に。',mermaid_text='Mermaid のソースを残して結果を確認。フレーム全体を広げて、細部まで読めます。',status='開発完了機能です。公開版 v0.49.0 には含まれていません。',features=[('ソースはそのまま','図を見ながら、下に構文強調付き Source を表示。'),('広げて確認','フレームを拡大し、Esc で元の位置へ。'),('読みやすいラベル','多言語の文字表示と、図の対応範囲を文書化。')],webcaption='ガイド内の操作例。ドラッグで移動し、Fit All で全体表示に戻ります。',diagram_name='Markdown のワークフロー',fit='Fit All',zoom_in='拡大',zoom_out='縮小',maximize='例を最大化',restore='例を元の大きさへ',source='Mermaid ソース',snippets='繰り返しの入力を減らす。',snippet_intro='/ でブロックを挿入し、Tab でフィールドを埋めます。',tabs=['リンク','表','コード'],instructions=['Link を選び、表示名を入力。Tab で URL に移動します。','Table を選び、Tab でセルを移動。最後のセルから次の行を追加します。','Code block を選び、言語を入力して Tab でコードへ移動します。'],copy='コピー',copied='コピーしました',copy_error='コピーできません。コードを選択してください',preview_label='表示例',read='自分の言葉で、読みやすく。',read_text='同じガイドを三つの言語で。タイ語の本文にはループ付き書体、コードには IBM Plex Mono を使います。',specimen='ソースを残し、結果を理解する。',toc_intro='レビュー用の章構成です。各行を開くと、扱う内容を確認できます。',upcoming='開発版プレビュー',footer='デザインと章構成のレビュー用サンプル。公開版ガイドは v0.49.0、Mermaid は開発完了プレビューです。',repo='ドキュメントリポジトリ',fonts='フォントライセンス',skip='本文へスキップ',chapter_ref='すべての章構成',labels=['Markdown を書く','プレビュー','ソースを読む','図を確認する'])
}

ICON = {'chevron':'<path d="m6 9 6 6 6-6"/>','plus':'<path d="M12 5v14M5 12h14"/>','minus':'<path d="M5 12h14"/>','maximize':'<path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3"/>'}
COPY['en']['title']='The MarkItBetter field guide.'
COPY['th']['title']='คู่มือ MIB ฉบับใช้งานจริง'
COPY['ja']['title']='MarkItBetter 実践ガイド'
COPY['en']['snippets']='Slash snippets, with Tab fields.'
COPY['th']['snippets']='แทรก snippet ด้วย / กรอกด้วย Tab'
COPY['ja']['snippets']='/ で挿入、Tab で入力。'
COPY['en']['read']='Reading samples in IBM Plex.'
COPY['th']['read']='ตัวอย่างการอ่านด้วย IBM Plex'
COPY['ja']['read']='IBM Plex の本文サンプル'
HERO_STATUS={'en':'Mermaid development preview. Not in v0.49.0.','th':'Mermaid รุ่นพัฒนา ยังไม่มีใน v0.49.0','ja':'Mermaid は開発版です。v0.49.0 には未搭載。'}
RAIL_LABELS={'en':['Workflow','Slash snippets','Tables','Mermaid diagrams','Appearance'],'th':['เวิร์กโฟลว์','เมนู / และ snippet','ตาราง','แผนภาพ Mermaid','รูปลักษณ์และฟอนต์'],'ja':['ワークフロー','スニペット','表','Mermaid の図','表示と書体']}
COPY['en']['read_text']='On these pages, reading text uses IBM Plex. Thai keeps its visible loops; code has a dedicated mono face.'
COPY['th']['read_text']='ในคู่มือนี้ เนื้อหาใช้ฟอนต์ IBM Plex ภาษาไทยคงหัวตัวอักษรให้อ่านชัด และแยกฟอนต์โค้ดเป็นแบบโมโน'
COPY['ja']['read_text']='このガイドでは IBM Plex を使用。タイ語の本文はループ付き書体、コードは専用の等幅書体で表示します。'
def icon(name):
 return f'<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICON[name]}</svg>'

def locale_menu(variant,lang):
 return f'<details class="locale"><summary>{NAMES[lang]}{icon("chevron")}</summary><nav aria-label="Language">'+''.join(f'<a href="../{code}/index.html" lang="{code}" hreflang="{code}"'+(' aria-current="page"' if code==lang else '')+f'>{name}</a>' for code,name in NAMES.items())+'</nav></details>'

def chapter_list(lang):
 i=LANGS.index(lang);c=COPY[lang];parts=[]
 for slug,titles,scope in CHAPTERS:
  status=f' <span class="toc-status">({c["upcoming"]})</span>' if slug=='mermaid' else ''
  parts.append(f'<li id="chapter-{slug}"><details><summary><span>{esc(titles[i])}{status}</span></summary><div class="toc-points">'+''.join(f'<p>{esc(x)}</p>' for x in scope[i])+'</div></details></li>')
 return '<ol class="toc-list">'+''.join(parts)+'</ol>'

def diagram(lang):
 c=COPY[lang];svgpath=ROOT/f'assets/diagrams/{lang}.svg';svg=svgpath.read_text() if svgpath.exists() else ''
 source='flowchart TB\n  A['+c['labels'][0]+'] --> B['+c['labels'][1]+']\n  B --> C['+c['labels'][2]+']\n  C --> D['+c['labels'][3]+']'
 return f'''<div class="diagram-example" data-diagram>
 <div class="diagram-toolbar"><span class="diagram-name">{c['diagram_name']}</span><div class="diagram-actions">
 <button type="button" data-zoom="out" aria-label="{c['zoom_out']}">{icon('minus')}</button>
 <button type="button" data-fit class="fit-button">{c['fit']}</button>
 <button type="button" data-zoom="in" aria-label="{c['zoom_in']}">{icon('plus')}</button>
 <button type="button" data-maximize aria-label="{c['maximize']}" aria-expanded="false" data-open-label="{c['maximize']}" data-close-label="{c['restore']}">{icon('maximize')}</button>
 </div></div><div class="diagram-viewport" tabindex="0" aria-label="{esc(c['webcaption'])}"><div class="diagram-scene">{svg}</div></div>
 <details><summary>{c['source']}</summary><pre><code>{esc(source)}</code></pre></details>
 </div><p class="diagram-caption">{c['webcaption']}</p>'''

def snippets(lang):
 c=COPY[lang]
 codes=['[API reference](https://example.com)','| Item | Status |\n| --- | --- |\n| User guide | Draft |','```ts\nconst message = "Hello, Markdown";\nconsole.log(message);\n```']
 results=['<a href="https://example.com" rel="noopener">API reference</a>','<table><thead><tr><th>Item</th><th>Status</th></tr></thead><tbody><tr><td>User guide</td><td>Draft</td></tr></tbody></table>','<code>const message = "Hello, Markdown";\nconsole.log(message);</code>']
 tabs='<div class="snippet-tabs" role="tablist" aria-label="'+c['snippets']+'">'+''.join(f'<button type="button" role="tab" id="tab-{i}" aria-controls="snippet-{i}" aria-selected="{str(i==0).lower()}" tabindex="{0 if i==0 else -1}">{t}</button>' for i,t in enumerate(c['tabs']))+'</div>'
 panels=''
 for i,code in enumerate(codes):
  panels+=f'<section class="snippet-panel" role="tabpanel" id="snippet-{i}" aria-labelledby="tab-{i}"><p>{c["instructions"][i]}</p><div class="code-toolbar"><span>Markdown</span><button type="button" class="copy-button" data-copy data-label="{c["copy"]}" data-copied="{c["copied"]}" data-error="{c["copy_error"]}">{c["copy"]}</button></div><pre><code>{esc(code)}</code></pre><div class="snippet-result" aria-label="{c["preview_label"]}">{results[i]}</div></section>'
 return '<div class="snippet-example" data-tabs>'+tabs+panels+'</div>'

def build(variant,lang):
 c=COPY[lang];i=LANGS.index(lang);other='edition' if variant=='reference' else 'reference';name='Reference' if variant=='reference' else 'Edition'
 rail_links=['workflow','snippets','tables','mermaid','appearance']
 rail='<aside class="chapter-rail" aria-label="'+c['rail']+'"><p class="rail-title">'+c['guide']+'</p>'
 for n,slug in enumerate(rail_links):
  chapter=next(ch for ch in CHAPTERS if ch[0]==slug)
  target='#'+slug if slug in ['workflow','snippets','mermaid'] else '#chapter-'+slug
  rail+=f'<a href="{target}">{RAIL_LABELS[lang][n]}</a>'
 rail+=f'<a class="rail-break" href="#contents">{c["chapter_ref"]}</a><p class="rail-note">v0.49.0<br>{c["upcoming"]}: Mermaid</p></aside>'
 hero=f'''<section class="hero" id="start"><div><h1>{c['title']}</h1><p class="lead">{c['lead']}</p><a class="hero-action" href="#contents">{c['explore']}</a><div class="offer"><span class="price">$13</span><span>{c['upgrade']}</span></div><p class="hero-release">{HERO_STATUS[lang]}</p></div><figure class="product-figure"><img src="../../assets/screenshots/mermaid-source-detail.png" width="660" height="560" alt="{esc(c['shot'])}" fetchpriority="high"><figcaption>{c['shot']}</figcaption></figure></section>'''
 keys=['i','Esc','⌘ P / Ctrl P','Tab']
 workflow=f'<section class="section" id="workflow"><h2>{c["workflow"]}</h2><p class="section-intro">{c["workflow_text"]}</p><table class="key-table section-body"><thead><tr><th>{c["action"]}</th><th>{c["key"]}</th></tr></thead><tbody>'+''.join(f'<tr><td>{label}</td><td><kbd>{key}</kbd></td></tr>' for label,key in zip(c['keys'],keys))+'</tbody></table></section>'
 mermaid=f'<section class="section" id="mermaid"><h2>{c["mermaid"]}</h2><p class="section-intro">{c["mermaid_text"]}</p><p class="release-note">{c["status"]}</p>'+diagram(lang)+'<ul class="feature-points">'+''.join(f'<li><strong>{a}</strong><span>{b}</span></li>' for a,b in c['features'])+'</ul></section>'
 snippet=f'<section class="section" id="snippets"><h2>{c["snippets"]}</h2><p class="section-intro">{c["snippet_intro"]}</p><div class="section-body">{snippets(lang)}</div></section>'
 specimen_head={'en':('Language','Reading sample'),'th':('ภาษา','ตัวอย่างข้อความ'),'ja':('言語','本文のサンプル')}[lang]
 reading=f'<section class="section" id="reading"><h2>{c["read"]}</h2><p class="section-intro">{c["read_text"]}</p><table class="font-specimens section-body"><thead><tr><th scope="col">{specimen_head[0]}</th><th scope="col">{specimen_head[1]}</th></tr></thead><tbody><tr><th scope="row" lang="en">English</th><td lang="en">Keep the source. Understand the result.</td></tr><tr><th scope="row" lang="th">ภาษาไทย</th><td lang="th">เก็บต้นฉบับไว้ แล้วอ่านแผนภาพให้เข้าใจ</td></tr><tr><th scope="row" lang="ja">日本語</th><td lang="ja">ソースを残して、図を読み解く。</td></tr></tbody></table></section>'
 toc=f'<section class="section" id="contents"><h2>{c["contents"]}</h2><p class="section-intro">{c["toc_intro"]}</p><div class="section-body">{chapter_list(lang)}</div></section>'
 footer=f'<footer class="site-footer"><p>{c["footer"]}</p><div><a href="https://github.com/jedt3d/MarkItBetter-Documents">{c["repo"]}</a><br><a href="../../assets/licenses/NOTICE.txt">{c["fonts"]}</a></div></footer>'
 body='' if HERO_ONLY else workflow+mermaid+snippet+reading+toc+footer
 variants='' if variant=='reference' else f'<nav class="variant-links" aria-label="Design proposals"><a href="../../reference/{lang}/index.html">Reference</a><a href="../../edition/{lang}/index.html" aria-current="page">Edition</a></nav>'
 page=f'''<!doctype html>
<html lang="{lang}" data-variant="{variant}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="{esc(c['intro'])}"><title>MarkItBetter {esc(c['guide'])} | {name}</title><link rel="stylesheet" href="../../assets/site.css"><script src="../../assets/site.js" defer></script></head>
<body><a class="skip-link" href="#main">{c['skip']}</a><header class="site-header"><a class="brand" href="../../index.html">MarkItBetter</a><div class="header-right">{variants}{locale_menu(variant,lang)}</div></header>
<div class="site-layout">{rail}<main id="main">{hero}{body}</main></div></body></html>'''
 folder=ROOT/variant/lang;folder.mkdir(parents=True,exist_ok=True);(folder/'index.html').write_text(page)
 if variant=='reference' and lang=='en':
  home=page.replace('../../','').replace('href="../','href="reference/')
  (ROOT/'index.html').write_text(home)

for variant in ['reference','edition']:
 for lang in LANGS:build(variant,lang)

out=ROOT/'content';out.mkdir(exist_ok=True)
for lang in LANGS:
 i=LANGS.index(lang);c=COPY[lang]
 text=f'# MarkItBetter — {c["contents"]}\n\n{c["intro"]}\n\n{c["footer"]}\n\n'
 for n,(slug,titles,scope) in enumerate(CHAPTERS,1):
  text+=f'## {n}. {titles[i]}'+(f' ({c["upcoming"]})' if slug=='mermaid' else '')+'\n\n'
  text+=''.join(f'- {x}\n' for x in scope[i])+'\n'
 (out/f'TABLE-OF-CONTENTS.{lang}.md').write_text(text)
(ROOT/'.hallmark/copy.json').write_text(json.dumps(COPY,ensure_ascii=False,indent=2)+'\n')
print('Built six language/variant pages; hero-only='+str(HERO_ONLY))
