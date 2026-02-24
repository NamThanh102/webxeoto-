# Hướng dẫn kết nối Form với Google Sheets

## Bước 1: Tạo Google Sheet

1. Truy cập: https://sheets.google.com
2. Tạo spreadsheet mới (hoặc mở sheet có sẵn)
3. Đặt tên sheet: **"Liên hệ khách hàng"**
4. Tại dòng đầu tiên (A1, B1, C1, D1), thêm tiêu đề cột:

| A1 | B1 | C1 | D1 |
|----|----|----|-----|
| Thời gian | Họ tên | Số điện thoại | Tin nhắn |

---

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, click **Extensions** → **Apps Script**

2. Xóa hết code mẫu, paste đoạn code này:

```javascript
function doPost(e) {
  try {
    // Lấy sheet đầu tiên
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dữ liệu từ form
    var data = JSON.parse(e.postData.contents);
    
    // Thêm dòng mới với: Thời gian, Họ tên, SĐT, Tin nhắn
    sheet.appendRow([
      new Date(),
      data.fullName,
      data.phone,
      data.message
    ]);
    
    // Trả về kết quả thành công
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Đã lưu thành công'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (icon đĩa mềm hoặc Ctrl+S)

4. Click **Deploy** → **New deployment**

5. Chọn type: **Web app**
   - **Description:** "Form liên hệ"
   - **Execute as:** Me (email của bạn)
   - **Who has access:** Anyone
   
6. Click **Deploy**

7. **Cấp quyền (Authorize):**
   
   Sẽ xuất hiện popup **"Ủy quyền truy cập"**:
   
   a. Click nút **"Ủy quyền truy cập"** (màu xanh)
   
   b. Chọn tài khoản Google của bạn
   
   c. **QUAN TRỌNG:** Sẽ có cảnh báo "Google hasn't verified this app". **ĐÂY LÀ BÌNH THƯỜNG!**
      - Click **"Advanced"** (Nâng cao)
      - Click **"Go to [Tên dự án] (unsafe)"** (Đi đến dự án - không an toàn)
      
   d. Màn hình xin quyền:
      - Kéo xuống cuối
      - Click **"Allow"** (Cho phép)
   
8. **Copy URL:**
   
   Sau khi cấp quyền xong, sẽ thấy:
   - **Web app URL:** `https://script.google.com/macros/s/ABC.../exec`
   
   → **Copy toàn bộ URL này** (click icon copy hoặc Ctrl+C)

---

## Bước 3: Cấu hình trong Next.js

1. Tạo file `.env.local` trong thư mục gốc dự án:

```bash
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/ABC.../exec
```

(Thay `ABC...` bằng URL bạn vừa copy ở bước 2.7)

2. Khởi động lại server:
```bash
npm run dev
```

---

## Bước 4: Test thử

1. Mở website: http://localhost:3000
2. Kéo xuống phần **Liên hệ**
3. Điền form và submit
4. Kiểm tra Google Sheets → Dữ liệu đã xuất hiện!

---

## ⚠️ Lưu ý

- Mỗi lần sửa code Apps Script, phải **Deploy mới** (New deployment)
- URL script sẽ thay đổi mỗi lần deploy mới → Phải cập nhật lại file `.env.local`
- Để tránh spam, nên thêm reCAPTCHA (nâng cao)

---

## 🔧 Troubleshooting

**Lỗi CORS:**
- Đảm bảo "Who has access" = "Anyone"
- Redeploy lại Apps Script

**Dữ liệu không lưu:**
- Kiểm tra Console (F12) xem có lỗi không
- Kiểm tra URL trong `.env.local` có đúng không
- URL phải kết thúc bằng `/exec` chứ không phải `/dev`

**Sheet không cập nhật:**
- Kiểm tra tên cột trong sheet có đúng không
- Đảm bảo sheet đang active (tab đầu tiên)
