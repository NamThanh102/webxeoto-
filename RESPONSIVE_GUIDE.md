# Hướng dẫn kiểm tra Responsive (Mobile)

Website đã được tối ưu **100% responsive** cho mọi thiết bị!

## 🎯 Responsive Breakpoints

Website sử dụng Tailwind CSS với các điểm ngắt chuẩn:

| Kích thước | Thiết bị | Breakpoint |
|------------|----------|------------|
| < 640px | Mobile nhỏ | `(default)` |
| ≥ 640px | Mobile lớn/Tablet nhỏ | `sm:` |
| ≥ 768px | Tablet | `md:` |
| ≥ 1024px | Laptop | `lg:` |
| ≥ 1280px | Desktop | `xl:` |

---

## 📱 Cách test trên trình duyệt

### Cách 1: Chrome DevTools (Khuyên dùng)

1. Mở website: http://localhost:3000
2. Nhấn **F12** hoặc **Ctrl+Shift+I**
3. Nhấn icon **Toggle device toolbar** (Ctrl+Shift+M)
4. Chọn thiết bị:
   - iPhone SE (375x667)
   - iPhone 14 Pro (393x852)
   - Samsung Galaxy S20 (360x800)
   - iPad (768x1024)
   - Desktop (1920x1080)

5. Test các tính năng:
   - ☑️ Menu mobile (icon 3 gạch)
   - ☑️ Slider banner
   - ☑️ Grid sản phẩm (1 cột mobile → 4 cột desktop)
   - ☑️ Form liên hệ
   - ☑️ Floating buttons
   - ☑️ Footer

### Cách 2: Thay đổi kích thước trình duyệt

1. Thu nhỏ cửa sổ browser
2. Kéo rộng dần và xem layout thay đổi

### Cách 3: Test trên thiết bị thật

1. Chạy server: `npm run dev`
2. Tìm IP máy tính (mở CMD → gõ `ipconfig`)
3. Trên điện thoại cùng WiFi, mở trình duyệt:
   ```
   http://192.168.x.x:3000
   ```
   (Thay `192.168.x.x` bằng IP thật của máy)

---

## ✅ Checklist Responsive

### Header
- ✅ Logo hiển thị đầy đủ trên desktop
- ✅ Logo rút gọn trên mobile
- ✅ Menu desktop ẩn, hiện hamburger menu trên mobile
- ✅ Top bar: Email ẩn trên mobile, chỉ hiện Hotline

### Hero Banner
- ✅ Chiều cao responsive: 300px mobile → 600px desktop
- ✅ Text kích thước tự động: nhỏ mobile → lớn desktop
- ✅ Navigation arrows: nhỏ mobile → lớn desktop
- ✅ Promotional strip: Dọc mobile → Ngang desktop

### Sản phẩm (Featured Products)
- ✅ **Mobile:** 1 cột (toàn màn hình)
- ✅ **Tablet:** 2 cột
- ✅ **Laptop:** 3 cột
- ✅ **Desktop lớn:** 4 cột
- ✅ Card sản phẩm: responsive padding & text

### Tin tức (News)
- ✅ **Mobile:** 1 cột
- ✅ **Tablet:** 2 cột
- ✅ **Desktop:** 4 cột

### Contact Form
- ✅ **Mobile:** Các trường input xếp dọc (1 cột)
- ✅ **Desktop:** Họ tên + SĐT ngang hàng (2 cột)
- ✅ Button: Full width mobile → Auto width desktop

### Floating Buttons
- ✅ **Mobile:** Nhỏ hơn (48px), ở góc trái dưới
- ✅ **Desktop:** Lớn hơn (56px), có tooltip
- ✅ Tooltip ẩn trên mobile

### Footer
- ✅ **Mobile:** 1 cột (các phần xếp dọc)
- ✅ **Tablet:** 2 cột
- ✅ **Desktop:** 4 cột ngang hàng

---

## 🔧 Tối ưu đã thực hiện

### 1. Mobile-First Approach
Thiết kế từ mobile lên desktop, đảm bảo UX tốt trên mọi thiết bị.

### 2. Touch-Friendly
- Nút bấm kích thước tối thiểu 44x44px (chuẩn Apple)
- Khoảng cách giữa các element đủ lớn để chạm

### 3. Performance
- Lazy loading images
- Auto image optimization (Next.js Image)
- Responsive images (srcset)

### 4. Typography
- Font size tự động scale theo kích thước màn hình
- Line-height và letter-spacing tối ưu cho mobile

---

## 🎨 Responsive Classes sử dụng

```css
/* Grid */
grid-cols-1              → Mobile: 1 cột
sm:grid-cols-2           → Tablet: 2 cột
lg:grid-cols-3           → Laptop: 3 cột
xl:grid-cols-4           → Desktop: 4 cột

/* Spacing */
px-4                     → Mobile: padding 16px
md:px-8                  → Desktop: padding 32px

/* Text Size */
text-xl                  → Mobile: 1.25rem
md:text-3xl              → Desktop: 1.875rem

/* Display */
hidden                   → Ẩn trên mobile
md:block                 → Hiện từ tablet trở lên
lg:hidden                → Ẩn từ laptop trở lên
```

---

## 🐛 Troubleshooting

**Website không responsive?**
- Đảm bảo có `<meta name="viewport">` trong [app/layout.tsx](app/layout.tsx)
- Xóa cache: Ctrl+Shift+R
- Kiểm tra Tailwind đã compile chưa

**Text quá nhỏ trên mobile?**
- Đã tối ưu với `text-sm`, `text-base`, `md:text-lg`

**Images không hiện?**
- Kiểm tra kết nối internet (dùng Unsplash)
- Xem Console (F12) có lỗi không

---

## 📊 Kết quả test

✅ Tested trên:
- iPhone SE (375px)
- iPhone 14 Pro (393px)
- Samsung Galaxy S20 (360px)
- iPad (768px)
- Laptop 13" (1366px)
- Desktop 24" (1920px)

✅ 100% responsive, không scroll ngang
✅ Touch-friendly cho mobile
✅ Performance tốt trên 3G/4G
