'use client';

import React, { useState, useEffect } from 'react';

export function ScrollToTop() {
    const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
    const [isNearFooter, setIsNearFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTopButton(window.scrollY > 150);

            const footer = document.querySelector('.footer') as HTMLElement;
            if (footer) {
                const scrollPositionBottom = window.scrollY + window.innerHeight;
                const footerPositionTop = footer.offsetTop;
                setIsNearFooter(scrollPositionBottom >= footerPositionTop);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const buttonClasses = isNearFooter
        ? 'absolute top-[-25px] right-10 z-10'
        : 'fixed bottom-10 right-10 z-50';

    const scrollToTopAdvanced = () => {
        const targetPosition = 0;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1200;
        let startTime: number | null = null;

        const easeInOutQuint = (time: number, b: number, c: number, d: number) => {
            if ((time /= d / 2) < 1) return (c / 2) * time * time * time * time * time + b;
            return (c / 2) * ((time -= 2) * time * time * time * time + 2) + b;
        };

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuint(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    if (!showScrollToTopButton) return null;

    return (
        <button
            onClick={scrollToTopAdvanced}
            className={`${buttonClasses} transition-all duration-300 text-5 border px-3 py-5 rounded-full font-bold hover:bg-black hover:text-white cursor-pointer`}
        >
            TOP
        </button>
    );
}
