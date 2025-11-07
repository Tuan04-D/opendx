"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

const INDICATORS = [
  { key: "IT.NET.USER.ZS", label: "Tỷ lệ người dùng Internet (%)" },
  { key: "IT.NET.BBND.P2", label: "Thuê bao băng rộng cố định (per 100 dân)" },
  { key: "SP.URB.TOTL.IN.ZS", label: "Tỷ lệ đô thị hóa (%)" },
  { key: "NY.GDP.PCAP.CD", label: "GDP bình quân đầu người (USD)" },
  { key: "SE.ADT.LITR.ZS", label: "Tỷ lệ biết chữ người trưởng thành (%)" }
];

export default function DashboardPage() {
  const [datasets, setDatasets] = useState({});
  const [loadingPredictKey, setLoadingPredictKey] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPayload, setModalPayload] = useState(null);

  useEffect(() => {
    INDICATORS.forEach((indicator) => {
      fetch(`http://localhost:8000/api/data_worldbank/${indicator.key}/`)
        .then((res) => res.json())
        .then((data) =>
          setDatasets((prev) => ({
            ...prev,
            [indicator.key]: data.sort((a, b) => a.year - b.year)
          }))
        )
        .catch((err) => console.error("fetch data error", err));
    });
  }, []);

  async function handlePredict(ind) {
    setLoadingPredictKey(ind.key); // chỉ loading nút được bấm

    try {
      const res = await fetch(`http://localhost:8000/api/train/${ind.key}/`, {
        method: "POST"
      });
      const json = await res.json();

      const history = datasets[ind.key] || [];
      const maxYear = Math.max(...history.map((d) => d.year));

      // ✅ chỉ lấy dự đoán từ năm hiện tại → 5 năm tới
      const forecast = (json.forecast || []).filter(
        (f) => f.year > maxYear && f.year <= maxYear + 5
      );

      const combined = [
        ...history.map((r) => ({
          year: r.year,
          value: +r.value,
          type: "history"
        })),
        ...forecast.map((f) => ({
          year: f.year,
          yhat: +f.yhat,
          yhat_lower: +f.yhat_lower,
          yhat_upper: +f.yhat_upper,
          type: "forecast"
        }))
      ];

      setModalPayload({
        indicator: ind,
        history,
        forecast,
        combined,
        mae: json.mae,
        rmse: json.rmse,
        trained: json.trained
      });

      setModalVisible(true);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi dự đoán: " + err.message);
    } finally {
      setLoadingPredictKey(null);
    }
  }

  return (
    <div className="px-6 py-6 space-y-12">
      <h1 className="text-3xl font-bold mb-4">
        Phân tích các yếu tố nền tảng chuyển đổi số Việt Nam
      </h1>

      {INDICATORS.map((ind) => (
        <div key={ind.key} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{ind.label}</h2>

            <button
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              onClick={() => handlePredict(ind)}
              disabled={loadingPredictKey === ind.key}
            >
              {loadingPredictKey === ind.key ? "Đang xử lý..." : "Dự đoán 5 năm"}
            </button>
          </div>

          <div className="w-full h-80 border rounded-lg p-3 bg-white shadow">
            <ResponsiveContainer>
              <LineChart data={datasets[ind.key] || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}

      {modalVisible && modalPayload && (
  <div
    className="fixed inset-0 z-50 flex items-start justify-center p-6"
    style={{ background: "rgba(0,0,0,0.6)" }}
  >
    <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden">
      <button
        onClick={() => setModalVisible(false)}
        className="absolute right-3 top-3 text-2xl hover:bg-gray-100 px-3 py-1 rounded"
      >
        ✕
      </button>

      <div className="p-6 h-full flex flex-col space-y-4">
        <h3 className="text-2xl font-semibold">
          {modalPayload.indicator.label} — Dự đoán 5 năm
        </h3>

        {/* ✅ Thông báo dùng model cũ hay model mới */}
        <div className="text-sm text-gray-700">
          {modalPayload.trained
            ? "✅ Đã huấn luyện lại mô hình với dữ liệu mới"
            : "⚠️ Dùng mô hình cũ (không có dữ liệu mới để train)"}
        </div>

        {/* ✅ Hiển thị metrics */}
        <div className="text-sm text-gray-600">
          <span className="mr-4">MAE: <b>{modalPayload.mae?.toFixed(3)}</b></span>
          <span>RMSE: <b>{modalPayload.rmse?.toFixed(3)}</b></span>
        </div>

        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={modalPayload.combined}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />

              {/* Dữ liệu gốc */}
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
              />

              {/* Đường dự báo */}
              <Line
                type="monotone"
                dataKey="yhat"
                stroke="#f97316"
                strokeDasharray="6 4"
                strokeWidth={2}
              />

              {/* ✅ Vùng dự báo (interval confidence) */}
              <Area
                type="monotone"
                dataKey="yhat_upper"
                stroke="none"
                fill="#f97316"
                opacity={0.12}
              />
              <Area
                type="monotone"
                dataKey="yhat_lower"
                stroke="none"
                fill="#f97316"
                opacity={0.12}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <button
          onClick={() => setModalVisible(false)}
          className="mt-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 self-end"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
