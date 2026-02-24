import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import NewsSection from '@/components/NewsSection'
import ContactSection from '@/components/ContactSection'
import FloatingActions from '@/components/FloatingActions'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'

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
      <ContactModal />
    </main>
  )
}
