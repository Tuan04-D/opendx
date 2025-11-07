'use client';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-16">
      <div className="container mx-auto px-4">

        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Project Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <h3 className="text-xl font-bold">OpenData Insight</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Nền tảng tích hợp, chuẩn hóa và trực quan hóa dữ liệu mở từ nhiều địa phương,
              hỗ trợ phân tích và ra quyết định trong tiến trình chuyển đổi số cấp tỉnh.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Danh Mục</h3>
            <ul className="space-y-2">
              {[
                { name: "Trang Chủ", href: "/" },
                { name: "Nguồn Dữ Liệu", href: "/datasets" },
                { name: "Trực Quan Hóa", href: "/visualization" },
                { name: "Phân Tích & ML", href: "/analysis" },
                { name: "API Mở", href: "/api-docs" },
                { name: "Giới Thiệu", href: "/about" }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Liên Hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  📧
                </div>
                <span>minhtuan2004s@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                  📱
                </div>
                <span>+84 397 856 773</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  🌍
                </div>
                <span>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {year} OpenData Insight — Mở dữ liệu, mở tri thức.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/license" className="text-gray-400 hover:text-white transition-colors duration-300">License</a>
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">Chính sách</a>
              <a href="/contributors" className="text-gray-400 hover:text-white transition-colors duration-300">Đóng góp</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
