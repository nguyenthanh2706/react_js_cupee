// Helper fetch phía server: kiểm tra status/content-type trước khi parse JSON,
// để khi API trả về HTML (404/500...) sẽ log rõ URL thay vì lỗi "Unexpected token '<'" khó debug.
export async function serverFetchJson<T = any>(url: string, init?: RequestInit & { next?: { revalidate?: number } }) {
    const res = await fetch(url, init);
    const contentType = res.headers.get('content-type') ?? '';

    if (!res.ok || !contentType.includes('application/json')) {
        const body = await res.text();
        console.error(
            `[serverFetchJson] ${res.status} ${res.statusText} - ${url}\n` +
                `content-type: ${contentType}\n` +
                `body: ${body.slice(0, 200)}`
        );
        return { data: null as T | null, error: { status: res.status, url } };
    }

    const json = await res.json();
    return { data: (json?.data ?? null) as T | null, error: null };
}
