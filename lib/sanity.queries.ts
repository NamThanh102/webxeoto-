import { client } from './sanity.client'

// ==================== PRODUCT QUERIES ====================

export interface Product {
  _id: string
  name: string
  slug: { current: string }
  price: string
  priceNumber?: number
  image: any
  images?: any[]
  badge?: string
  category?: string
  brand?: string
  specifications?: Array<{ label: string; value: string }>
  description?: any[]
  features?: string[]
}

/**
 * Lấy 8 sản phẩm featured cho trang chủ
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const query = `*[_type == "product" && featured == true && published == true] 
  | order(order asc)[0...8]{
    _id,
    name,
    slug,
    price,
    image,
    badge
  }`
  
  try {
    const products = await client.fetch(query)
    return products
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

/**
 * Lấy tất cả sản phẩm (cho trang danh sách)
 */
export async function getAllProducts(): Promise<Product[]> {
  const query = `*[_type == "product" && published == true] 
  | order(_createdAt desc){
    _id,
    name,
    slug,
    price,
    priceNumber,
    image,
    badge,
    category,
    brand
  }`
  
  try {
    const products = await client.fetch(query)
    return products
  } catch (error) {
    console.error('Error fetching all products:', error)
    return []
  }
}

/**
 * Lấy chi tiết 1 sản phẩm theo slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    price,
    priceNumber,
    image,
    images,
    badge,
    specifications,
    description,
    features,
    category,
    brand
  }`
  
  try {
    const product = await client.fetch(query, { slug })
    return product || null
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
}

/**
 * Lấy slugs của tất cả sản phẩm (cho generateStaticParams)
 */
export async function getAllProductSlugs(): Promise<string[]> {
  const query = `*[_type == "product" && published == true].slug.current`
  
  try {
    const slugs = await client.fetch(query)
    return slugs
  } catch (error) {
    console.error('Error fetching product slugs:', error)
    return []
  }
}

// ==================== NEWS QUERIES ====================

export interface News {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  image: any
  publishedAt: string
  content?: any[]
  category?: string
  tags?: string[]
}

/**
 * Lấy 4 tin tức featured cho trang chủ
 */
export async function getFeaturedNews(): Promise<News[]> {
  const query = `*[_type == "news" && featured == true && published == true] 
  | order(publishedAt desc)[0...4]{
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
    console.error('Error fetching featured news:', error)
    return []
  }
}

/**
 * Lấy tất cả tin tức (cho trang danh sách)
 */
export async function getAllNews(): Promise<News[]> {
  const query = `*[_type == "news" && published == true] 
  | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    image,
    publishedAt,
    category
  }`
  
  try {
    const news = await client.fetch(query)
    return news
  } catch (error) {
    console.error('Error fetching all news:', error)
    return []
  }
}

/**
 * Lấy chi tiết 1 tin tức theo slug
 */
export async function getNewsBySlug(slug: string): Promise<News | null> {
  const query = `*[_type == "news" && slug.current == $slug][0]{
    _id,
    title,
    excerpt,
    image,
    content,
    publishedAt,
    category,
    tags
  }`
  
  try {
    const news = await client.fetch(query, { slug })
    return news || null
  } catch (error) {
    console.error('Error fetching news by slug:', error)
    return null
  }
}

/**
 * Lấy slugs của tất cả tin tức (cho generateStaticParams)
 */
export async function getAllNewsSlugs(): Promise<string[]> {
  const query = `*[_type == "news" && published == true].slug.current`
  
  try {
    const slugs = await client.fetch(query)
    return slugs
  } catch (error) {
    console.error('Error fetching news slugs:', error)
    return []
  }
}
