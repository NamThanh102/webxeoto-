import Image from 'next/image'
import { Tag } from 'lucide-react'

const trucks = [
  {
    id: 1,
    name: 'XE TẢI TERA 100 - 990KG - TẶNG 5 TRIỆU',
    price: '245.000.000',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&h=400&fit=crop',
    badge: 'XE TẢI TERA GIẢM GIÁ 2.8 TỶ'
  },
  {
    id: 2,
    name: 'XE TẢI TERACO TERA 250 TRỌ TRUNG VIAL VIOS',
    price: '245.000.000',
    image: 'https://images.unsplash.com/photo-1586768488954-0ef5a6a36b2c?w=600&h=400&fit=crop',
    badge: null
  },
  {
    id: 3,
    name: 'XE TẢI TERA 100 - 990KG - TÀI XỞ LẬN 1 LẤY ĐT LỚN HƠN 1.5 TẤN',
    price: '275.000.000',
    image: 'https://images.unsplash.com/photo-1601584117486-e5278d0e6757?w=600&h=400&fit=crop',
    badge: 'XE TẢI TERACO 5 TẤN PHANH'
  },
  {
    id: 4,
    name: 'XE TẢI TERA 250 - TERA 125 - NHỎ TRUNG NO LỆCH',
    price: '345.000.000',
    image: 'https://images.unsplash.com/photo-1511994477422-b69e44bd4ea9?w=600&h=400&fit=crop',
    badge: null
  },
  {
    id: 5,
    name: 'XE TẢI TERACO TERA 245N PHAS/TERA 245N/TERA',
    price: '210.000.000',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop',
    badge: 'XE TẢI TERA GIẢM GIÁ 2.0 TỶ'
  },
  {
    id: 6,
    name: 'TERA V2 GIẢM - XE TẢI VAN TERA 2 CHỖ VÀ 4 GIỜ NGƯNG',
    price: '291.500.000',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&h=400&fit=crop',
    badge: null
  },
  {
    id: 7,
    name: 'XE TẢI TERA V2 GIẢM - XE TẢI TERA 2 CHỖ - TERA 2 CHỖ',
    price: '229.000.000',
    image: 'https://images.unsplash.com/photo-1586768488954-0ef5a6a36b2c?w=600&h=400&fit=crop',
    badge: 'XE TẢI TERA VAN 800 KG ĐỦ LỖ XÁM'
  },
  {
    id: 8,
    name: 'TERA V2 - XE TẢI VAN TERA 2 CHỖ VÀ 6 GIỜ NGƯNG',
    price: '291.500.000',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop',
    badge: null
  },
]

export default function FeaturedProducts() {
  return (
    <section id="san-pham" className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            SẢN PHẨM NỔI BẬT
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trucks.map((truck) => (
            <div
              key={truck.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                {truck.badge && (
                  <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                    {truck.badge}
                  </div>
                )}
                <Image
                  src={truck.image}
                  alt={truck.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 line-clamp-2 min-h-[40px]">
                  {truck.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-primary font-bold text-lg">
                    <Tag className="w-4 h-4" />
                    <span>Giá: {parseInt(truck.price).toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
                <button className="mt-4 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-8 rounded-full border-2 border-gray-300 transition-colors">
            Xem tất cả sản phẩm
          </button>
        </div>
      </div>
    </section>
  )
}
