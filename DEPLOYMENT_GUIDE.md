# Hướng dẫn Deploy & Đăng ký Tên miền

## 🚀 Cách 1: Vercel (MIỄN PHÍ - Khuyên dùng)

### ✅ Ưu điểm:
- **100% MIỄN PHÍ** (không cần thẻ tín dụng)
- Deploy tự động từ GitHub
- Tốc độ cực nhanh (CDN toàn cầu)
- Hỗ trợ Next.js tối ưu
- SSL miễn phí
- Có subdomain miễn phí: `tenwebcuaban.vercel.app`

### 📝 Các bước:

#### Bước 1: Push code lên GitHub

1. Tạo tài khoản GitHub: https://github.com/signup
2. Tạo repository mới (New repository)
3. Trong VS Code, mở Terminal:

```bash
# Khởi tạo git
git init

# Thêm tất cả file
git add .

# Commit
git commit -m "Initial commit"

# Kết nối với GitHub (thay YOUR_USERNAME và YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push code lên
git branch -M main
git push -u origin main
```

#### Bước 2: Deploy lên Vercel

1. Vào https://vercel.com/signup
2. Đăng nhập bằng tài khoản GitHub
3. Click **"Add New Project"**
4. Chọn repository vừa tạo
5. Cấu hình:
   - **Framework Preset:** Next.js (tự động nhận)
   - **Environment Variables:** 
     - Key: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
     - Value: URL Apps Script của bạn
6. Click **Deploy**
7. Đợi 2-3 phút → Website live! 🎉

**URL miễn phí:** `https://tenwebcuaban.vercel.app`

---

## 🌐 Bước 3: Đăng ký Tên miền

### Option 1: Tên miền Việt Nam (.vn)

**Nhà cung cấp uy tín:**

#### 1. **INET** (inet.vn) - Phổ biến nhất
- **.com.vn:** ~200,000 VNĐ/năm
- **.vn:** ~400,000 VNĐ/năm
- Thanh toán: Chuyển khoản, thẻ ATM

#### 2. **DIGISTAR** (digistar.vn)
- **.com.vn:** ~250,000 VNĐ/năm
- Dễ sử dụng cho người mới

#### 3. **PA Vietnam** (pavietnam.vn)
- **.com.vn:** ~150,000 VNĐ/năm
- Giá rẻ

### Option 2: Tên miền quốc tế

#### 1. **Namecheap** (namecheap.com) - Khuyên dùng
- **.com:** ~$10/năm (~250,000 VNĐ)
- **.net:** ~$12/năm
- Thanh toán: Visa/Mastercard
- Có WHOIS privacy miễn phí

#### 2. **GoDaddy** (godaddy.com)
- **.com:** ~$12/năm
- Phổ biến nhưng đắt hơn

#### 3. **Cloudflare** (cloudflare.com)
- **.com:** ~$10/năm
- Không lợi nhuận (giá gốc)
- Tích hợp CDN miễn phí

### Option 3: Tên miền miễn phí (Tạm thời)

**Freenom** (freenom.com)
- **.tk, .ml, .ga, .cf:** MIỄN PHÍ
- Chỉ dùng để test, không uy tín

---

## 🔗 Bước 4: Kết nối Tên miền với Vercel

### Sau khi mua tên miền (ví dụ: `otototaydo.com`):

1. **Trong Vercel:**
   - Vào project → **Settings** → **Domains**
   - Nhập tên miền: `otototaydo.com`
   - Click **Add**

2. **Vercel sẽ cho bạn DNS records:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Trong nhà cung cấp tên miền (INET/Namecheap):**
   - Vào **DNS Management**
   - Thêm 2 records trên
   - Lưu lại

4. **Đợi 15 phút - 24 giờ** → Tên miền hoạt động!

---

## 📊 So sánh các lựa chọn

| Platform | Giá Deploy | Tên miền | Tổng chi phí/năm |
|----------|-----------|-----------|------------------|
| **Vercel + .vn** | Miễn phí | ~200k VNĐ | ~200k VNĐ |
| **Vercel + .com** | Miễn phí | ~250k VNĐ | ~250k VNĐ |
| **Netlify + tên miền** | Miễn phí | ~200k VNĐ | ~200k VNĐ |

---

## 🎯 Gợi ý cho bạn:

### Nếu ngân sách thấp:
1. Deploy lên **Vercel** (miễn phí)
2. Dùng subdomain miễn phí: `otototaydo.vercel.app`
3. Khi có tiền → Mua tên miền sau

### Nếu muốn chuyên nghiệp:
1. Deploy lên **Vercel**
2. Mua tên miền **.com.vn** từ **INET** (~200k/năm)
3. Kết nối DNS → Có website: `otototaydo.com.vn`

### Tên miền gợi ý:
- `otototaydo.com.vn`
- `xetaitaydo.vn`
- `daisuxetai.com.vn`
- `otocantho.com.vn`

---

## 🚀 Cách 2: Netlify (Miễn phí thay thế)

Tương tự Vercel:

1. Vào https://netlify.com
2. Kéo thả thư mục dự án vào
3. Tự động deploy
4. Có subdomain: `tenwebcuaban.netlify.app`

---

## 🔧 Cách 3: Hosting Việt Nam (Trả phí)

**Nếu cần hỗ trợ tiếng Việt:**

### INET (inet.vn)
- **Hosting WordPress:** ~500k VNĐ/năm
- **VPS:** ~1.5 triệu VNĐ/năm
- Cần cài Node.js thủ công

### Azdigi (azdigi.com)
- **Hosting Node.js:** ~600k VNĐ/năm
- Hỗ trợ Next.js

**Lưu ý:** Hosting VN phức tạp hơn, cần kiến thức server.

---

## ✅ Khuyến nghị của tôi:

### Bước 1: Deploy thử miễn phí
```bash
# Deploy lên Vercel ngay
vercel
```

### Bước 2: Test với subdomain miễn phí
`https://webxeoto.vercel.app`

### Bước 3: Nếu hài lòng → Mua tên miền
- **INET:** Mua `.com.vn` (~200k/năm)
- **Namecheap:** Mua `.com` (~250k/năm)

### Bước 4: Kết nối tên miền
- Thêm DNS records vào nhà cung cấp
- Đợi 24h → Xong!

---

## 📞 Tôi có thể giúp gì tiếp?

1. **Cần hướng dẫn deploy lên Vercel chi tiết?**
2. **Cần giúp đăng ký tên miền?**
3. **Muốn tối ưu SEO cho website?**

Cho tôi biết bạn chọn cách nào nhé! 🚀
