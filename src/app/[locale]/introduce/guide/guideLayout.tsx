'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import type { Section } from './types';
import { mapListMenu, findSectionBySlug } from './types';
import GuideNavigation from './navigation';
import GuideContent from './content';

interface Props {
    listGuide: Section[];
    initialSlug?: string;
}

export default function GuideLayout({ listGuide, initialSlug }: Props) {
    const router = useRouter();
    const listMenu = useMemo(() => mapListMenu(listGuide), [listGuide]);

    const initialSection = useMemo(() => {
        if (initialSlug) {
            const found = findSectionBySlug(listMenu, initialSlug);
            if (found) return found;
        }
        return listMenu[0] ?? null;
    }, [listMenu, initialSlug]);

    const [guideSelected, setGuideSelected] = useState<Section | null>(initialSection);

    useEffect(() => {
        if (initialSlug) {
            const found = findSectionBySlug(listMenu, initialSlug);
            if (found) {
                setGuideSelected(found);
            }
        }
    }, [initialSlug, listMenu]);

    const handleSelectSection = (section: Section) => {
        setGuideSelected(section);
        if (section.slug) {
            router.push(`/introduce/guide/${section.slug}`, { scroll: false });
        }
    };

    return (
        <div className="introduce-guide">
            <div className="left-item">
                <GuideNavigation
                    listGuide={listGuide}
                    activeCode={guideSelected?.code ?? null}
                    onSelectSection={handleSelectSection}
                />
            </div>

            <div className="right-item">
                <GuideContent guideSelected={guideSelected} />
            </div>
        </div>
    );
}
