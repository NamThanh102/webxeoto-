'use client'

import { useState } from 'react'
import { Phone, Mail, Search, Facebook, Youtube, Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { label: 'GIỚI THIỆU', href: '#gioi-thieu' },
    { label: 'TIN TỨC', href: '#tin-tuc' },
    { label: 'SẢN PHẨM', href: '#san-pham' },
    { label: 'LIÊN HỆ', href: '#lien-he' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-xs md:text-sm">
            <div className="flex items-center gap-3 md:gap-6">
              <div className="flex items-center gap-1 md:gap-2 text-gray-700">
                <Phone className="w-3 h-3 md:w-4 md:h-4" />
                <span className="whitespace-nowrap">Hotline: <a href="tel:084 562 2000" className="hover:text-primary font-semibold">084 562 2000</a></span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4" />
                <span>Email: <a href="mailto:autotaydohn@gmail.com" className="hover:text-primary">autotaydohn@gmail.com</a></span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/profile.php?id=61581384503760" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@tronghoangxetai" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">ÔTÔ</span>
                </div>
                <div className="hidden md:block">
                  <div className="text-xl font-bold text-gray-800">TÂY ĐÔ</div>
                  <div className="text-xs text-gray-600">Đại lý xe tải uy tín</div>
                </div>
              </a>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-6">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Search and Mobile Menu */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5 text-gray-700" />
              </button>
              
              <button 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
