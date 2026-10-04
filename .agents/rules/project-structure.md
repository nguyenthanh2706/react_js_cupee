# Project Structure Rules

## Thư mục chính
```
src/
├── assets/          # Images, fonts, icons
├── api/              # API wrappers (fetchApi.ts, fetchProduct.ts, ...)
├── app/[locale]/     # App Router pages (mỗi route là một thư mục)
│   ├── product/      # Feature: Product
│   │   ├── list/     # Trang danh sách sản phẩm
│   │   └── [code]/   # Trang chi tiết sản phẩm
│   └── ...
├── components/       # Shared/reusable components
│   └── common/       # Common UI components (Loading, Breadcrumb, InputSearch...)
├── i18n/             # Internationalization config (routing, request)
├── stores/           # Zustand stores (authStore...)
└── utils/            # Utility functions và constants
```

## Quy tắc tổ chức code
- Mỗi feature/page có thư mục riêng chứa: `page.tsx` (entry), các component con liên quan (ví dụ: `filter.tsx`, `main.tsx`, `itemCategory.tsx`).
- Component chỉ dùng trong 1 page thì đặt cùng thư mục với page đó. Component dùng chung nhiều nơi thì đặt trong `src/components/`.
- Không tạo file component rỗng hoặc barrel file (`index.ts`) nếu không cần thiết.

## UI Library
- Project sử dụng **PrimeReact** (@primereact/ui) cho các UI component (Tabs, InputText, Toast...).
- Icon dùng PrimeIcons (class `pi pi-*`).
