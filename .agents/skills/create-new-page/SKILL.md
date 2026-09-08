---
name: create-new-page
description: >-
  Sử dụng skill này khi user yêu cầu tạo một trang (page) mới trong project.
  Skill hướng dẫn tạo đầy đủ các file cần thiết theo đúng cấu trúc App Router
  với i18n, bao gồm page.tsx, các component con, và file SCSS.
---

# Tạo Page Mới

Khi tạo một page mới trong project, tuân theo các bước sau:

## Bước 1: Tạo thư mục route

Tạo thư mục mới trong `src/app/[locale]/` theo tên feature.

```
src/app/[locale]/<feature-name>/
```

## Bước 2: Tạo file page.tsx

File `page.tsx` là entry point. Cấu trúc mẫu:

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Breadcrumb } from '@/components/common/Breadcrumb';

export default function FeatureNamePage() {
    const t = useTranslations();
    const locale = useLocale();

    // State declarations
    // useEffect for data fetching
    // Event handlers

    return (
        <div>
            <div className="banner">
                <Image src="/layout/background.webp" className="img-banner" alt="banner" width={1920} height={400} />
                <Breadcrumb
                    className="t-breadcrumb"
                    model={[
                        { label: t('breadcrumb.homePage'), url: '/introduce/company-info' },
                        { label: t('breadcrumb.featureName') }
                    ]}
                />
            </div>
            {/* Page content */}
        </div>
    );
}
```

## Bước 3: Tạo các component con

Tách component con vào cùng thư mục nếu chỉ dùng trong page đó:
- `main.tsx` - Component hiển thị nội dung chính (presentational)
- `filter.tsx` - Component bộ lọc (nếu có)
- Các item component phụ trợ (ví dụ: `itemCategory.tsx`)

## Bước 4: Tạo file SCSS (nếu cần)

Tạo file SCSS trong thư mục `src/assets/scss/page/` và import vào layout SCSS chính.

## Bước 5: Thêm translation keys

Thêm các key dịch thuật vào file messages JSON trong `src/i18n/messages/`.

## Checklist

- [ ] Đã tạo `page.tsx` với `'use client'` (nếu cần client interaction)
- [ ] Đã khai báo interface cho Props và State
- [ ] Đã thêm Breadcrumb
- [ ] Đã thêm translation keys
- [ ] Đã tạo component con tách biệt (nếu page phức tạp)
- [ ] Đã tạo file SCSS
