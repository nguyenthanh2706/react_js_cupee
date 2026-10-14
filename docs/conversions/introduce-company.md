# Tài Liệu Chuyển Đổi: Introduce Company (Vue -> React / Next.js 16)

- **Feature**: Thông tin công ty & Giới thiệu (`/introduce/company`)
- **Nguồn Vue**:
  - `src/app/[locale]/introduce/company/company-info.vue` (Main Page)
  - `src/app/[locale]/introduce/company/hero-section.vue`
  - `src/app/[locale]/introduce/company/mission-vision.vue`
  - `src/app/[locale]/introduce/company/featured-products.vue`
  - `src/app/[locale]/introduce/company/ProductCard.vue`
  - `src/app/[locale]/introduce/company/list/list-category.vue`
  - `src/app/[locale]/introduce/company/cupee-features-alternative.vue`
  - `src/app/[locale]/introduce/company/testimonial-slideshow.vue`
  - `src/app/[locale]/introduce/company/social-media-trends.vue`
  - `src/app/[locale]/introduce/company/testimonials.vue` (chuyển đổi làm component dự phòng theo yêu cầu user)
- **Ngày bắt đầu**: 2026-10-11
- **Trạng thái**: Hoàn thành (Completed)

---

## 1. Phân Tích Hiện Trạng Mã Nguồn Vue

### 1.1 Cấu trúc & Luồng hoạt động
- **Data Fetching**:
  - Gọi API `fetchDataCompany.get()` (`GET /platform/introduce/company`).
  - Dữ liệu trả về: `{ code, reviews, media, featuredProducts, mission, vision }`.
- **Thành phần giao diện**:
  1. `HeroSection`: Slider ảnh/video banner tỷ lệ 21:9 sử dụng Carousel PrimeReact.
  2. `MissionVision`: Trình bày sứ mệnh & tầm nhìn, kiểu chữ nghệ thuật và hình ảnh gốm sứ.
  3. `FeaturedProducts`: Lọc theo danh mục qua `ListCategory`, Carousel sản phẩm PrimeReact, điều hướng sang `/product/[code]` và `/product/list`.
  4. `ProductCard`: Hiển thị chi tiết thẻ sản phẩm (ảnh, giá, đánh giá sao, số lượng bán, màu sắc).
  5. `ListCategory`: Gọi `fetchProduct(t).listCategory(...)` với phân trang / nút xem thêm.
  6. `CupeeFeatures`: 4 đặc điểm thương hiệu nổi bật sử dụng ảnh từ `public/images/introduce/company/`.
  7. `TestimonialSlideshow`: Carousel đánh giá khách hàng (nhóm 3 item/slide) với nút next/prev & progress dots.
  8. `SocialMediaTrends`: 3 card hình ảnh xu hướng kèm tác giả.
  9. `Testimonials`: Component hiển thị đánh giá dạng grid (dự phòng).

---

## 2. Kiến Trúc & Cấu Trúc File Đích (React / Next.js 16)

Tuân thủ nghiêm ngặt `# Project Structure Rules` (`.agents/rules/project-structure.md`):

```text
src/app/[locale]/introduce/company/
├── page.tsx                    # Server Component: Fetch data trên server, SEO metadata
├── types.ts                    # TypeScript interfaces
├── heroSection.tsx             # Client Component: Carousel banner đa phương tiện (@primereact/ui/carousel)
├── missionVision.tsx           # Presentational: Sứ mệnh & tầm nhìn
├── featuredProducts.tsx        # Client Component: Carousel sản phẩm nổi bật + filter danh mục
├── productCard.tsx             # Presentational: Thẻ hiển thị sản phẩm
├── cupeeFeatures.tsx           # Presentational: 4 đặc điểm nổi bật
├── testimonialSlideshow.tsx    # Client Component: Slideshow đánh giá khách hàng
├── testimonials.tsx            # Client Component: Đánh giá khách hàng dạng grid (dự phòng)
├── socialMediaTrends.tsx       # Presentational: Xu hướng mạng xã hội
└── list/
    └── listCategory.tsx        # Client Component: Bộ lọc danh mục sản phẩm
```

---

## 3. Các Quyết Định Kỹ Thuật Đã Thống Nhất Với User

1. **Đường dẫn thư mục**:
   - Giữ nguyên thư mục `introduce/company` (URL: `/introduce/company`).
2. **Carousel Component**:
   - Sử dụng `Carousel` từ `@primereact/ui/carousel` cho `HeroSection` và `FeaturedProducts`.
3. **Component Testimonials**:
   - Chuyển đổi cả `testimonials.vue` thành `testimonials.tsx` làm component dự phòng bên cạnh `testimonialSlideshow.tsx`.
4. **Dọn dẹp mã nguồn**:
   - Đã xóa sạch 100% các file `.vue` cũ trong `src/app/[locale]/introduce/company/` và `src/app/[locale]/introduce/company/list/`.

---

## 4. Checklist Tiến Độ

- [x] Bước 1: Phân tích toàn diện mã nguồn Vue
- [x] Bước 2: Rà soát logic thiếu & thiết kế bộ câu hỏi làm rõ
- [x] Bước 3: Đối chiếu Project Structure Rules
- [x] Bước 4: Tạo tài liệu ghi vết tại `docs/conversions/introduce-company.md`
- [x] Bước 5: Thống nhất các điểm kỹ thuật với User qua câu hỏi
- [x] Bước 6: Xây dựng `types.ts`
- [x] Bước 7: Chuyển đổi các presentational component (`missionVision.tsx`, `cupeeFeatures.tsx`, `socialMediaTrends.tsx`)
- [x] Bước 8: Chuyển đổi `productCard.tsx`, `list/listCategory.tsx`, `featuredProducts.tsx`
- [x] Bước 9: Chuyển đổi `heroSection.tsx`, `testimonialSlideshow.tsx`, `testimonials.tsx`
- [x] Bước 10: Xây dựng Server Component `page.tsx`
- [x] Bước 11: Dọn dẹp xóa sạch các file `.vue` cũ (10 file `.vue`)
- [x] Bước 12: Tự review & cập nhật checklist hoàn thành
