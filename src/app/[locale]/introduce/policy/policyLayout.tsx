'use client';

import { useState, type ReactNode } from 'react';
import PolicyNavigation from './navigation';
import { useStickyNav } from './useStickyNav';
import type { Policy } from './types';

interface Props {
    policies: Pick<Policy, 'code' | 'title'>[];
    children: ReactNode; // các PolicySection render sẵn trên server
}

const SCROLL_OFFSET = 200;

// Container (client): chỉ giữ phần tương tác (scroll, active menu).
export default function PolicyLayout({ policies, children }: Props) {
    const { containerRef, isFixed, top } = useStickyNav<HTMLDivElement>();
    const [activeCode, setActiveCode] = useState<string | null>(null);

    const scrollToSection = (code: string) => {
        setActiveCode(code);
        const element = document.getElementById(code);
        if (!element) return;
        const y = element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    return (
        <div className="introduce-policy" ref={containerRef}>
            <div className="left-item">
                <PolicyNavigation
                    policies={policies}
                    activeCode={activeCode}
                    onNavigate={scrollToSection}
                    className={isFixed ? 'hidden' : ''}
                />
            </div>
            <div className={`item-fixed ${isFixed ? 'is-fixed' : ''}`} style={{ top }}>
                <PolicyNavigation policies={policies} activeCode={activeCode} onNavigate={scrollToSection} />
            </div>

            <div className="right-item">{children}</div>
        </div>
    );
}
