# Performance Debugging

> Chỉ áp dụng khi app **thực sự chậm**. Không tối ưu sớm.

## Quy trình

1. **Check if actually slow** — app có thực sự chậm không? User phàn nàn chưa?
2. **Profile with React DevTools** — mở tab Profiler, record, bấm vào chỗ chậm
3. **Identify bottleneck** — component nào render nhiều? Tính toán gì nặng?
4. **Apply targeted fix** — mới dùng tool bên dưới

---

## Công cụ tối ưu

| Vấn đề | Giải pháp |
|--------|-----------|
| Component render chậm, render thừa nhiều lần | `React.memo` + `useCallback` trên handler truyền xuống |
| Tính toán nặng (sort/filter list lớn) | `useMemo` — chỉ tính lại khi dependency thay đổi |
| List > 100 items bị scroll chậm | Virtualize — chỉ render item đang nhìn thấy (`@tanstack/react-virtual`) |

---

## Lưu ý quan trọng

- `useCallback` **chỉ có tác dụng** khi child component có `React.memo` — thiếu 1 trong 2 thì vô nghĩa
- `useMemo` có chi phí memory — chỉ dùng khi tính toán thực sự chậm, không dùng bừa
- Virtualize trước khi nghĩ đến các tối ưu khác nếu vấn đề là list dài

---

## Error Handling

> Chỉ áp dụng khi component bị lỗi runtime cần handle, không để crash app.

### Error Boundary — Đặt ở đâu?

| Scope | Đặt ở đâu | Trong Next.js |
|-------|-----------|---------------|
| App-wide | Root layout | `app/error.tsx` |
| Route/Feature | Từng route | `app/product/error.tsx` |
| Component | Bọc quanh widget nguy hiểm | Tự tạo ErrorBoundary component |

### Khi có lỗi cần làm 4 việc

- **Show fallback UI** — không để màn hình trắng
- **Log error** — gửi lên Sentry hoặc console.error
- **Offer retry** — nút "Thử lại" để reset ErrorBoundary
- **Preserve user data** — không xóa form, giỏ hàng của user

### Lưu ý

```
Error Boundary BẮT được:          Error Boundary KHÔNG bắt được:
✅ Lỗi trong render                ❌ Lỗi trong onClick, onChange...
✅ Lỗi trong component con         ❌ Lỗi trong async/await
→ Lỗi async vẫn phải dùng try/catch bình thường
```
