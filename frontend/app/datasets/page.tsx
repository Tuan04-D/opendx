'use client';

import React from 'react';
import { Database, Globe, Building2 } from 'lucide-react';

export default function DataSources() {
  const sources = [
    {
      icon: Database,
      title: 'Chuyển đổi số cấp địa phương',
      subtitle: 'dx.gov.vn',
      color: 'blue',
      gradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-700',
      description: 'Nguồn dữ liệu cung cấp Chỉ số Chuyển đổi số (DTI) theo các tỉnh/thành trong giai đoạn 2020–2023. Đây là thước đo chính phản ánh mức độ:',
      items: [
        'Năng lực chính quyền số',
        'Kinh tế số',
        'Xã hội số'
      ],
      footer: 'DTI là trục phân tích chính giúp so sánh sự tiến bộ và dự báo xu hướng chuyển đổi số giữa các địa phương.'
    },
    {
      icon: Globe,
      title: 'World Bank API (V2)',
      subtitle: 'Hạ tầng và tiếp cận số',
      color: 'green',
      gradient: 'from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      titleColor: 'text-emerald-700',
      description: 'Sử dụng API V2 của World Bank để lấy dữ liệu Internet, đô thị hóa và năng lực kinh tế. Ví dụ các chỉ số phổ biến:',
      items: [
        'IT.NET.USER.ZS — Tỷ lệ người dùng Internet',
        'NY.GDP.PCAP.CD — GDP bình quân đầu người',
        'SP.URB.TOTL.IN.ZS — Tỷ lệ đô thị hóa'
      ],
      footer: 'Các chỉ số này giải thích sự khác biệt nền tảng hạ tầng số giữa các địa phương và được dùng làm biến đầu vào khi phân tích mối tương quan và dự báo.'
    },
    {
      icon: Building2,
      title: 'Open Data TP.HCM',
      subtitle: 'Hạ tầng dịch vụ số xã hội',
      color: 'red',
      gradient: 'from-rose-50 to-pink-50',
      borderColor: 'border-rose-200',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600',
      titleColor: 'text-rose-700',
      description: 'Bộ dữ liệu mở từ TP.HCM cung cấp thông tin về:',
      items: [
        'Hệ thống cơ sở giáo dục (trường học, cơ sở đào tạo)',
        'Hệ thống khám chữa bệnh (bệnh viện, trạm y tế)',
        'Cơ sở thông tin truyền thông (đài truyền hình, trung tâm truyền thông)'
      ],
      footer: 'TP.HCM được sử dụng như một địa phương điển hình để minh họa cách hạ tầng xã hội hỗ trợ cho tăng trưởng chỉ số chuyển đổi số.'
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-4">
              Nguồn Dữ Liệu
            </h2>
            <div className="h-1.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-rose-500 rounded-full"></div>
          </div>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Ba nguồn dữ liệu chính được tích hợp để xây dựng mô hình đánh giá và dự báo
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sources.map((source, index) => {
            const Icon = source.icon;
            return (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${source.gradient} rounded-2xl p-6 border-2 ${source.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Icon */}
                <div className={`${source.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${source.iconColor}`} />
                </div>

                {/* Number Badge */}
                <div className="absolute top-6 right-6 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                  <span className="text-sm font-bold text-slate-700">{index + 1}</span>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold ${source.titleColor} mb-1`}>
                  {source.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4 font-medium">{source.subtitle}</p>

                {/* Description */}
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  {source.description}
                </p>

                {/* Items */}
                <ul className="space-y-2 mb-4">
                  {source.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-slate-700">
                      <span className={`${source.iconColor} mr-2 mt-0.5`}>●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {source.footer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Summary */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 text-center shadow-xl">
          <p className="text-white text-lg leading-relaxed">
            Ba nguồn dữ liệu trên được <span className="font-bold text-emerald-300">kết hợp và phân tích</span> để tạo thành 
            <span className="font-bold text-blue-300"> mô hình đánh giá toàn diện</span> và 
            <span className="font-bold text-rose-300"> dự báo năng lực chuyển đổi số</span> địa phương
          </p>
        </div>
      </div>
    </section>
  );
}