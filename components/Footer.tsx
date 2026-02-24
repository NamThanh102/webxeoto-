import { Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold">ÔTÔ</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">TÂY ĐÔ</h3>
              </div>
            </div>
            <p className="text-sm mb-4">
              Đại lý xe tải uy tín hàng đầu tại khu vực miền Tây, chuyên cung cấp các dòng xe tải chất lượng cao.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Youtube className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Liên kết</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#gioi-thieu" className="hover:text-primary transition-colors">Giới thiệu</a></li>
              <li><a href="#san-pham" className="hover:text-primary transition-colors">Sản phẩm</a></li>
              <li><a href="#tin-tuc" className="hover:text-primary transition-colors">Tin tức</a></li>
              <li><a href="#tien-ich" className="hover:text-primary transition-colors">Tiện ích</a></li>
              <li><a href="#lien-he" className="hover:text-primary transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Sản phẩm</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Xe tải nhẹ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Xe tải trung</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Xe tải nặng</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Xe chuyên dụng</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Phụ tùng xe tải</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Thông tin liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span>Tây Đô, Cần Thơ, Việt Nam</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <a href="tel:0983995596" className="hover:text-primary transition-colors">0983 99 55 96</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                <a href="mailto:autotaydohn@gmail.com" className="hover:text-primary transition-colors">autotaydohn@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2024 Ô Tô Tây Đô. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
