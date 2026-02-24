'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react'
import Image from 'next/image'

const banners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&h=600&fit=crop',
    title: 'Chiến Mã Tết - Phồn Vinh',
    subtitle: 'Tặng ngay 5 triệu'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1586768488954-0ef5a6a36b2c?w=1920&h=600&fit=crop',
    title: 'Ưu đãi giảm giá lên đến 10%',
    subtitle: 'Cho các dòng xe tải'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1511994477422-b69e44bd4ea9?w=1920&h=600&fit=crop',
    title: 'Hỗ trợ trả góp 0%',
    subtitle: 'Lãi suất ưu đãi'
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <section className="relative">
      {/* Banner Slider */}
      <div className="relative h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                  {banner.title}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl drop-shadow-lg">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 md:p-3 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 md:p-3 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gray-800" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-6 md:w-8' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Promotional Strip */}
      <div className="bg-gradient-to-r from-primary via-red-600 to-primary py-4 md:py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white">
              <div className="text-xl md:text-3xl font-bold">
                TRẢ TRƯỚC CHỈ TỪ <span className="text-4xl md:text-5xl">35 TRIỆU</span>
                <span className="text-sm align-top">Đ</span>
              </div>
            </div>
            <a
              href="tel:0983995596"
              className="flex items-center gap-3 bg-white text-primary px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-lg md:text-2xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Phone className="w-6 h-6 md:w-8 md:h-8" />
              <span>0983 99 55 96</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
