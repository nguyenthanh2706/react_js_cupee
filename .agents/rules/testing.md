# Testing Principles

> Áp dụng khi bắt đầu viết test cho project. Ưu tiên test những gì user nhìn thấy, không test implementation detail.

---

## Các level test

| Level | Test cái gì | Tool |
|-------|-------------|------|
| **Unit** | Pure functions, Custom hooks | Vitest, Jest |
| **Integration** | Component behavior, user interaction | React Testing Library |
| **E2E** | Luồng user hoàn chỉnh (đăng nhập, mua hàng) | Playwright, Cypress |

---

## Thứ tự ưu tiên viết test

1. **User-visible behavior** — test những gì user thấy và tương tác, không test code nội bộ
2. **Edge cases** — giá trị rỗng, null, undefined, list trống
3. **Error states** — API lỗi, form submit fail, network timeout
4. **Accessibility** — keyboard navigation, screen reader

---

## Nguyên tắc quan trọng

- Test **behavior**, không test **implementation**
  ```tsx
  // ❌ Test implementation — dễ vỡ khi refactor
  expect(component.state.isLoading).toBe(false)

  // ✅ Test behavior — user nhìn thấy gì
  expect(screen.getByText('Đặt hàng thành công')).toBeInTheDocument()
  ```

- Ưu tiên **Integration test** nhất — vừa đủ nhanh, vừa test được real behavior
- **Unit test** cho logic thuần (helper functions, hooks phức tạp)
- **E2E test** ít nhất — chậm, tốn resource, chỉ cho happy path quan trọng

---

## Cấu trúc file test

```
src/
├── app/[locale]/product/list/
│   ├── page.tsx
│   ├── useProductList.ts
│   └── __tests__/
│       ├── useProductList.test.ts   ← Unit test hook
│       └── ProductListPage.test.tsx ← Integration test
└── utils/
    ├── helpers.ts
    └── __tests__/
        └── helpers.test.ts          ← Unit test pure functions
```
