# React & JavaScript Rules

## Component Rules
- Sử dụng **Function Component** với TypeScript. Không dùng Class Component.
- Mỗi component phải khai báo rõ ràng **interface Props** cho tất cả props nhận vào.
- Các hằng số (constant), cấu hình mặc định (default config), mảng/object tĩnh không thay đổi phải được khai báo **bên ngoài** function component (module-level) để tránh tạo lại mỗi lần re-render.

## State Management
- Ưu tiên dùng `useState` cho local state, `zustand` cho global state (project đang dùng zustand qua `useAuthStore`).
- Nếu biết chắc component sẽ gọi API ngay khi mount, khởi tạo `loading` state là `true` ngay trong `useState(true)` thay vì để `false` rồi set lại trong `useEffect`.
- Không gọi `setState` đồng bộ (synchronous) bên trong `useEffect`. Nếu cần set loading trước khi fetch, hãy khởi tạo giá trị mặc định phù hợp trong `useState`.

## Hooks
- `useEffect` chỉ dùng để đồng bộ với hệ thống bên ngoài (API call, DOM manipulation, subscriptions). Không dùng để derived state.
- Không sử dụng `await Promise.resolve()` như một trick để lách ESLint. Nếu ESLint báo lỗi cascading render, hãy tổ chức lại logic state cho đúng.
- Khi truyền hàm callback xuống component con qua props, cân nhắc dùng `useCallback` để tránh re-render không cần thiết.

## Naming Conventions
- Component file: PascalCase hoặc camelCase tuỳ theo convention hiện tại của project (project đang dùng camelCase cho file component).
- Interface/Type: PascalCase (ví dụ: `OptionsFilter`, `ProductData`).
- Hằng số: UPPER_SNAKE_CASE (ví dụ: `PER_PAGE_LIST`, `ASC`, `DESC`).
- Hàm handler: camelCase với prefix `handle` hoặc mô tả hành động (ví dụ: `handleSearch`, `changeSelectCategory`).

## Import Rules
- Import path alias dùng `@/` (đã cấu hình trong tsconfig).
- Import component con cùng thư mục dùng relative path `./` (ví dụ: `import ItemCategory from './itemCategory'`).
