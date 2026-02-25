import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', // Sử dụng API version mới nhất
  useCdn: true, // Bật CDN cho tốc độ tải nhanh hơn (cho production)
})

// Helper để tạo URL cho ảnh
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
