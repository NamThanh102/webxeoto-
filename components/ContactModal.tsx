'use client'

import { useState, useEffect } from 'react'
import { X, Send, User, Phone, MessageSquare } from 'lucide-react'

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Đảm bảo component chỉ render ở client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Hiển thị modal sau 1 giây khi load trang
  useEffect(() => {
    if (!isMounted) return
    
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [isMounted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

      if (!scriptURL) {
        alert('⚠️ Chưa cấu hình Google Sheets URL')
        setIsSubmitting(false)
        return
      }

      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      setFormData({ fullName: '', phone: '', message: '' })
      alert('✅ Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.')
      setIsOpen(false)
      
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

  // Không render gì cho đến khi component được mount ở client
  if (!isMounted || !isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm animate-fadeIn"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-red-600 text-white p-6 rounded-t-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-2">🎉 Ưu đãi đặc biệt!</h2>
            <p className="text-sm opacity-90">Để lại thông tin để nhận tư vấn miễn phí</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="modal-fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="modal-fullName"
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
                <label htmlFor="modal-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="modal-message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nội dung tin nhắn
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    id="modal-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Xe nào bạn quan tâm?"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Để sau
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Gửi ngay</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Chúng tôi cam kết bảo mật thông tin của bạn
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
