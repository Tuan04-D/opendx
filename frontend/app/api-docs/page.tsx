"use client";

import React from "react";

export default function APIDocs() {
  return (
    <div className="prose max-w-none p-6">
      <h1>📊 Public AI Forecast API</h1>
      <p>
        API cung cấp dữ liệu dự đoán và dữ liệu raw cho các chỉ số (indicator). 
        FastAPI sẽ tự kiểm tra và train model nếu cần trước khi trả forecast.
      </p>

      <hr />

      <h2>1️⃣ Lấy dự đoán 5 năm tiếp theo</h2>
      <p>
        Endpoint này sẽ tự kiểm tra model, train nếu dữ liệu thay đổi và trả kết quả dự đoán.
      </p>

      <h3>Request</h3>
      <pre className="bg-gray-100 p-2 rounded">
GET http://localhost:9000/forecast/IT.NET.USER.ZS
      </pre>

      <h3>Response</h3>
      <pre className="bg-gray-100 p-2 rounded">
{`{
  "indicator": "IT.NET.USER.ZS",
  "trained": true,
  "forecast": [
    { "year": 2025, "value": 78.3, "lower": 71.2, "upper": 84.4 },
    { "year": 2026, "value": 80.5, "lower": 72.5, "upper": 86.9 },
    { "year": 2027, "value": 82.1, "lower": 74.0, "upper": 88.5 },
    { "year": 2028, "value": 83.7, "lower": 75.6, "upper": 90.0 },
    { "year": 2029, "value": 85.3, "lower": 77.2, "upper": 91.5 }
  ]
}`}
      </pre>

      <hr />

      <h2>2️⃣ Lấy dữ liệu raw của chỉ số</h2>
      <p>
        Endpoint này trả dữ liệu lịch sử giống với hàm <code>fetch_indicator_worldbank</code> trong Django.
      </p>

      <h3>Request</h3>
      <pre className="bg-gray-100 p-2 rounded">
GET http://localhost:9000/data/IT.NET.USER.ZS
      </pre>

      <h3>Response</h3>
      <pre className="bg-gray-100 p-2 rounded">
{`[
  { "year": 2018, "value": 60.5 },
  { "year": 2019, "value": 63.0 },
  { "year": 2020, "value": 65.7 },
  { "year": 2021, "value": 68.2 },
  { "year": 2022, "value": 70.1 },
  { "year": 2023, "value": 72.0 }
]`}
      </pre>

      <hr />

      <h2>⚡ Hướng dẫn tích hợp</h2>
      <ul>
        <li>Gọi endpoint <code>/data/:indicator</code> để lấy dữ liệu lịch sử.</li>
        <li>Gọi endpoint <code>/forecast/:indicator</code> để lấy dự đoán 5 năm tiếp theo.</li>
        <li>FastAPI sẽ tự kiểm tra model và train nếu cần trước khi trả kết quả forecast.</li>
        <li>Cả 2 endpoint trả JSON chuẩn, dễ parse và tích hợp vào hệ thống khác.</li>
      </ul>

      <h2>💡 Mẹo sử dụng</h2>
      <ul>
        <li>Luôn gọi <code>/forecast/:indicator</code> để nhận dự đoán mới nhất.</li>
        <li>Đối với tích hợp tự động, có thể lưu model trên hệ thống Django và chỉ gọi FastAPI khi cần forecast.</li>
        <li>Đảm bảo server Django đang chạy trên <code>localhost:8000</code> để FastAPI gọi endpoint train/check model.</li>
      </ul>
    </div>
  );
}
