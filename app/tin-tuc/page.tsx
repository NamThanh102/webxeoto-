import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowLeft } from 'lucide-react'
import { client, urlFor } from '@/lib/sanity.client'

interface News {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  image: any
  publishedAt: string
}

async function getAllNews(): Promise<News[]> {
  const query = `*[_type == "news"] | order(publishedAt desc){
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

export const metadata = {
  title: 'Tin Tức - Trọng Hoàng Xe Tải',
  description: 'Tin tức và sự kiện mới nhất từ Trọng Hoàng Xe Tải',
}

export default async function NewsListPage() {
  const news = await getAllNews()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              Trọng Hoàng Xe Tải
            </Link>
            <Link
              href="/#lien-he"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Liên Hệ Ngay
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-red-700 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại trang chủ
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            TIN TỨC SỰ KIỆN
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {news.length === 0 ? (
          <div className="text-center mb-8 p-8 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-lg">
              Chưa có tin tức nào. Vui lòng truy cập{' '}
              <Link href="/admin" className="text-primary font-semibold underline">
                trang quản trị
              </Link>{' '}
              để thêm tin tức.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article) => {
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
