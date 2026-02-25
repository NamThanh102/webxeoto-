import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Sản Phẩm',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tên Xe',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Đường Dẫn (Slug)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Giá',
      type: 'string',
      description: 'Nhập giá hoặc "Liên Hệ"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceNumber',
      title: 'Giá Số (để sort/filter)',
      type: 'number',
      description: 'Nhập giá dạng số để sort/filter (VD: 245000000). Để trống nếu "Liên Hệ"',
    }),
    defineField({
      name: 'image',
      title: 'Hình Ảnh Chính',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Hình Ảnh Thêm',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'badge',
      title: 'Nhãn',
      type: 'string',
      description: 'VD: Bán Chạy, Mới Nhất, Ưu Đãi',
    }),
    defineField({
      name: 'specifications',
      title: 'Thông Số Kỹ Thuật',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Tiêu Đề' },
            { name: 'value', type: 'string', title: 'Giá Trị' },
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Mô Tả Chi Tiết',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Mô tả ảnh (Alt text)',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Chú thích ảnh',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Tính Năng Nổi Bật',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'category',
      title: 'Danh Mục',
      type: 'string',
      options: {
        list: [
          { title: 'Xe Tải Nhỏ', value: 'small' },
          { title: 'Xe Tải Trung', value: 'medium' },
          { title: 'Xe Tải Lớn', value: 'large' },
          { title: 'Xe Đầu Kéo', value: 'tractor' },
        ],
      },
    }),
    defineField({
      name: 'brand',
      title: 'Thương Hiệu',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Hiển Thị Trang Chủ',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'published',
      title: 'Công Khai',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Thứ Tự Sắp Xếp',
      type: 'number',
      description: 'Số nhỏ sẽ hiển thị trước',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'price',
    },
  },
})
