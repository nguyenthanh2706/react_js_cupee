---
name: create-api-wrapper
description: >-
  Sử dụng skill này khi user yêu cầu tạo API wrapper mới hoặc thêm endpoint
  mới. Skill hướng dẫn tạo file theo đúng pattern của fetchProduct.ts,
  sử dụng fetchApi làm base.
---

# Tạo API Wrapper

Project sử dụng pattern wrapper cho API calls. Tất cả đều đi qua `src/api/fetchApi.ts`.

## Bước 1: Tạo file API wrapper

Tạo file mới trong `src/api/` với tên `fetch<Feature>.ts`:

```tsx
import { fetchApi } from './fetchApi';

export const fetch<Feature> = (t: (key: string, params?: any) => string) => ({
    list: async (params?: string) => {
        const { data, error } = await fetchApi(`/platform/<feature>?${params ?? ''}`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    },

    detail: async (code: string, params?: string) => {
        const { data, error } = await fetchApi(`/platform/<feature>/${code}?${params ?? ''}`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    },

    create: async (body: Record<string, any>) => {
        const { data, error } = await fetchApi('/platform/<feature>', { method: 'POST', data: body }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    },

    update: async (code: string, body: Record<string, any>) => {
        const { data, error } = await fetchApi(`/platform/<feature>/${code}`, { method: 'PUT', data: body }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    },

    delete: async (code: string) => {
        const { data, error } = await fetchApi(`/platform/<feature>/${code}`, { method: 'DELETE' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    },
});
```

## Quy tắc quan trọng

1. **Tham số `t`**: Mọi API wrapper đều nhận hàm `t` (translation) để `fetchApi` có thể hiển thị toast thông báo lỗi đa ngôn ngữ.
2. **Return format**: Luôn trả về object `{ data, error }`. Data được unwrap từ `data?._data?.data`.
3. **Query string**: Dùng tham số `params` kiểu string cho GET requests. Component gọi API tự build query string.
4. **Body data**: Dùng `apiOptions.data` cho POST/PUT requests, `fetchApi` tự `JSON.stringify`.

## Bước 2: Sử dụng trong component

```tsx
import { fetch<Feature> } from '@/api/fetch<Feature>';

// Trong component
const { data } = await fetch<Feature>(t).list(queryString);
```

## Tham khảo

Xem file mẫu: `src/api/fetchProduct.ts`
