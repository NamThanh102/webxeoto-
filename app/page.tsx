import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import NewsSection from '@/components/NewsSection'
import ContactSection from '@/components/ContactSection'
import FloatingActions from '@/components/FloatingActions'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <NewsSection />
      <ContactSection />
      <Footer />
      <FloatingActions />
    </main>
  )
}
