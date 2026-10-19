# Tài Liệu Chuyển Đổi Feature: Auth (Vue -> React / Next.js 16)

## 1. Tổng Quan
- **Feature**: Xác thực người dùng (`auth` - Đăng nhập, Quên mật khẩu, Đặt lại mật khẩu).
- **File Vue gốc nguồn**:
  - `src/app/[locale]/auth/login.vue`
  - `src/app/[locale]/auth/forgot-password.vue`
  - `src/app/[locale]/auth/reset-password.vue`
- **Mục tiêu chuyển đổi**:
  - Chuyển đổi toàn bộ 3 trang của luồng `auth` từ Vue 3 / Nuxt sang **Next.js 16 App Router** + **React 19** + **PrimeReact v11 (`@primereact/ui`)**.
  - Tuân thủ nghiêm ngặt quy tắc cấu trúc dự án (`.agents/rules/project-structure.md`), quy tắc SCSS (`AGENTS.md`), và kỹ năng `@react-patterns` (`.agents/skills/react-patterns/SKILL.md`).

---

## 2. Bản Đồ Kiến Trúc & File Mapping

| File Vue Gốc | File React / Next.js 16 Đích | Vai Trò (`@react-patterns`) |
| :--- | :--- | :--- |
| `src/app/[locale]/auth/login.vue` | `src/app/[locale]/auth/login/page.tsx` | **Server Component**: Render Banner, Breadcrumb, Metadata SEO và bọc Suspense cho Client Form |
| `src/app/[locale]/auth/login.vue` | `src/app/[locale]/auth/login/loginForm.tsx` | **Client Component**: Quản lý state form đăng nhập, validation, gọi API login và điều hướng |
| `src/app/[locale]/auth/forgot-password.vue` | `src/app/[locale]/auth/forgot-password/page.tsx` | **Server Component**: Render Banner, Breadcrumb, Metadata SEO và nhúng Client Form |
| `src/app/[locale]/auth/forgot-password.vue` | `src/app/[locale]/auth/forgot-password/forgotPasswordForm.tsx` | **Client Component**: Quản lý state form quên mật khẩu, validation, gọi API gửi mã OTP |
| `src/app/[locale]/auth/reset-password.vue` | `src/app/[locale]/auth/reset-password/page.tsx` | **Server Component**: Render Banner, Breadcrumb, Metadata SEO và bọc Suspense cho Client Form |
| `src/app/[locale]/auth/reset-password.vue` | `src/app/[locale]/auth/reset-password/resetPasswordForm.tsx` | **Client Component**: Quản lý state OTP, mật khẩu mới, xác nhận mật khẩu, gửi lại OTP và đổi mật khẩu |
| Composable `useAuth` (Vue) | `src/api/fetchAuth.ts` | **API Layer**: Wrapper gọi `fetchApi` cho `/customer/login`, `/customer/forgot-password`, `/customer/reset-password` |
| Composable `useValidation` (Vue) | `src/utils/validate.ts` | **Validation Helper**: Cung cấp các hàm `validateOnField`, `validateOnAllField` |
| `<MessageError />` (Vue) | `src/components/common/MessageError.tsx` | **Shared Presentational Component**: Hiển thị lỗi validation bên dưới mỗi ô input |
| Cookie & LocalStorage (Vue) | `src/stores/authStore.ts` | **Global Store (Zustand)**: Quản lý `token`, `isLoggedIn`, `userInfo` đồng bộ với Header (`EndTopBar`) |

---

## 3. Bảng Đối Chiếu Logic & Component (`@react-patterns`)

| Thành phần bên Vue | Chuyển đổi sang React / Next.js 16 | Ghi chú kỹ thuật (`@react-patterns`) |
| :--- | :--- | :--- |
| `<template>` với `.banner` + `<Breadcrumb>` | Tách lên Server Component `page.tsx` | Giữ phần tĩnh (Banner + Breadcrumb) ở Server Component để tối ưu SSR |
| `reactive({ email, errorEmail, ... })` | `useState<LoginFormState>(...)` | Quản lý state cục bộ bất biến (immutable update khi validate & onChange) |
| `v-model.trim="auth.email"` | `value={auth.email}` + `onChange` (trim khi cập nhật/validate) | Controlled Component chuẩn React |
| `<IconField>` + `<InputIcon>` | `<IconField.Root>` + `<IconField.Inset>` (`@primereact/ui/iconfield`) | Kết hợp PrimeIcons (`pi pi-envelope`, `pi pi-lock`, `pi pi-android`) |
| `<Password toggleMask :feedback="false">` | `<InputPassword>` (`@primereact/ui/inputpassword`) + `<IconField.Inset>` toggle icon | Hỗ trợ ẩn/hiện mật khẩu (`pi-eye` / `pi-eye-slash`) trong `IconField.Root` |
| `v-keyfilter.int` (trên ô OTP) | Filter chỉ giữ ký tự số `\d` trong `onChange` (`value.replace(/\D/g, '')`) | Đảm bảo chỉ nhập số nguyên tối đa 6 ký tự cho OTP |
| `$showMessage('success' \| 'error', ...)` | `toast.success(...)` / `toast.error(...)` (`@primereact/ui/toaster`) | Sử dụng `group: 'basic'` khớp với `ToastRoot.tsx` |
| `useCookie(APP_TOKEN_NAME)` + `localStorage` | `useAuthStore().login(token, expires, user)` | Đồng bộ tức thì trạng thái đăng nhập trên `EndTopBar` và lưu `userInfo` |
| `navigateTo(...)` / `<NuxtLink>` | `useRouter()` / `<Link>` từ `@/i18n/routing` | Hỗ trợ điều hướng đa ngôn ngữ chuẩn `next-intl` |

---

## 4. Các Câu Hỏi & Quyết Định Kỹ Thuật Đã Thống Nhất Với User

1. **API Endpoints (`src/api/fetchAuth.ts`)**:
   - Sử dụng prefix `/customer`:
     - `POST /customer/login`
     - `POST /customer/forgot-password`
     - `POST /customer/reset-password`
2. **Validation (`src/utils/validate.ts`)**:
   - Sử dụng file `src/utils/validate.ts` (`useValidation`) do user cung cấp trong dự án.
3. **UI Component `MessageError` & PrimeReact**:
   - Tạo mới `src/components/common/MessageError.tsx` dùng chung và ánh xạ các input/button sang `@primereact/ui` + PrimeIcons (`pi pi-*`).
4. **State Management (`src/stores/authStore.ts`)**:
   - Sử dụng `useAuthStore().login(token, expires, userInfo)` để đồng bộ trạng thái header (`EndTopBar`) và lưu `userInfo` vào cả `authStore` lẫn `localStorage`.

---

## 5. Checklist Tiến Độ Xử Lý
- [x] Phân tích code Vue (`login.vue`, `forgot-password.vue`, `reset-password.vue`)
- [x] Tạo API wrapper trong `src/api/fetchAuth.ts`
- [x] Tạo `src/components/common/MessageError.tsx` & cập nhật `src/stores/authStore.ts`
- [x] Implement Server Component `page.tsx` & Client Component cho `login`, `forgot-password`, `reset-password`
- [x] Xóa toàn bộ file `.vue` cũ trong `src/app/[locale]/auth/`
- [x] Tự review & kiểm tra theo checklist `@react-patterns`
