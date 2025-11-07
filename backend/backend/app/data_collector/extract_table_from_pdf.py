import tabula
import pandas as pd

pdf_file = r"D:\Study\OpenDX\data\dx_gov_vn\DTI 2021 giao in.pdf"

# Bước 1: Trích xuất tất cả bảng từ PDF
tables = tabula.read_pdf(pdf_file, pages='all', multiple_tables=True)

print(f"Tìm thấy {len(tables)} bảng.")

# Bước 2: Gom bảng theo header (hàng đầu tiên)
grouped_tables = {}

for df in tables:
    # chuẩn hóa header thành tuple làm key
    header = tuple(df.columns)
    if header not in grouped_tables:
        grouped_tables[header] = []
    grouped_tables[header].append(df)

# Bước 3: Gộp và lưu
for i, (header, dfs) in enumerate(grouped_tables.items(), start=1):
    merged = pd.concat(dfs, ignore_index=True)
    output_path = f"merged_table_{i}.csv"
    merged.to_csv(output_path, index=False)
    print(f"✅ Bảng gộp {i} → {output_path} (ghép {len(dfs)} phần)")
