'use client';

import { useState, useMemo } from 'react';
import type { Section } from './types';
import { mapListMenu, findSectionBySlug } from './types';
import GuideNavigation from './navigation';
import GuideContent from './content';

interface Props {
    listGuide: Section[];
    initialSlug?: string;
}

export default function GuideLayout({ listGuide, initialSlug }: Props) {
    const listMenu = useMemo(() => mapListMenu(listGuide), [listGuide]);

    const [guideSelected, setGuideSelected] = useState<Section | null>(
        () => findSectionBySlug(listMenu, initialSlug) ?? listMenu[0] ?? null
    );

    const handleSelectSection = (section: Section) => {
        setGuideSelected(section);
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
