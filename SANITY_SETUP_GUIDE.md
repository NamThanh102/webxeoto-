# 🎯 HƯỚNG DẪN THIẾT LẬP SANITY CMS

## Bước 1: Tạo Tài Khoản Sanity (MIỄN PHÍ)

1. Truy cập: https://www.sanity.io/
2. Click "Get Started" hoặc "Sign Up"
3. Đăng ký bằng GitHub, Google, hoặc Email (khuyên dùng GitHub)
4. Xác nhận email nếu cần

## Bước 2: Tạo Project Mới

### Cách 1: Tạo qua Terminal (Khuyến nghị)

```powershell
# Di chuyển vào thư mục project
cd C:\Users\namnt\Desktop\File_recovermyPC\Video_OBS\PTIT\ki2_nam3\2.1.ltweb\webxeoto

# Tạo project Sanity
npx sanity init --env
```

**Lưu ý:** Khi chạy lệnh trên, bạn sẽ được hỏi:

1. **Create a new project?** → Chọn `Y` (Yes)
2. **Your project name:** → Nhập `Trong Hoang Xe Tai` (hoặc tên bạn muốn)
3. **Use the default dataset configuration?** → Chọn `Y` (Yes)
4. **Project output path:** → Nhấn Enter (giữ mặc định)
5. **Select project template:** → Chọn `Clean project with no predefined schemas`

### Cách 2: Tạo qua Dashboard (Nếu cách 1 không được)

1. Truy cập: https://www.sanity.io/manage
2. Click "Create project"
3. Đặt tên project: "Trong Hoang Xe Tai"
4. Chọn Dataset: "production"
5. Click "Create"
6. **SAO CHÉP PROJECT ID** (ví dụ: `abc123xyz`)

## Bước 3: Cấu Hình Environment Variables

Sau khi tạo project, bạn sẽ nhận được **Project ID**.

1. Mở file `.env.local` trong thư mục gốc
2. Cập nhật giá trị:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyCNE7kQ51r-WlMl5FyD6v2RKOmdzBugg2oCrCY7tbrDzHRE0XuswhbNlKm9gvAH523/exec

# Thay thế 'your-project-id' bằng Project ID thực của bạn
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

## Bước 4: Khởi Động Sanity Studio (Admin Panel)

```powershell
# Chạy development server
npm run dev
```

Sau đó mở trình duyệt và truy cập:

**🎯 Trang Admin: http://localhost:3000/admin**

### Đăng nhập vào Admin Panel

- Lần đầu tiên truy cập `/admin`, bạn sẽ được yêu cầu đăng nhập
- Sử dụng tài khoản Sanity đã tạo ở Bước 1
- Sau khi đăng nhập, bạn sẽ thấy giao diện quản trị

## Bước 5: Thêm Sản Phẩm và Tin Tức

### Thêm Sản Phẩm:

1. Vào Admin Panel: http://localhost:3000/admin
2. Click **"Sản Phẩm"** (Product) ở sidebar
3. Click **"+"** hoặc **"Create new"**
4. Điền thông tin:
   - **Tên Xe**: XE TẢI TERA 100
   - **Đường Dẫn (Slug)**: Click "Generate" để tự động tạo
   - **Giá**: Nhập "Liên Hệ" hoặc "245.000.000"
   - **Giá Số**: Nhập số nếu muốn sort/filter (VD: 245000000)
   - **Hình Ảnh Chính**: Upload ảnh
   - **Nhãn**: "Bán Chạy", "Mới Nhất", v.v.
   - **Danh Mục**: Chọn loại xe
   - **Hiển Thị Trang Chủ**: Bật nếu muốn hiển thị ở trang chủ
   - **Công Khai**: Bật để hiển thị
5. Click **"Publish"**

### Thêm Tin Tức:

1. Click **"Tin Tức"** (News) ở sidebar
2. Click **"+"**
3. Điền thông tin:
   - **Tiêu Đề**: Tiêu đề bài viết
   - **Đường Dẫn**: Click "Generate"
   - **Mô Tả Ngắn**: Tóm tắt bài viết (tối đa 200 ký tự)
   - **Hình Ảnh Chính**: Upload ảnh
   - **Nội Dung**: Viết nội dung chi tiết (hỗ trợ rich text)
   - **Danh Mục**: Tin Tức, Khuyến Mãi, v.v.
   - **Ngày Đăng**: Chọn ngày
   - **Hiển Thị Trang Chủ**: Bật để hiển thị ở trang chủ
4. Click **"Publish"**

## Bước 6: Cấu Hình CORS (Quan Trọng!)

Để website có thể lấy dữ liệu từ Sanity:

1. Truy cập: https://www.sanity.io/manage
2. Chọn project của bạn
3. Vào **API** → **CORS Origins**
4. Click **"Add CORS Origin"**
5. Thêm các URL sau:
   ```
   http://localhost:3000
   https://tronghoangxetai.vercel.app
   ```
6. Chọn **"Allow credentials"** ✅
7. Click **"Save"**

## Bước 7: Deploy lên Vercel

### Cập nhật Environment Variables trên Vercel:

1. Truy cập: https://vercel.com
2. Chọn project "webxeoto"
3. Vào **Settings** → **Environment Variables**
4. Thêm 2 biến mới:
   - **Key**: `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - **Value**: (Project ID của bạn)
   - Click "Add"
   
   - **Key**: `NEXT_PUBLIC_SANITY_DATASET`
   - **Value**: `production`
   - Click "Add"

5. Vào tab **Deployments**
6. Click **"Redeploy"** ở deployment mới nhất
7. Chọn "Use existing Build Cache" → Click **"Redeploy"**

## Bước 8: Kiểm Tra

### Local (Máy tính):
- Trang chủ: http://localhost:3000
- Admin: http://localhost:3000/admin
- Tất cả sản phẩm: http://localhost:3000/san-pham
- Chi tiết sản phẩm: http://localhost:3000/san-pham/[slug]

### Production (Live):
- Trang chủ: https://tronghoangxetai.vercel.app
- Admin: https://tronghoangxetai.vercel.app/admin
- Tất cả sản phẩm: https://tronghoangxetai.vercel.app/san-pham

---

## 🎉 Tính Năng Đã Có

✅ **Trang Admin** để quản lý sản phẩm và tin tức
✅ **Tìm kiếm sản phẩm** theo tên
✅ **Lọc sản phẩm** theo danh mục, khoảng giá
✅ **Sắp xếp sản phẩm** theo giá, tên
✅ **Trang chi tiết sản phẩm** với đầy đủ thông tin
✅ **Quản lý tin tức** với rich text editor
✅ **Responsive** trên mọi thiết bị
✅ **Google Sheets** integration cho form liên hệ

---

## 📚 Làm Việc Với Sanity Studio

### Shortcuts Hữu Ích:

- **Ctrl + S**: Save draft
- **Ctrl + Alt + P**: Publish
- **Ctrl + E**: Edit mode
- **Escape**: Close dialog

### Upload Hình Ảnh:

1. Click vào field "Hình Ảnh"
2. Kéo thả file hoặc click "Select"
3. Sanity tự động tối ưu và lưu trữ ảnh
4. Không cần resize/compress thủ công!

### Quản Lý Nhiều Sản Phẩm:

- Sử dụng filter sidebar để lọc
- Sort theo thứ tự, tên, ngày tạo
- Duplicate sản phẩm để tạo nhanh

---

## ⚠️ Lưu Ý Quan Trọng

1. **Luôn Click "Publish"** sau khi chỉnh sửa, nếu không sẽ chỉ là bản nháp
2. **Project ID phải đúng** trong `.env.local` và Vercel
3. **Cấu hình CORS** nếu không website sẽ không lấy được data
4. **Giới hạn Free Plan**: 
   - 3 users
   - 10GB bandwidth/tháng (đủ cho website vừa và nhỏ)
   - Số lượng documents không giới hạn

---

## 🆘 Troubleshooting

### Lỗi: "Project not found"
→ Kiểm tra lại `NEXT_PUBLIC_SANITY_PROJECT_ID` trong `.env.local`

### Lỗi: "CORS policy"
→ Thêm domain vào CORS Origins tại https://www.sanity.io/manage

### Admin không hiển thị
→ Xóa cache browser (Ctrl + Shift + R) và thử lại

### Sản phẩm không hiển thị
→ Kiểm tra field "Công Khai" (published) và "Hiển Thị Trang Chủ" (featured)

---

## 📞 Liên Hệ & Support

Nếu gặp vấn đề, check:
1. Sanity Documentation: https://www.sanity.io/docs
2. Next.js + Sanity Guide: https://www.sanity.io/plugins/next-sanity
3. Vercel Deployment: https://vercel.com/docs

---

**Chúc bạn sử dụng thành công! 🚀**
