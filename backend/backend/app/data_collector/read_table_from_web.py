import pandas as pd

url = "https://dti.gov.vn/xep-hang-2022"

# Tự động đọc tất cả bảng trên trang
tables = pd.read_html(url)

print(f"Số bảng tìm được: {len(tables)}")

# Lưu từng bảng ra JSON
for i, df in enumerate(tables):
    filename = f"table_{i}.json"
    df.to_json(filename, orient="records", force_ascii=False)
    print(f"Đã lưu: {filename}")

# Hiển thị thử vài bảng đầu
for i, df in enumerate(tables):
    print(f"\n===== Bảng {i} =====")
    print(df.head())
