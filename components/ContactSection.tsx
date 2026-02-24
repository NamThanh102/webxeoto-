'use client'

import { useState } from 'react'
import { Send, User, Phone, MessageSquare } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Lấy URL từ environment variable
      const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

      if (!scriptURL) {
        alert('⚠️ Chưa cấu hình Google Sheets URL. Xem file GOOGLE_SHEETS_SETUP.md')
        setIsSubmitting(false)
        return
      }

      // Gửi dữ liệu đến Google Sheets
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // Reset form
      setFormData({ fullName: '', phone: '', message: '' })
      alert('✅ Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.')
      
    } catch (error) {
      console.error('Error:', error)
      alert('❌ Có lỗi xảy ra. Vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="lien-he" className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              LIÊN HỆ VỚI CHÚNG TÔI
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-gray-600">
              Để lại thông tin, chúng tôi sẽ liên hệ tư vấn cho bạn
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và tên <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nội dung tin nhắn
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Nhập nội dung cần tư vấn..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-lg transition-colors flex items-center justify-center gap-3 mx-auto shadow-lg hover:shadow-xl ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>ĐANG GỬI...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>GỬI THÔNG TIN</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Hotline</h3>
              <p className="text-primary font-semibold">084 562 2000</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">ZaLo</h3>
              <p className="text-primary font-semibold">0845.62.2000</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Địa chỉ</h3>
              <p className="text-gray-600 text-sm">883 Đ.Quang Trung, Phú Lương, Hà Nội</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
