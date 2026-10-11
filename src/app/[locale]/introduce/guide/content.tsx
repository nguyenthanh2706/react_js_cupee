import type { Section } from './types';

interface Props {
    guideSelected?: Section | null;
}

export default function GuideContent({ guideSelected }: Props) {
    if (!guideSelected) {
        return null;
    }

    return (
        <>
            <h2 className="text-xl uppercase font-bold text-gray-900 mb-4">{guideSelected.title}</h2>
            <div
                className="ckeditor-content mb-20"
                dangerouslySetInnerHTML={{ __html: guideSelected.content ?? '' }}
            />
        </>
    );
}
