'use client';

import { useEffect, useRef, useState } from 'react';

// Custom hook: theo dõi scroll để ghim menu khi cuộn qua vùng container
export function useStickyNav<T extends HTMLElement>() {
    const containerRef = useRef<T>(null);
    const [isFixed, setIsFixed] = useState(false);
    const [top, setTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;

            const menuHeight = document.querySelector<HTMLElement>('.layout-topbar')?.clientHeight ?? 0;
            const paddingTop = parseFloat(window.getComputedStyle(container).paddingTop) || 0;
            const start = container.offsetTop + paddingTop - menuHeight;
            const end = container.offsetTop + container.offsetHeight - menuHeight;
            const scrollY = window.scrollY;

            setIsFixed(scrollY >= start && scrollY < end);
            setTop(menuHeight + 10);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll); // cleanup khi unmount
    }, []);

    return { containerRef, isFixed, top };
}
