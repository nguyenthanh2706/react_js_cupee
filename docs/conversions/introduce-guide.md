# Tài Liệu Chuyển Đổi: Introduce Guide (Vue -> React / Next.js 16)

- **Feature**: Giới thiệu / Hướng dẫn sử dụng (`src/app/[locale]/introduce/guide`)
- **Nguồn Vue**:
  - `src/app/[locale]/introduce/guide/index.vue`
  - `src/app/[locale]/introduce/guide/[name].vue`
  - `src/app/[locale]/introduce/guide/content.vue`
  - `src/app/[locale]/introduce/guide/navigation.vue`
- **Ngày bắt đầu**: 2026-10-11
- **Trạng thái**: Hoàn thành (Completed)

---

## 1. Phân Tích Hiện Trạng Mã Nguồn Vue

### 1.1 Cấu trúc & Luồng hoạt động
- **Routing**:
  - `index.vue`: Route `/introduce/guide` (mặc định chọn section đầu tiên).
  - `[name].vue`: Route động `/introduce/guide/:name` (chọn section dựa trên `slug === route.params.name`).
- **Data Fetching**:
  - Gọi API `useIntroduce(t, $showMessage).listGuide('lang=' + locale)`.
  - Lấy dữ liệu: `data?.data?.[0]?.sections || []`.
- **Navigation (`navigation.vue`)**:
  - Đệ quy gán tiền tố số thứ tự `idList` (1, 1.1, 1.2...).
  - Quản lý trạng thái mở rộng của menu cha (`expandedKeys`).
  - Khi click section hoặc URL thay đổi: tìm section và emit sự kiện `contentSelected`.
- **Content (`content.vue`)**:
  - Nhận `guideSelected` (Section).
  - Hiển thị tiêu đề (`h2`) và nội dung HTML thông qua CKEditor content (`v-html`).
  - Vue dùng `$sanitize` để dọn dẹp mã HTML.

---

## 2. Kiến Trúc & Cấu Trúc File Đích (React / Next.js 16)

Tuân thủ nghiêm ngặt `# Project Structure Rules` (`.agents/rules/project-structure.md`):

```text
src/
├── api/
│   └── fetchIntroduce.ts         # Đã bổ sung method listGuide()
└── app/[locale]/introduce/guide/
    ├── types.ts                  # Định nghĩa Section, mapListMenu(), findSectionBySlug()
    ├── page.tsx                  # Server Component: route /introduce/guide
    ├── [name]/
    │   └── page.tsx              # Server Component: route động /introduce/guide/[name]
    ├── guideLayout.tsx           # Client Component: Quản lý layout, state tương tác menu & content
    ├── navigation.tsx            # Client Component: Render menu cây đệ quy + trạng thái active/expand
    └── content.tsx               # Presentational: Render title và ckeditor HTML content
```

---

## 3. Các Quyết Định Kỹ Thuật Đã Thống Nhất Với User

1. **API Endpoint `listGuide`**:
   - Gọi `GET /platform/introduce/guide?${params}`.
   - Trích xuất dữ liệu: `(Array.isArray(data) ? data[0]?.sections : data?.data?.[0]?.sections ?? data?.sections) || []`.
2. **Cấu trúc Route Next.js**:
   - Tách thành 2 route rõ ràng:
     - `src/app/[locale]/introduce/guide/page.tsx`
     - `src/app/[locale]/introduce/guide/[name]/page.tsx`
   - Cả 2 route cùng chia sẻ `GuideLayout`.
   - Khi click menu chỉ đổi state `guideSelected` cục bộ (như tab thông thường), không gọi `router.push` để tránh re-render/chuyển trang không cần thiết vì dữ liệu đã có đủ. Route `[name]/page.tsx` vẫn giữ để phục vụ truy cập trực tiếp bằng URL.
3. **HTML Sanitization**:
   - Dùng `dangerouslySetInnerHTML` đồng bộ với module `policy` hiện tại của project.
4. **Navigation Menu**:
   - Chuẩn hóa cấu trúc DOM khớp 100% với `introduce-guide.scss` (các class `.p-panelmenu*`, `.item-menu`, `.item-active`, `p-panelmenu-item`).
   - Tích hợp smooth accordion animation (bằng CSS grid-rows transition) và xoay icon chevron mượt mà.
   - Hỗ trợ menu cây đa cấp đệ quy, tự động mở rộng node cha khi chọn mục con.

---

## 4. Checklist Tiến Độ

- [x] Bước 1: Phân tích toàn diện mã nguồn Vue
- [x] Bước 2: Rà soát logic thiếu & lập câu hỏi làm rõ
- [x] Bước 3: Đối chiếu Project Structure Rules
- [x] Bước 4: Tạo tài liệu ghi vết tại `docs/conversions/introduce-guide.md`
- [x] Bước 5: Thống nhất các điểm kỹ thuật với User qua câu hỏi
- [x] Bước 6: Cập nhật `src/api/fetchIntroduce.ts` với method `listGuide`
- [x] Bước 7: Tạo `types.ts` chứa interface và các hàm helper cây đệ quy
- [x] Bước 8: Xây dựng `content.tsx`, `navigation.tsx`, `guideLayout.tsx`
- [x] Bước 9: Xây dựng Server Components `page.tsx` và `[name]/page.tsx`
- [x] Bước 10: Xóa sạch các file .vue cũ (`index.vue`, `[name].vue`, `content.vue`, `navigation.vue`)
- [x] Bước 11: Tự review (TypeScript types chặt chẽ, Next.js 16 async params, không sót directive Vue)

