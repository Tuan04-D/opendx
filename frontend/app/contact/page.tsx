export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8 shadow-lg">
            <span className="text-white text-3xl">📨</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Liên Hệ Nhóm Phát Triển
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Nếu bạn quan tâm đến dữ liệu mở, chuyển đổi số địa phương, hoặc muốn trao đổi về hướng phát triển tiếp theo của dự án, 
            hãy gửi tin nhắn cho chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Gửi Tin Nhắn</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tổ chức / Trường học</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Trường Đại học / Công ty"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="example@domain.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Nội dung bạn muốn trao đổi..."
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Gửi Liên Hệ
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Thông Tin Liên Hệ</h2>
              
              <div className="space-y-6">

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">Email</h3>
                    <p className="text-gray-600">minhtuan2004s@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">Số điện thoại</h3>
                    <p className="text-gray-600">+84 397 856 773</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🏢</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">Địa điểm</h3>
                    <p className="text-gray-600">TP. Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Kết nối với chúng tôi</h2>
              <p className="text-blue-100 mb-6">Cập nhật tiến độ, tài liệu và mã nguồn mở</p>
              
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">💻</a>
                <a href="#" className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">🐦</a>
                <a href="#" className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">💼</a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
