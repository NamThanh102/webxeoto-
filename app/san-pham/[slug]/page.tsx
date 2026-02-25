import { client, urlFor } from '@/lib/sanity.client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Phone, Mail, MessageCircle } from 'lucide-react'
import { PortableText } from '@portabletext/react'

interface Product {
  _id: string
  name: string
  slug: { current: string }
  price: string
  priceNumber?: number
  image: any
  images?: any[]
  badge?: string
  description?: any[]
  specifications?: { label: string; value: string }[]
  features?: string[]
  category?: string
  brand?: string
}

async function getProduct(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    price,
    priceNumber,
    image,
    images,
    badge,
    description,
    specifications,
    features,
    category,
    brand
  }`
  
  return await client.fetch(query, { slug })
}

async function getAllProductSlugs() {
  const query = `*[_type == "product"]{ "slug": slug.current }`
  return await client.fetch(query)
}

export async function generateStaticParams() {
  const products = await getAllProductSlugs()
  return products.map((product: { slug: string }) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    return {
      title: 'Sản phẩm không tồn tại',
    }
  }

  return {
    title: `${product.name} - Trọng Hoàng Xe Tải`,
    description: `Chi tiết sản phẩm ${product.name}. Giá: ${product.price}`,
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  let mainImage = '/truck-placeholder.jpg'
  let additionalImages: string[] = []

  try {
    if (product.image) {
      mainImage = urlFor(product.image).width(800).height(600).url()
    }
    if (product.images && product.images.length > 0) {
      additionalImages = product.images.map((img) => urlFor(img).width(800).height(600).url())
    }
  } catch (error) {
    console.error('Error processing images:', error)
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

      {/* Product Detail */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    {product.badge}
                  </span>
                )}
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {additionalImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {additionalImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={img}
                        alt={`${product.name} - Ảnh ${idx + 2}`}
                        fill
                        className="object-cover hover:opacity-75 transition-opacity cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                {product.brand && (
                  <p className="text-gray-600">Thương hiệu: {product.brand}</p>
                )}
              </div>

              <div className="border-t border-b py-4">
                <p className="text-sm text-gray-600 mb-1">Giá bán:</p>
                <p className="text-4xl font-bold text-primary">
                  {product.price}
                  {product.priceNumber && <span className="text-2xl"> VNĐ</span>}
                </p>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-3">Tính năng nổi bật</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact Buttons */}
              <div className="space-y-3 pt-4">
                <a
                  href="tel:0123456789"
                  className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Phone size={20} />
                  <span className="font-semibold">Gọi Ngay: 084 562 2000</span>
                </a>
                <a
                  href="https://zalo.me/0845622000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle size={20} />
                  <span className="font-semibold">Chat Zalo</span>
                </a>
                <a
                  href="/#lien-he"
                  className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Mail size={20} />
                  <span className="font-semibold">Gửi Yêu Cầu Tư Vấn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="border-t px-6 md:px-8 py-6">
              <h2 className="text-2xl font-bold mb-4">Thông số kỹ thuật</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {product.specifications.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between py-3 border-b border-gray-200 last:border-0"
                  >
                    <span className="font-semibold text-gray-700">{spec.label}:</span>
                    <span className="text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {product.description && product.description.length > 0 && (
            <div className="border-t px-6 md:px-8 py-6">
              <h2 className="text-2xl font-bold mb-4">Mô tả chi tiết</h2>
              <div className="prose max-w-none">
                <PortableText 
                  value={product.description}
                  components={{
                    types: {
                      image: ({ value }: any) => {
                        if (!value?.asset?._ref) return null
                        return (
                          <figure className="my-6">
                            <Image
                              src={urlFor(value).width(800).url()}
                              alt={value.alt || 'Product image'}
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
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <a
            href="/#san-pham"
            className="inline-block text-primary hover:text-red-700 font-semibold"
          >
            ← Quay lại danh sách sản phẩm
          </a>
        </div>
      </main>
    </div>
  )
}
