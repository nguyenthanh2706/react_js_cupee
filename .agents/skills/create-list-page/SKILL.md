---
name: create-list-page
description: >-
  Sử dụng skill này khi user yêu cầu tạo một trang danh sách (list page) có bộ lọc,
  phân trang, và gọi API. Skill hướng dẫn tạo theo đúng pattern Container-Presentational
  giống trang product/list hiện tại.
---

# Tạo Trang Danh Sách (List Page)

Trang danh sách trong project theo pattern **Container-Presentational** với 3 thành phần chính.

## Cấu trúc file

```
src/app/[locale]/<feature>/list/
├── page.tsx          # Container: quản lý state, gọi API
├── filter.tsx        # Bộ lọc (search, filter tabs)
├── main.tsx          # Hiển thị danh sách items
└── item*.tsx         # Component con cho từng loại filter (nếu cần)
```

## Bước 1: Tạo page.tsx (Container)

Chịu trách nhiệm:
- Khai báo tất cả state: `optionsFilter`, `pagination`, data (`items` + `isLoading`)
- Gọi API trong `useEffect` khi filter/pagination thay đổi
- Truyền data và callback xuống component con

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { fetch<Feature> } from '@/api/fetch<Feature>';

export interface OptionsFilter {
    q?: string | null;
    // ... các field filter khác
}

export default function FeatureListPage() {
    const t = useTranslations();
    const locale = useLocale();

    const [optionsFilter, setOptionsFilter] = useState<OptionsFilter>({ q: '' });
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
    const [data, setData] = useState({ isLoading: true, items: [] });

    useEffect(() => {
        const fetchList = async () => {
            setData({ isLoading: true, items: [] });
            // Build query string từ optionsFilter + pagination
            // Gọi API
            // Cập nhật state
        };
        fetchList();
    }, [optionsFilter, pagination.page, pagination.limit]);

    return (
        <div>
            <FilterComponent
                dataFilter={optionsFilter}
                onUpdateDataFilter={(newFilter) => {
                    setData(prev => ({ ...prev, isLoading: true }));
                    setOptionsFilter(newFilter);
                    setPagination(prev => ({ ...prev, page: 1 }));
                }}
            />
            <MainComponent isLoading={data.isLoading} listData={data.items} />
        </div>
    );
}
```

## Bước 2: Tạo filter.tsx

- Nhận `dataFilter` và `onUpdateDataFilter` từ page.tsx
- Quản lý UI state nội bộ (ẩn/hiện filter, active tab)
- Khi user thao tác filter → gọi `onUpdateDataFilter` để bắn lên page.tsx

## Bước 3: Tạo main.tsx (Presentational)

- Chỉ nhận `isLoading` và `listData` qua props
- Dùng `useMemo` để format/transform data trước khi render
- Xử lý 3 trạng thái: Loading, Empty, và List

## Tham khảo

Xem implementation mẫu: `src/app/[locale]/product/list/`
