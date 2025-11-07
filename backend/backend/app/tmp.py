# import json

# geojson_file = r"D:\Study\OpenDX\frontend\public\VietNam_tinhthanh.geojson"  # đổi tên nếu khác

# with open(geojson_file, "r", encoding="utf-8") as f:
#     geo = json.load(f)

# province_names = []

# for feature in geo["features"]:
#     props = feature.get("properties", {})
#     name = props.get("ten_tinh")  # lấy tên tỉnh đúng theo cấu trúc
#     if name:
#         province_names.append(name)

# province_names = sorted(set(province_names))

# print("Số lượng tỉnh tìm được:", len(province_names))
# for p in province_names:
#     print(p)

# Hoà Bình

import json
import re

def normalize(name: str):
    name = name.strip()
    # Bỏ tiền tố
    name = re.sub(r"^(Tỉnh|Thành phố)\s+", "", name, flags=re.IGNORECASE)
    # Loại bỏ khoảng trắng thừa
    name = re.sub(r"\s+", " ", name)
    # Chuẩn hóa Unicode (Hòa vs Hoà)
    # name = name.replace("Hòa", "Hoà")
    return name

# ----- BỔ SUNG MAPPING TÊN ĐẶC BIỆT -----
manual_map = {
    "Hồ Chí Minh": "TP. Hồ Chí Minh",
    "Huế": "Thừa Thiên Huế",
    "Hòa Bình": "Hoà Bình",  # chuẩn hóa unicode
}

# ---- load geojson ----
with open(r"D:\Study\OpenDX\frontend\public\VietNam_tinhthanh.geojson", "r", encoding="utf-8") as f:
    geo = json.load(f)

geo_names = {}
for ft in geo["features"]:
    raw = ft["properties"]["ten_tinh"]
    geo_names[normalize(raw)] = raw  # normalized → original

# ---- load dti data ----
with open(r"D:\Study\OpenDX\data\dti_2022_json\dti_map.json", "r", encoding="utf-8") as f:
    dti = json.load(f)

output = []
missing = []

for row in dti:
    p_raw = row["province"]

    # Nếu tỉnh có trong mapping thủ công → dùng giá trị thủ công
    if p_raw in manual_map:
        output.append({
            "province": manual_map[p_raw],
            "pdti": row["pdti"]
        })
        continue

    # nếu không → dùng matching tự động
    p = normalize(p_raw)
    if p in geo_names:
        output.append({
            "province": geo_names[p],
            "pdti": row["pdti"]
        })
    else:
        missing.append(p_raw)

# ---- save file mới ----
with open(r"D:\Study\OpenDX\frontend\public\dti_map_2.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("Đã tạo dti_map_2.json — mapping thành công!")
if missing:
    print("Không match:", missing)
else:
    print("Tất cả tỉnh đều match 100%")
