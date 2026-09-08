---
name: review-component
description: >-
  Sử dụng skill này khi user yêu cầu review, kiểm tra, hoặc đánh giá chất lượng
  code của một React component. Skill cung cấp checklist các tiêu chí cần kiểm tra
  về hiệu năng, cấu trúc, và best practices.
---

# Review Component

Khi review một React component, kiểm tra theo các tiêu chí sau:

## 1. Rendering & Performance

- [ ] Các hằng số, mảng/object tĩnh có được khai báo **bên ngoài** function component không?
- [ ] Có đang tạo object/array mới trong mỗi lần render không? (Nếu có → dùng `useMemo`)
- [ ] Có hàm callback nào được truyền xuống component con mà không được wrap bằng `useCallback` không?
- [ ] Component có bị re-render quá nhiều lần không cần thiết không?
- [ ] Có sử dụng `key` prop đúng cách trong `.map()` không? (Tránh dùng index nếu list có thể thay đổi thứ tự)

## 2. State Management

- [ ] State có được khởi tạo đúng giá trị mặc định không? (Ví dụ: `loading` nên là `true` nếu chắc chắn sẽ fetch khi mount)
- [ ] Có state nào thừa có thể derived (tính toán) từ state/props khác không?
- [ ] Có vi phạm "Single Source of Truth" không? (Copy prop vào state rồi cố đồng bộ)
- [ ] Có dùng `setState` đồng bộ bên trong `useEffect` không?

## 3. useEffect

- [ ] Dependency array có đầy đủ và chính xác không?
- [ ] Có cleanup function khi cần (unsubscribe, clear timeout, abort controller) không?
- [ ] `useEffect` có đang được dùng đúng mục đích (đồng bộ với external system) không?
- [ ] Có trick `await Promise.resolve()` hoặc workaround lách ESLint không? → Nếu có, refactor lại.

## 4. API Calls

- [ ] Có xử lý loading state không?
- [ ] Có xử lý error state không?
- [ ] Có xử lý empty state (không có data) không?
- [ ] API có bị gọi trùng lặp (duplicate calls) không?
- [ ] Có sử dụng đúng pattern `fetchApi` của project không?

## 5. TypeScript

- [ ] Props interface có được khai báo đầy đủ không?
- [ ] Có dùng `any` quá nhiều không? Nên thay bằng type cụ thể.
- [ ] Có dùng optional chaining (`?.`) hợp lý không?

## 6. Component Structure

- [ ] Component có quá lớn cần tách nhỏ không? (> 200 dòng nên cân nhắc tách)
- [ ] Controlled vs Uncontrolled: Component có đang giữ đúng vai trò không?
- [ ] Có tách biệt rõ ràng giữa logic (container) và hiển thị (presentational) không?

## 7. Accessibility & UX

- [ ] Image có `alt` text không?
- [ ] Button/Link có label rõ ràng không?
- [ ] Loading state có hiển thị visual feedback cho user không?
