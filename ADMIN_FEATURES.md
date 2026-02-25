# 🎯 TÍNH NĂNG ADMIN PANEL

## Danh Sách Tính Năng Đã Được Tích Hợp

### 📦 QUẢN LÝ SẢN PHẨM

#### Thêm/Sửa/Xóa Sản Phẩm
- ✅ Tên xe
- ✅ Giá (hỗ trợ cả text và số: "Liên Hệ" hoặc "245.000.000")
- ✅ Giá dạng số (để sort/filter)
- ✅ Hình ảnh chính
- ✅ Hình ảnh phụ (nhiều ảnh)
- ✅ Nhãn/Badge (Bán Chạy, Mới Nhất, Ưu Đãi)
- ✅ Slug (tự động từ tên)
- ✅ Thông số kỹ thuật (key-value pairs)
- ✅ Mô tả chi tiết (Rich Text Editor)
- ✅ Tính năng nổi bật (list)
- ✅ Danh mục (Xe Tải Nhỏ, Trung, Lớn, Đầu Kéo)
- ✅ Thương hiệu
- ✅ Hiển thị trang chủ (checkbox)
- ✅ Công khai/Ẩn (checkbox)
- ✅ Thứ tự sắp xếp

#### Tìm Kiếm & Lọc Sản Phẩm
- ✅ Tìm kiếm theo tên
- ✅ Lọc theo danh mục
- ✅ Lọc theo khoảng giá (từ X triệu đến Y triệu)
- ✅ Sắp xếp:
  - Mặc định (theo thứ tự đã đặt)
  - Tên A-Z
  - Giá thấp → cao
  - Giá cao → thấp

#### Trang Chi Tiết Sản Phẩm
- ✅ URL động: `/san-pham/[slug]`
- ✅ Hiển thị đầy đủ thông tin
- ✅ Gallery ảnh
- ✅ Thông số kỹ thuật
- ✅ Tính năng nổi bật
- ✅ Mô tả chi tiết
- ✅ Nút liên hệ (Gọi, Zalo, Form)

---

### 📰 QUẢN LÝ TIN TỨC

#### Thêm/Sửa/Xóa Tin Tức
- ✅ Tiêu đề
- ✅ Slug (tự động từ tiêu đề)
- ✅ Mô tả ngắn (excerpt)
- ✅ Hình ảnh chính
- ✅ Nội dung (Rich Text với H1, H2, H3, Quote, List, Ảnh)
- ✅ Danh mục (Tin Tức, Khuyến Mãi, Hướng Dẫn, Đánh Giá)
- ✅ Tags
- ✅ Ngày đăng
- ✅ Tác giả
- ✅ Công khai/Ẩn
- ✅ Hiển thị trang chủ

---

### 🎨 GIAO DIỆN ADMIN STUDIO

#### Tính Năng Sanity Studio
- ✅ Dashboard trực quan
- ✅ Preview realtime
- ✅ Rich Text Editor (Portable Text)
- ✅ Drag & Drop upload ảnh
- ✅ Auto-crop ảnh với hotspot
- ✅ Search toàn bộ documents
- ✅ Filter & Sort
- ✅ Draft/Publish workflow
- ✅ History & Version control
- ✅ Multi-user collaboration (Free plan: 3 users)

---

### 🔍 TRANG SẢN PHẨM (/san-pham)

Trang này cho phép khách hàng:
- ✅ Xem tất cả sản phẩm
- ✅ Tìm kiếm theo tên
- ✅ Lọc theo danh mục
- ✅ Lọc theo khoảng giá
- ✅ Sắp xếp (mặc định, tên, giá)
- ✅ Hiển thị số lượng sản phẩm
- ✅ Xóa bộ lọc nhanh
- ✅ Click vào sản phẩm → Chi tiết

---

### 📱 RESPONSIVE & UX

- ✅ Mobile-first design
- ✅ Tối ưu cho điện thoại, tablet, desktop
- ✅ Loading states
- ✅ Empty states (khi chưa có sản phẩm/tin tức)
- ✅ Hover effects
- ✅ Smooth transitions

---

### 🚀 DEPLOYMENT & PRODUCTION

- ✅ Vercel hosting (free)
- ✅ Environment variables configured
- ✅ CDN cho ảnh (Sanity CDN)
- ✅ Automatic optimization
- ✅ SSR/SSG với Next.js 15

---

## 🎯 WORKFLOW QUẢN TRỊ

### Khi Muốn Thêm Sản Phẩm Mới:

1. Vào `https://tronghoangxetai.vercel.app/admin`
2. Đăng nhập (nếu chưa)
3. Click "Sản Phẩm" → "+"
4. Điền thông tin → Upload ảnh
5. Bật "Hiển Thị Trang Chủ" nếu muốn hiển thị ở homepage
6. Bật "Công Khai"
7. Click "Publish"
8. Done! Sản phẩm xuất hiện ngay trên website

### Khi Muốn Chỉnh Sửa Giá:

1. Vào Admin → Sản Phẩm
2. Tìm sản phẩm cần sửa
3. Sửa field "Giá" và "Giá Số"
4. Click "Publish"
5. Giá cập nhật ngay lập tức

### Khi Muốn Ẩn Sản Phẩm Tạm Thời:

1. Vào Admin → Sản Phẩm
2. Mở sản phẩm cần ẩn
3. Tắt "Công Khai"
4. Click "Publish"
5. Sản phẩm biến mất khỏi website (nhưng vẫn lưu trong admin)

---

## 🎨 CÁC TRƯỜNG QUAN TRỌNG

### Trường BẮT BUỘC:
- Tên Xe ⭐
- Đường Dẫn (Slug) ⭐
- Giá ⭐
- Hình Ảnh Chính ⭐

### Trường KHUYÊN ĐIỀN:
- Giá Số (để sort/filter)
- Nhãn/Badge (tăng tỷ lệ click)
- Thông số kỹ thuật (khách hàng cần biết)
- Mô tả chi tiết (SEO tốt hơn)
- Tính năng nổi bật (highlight USP)
- Danh mục (giúp lọc)
- Thứ tự sắp xếp (kiểm soát vị trí hiển thị)

### Trường TÙY CHỌN:
- Hình ảnh phụ
- Thương hiệu
- Tags

---

## 📊 GIỚI HẠN FREE PLAN

### Sanity Free Plan:
- ✅ 3 admin users
- ✅ 10GB bandwidth/tháng
- ✅ Unlimited documents
- ✅ Unlimited API requests
- ✅ 5GB assets (ảnh/video)

**Lưu ý:** Với website xe tải vừa và nhỏ, free plan đủ dùng!

---

## 🔒 BẢO MẬT

- ✅ Chỉ admin đăng nhập mới vào được `/admin`
- ✅ Public API chỉ đọc dữ liệu đã publish
- ✅ Draft không hiển thị cho user
- ✅ CORS policy bảo vệ API

---

## 📞 SUPPORT

Nếu cần thêm tính năng:
- 📧 Email support
- 📱 Live chat
- 📚 Docs: https://www.sanity.io/docs

---

**Mọi thao tác đều REALTIME, không cần refresh browser!** 🎉
