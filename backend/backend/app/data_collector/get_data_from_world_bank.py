import os
import requests

# ====== Cấu hình thư mục cha ======
BASE_DIR = r"D:\Study\OpenDX\data\worldbank"

# ====== Danh sách API cần tải ======
apis = {
    "IT.NET.USER.ZS": "https://api.worldbank.org/v2/country/VNM/indicator/IT.NET.USER.ZS?format=json&per_page=20000",
    "IT.NET.BBND.P2": "https://api.worldbank.org/v2/country/VNM/indicator/IT.NET.BBND.P2?format=json&per_page=20000",
    "SP.URB.TOTL.IN.ZS": "https://api.worldbank.org/v2/country/VNM/indicator/SP.URB.TOTL.IN.ZS?format=json",
    "NY.GDP.PCAP.CD": "https://api.worldbank.org/v2/country/VNM/indicator/NY.GDP.PCAP.CD?format=json",
    "SE.ADT.LITR.ZS": "https://api.worldbank.org/v2/country/VNM/indicator/SE.ADT.LITR.ZS?format=json"
}

# ====== Tạo thư mục cha nếu chưa tồn tại ======
if not os.path.exists(BASE_DIR):
    os.makedirs(BASE_DIR)

# ====== Tải dữ liệu và lưu vào file tương ứng ======
for indicator, url in apis.items():
    print(f"Đang tải {indicator} ...")
    
    folder_path = os.path.join(BASE_DIR, indicator)
    os.makedirs(folder_path, exist_ok=True)

    response = requests.get(url)

    if response.status_code == 200:
        output_file = os.path.join(folder_path, f"{indicator}.json")

        with open(output_file, "w", encoding="utf-8") as f:
            f.write(response.text)

        print(f"Đã lưu: {output_file}")
    else:
        print(f"Lỗi khi tải {indicator}: HTTP {response.status_code}")

print("Hoàn tất tải toàn bộ dữ liệu!")
