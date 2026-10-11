---
name: vue-to-react-workflow
description: Quy trình chuẩn chỉ từng bước áp dụng khi user yêu cầu chuyển đổi code từ Vue (Vue.js / Nuxt) sang React / Next.js.
trigger: model_decision
---

# Vue to React Conversion Workflow

Quy trình chuẩn chỉ bắt buộc thực hiện theo từng bước tuần tự khi chuyển đổi code từ Vue (Vue 2/3, Nuxt) sang React/Next.js 16 App Router.

---

## BƯỚC 1: Phân Tích Toàn Diện Mã Nguồn Vue (Deep Analysis)

Trước khi viết bất kỳ dòng code nào, phải đọc kỹ và lập bản đồ các thành phần của file Vue:
1. **Template**: Cấu trúc DOM, các directive (`v-if`, `v-for`, `v-model`, `v-html`), các slot (default slot, named slot).
2. **Script (Options API hoặc Composition API)**:
   - State (`data` / `ref` / `reactive`)
   - Computed properties
   - Watchers và Lifecycle hooks (`created`, `mounted`, `beforeUnmount`...)
   - Methods / Handlers
   - Props và Emits (`props`, `$emit`, `defineProps`, `defineEmits`)
3. **Phụ thuộc ngoại vi (Dependencies)**:
   - Mixins, composables, custom filters.
   - Các biến toàn cục / plugins (`$t`, `$axios`, `$router`, `$route`, `$sanitize`, v.v.).
   - Vuex / Pinia stores (`mapState`, `mapActions`, `useStore`).
   - Component con được import.
   - API calls nội tại hoặc thông qua service/store.

---

## BƯỚC 2: Rà Soát Logic Thiếu & Thiết Kế Bộ Câu Hỏi (Missing Logic & Gap Checklist)

> **NGUYÊN TẮC BẮT BUỘC:** Nếu phát hiện logic bên Vue bị thiếu nguồn, mơ hồ, hoặc không tìm thấy file tương ứng trong dự án React, **PHẢI DỪNG LẠI VÀ HỎI USER**. Tuyệt đối không tự suy đoán hay bịa logic.

Dưới đây là checklist các trường hợp phải đặt câu hỏi làm rõ với user:

### 1. Vấn đề Call API:
- Code Vue gọi API (qua axios, fetch, action) nhưng chưa có file `fetch*.ts` tương ứng trong `src/api/`:
  - 👉 *Hỏi:* "API endpoint này bên React đã có wrapper trong `src/api/` chưa, hay cần tạo mới trong `src/api/fetch[Feature].ts`?"
  - 👉 *Hỏi:* "Định dạng request payload, query params, và response schema cụ thể là gì?"
- API được gọi trên Server (SSR) hay Client:
  - 👉 *Hỏi:* "Dữ liệu này cần fetch trên Server Component (`page.tsx`) hay fetch dưới Client Component thông qua hook/handler?"

### 2. Vấn đề Helper / Function ngoại vi không thấy nguồn:
- Code Vue sử dụng function/mixin/prototype mà không thấy file định nghĩa (ví dụ: `$formatDate`, `$sanitize`, `helper.doSomething()`):
  - 👉 *Hỏi:* "Hàm `[tên_hàm]` bên Vue hiện tại trong dự án React đã có trong `src/utils/` chưa, hay cần implement mới?"

### 3. Vấn đề Quản lý State (Store):
- Code Vue sử dụng Vuex/Pinia state:
  - 👉 *Hỏi:* "State `[tên_state]` này cần lưu vào Zustand store (`src/stores/`) dùng chung cho toàn app hay chỉ cần quản lý local trong component bằng `useState`?"

### 4. Vấn đề Assets / UI Components:
- Vue dùng component thư viện (ví dụ PrimeVue, ElementUI):
  - 👉 *Hỏi/Xác nhận:* "Component `[TênComponent]` sẽ ánh xạ sang component tương ứng của **PrimeReact** (`@primereact/ui`) đúng không?"
- Hình ảnh / Icon:
  - 👉 *Hỏi:* "Ảnh tĩnh cần đặt vào `src/assets/` hay `public/`? Icon sẽ dùng PrimeIcons (`pi pi-*`) hay SVG component?"

---

## BƯỚC 3: Đối Chiếu Cấu Trúc Dự Án (Project Structure Rules)

Tổ chức code đầu ra bám sát nghiêm ngặt quy chuẩn trong `.agents/rules/project-structure.md`:

1. **Phân bổ file theo cấu trúc chuẩn:**
   - **Page entry**: `src/app/[locale]/[feature]/page.tsx` (mặc định là Server Component, dùng `getTranslations()`).
   - **Component con cục bộ**: Đặt ngay trong cùng thư mục với `page.tsx` (ví dụ: `filter.tsx`, `main.tsx`, `section.tsx`, `navigation.tsx`).
   - **Shared component**: Chỉ đưa vào `src/components/common/` hoặc `src/components/` nếu được dùng ở từ 2 trang trở lên.
   - **API layer**: Tất cả call API phải đi qua `src/api/fetchApi.ts`, tổ chức trong `src/api/fetch[Feature].ts`.
   - **Global Store**: Đặt trong `src/stores/[feature]Store.ts` (dùng Zustand).
   - **Utils**: Đặt trong `src/utils/`.

2. **Quy tắc phân định Server Component vs Client Component (Next.js 16):**
   - Mặc định giữ là **Server Component** để tối ưu SEO, fetch data server, và giảm bundle size.
   - Chỉ thêm `'use client'` khi component có tương tác: `useState`, `useEffect`, `useRef`, event handlers (`onClick`, `onChange`).
   - Áp dụng **Composition / Slot Pattern** (`{children}`): Đẩy Client Component làm vỏ bọc bên ngoài (Layout/Container), nhét Server Component vào bên trong qua `children` để không làm mất lợi thế SSR.

3. **Quy tắc SCSS & Styling:**
   - Tuân thủ rule trong `AGENTS.md`: SCSS import phải có `./` và đuôi `.scss` (ví dụ: `@import './tên-file.scss';`).
   - Giữ nguyên các class name tương ứng để kế thừa style cũ mà không làm vỡ giao diện.

---

## BƯỚC 4: Tạo Tài Liệu Ghi Vết Chuyển Đổi Trong Thư Mục `docs/`

Trước khi bắt tay vào code hoặc song song với quá trình chuyển đổi, **bắt buộc tạo một file markdown ghi vết** trong thư mục `docs/`:

- **Đường dẫn file**: `docs/conversions/[feature-name].md` (hoặc `docs/[feature-name]-migration.md`).
- **Nội dung file tài liệu bao gồm:**
  1. **Tổng quan**: Tên feature, file Vue gốc nguồn, mục tiêu chuyển đổi.
  2. **Bản đồ kiến trúc & File Mapping**:
     - Danh sách các file Vue ban đầu.
     - Cấu trúc các file React tương ứng sẽ tạo theo Project Structure.
  3. **Bảng đối chiếu Logic & Component**:
     - Vue Component / Template -> React Server/Client Component.
     - Vue State / Computed -> React Hook / Derived State.
  4. **Các câu hỏi & Quyết định kỹ thuật**:
     - Ghi lại các thắc mắc về API / missing functions đã làm rõ và thống nhất với user.
  5. **Checklist tiến độ xử lý**:
     - [ ] Phân tích code Vue
     - [ ] Tạo API wrapper trong `src/api/`
     - [ ] Xây dựng Types / Interfaces
     - [ ] Implement Server Component `page.tsx`
     - [ ] Implement Client Components
     - [ ] Tự review & Test

---

## BƯỚC 5: Thực Thi Chuyển Đổi (Implementation & Syntax Mapping)

Áp dụng skill `react-patterns` và bảng quy đổi chuẩn:

| Cú pháp Vue | Chuyển đổi sang React / Next.js | Lưu ý |
| :--- | :--- | :--- |
| `v-if` / `v-else-if` / `v-else` | Toán tử ba ngôi `condition ? <A /> : <B />` hoặc `condition && <A />` | Tránh `0 && <A />` (bị in ra số 0) |
| `v-for="(item, index) in list"` | `list.map((item, index) => <Comp key={item.id} />)` | Luôn có `key` duy nhất, hạn chế dùng `index` |
| `v-model="text"` | `value={text} onChange={(e) => setText(e.target.value)}` | Controlled component |
| `computed: { fullName() { ... } }` | Derived state trực tiếp: `const fullName = ...;` (hoặc `useMemo` nếu tính toán nặng) | Không lạm dụng `useEffect` cho derived state |
| `watch` / `mounted` | `useEffect` | **Không** gọi `setState` đồng bộ trong `useEffect`. **Không** dùng `await Promise.resolve()`. Khởi tạo `loading = true` ngay trong `useState(true)` nếu fetch khi mount. |
| `methods: { handleClick() }` | `const handleClick = useCallback(...)` hoặc function thường | Dùng `useCallback` khi truyền xuống con |
| `<slot />` (Default Slot) | `{children}` (Slot Pattern) | Khai báo `children: ReactNode` trong `Props` |
| `<slot name="header" />` (Named Slot) | Prop dạng JSX: `header={<Header />}` | Truyền qua prop thông thường |
| `$emit('submit', data)` | Callback prop: `onSubmit(data)` | Props down, events up |
| `$t('key')` | `getTranslations()` (Server) hoặc `useTranslations()` (Client) | Import từ `next-intl` |
| `$router.push('/path')` | `const router = useRouter()` | Import từ `@/i18n/routing` |
| PrimeVue Components | PrimeReact Components | `@primereact/ui`, class `pi pi-*` |

---

## BƯỚC 6: Dọn Dẹp File Thừa & Tự Review (Cleanup & Self-Review)

1. **Dọn dẹp file `.vue` cũ (Bắt buộc):**
   - Sau khi các file React (`page.tsx`, component, types) đã được tạo và hoạt động, **BẮT BUỘC phải xóa sạch tất cả các file `.vue` cũ** trong thư mục feature đó (`rm -f path/*.vue`).
   - Tuyệt đối không để sót file `.vue` trong thư mục `src/app/[locale]/...` gây rác mã nguồn và nhầm lẫn.

2. **Checklist kiểm tra trước khi hoàn tất:**
   - [ ] **Xóa sạch file `.vue`**: Đã xóa toàn bộ file `.vue` của feature vừa chuyển đổi.
   - [ ] **Sót cú pháp Vue**: Đã loại bỏ hoàn toàn các directive `v-`, `@`, `:`, `$refs`, `v-html` không an toàn.
   - [ ] **TypeScript Types**: Mỗi component đều có `interface Props` rõ ràng, không dùng `any` bừa bãi.
   - [ ] **Next.js 16 Compliance**: `params` trong `page.tsx` là `Promise<{ locale: string }>` và được `await`. Phân định `'use client'` chuẩn xác.
   - [ ] **SCSS Imports**: Đúng định dạng `@import './[file].scss';`.
   - [ ] **Cập nhật docs**: Cập nhật trạng thái hoàn thành vào file `docs/conversions/[feature-name].md`.

