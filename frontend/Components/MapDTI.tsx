"use client";

import { useEffect, useState } from "react";
import { geoIdentity, geoPath } from "d3-geo";
import { scaleSequential } from "d3-scale";
import { interpolateYlOrRd } from "d3-scale-chromatic";

interface DTIEntry {
  province: string;
  pdti: number;
}

export default function MapDTI() {
  const [geoData, setGeoData] = useState<any>(null);
  const [dtiData, setDtiData] = useState<Record<string, number>>({});
  const [year, setYear] = useState<string>("2022");
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string; pdti: number } | null>(null);

  // mapping năm => file DTI
  const yearToDtiFile: Record<string, string> = {
    "2022": "/dti_2022_map.json",
    "2023": "/dti_2023_map.json",
    "2024-63": "/dti_2024_63_tinh_map.json",
    "2024-34": "/dti_2024_34_tinh_map.json", // thêm mới
  };

  // mapping năm => file bản đồ
  const yearToGeoFile: Record<string, string> = {
    "2022": "/VietNam_tinhthanh.geojson",
    "2023": "/VietNam_tinhthanh.geojson",
    "2024-63": "/VietNam_tinhthanh.geojson",
    "2024-34": "/VietNam_tinhthanh_34.geojson", // thêm mới
  };

  useEffect(() => {
    // Load geojson theo năm
    const geoFile = yearToGeoFile[year];
    fetch(geoFile)
      .then((r) => r.json())
      .then((json) => {
        setGeoData(json);
      });

    // Load DTI JSON theo năm
    const dtiFile = yearToDtiFile[year];
    fetch(dtiFile)
      .then((r) => r.json())
      .then((arr: DTIEntry[]) => {
        const map: Record<string, number> = {};
        arr.forEach((x) => (map[x.province] = x.pdti));
        setDtiData(map);
      });
  }, [year]);

  if (!geoData) return <div>Đang tải bản đồ...</div>;

  const width = 800;
  const height = 900;

  const projection = geoIdentity().reflectY(true).fitSize([width, height], geoData);
  const path = geoPath(projection);

  const colorScale = scaleSequential(interpolateYlOrRd).domain([0.4, 1.0]);
  const legendTicks = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Dropdown chọn năm */}
      <div style={{ marginBottom: 10 }}>
        <label htmlFor="yearSelect" style={{ marginRight: 5 }}>Chọn năm:</label>
        <select id="yearSelect" value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024-63">2024 - 63 tỉnh</option>
          <option value="2024-34">2024 - 34 tỉnh</option> {/* thêm mới */}
        </select>
      </div>

      {/* SVG map */}
      <svg width={width} height={height} style={{ border: "1px solid #ccc" }}>
        {geoData.features.map((feature: any, i: number) => {
          const name = feature.properties.ten_tinh;
          const pdti = dtiData[name];

          return (
            <path
              key={i}
              d={path(feature)!}
              fill={pdti ? colorScale(pdti) : "#eee"}
              stroke="#444"
              strokeWidth={0.4}
              onMouseMove={(e) =>
                pdti &&
                setTooltip({
                  x: e.clientX,
                  y: e.clientY,
                  name,
                  pdti,
                })
              }
              onMouseLeave={() => setTooltip(null)}
            />
          );
        })}

        {/* Legend */}
        <g transform={`translate(${width - 120}, 20)`}>
          {legendTicks.map((t, i) => (
            <g key={i} transform={`translate(0, ${i * 20})`}>
              <rect width={20} height={20} fill={colorScale(t)} stroke="#444" />
              <text x={25} y={15} fontSize={12}>
                {t.toFixed(1)}
              </text>
            </g>
          ))}
          <text x={0} y={-5} fontSize={14} fontWeight="bold">
            PDTI
          </text>
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y + 10,
            left: tooltip.x + 10,
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            padding: "5px 8px",
            borderRadius: 4,
            pointerEvents: "none",
            fontSize: 12,
            zIndex: 10,
          }}
        >
          <div>{tooltip.name}</div>
          <div>PDTI: {tooltip.pdti.toFixed(4)}</div>
        </div>
      )}
    </div>
  );
}
