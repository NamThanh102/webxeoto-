import { client, urlFor } from '@/lib/sanity.client'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft } from 'lucide-react'
import { PortableText } from '@portabletext/react'

interface News {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  image: any
  publishedAt: string
  content: any[]
}

async function getNews(slug: string): Promise<News | null> {
  const query = `*[_type == "news" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    image,
    publishedAt,
    content
  }`
  
  return await client.fetch(query, { slug })
}

async function getAllNewsSlugs() {
  const query = `*[_type == "news"]{ "slug": slug.current }`
  return await client.fetch(query)
}

export async function generateStaticParams() {
  const news = await getAllNewsSlugs()
  return news.map((article: { slug: string }) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getNews(slug)
  
  if (!article) {
    return {
      title: 'Tin tức không tồn tại',
    }
  }

  return {
    title: `${article.title} - Trọng Hoàng Xe Tải`,
    description: article.excerpt,
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getNews(slug)

  if (!article) {
    notFound()
  }

  const imageUrl = article.image
    ? urlFor(article.image).width(1200).height(600).url()
    : '/news-placeholder.jpg'

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

      {/* News Detail */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 text-primary hover:text-red-700 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách tin tức
          </Link>
        </div>

        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-96 w-full">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="p-6 md:p-10">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.publishedAt).toLocaleDateString('vi-VN')}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-lg text-gray-600 mb-8 italic border-l-4 border-primary pl-4">
                {article.excerpt}
              </p>
            )}

            {article.content && article.content.length > 0 && (
              <div className="prose max-w-none">
                <PortableText
                  value={article.content}
                  components={{
                    types: {
                      image: ({ value }: any) => {
                        if (!value?.asset?._ref) return null
                        return (
                          <figure className="my-6">
                            <Image
                              src={urlFor(value).width(800).url()}
                              alt={value.alt || 'News image'}
                              width={800}
                              height={600}
                              className="rounded-lg w-full h-auto"
                            />
                            {value.caption && (
                              <figcaption className="text-center text-sm text-gray-600 mt-2">
                                {value.caption}
                              </figcaption>
                            )}
                          </figure>
                        )
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        </article>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/tin-tuc"
            className="inline-block text-primary hover:text-red-700 font-semibold"
          >
            ← Quay lại danh sách tin tức
          </Link>
        </div>
      </main>
    </div>
  )
}
