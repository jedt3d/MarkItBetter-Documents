# คู่มือคีย์ลัด

บริบทสำคัญ ปุ่มเดียวกันอาจทำงานกับเมนู ช่องค้นหา snippet หรือตัวแก้ไขตามโฟกัส **Command** และ **Option** เป็นปุ่ม Mac ส่วน **Ctrl** และ **Alt** เป็นปุ่มที่สอดคล้องกันโดยทั่วไปบน Windows/Linux

## ไฟล์และการนำทาง

| การใช้งาน | Mac | Windows/Linux |
| --- | --- | --- |
| เปิดไฟล์ | Command+O | Ctrl+O |
| Save / Save As | Command+S / Command+Shift+S | Ctrl+S / Ctrl+Shift+S |
| Quick Open | Command+P | Ctrl+P |
| Outline | Command+Shift+O | Ctrl+Shift+O |
| Command palette | Command+Shift+P | Ctrl+Shift+P |
| Preferences | Command+, | Ctrl+, |
| แผง Favorites | Command+1 | Ctrl+1 |
| แผง Files | Command+2 | Ctrl+2 |
| ค้นหาในโหมดปัจจุบัน | Command+F | Ctrl+F |
| ปิดหน้าต่าง | Command+W | Ctrl+W |

ใช้ **New File** ผ่านปุ่มหรือ palette คู่มือนี้ไม่กำหนดคีย์สร้างไฟล์ที่ไม่มีในโปรแกรม การปิดหน้าต่างอาจถามเรื่องข้อความที่ยังไม่บันทึก

## แก้ต้นฉบับ

| การใช้งานใน EDIT | Mac | Windows/Linux |
| --- | --- | --- |
| หนา / เอียง | Command+B / Command+I | Ctrl+B / Ctrl+I |
| Inline code | Command+E | Ctrl+E |
| แทรกลิงก์ | Command+K | Ctrl+K |
| ขีดฆ่า | Command+Shift+X | Ctrl+Shift+X |
| หัวข้อ 1–6 | Option+Command+1…6 | Alt+Ctrl+1…6 |
| ตัวห้อย / ตัวยก | Command+Shift+, / Command+Shift+. | Ctrl+Shift+, / Ctrl+Shift+. |
| สลับงาน | Command+Enter | Ctrl+Enter |
| จัดรูปแบบเอกสารหรือช่วงเลือก | Option+Command+F | Alt+Ctrl+F |
| ป๊อปอัปตาราง | Command+/ | Ctrl+/ |
| HTML comment | Command+' | Ctrl+' |
| ทำสำเนาบรรทัด | Command+Shift+D | Ctrl+Shift+D |
| ย้ายบรรทัดขึ้น/ลง | Option+Up/Down | Alt+Up/Down |
| เยื้องเข้า/ออก | Command+] / Command+[ | Ctrl+] / Ctrl+[ |
| เพิ่มตำแหน่งตรงกันถัดไป | Command+D | Ctrl+D |
| เลือกทุกตำแหน่งที่ตรงกัน | Command+Shift+L | Ctrl+Shift+L |
| ไปบรรทัด | Option+Command+G | Alt+Ctrl+G |
| Undo / Redo | Command+Z / Command+Shift+Z | Ctrl+Z / Ctrl+Shift+Z |
| Focus mode | F8 | F8 |

บางคีย์บอร์ดต้องกด Fn เพื่อใช้ F8 ระบบปฏิบัติการ window manager หรือ layout ภาษาสามารถรับคีย์บางชุดไปก่อนแอป หากคำสั่งไม่ถึงโปรแกรม ให้ใช้ปุ่มหรือ palette แล้วตรวจคีย์ระบบ อย่าเพิ่งสรุปว่าเอกสารผิด

## ปุ่มที่ขึ้นอยู่กับโฟกัส {#focus-sensitive-keys}

| บริบท | ปุ่ม | ผล |
| --- | --- | --- |
| PREVIEW เลือกข้อความอยู่ | `i` | แก้หลังข้อความต้นฉบับที่เลือก |
| PREVIEW ไม่มีช่วงเลือกที่ใช้ได้ | `i` หรือ `a` | แก้ที่ท้ายเอกสาร |
| EDIT ไม่มีแผงหรือช่องกรอกค้าง | Esc | บันทึกเอกสารที่มีพาธแล้วกลับ PREVIEW |
| Slash menu | ลูกศร / Enter / Esc | เลื่อน แทรก หรือปิด |
| Snippet ที่ยังใช้ช่องกรอก | Tab / Shift+Tab / Esc | ช่องถัดไป ย้อนกลับ จบการนำทาง |
| เซลล์ท้ายแถวเนื้อหาสุดท้าย | Tab | เพิ่มแถว |
| Find ใน PREVIEW | Enter / Shift+Enter | ผลถัดไป / ก่อนหน้า |
| ช่องค้นหา EDIT | Enter / Shift+Enter | ผลถัดไป / newline ในคำค้น |
| ช่องแทนที่ EDIT | Enter | แทนหนึ่งตำแหน่ง |

จบการประกอบข้อความของ IME ก่อนใช้คีย์สลับโหมด ช่องค้นหาหรือ Preferences ที่มีโฟกัสรับคีย์ก่อนตัวเอกสาร ส่วน viewer รุ่นพัฒนามีพฤติกรรมโฟกัสและคืนขนาดเฉพาะใน [บท Mermaid](mermaid.html)
