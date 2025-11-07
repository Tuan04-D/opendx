export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mb-8 shadow-lg">
            <span className="text-white text-4xl">🌐</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 via-cyan-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            OpenData Insight
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Nền tảng tích hợp, chuẩn hóa và trực quan hóa dữ liệu mở từ các tỉnh/thành phố Việt Nam, 
            hỗ trợ phân tích và đánh giá quá trình chuyển đổi số.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Bắt đầu khám phá
            </button>
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
              Xem hướng dẫn
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Tính năng nổi bật</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Giải pháp toàn diện cho việc khai thác dữ liệu mở phục vụ phân tích & ra quyết định.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "📥",
              title: "Tích hợp dữ liệu mở",
              description: "Kết nối trực tiếp nhiều nguồn dữ liệu mở cấp tỉnh và quốc gia.",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: "📊",
              title: "Trực quan hóa linh hoạt",
              description: "Biểu đồ, bảng dữ liệu, bản đồ địa lý — hiển thị trực quan và dễ hiểu.",
              color: "from-purple-500 to-indigo-500"
            },
            {
              icon: "🤖",
              title: "Phân tích & ML dự đoán",
              description: "Mô hình học máy dự đoán các chỉ số chuyển đổi số từ dữ liệu thực.",
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: "🔗",
              title: "Cung cấp API mở",
              description: "Cho phép truy vấn và tái sử dụng dữ liệu qua REST/GraphQL API.",
              color: "from-orange-500 to-red-500"
            },
            {
              icon: "👥",
              title: "Hỗ trợ đa đối tượng",
              description: "Phục vụ người dân, cơ quan quản lý và doanh nghiệp.",
              color: "from-indigo-500 to-blue-500"
            },
            {
              icon: "🧭",
              title: "Mã nguồn mở",
              description: "Phát hành công khai trên GitHub kèm license hợp lệ và hướng dẫn cài đặt.",
              color: "from-teal-500 to-cyan-500"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Dự án mã nguồn mở — cùng đóng góp & phát triển</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Chúng tôi tin vào giá trị của minh bạch, cộng tác và dữ liệu phục vụ cộng đồng.
          </p>
          <button className="px-10 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
            Truy cập GitHub
          </button>
        </div>
      </section>
    </div>
  );
}
