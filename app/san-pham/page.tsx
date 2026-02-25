'use client'

import { useState, useEffect } from 'react'
import { client, urlFor } from '@/lib/sanity.client'
import Image from 'next/image'
import Link from 'next/link'
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react'

interface Product {
  _id: string
  name: string
  slug: { current: string }
  price: string
  priceNumber?: number
  image: any
  badge?: string
  category?: string
  brand?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [loading, setLoading] = useState(true)

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product" && published == true]{
        _id,
        name,
        slug,
        price,
        priceNumber,
        image,
        badge,
        category,
        brand,
        order
      } | order(order asc)`
      
      try {
        const data = await client.fetch(query)
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Apply filters and search
  useEffect(() => {
    let result = [...products]

    // Search by name
    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (category !== 'all') {
      result = result.filter((product) => product.category === category)
    }

    // Filter by price range
    if (priceRange.min !== '' || priceRange.max !== '') {
      result = result.filter((product) => {
        if (!product.priceNumber) return true // Keep "Liên Hệ" products
        
        const min = priceRange.min ? parseFloat(priceRange.min) * 1000000 : 0
        const max = priceRange.max ? parseFloat(priceRange.max) * 1000000 : Infinity
        
        return product.priceNumber >= min && product.priceNumber <= max
      })
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => {
        if (!a.priceNumber) return 1
        if (!b.priceNumber) return -1
        return a.priceNumber - b.priceNumber
      })
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => {
        if (!a.priceNumber) return 1
        if (!b.priceNumber) return -1
        return b.priceNumber - a.priceNumber
      })
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(result)
  }, [searchTerm, category, sortBy, priceRange, products])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-primary">
              Trọng Hoàng Xe Tải
            </a>
            <a
              href="/#lien-he"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Liên Hệ Ngay
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Tất Cả Sản Phẩm
        </h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <SlidersHorizontal size={16} />
                Danh mục
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Tất cả</option>
                <option value="small">Xe Tải Nhỏ</option>
                <option value="medium">Xe Tải Trung</option>
                <option value="large">Xe Tải Lớn</option>
                <option value="tractor">Xe Đầu Kéo</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <ArrowUpDown size={16} />
                Sắp xếp
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="default">Mặc định</option>
                <option value="name">Tên A-Z</option>
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold mb-2">Giá từ (triệu)</label>
              <input
                type="number"
                placeholder="0"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Đến (triệu)</label>
              <input
                type="number"
                placeholder="1000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm || category !== 'all' || sortBy !== 'default' || priceRange.min || priceRange.max) && (
            <button
              onClick={() => {
                setSearchTerm('')
                setCategory('all')
                setSortBy('default')
                setPriceRange({ min: '', max: '' })
              }}
              className="mt-4 text-primary hover:text-red-700 font-semibold text-sm"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="mb-4 text-gray-600">
          Hiển thị {filteredProducts.length} / {products.length} sản phẩm
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Không tìm thấy sản phẩm nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const imageUrl = product.image
                ? urlFor(product.image).width(400).height(300).url()
                : '/truck-placeholder.jpg'

              return (
                <Link
                  key={product._id}
                  href={`/san-pham/${product.slug.current}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative aspect-[4/3]">
                    {product.badge && (
                      <span className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
                        {product.badge}
                      </span>
                    )}
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary">
                      {product.name}
                    </h3>
                    <p className="text-primary text-xl font-bold">{product.price}</p>
                    <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                      Xem Chi Tiết
                    </button>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <a href="/" className="inline-block text-primary hover:text-red-700 font-semibold">
            ← Về Trang Chủ
          </a>
        </div>
      </main>
    </div>
  )
}
