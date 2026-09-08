# Next.js Rules

## Framework Version
- Project đang sử dụng **Next.js 16** với App Router. Luôn kiểm tra tài liệu trong `node_modules/next/dist/docs/` trước khi viết code vì API có thể khác so với training data.

## App Router Conventions
- Cấu trúc route: `src/app/[locale]/...` (project dùng next-intl cho i18n).
- File `page.tsx` là entry point của mỗi route.
- File `layout.tsx` dùng cho shared layout.

## Client vs Server Component
- Mặc định component trong App Router là **Server Component**.
- Chỉ thêm `'use client'` khi component cần: `useState`, `useEffect`, `useRef`, event handlers (`onClick`, `onChange`...), hoặc browser APIs.
- Khi chuyển một trang từ CSR sang SSR: bỏ `'use client'`, fetch data trực tiếp trong async component, tách các phần interactive thành Client Component con.

## CSS & SCSS
- CSS/SCSS phải dùng `@import` và PHẢI khai báo `./` + `filename.scss` (ví dụ: `@import './layout/variables.scss';`).

## Internationalization (i18n)
- Project dùng `next-intl`. Sử dụng `useTranslations()` trong Client Component và `getTranslations()` trong Server Component.
- Route luôn có dynamic segment `[locale]`.
- Link nội bộ dùng `Link` từ `@/i18n/routing`, không dùng `next/link` trực tiếp.

## Images
- Dùng `next/image` (`Image` component) cho tất cả hình ảnh.
- Remote images phải được khai báo domain trong `next.config.ts` > `images.remotePatterns`.

## API
- Tất cả API call đều đi qua `src/api/fetchApi.ts` (wrapper của native `fetch`).
- Các endpoint được nhóm theo feature trong `src/api/fetch*.ts` (ví dụ: `fetchProduct.ts`).
- `fetchApi` đã xử lý sẵn: token auth, refresh token, error handling, toast notification.
