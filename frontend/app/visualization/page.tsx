"use client";
import dynamic from "next/dynamic";

const MapDTI = dynamic(() => import("@/Components/MapDTI"), { ssr: false });

export default function Page() {
  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">Bản đồ DTI Việt Nam các năm 2022 - 2024</h1>
      <MapDTI />
    </main>
  );
}
