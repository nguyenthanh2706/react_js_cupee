import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const nextConfig: NextConfig = {
    experimental: {
        cssChunking: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.custom-ec.supenient.vn',
            },
        ],
    },
};

export default withNextIntl(nextConfig);