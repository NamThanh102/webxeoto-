# 📊 PHÂN TÍCH & TỐI ƯU PROJECT TRỌNG HOÀNG XE TẢI

## 🏗️ 1. KIẾN TRÚC TỔNG QUAN

### Stack Công Nghệ
```
┌─────────────────────────────────────────────┐
│           TECH STACK                        │
├─────────────────────────────────────────────┤
│ Frontend:  Next.js 16 (App Router)          │
│ UI:        React 19 + TypeScript            │
│ Styling:   Tailwind CSS                     │
│ Icons:     Lucide React                     │
│ CMS:       Sanity v5                        │
│ Deploy:    Vercel                           │
└─────────────────────────────────────────────┘
```

### Cấu trúc Thư Mục
```
webxeoto/
├── 📁 app/                    # Next.js App Router
│   ├── layout.tsx             # Root layout (metadata, fonts)
│   ├── page.tsx               # Trang chủ (/), revalidate: 60s
│   ├── globals.css            # Tailwind CSS imports
│   │
│   ├── 📁 admin/              # Sanity Studio Admin
│   │   └── [[...tool]]/       # Catch-all route
│   │       └── page.tsx       # Client Component (Sanity UI)
│   │
│   ├── 📁 san-pham/           # Product Pages
│   │   ├── page.tsx           # Product List (Client-side filtering)
│   │   └── [slug]/            # Dynamic Product Detail
│   │       └── page.tsx       # Server Component, revalidate: 60s
│   │
│   └── 📁 tin-tuc/            # News Pages
│       ├── page.tsx           # News List, revalidate: 60s
│       └── [slug]/            # Dynamic News Detail
│           └── page.tsx       # Server Component, revalidate: 60s
│
├── 📁 components/             # React Components (Server Components)
│   ├── Header.tsx             # Navigation + Contact info
│   ├── HeroSection.tsx        # Homepage slider
│   ├── FeaturedProducts.tsx   # Fetch featured products từ Sanity
│   ├── NewsSection.tsx        # Fetch featured news từ Sanity
│   ├── ContactSection.tsx     # Contact form
│   ├── FloatingActions.tsx    # Sticky Phone/Zalo buttons
│   ├── Footer.tsx             # Footer với social links
│   └── ContactModal.tsx       # Modal liên hệ
│
├── 📁 lib/                    # Utilities
│   └── sanity.client.ts       # Sanity client config + urlFor helper
│
├── 📁 schemas/                # Sanity Content Models
│   ├── index.ts               # Export all schemas
│   ├── product.ts             # Product schema (14 fields)
│   └── news.ts                # News schema (10 fields)
│
├── .env.local                 # Environment variables (Sanity credentials)
├── .npmrc                     # npm config (legacy-peer-deps)
├── next.config.js             # Image domains, build config
├── sanity.config.ts           # Sanity Studio config (basePath: /admin)
├── tailwind.config.js         # Tailwind customization
└── tsconfig.json              # TypeScript config
```

---

## 🔄 2. LUỒNG DỮ LIỆU (DATA FLOW)

### A. Luồng Sanity CMS → Frontend

```
┌─────────────────────────────────────────────────────────────┐
│                    SANITY CMS WORKFLOW                       │
└─────────────────────────────────────────────────────────────┘

1️⃣ CONTENT CREATION (Admin - Client Side)
   https://tronghoangxetai.vercel.app/admin
   ↓
   [Sanity Studio UI]
   ↓
   User tạo/sửa: Product hoặc News
   ↓
   Save → Lưu vào Sanity Cloud (Dataset: production)

2️⃣ FRONTEND QUERY (Server Side - ISR)
   ↓
   Next.js Page/Component (Server Component)
   ↓
   Import { client } from '@/lib/sanity.client'
   ↓
   Fetch data với GROQ query:
   ```typescript
   const products = await client.fetch(`
     *[_type == "product" && published == true]
   `)
   ```
   ↓
   Render JSX với data

3️⃣ REVALIDATION (ISR - Incremental Static Regeneration)
   ↓
   export const revalidate = 60 (60 giây)
   ↓
   Next.js tự động re-fetch từ Sanity mỗi 60s
   ↓
   User thấy nội dung mới mà không cần rebuild
```

### B. Chi Tiết API Queries

#### 📦 Products
```typescript
// FeaturedProducts.tsx (Homepage)
*[_type == "product" && featured == true && published == true] 
| order(order asc)[0...8]{
  _id, name, slug, price, image, badge
}

// san-pham/page.tsx (Product List - Client Component)
*[_type == "product" && published == true] | order(_createdAt desc){
  _id, name, slug, price, priceNumber, image, badge, category, brand
}

// san-pham/[slug]/page.tsx (Product Detail)
*[_type == "product" && slug.current == $slug][0]{
  _id, name, price, image, images, badge,
  specifications, description, features, category, brand
}
```

#### 📰 News
```typescript
// NewsSection.tsx (Homepage)
*[_type == "news" && featured == true && published == true] 
| order(publishedAt desc)[0...4]{
  _id, title, slug, excerpt, image, publishedAt
}

// tin-tuc/page.tsx (News List)
*[_type == "news" && published == true] 
| order(publishedAt desc){
  _id, title, slug, excerpt, image, publishedAt
}

// tin-tuc/[slug]/page.tsx (News Detail)
*[_type == "news" && slug.current == $slug][0]{
  _id, title, excerpt, image, content, publishedAt
}
```

### C. Image Handling
```typescript
// lib/sanity.client.ts
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}

// Usage in components
const imageUrl = urlFor(product.image)
  .width(600)
  .height(400)
  .url()
```

---

## ⚡ 3. ĐIỂM TỐI ƯU HIỆN TẠI

### ✅ Đã Tối Ưu Tốt

1. **ISR (Incremental Static Regeneration)**
   - ✅ `revalidate = 60` trên tất cả pages động
   - ✅ Balance giữa static performance & fresh content
   - ✅ Không cần rebuild khi content thay đổi

2. **Image Optimization**
   - ✅ Next.js `<Image />` component (auto lazy-load, WebP)
   - ✅ Sanity Image CDN với `.width().height()` transform
   - ✅ Remote patterns config cho Unsplash, Sanity CDN

3. **Server Components**
   - ✅ Default Server Components (faster, SEO-friendly)
   - ✅ Client Components chỉ ở nơi cần (admin, product list filter)

4. **TypeScript**
   - ✅ Type safety cho interfaces (Product, News)
   - ✅ Catch errors sớm trong development

5. **CDN & Caching**
   - ✅ Sanity client: `useCdn: true`
   - ✅ Vercel Edge Network distribution

---

## 🚀 4. ĐIỂM CẦN TỐI ƯU THÊM

### 🔴 Priority 1 - Performance Critical

#### A. Tách Sanity Queries ra File Riêng
**Vấn đề**: Queries GROQ đang rải rác trong components, khó maintain

**Giải pháp**: Tạo `lib/sanity.queries.ts`
```typescript
// lib/sanity.queries.ts
import { client } from './sanity.client'

export async function getFeaturedProducts() {
  return client.fetch(`
    *[_type == "product" && featured == true && published == true] 
    | order(order asc)[0...8]{
      _id, name, slug, price, image, badge
    }
  `)
}

export async function getAllProducts() {
  return client.fetch(`
    *[_type == "product" && published == true] 
    | order(_createdAt desc){
      _id, name, slug, price, priceNumber, image, badge, category, brand
    }
  `)
}

export async function getProductBySlug(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id, name, price, image, images, badge,
      specifications, description, features, category, brand
    }`,
    { slug }
  )
}

// Tương tự cho News queries...
```

**Lợi ích**:
- ✅ Single source of truth cho queries
- ✅ Dễ test & reuse
- ✅ Type-safe với TypeScript generics

---

#### B. Thêm Error Boundaries
**Vấn đề**: Khi Sanity fetch lỗi, page có thể crash

**Giải pháp**: Tạo `components/ErrorBoundary.tsx`
```typescript
// app/error.tsx (Error Boundary cho toàn app)
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Có lỗi xảy ra</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="bg-primary text-white px-6 py-2 rounded"
        >
          Thử lại
        </button>
      </div>
    </div>
  )
}
```

---

#### C. Loading States
**Vấn đề**: Không có loading UI khi navigate giữa các pages

**Giải pháp**: Thêm `loading.tsx` files
```typescript
// app/san-pham/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

### 🟡 Priority 2 - Code Quality

#### D. Move Fallback Data to Separate File
**Vấn đề**: Fallback data (placeholder) chiếm nhiều dòng trong components

**Giải pháp**: Tạo `lib/fallback-data.ts`
```typescript
// lib/fallback-data.ts
export const fallbackProducts = [
  {
    id: 1,
    name: 'XE TẢI TERA 100...',
    // ...
  }
]

export const fallbackNews = [
  // ...
]

// Trong component
import { fallbackProducts } from '@/lib/fallback-data'
```

---

#### E. Refactor Product List Page to Server Component
**Vấn đề**: `san-pham/page.tsx` là Client Component (`'use client'`) vì filtering logic

**Giải pháp**: Tách thành 2 components
```typescript
// app/san-pham/page.tsx (Server Component)
import ProductGrid from '@/components/ProductGrid' // Client
import { getAllProducts } from '@/lib/sanity.queries'

export default async function ProductsPage() {
  const products = await getAllProducts()
  
  return (
    <main>
      <Header />
      <ProductGrid initialProducts={products} />
      <Footer />
    </main>
  )
}

// components/ProductGrid.tsx (Client Component)
'use client'
export default function ProductGrid({ initialProducts }) {
  const [filtered, setFiltered] = useState(initialProducts)
  // Filter logic ở đây
}
```

**Lợi ích**:
- ✅ SEO tốt hơn (products được render server-side)
- ✅ Faster initial load

---

### 🟢 Priority 3 - Nice to Have

#### F. Add Sitemap & Robots.txt
```typescript
// app/sitemap.ts
import { getAllProducts, getAllNews } from '@/lib/sanity.queries'

export default async function sitemap() {
  const products = await getAllProducts()
  const news = await getAllNews()
  
  const productUrls = products.map(p => ({
    url: `https://tronghoangxetai.vercel.app/san-pham/${p.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
  
  const newsUrls = news.map(n => ({
    url: `https://tronghoangxetai.vercel.app/tin-tuc/${n.slug.current}`,
    lastModified: new Date(n.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))
  
  return [
    {
      url: 'https://tronghoangxetai.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productUrls,
    ...newsUrls,
  ]
}

// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: 'https://tronghoangxetai.vercel.app/sitemap.xml',
  }
}
```

---

#### G. Add Structured Data (SEO)
```typescript
// app/san-pham/[slug]/page.tsx
export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug)
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: urlFor(product.image).url(),
    offers: {
      '@type': 'Offer',
      price: product.priceNumber || 0,
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
    },
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Rest of component */}
    </>
  )
}
```

---

#### H. Add Analytics & Monitoring
```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

---

## 📊 5. BUNDLE SIZE OPTIMIZATION

### Analyze Current Bundle
```bash
npm run build
# Xem output để kiểm tra page sizes
```

### Recommendations
1. **Dynamic Imports** cho Modal, Admin
```typescript
// app/page.tsx
import dynamic from 'next/dynamic'

const ContactModal = dynamic(() => import('@/components/ContactModal'), {
  ssr: false, // Không cần SSR cho modal
})
```

2. **Font Optimization**: Đã tốt (sử dụng `next/font`)

3. **Remove Unused Dependencies**:
```bash
# Check unused packages
npx depcheck
```

---

## 🔒 6. BẢO MẬT

### ✅ Đã An Toàn
- Environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`)
- Sanity CORS đã config cho production domain
- `.gitignore` đã ignore `.env.local`

### ⚠️ Cần Cải Thiện
- **Rate Limiting**: Thêm Vercel Edge Config hoặc middleware
- **CSRF Protection**: Nếu có forms POST data
- **Sanity Tokens**: Sử dụng tokens với permissions cụ thể (not full admin)

---

## 📈 7. MONITORING & DEBUGGING

### Vercel Analytics
```bash
npm i @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Error Tracking (Optional)
- **Sentry**: `npm i @sentry/nextjs`
- **LogRocket**: For session replays

---

## 🎯 8. ROADMAP ĐỀ XUẤT

### Phase 1 - Immediate (1-2 ngày)
- [ ] Tách queries ra `lib/sanity.queries.ts`
- [ ] Thêm `loading.tsx` cho mỗi route
- [ ] Thêm `error.tsx` cho error handling
- [ ] Move fallback data ra `lib/fallback-data.ts`

### Phase 2 - Short-term (1 tuần)
- [ ] Refactor Product List page thành Server Component
- [ ] Thêm sitemap.ts & robots.ts
- [ ] Add Vercel Analytics
- [ ] Optimize images (thêm blur placeholders)

### Phase 3 - Long-term (2-4 tuần)
- [ ] Thêm Structured Data (Schema.org) cho SEO
- [ ] Implement search functionality
- [ ] Add product comparison feature
- [ ] Multi-language support (EN/VI)
- [ ] Admin dashboard với analytics

---

## 📚 9. TÀI LIỆU THAM KHẢO

### Next.js 16
- [App Router Docs](https://nextjs.org/docs)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

### Sanity
- [GROQ Query Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [Image URLs](https://www.sanity.io/docs/image-urls)
- [Next.js Integration](https://www.sanity.io/plugins/next-sanity)

### Performance
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

## 🤝 10. CONTRIBUTING GUIDELINES

### Code Style
- TypeScript strict mode
- Use functional components
- Prefer Server Components, only Client when needed
- File naming: `PascalCase.tsx` for components

### Git Workflow
```bash
git checkout -b feature/ten-tinh-nang
# Code...
git add .
git commit -m "feat: mô tả ngắn gọn"
git push origin feature/ten-tinh-nang
```

### Commit Message Convention
- `feat:` - Tính năng mới
- `fix:` - Sửa bug
- `refactor:` - Refactor code
- `docs:` - Cập nhật docs
- `style:` - Format code
- `perf:` - Cải thiện performance

---

## 📞 LIÊN HỆ & HỖ TRỢ

**Developer**: Nam Thanh  
**Project**: Trọng Hoàng Xe Tải  
**Tech Stack**: Next.js 16 + Sanity v5  
**Production**: https://tronghoangxetai.vercel.app  
**Admin**: https://tronghoangxetai.vercel.app/admin  

---

**Cập nhật lần cuối**: {{ current_date }}  
**Version**: 1.0.0
