import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity.client'

interface News {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  image: any
  publishedAt: string
}

async function getFeaturedNews(): Promise<News[]> {
  const query = `*[_type == "news" && featured == true && published == true] | order(publishedAt desc)[0...4]{
    _id,
    title,
    slug,
    excerpt,
    image,
    publishedAt
  }`
  
  try {
    const news = await client.fetch(query)
    return news
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

// Fallback data for when Sanity is not configured yet
const fallbackNews = [
  {
    id: 1,
    title: 'DARSAN MOTORS CÙNG BẠN LỰA XE TỐ TÍNH GIÁ PHẦN XÁ CHÍ NHÁNH NHI ĐỒNG - BẾN LỨC',
    excerpt: '100% Xe tốt - Đáp ứng nhu cầu vận chuyển hàng hóa hiệu quả với các dòng xe tải chất lượng cao từ Darsan Motors...',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop',
    date: '2024-09-15',
  },
  {
    id: 2,
    title: 'DARSAN MOTORS LỬI BOI TRONG LÉ PHÍ PHƯỚC ĐẠI CẢNH GIỚI VÀ LÁM THÁC TỤNG TRONG QUY 09/2024',
    excerpt: 'Sự kiện khai trương chi nhánh mới với nhiều ưu đãi hấp dẫn dành cho khách hàng trong tháng 9...',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&h=400&fit=crop',
    date: '2024-09-10',
  },
  {
    id: 3,
    title: 'QUAY QUÀ ẢNH NGỌC ĐỂ TERA HN - XE TẢI VĂN BẢO KÝ',
    excerpt: 'Chương trình quay số may mắn với giải thưởng hấp dẫn khi mua xe tải trong tháng này...',
    image: 'https://images.unsplash.com/photo-1586768488954-0ef5a6a36b2c?w=600&h=400&fit=crop',
    date: '2024-08-28',
  },
  {
    id: 4,
    title: 'SỰ KIỆN TRUNG BẢN VÀ GIỚI THIỆU',
    excerpt: 'Tìm hiểu về các dòng xe tải mới nhất và công nghệ tiên tiến được áp dụng trong sản xuất...',
    image: 'https://images.unsplash.com/photo-1511994477422-b69e44bd4ea9?w=600&h=400&fit=crop',
    date: '2024-08-20',
  },
]

export default async function NewsSection() {
  // Try to fetch news from Sanity
  const sanityNews = await getFeaturedNews()
  
  // Use Sanity news if available, otherwise use fallback data (but show empty state)
  const hasNews = sanityNews.length > 0
  const newsToDisplay = hasNews ? sanityNews : []
  
  return (
    <section id="tin-tuc" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            TIN TỨC SỰ KIỆN
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {!hasNews && (
          <div className="text-center mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              Chưa có tin tức nào. Vui lòng truy cập{' '}
              <a href="/admin" className="text-primary font-semibold underline">
                trang quản trị
              </a>{' '}
              để thêm tin tức.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsToDisplay.map((article) => {
            const imageUrl = article.image
              ? urlFor(article.image).width(600).height(400).url()
              : '/news-placeholder.jpg'
            
            return (
              <Link
                key={article._id}
                href={`/tin-tuc/${article.slug.current}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group border border-gray-200"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.publishedAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <span className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>Đọc thêm</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/tin-tuc"
            className="inline-block bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-8 rounded-full border-2 border-gray-300 transition-colors"
          >
            Xem tất cả tin tức
          </Link>
        </div>
      </div>
    </section>
  )
}
