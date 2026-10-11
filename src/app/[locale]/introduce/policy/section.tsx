import type { Policy } from './types';

// Server / Presentational component: không có state, không cần 'use client'
// TODO: content đến từ CMS — nên sanitize (vd: isomorphic-dompurify) như bản Nuxt dùng $sanitize
export default function PolicySection({ code, title, content }: Policy) {
    return (
        <section id={code} className="content">
            <h2 className="text-xl uppercase font-bold text-gray-900 mb-4">{title}</h2>
            <div className="ckeditor-content mb-20" dangerouslySetInnerHTML={{ __html: content }} />
        </section>
    );
}
