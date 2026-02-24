# Web Xe Ô Tô Tây Đô

A fully responsive, production-ready landing page for a truck dealership built with Next.js, React, and Tailwind CSS.

## Tech Stack

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (for icons)

## Features

- ✅ Fully responsive design (mobile-first approach)
- ✅ Sticky header with navigation and top bar
- ✅ Hero section with auto-rotating banner slider
- ✅ Featured products grid with 8+ truck models
- ✅ News & events section
- ✅ Contact form with Google Sheets integration
- ✅ Floating action buttons (Zalo, Phone, Messenger)
- ✅ Professional footer with company info

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Google Sheets Integration (Optional)

To receive form submissions in Google Sheets:

1. **Follow the detailed guide:** See [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)
2. **Create `.env.local` file:**
   ```bash
   cp .env.local.example .env.local
   ```
3. **Add your Google Apps Script URL** to `.env.local`
4. **Restart the dev server**

### Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment & Domain

See detailed guide: **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**

### Quick Deploy to Vercel (Free):

1. Push code to GitHub
2. Import to Vercel: https://vercel.com/new
3. Add environment variable: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
4. Deploy → Get free subdomain: `yoursite.vercel.app`

### Get Custom Domain:

- **Vietnam (.vn):** ~200,000 VNĐ/year at [INET](https://inet.vn)
- **International (.com):** ~$10/year at [Namecheap](https://namecheap.com)

## Project Structure

```
webxeoto/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Sticky header with navigation
│   ├── HeroSection.tsx     # Banner slider & promo strip
│   ├── FeaturedProducts.tsx # Products grid
│   ├── NewsSection.tsx     # News articles
│   ├── ContactSection.tsx  # Contact form
│   ├── FloatingActions.tsx # Floating buttons
│   └── Footer.tsx          # Footer
├── public/                 # Static assets
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Customization

### Update Mock Data

- **Trucks**: Edit the `trucks` array in `components/FeaturedProducts.tsx`
- **News**: Edit the `newsArticles` array in `components/NewsSection.tsx`
- **Banners**: Edit the `banners` array in `components/HeroSection.tsx`

### Update Contact Info

Update phone numbers, email, and social links in:
- `components/Header.tsx`
- `components/HeroSection.tsx`
- `components/Footer.tsx`
- `components/FloatingActions.tsx`

### Colors

The primary color (red) is defined in `tailwind.config.js`. You can customize it there.

## License

This project is created for educational purposes.
