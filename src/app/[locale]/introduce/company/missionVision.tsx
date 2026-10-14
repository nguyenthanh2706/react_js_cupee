'use client';

import { useTranslations } from 'next-intl';

interface Props {
    missionVision?: {
        mission?: string;
        vision?: string;
    };
}

export default function MissionVision({ missionVision }: Props) {
    const t = useTranslations('introduceCompany.missionVision');

    return (
        <section className="py-20 bg-[#ffffff]">
            <div className="mx-auto layout-content relative mt-[40px]">
                <span
                    className="absolute top-[-140px] text-[120px] text-[#000000] rotate-[-9deg] origin-left block pointer-events-none select-none"
                    style={{ fontFamily: "'SVN Harmony', sans-serif" }}
                >
                    Gốm Việt , <br />
                    Mỗi sản phẩm là, một câu chuyện của bạn
                </span>

                <div className="grid lg:grid-cols-2 gap-16 items-center mb-[53.5px]">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4 tracking-tight">
                                {t('missionTitle')}
                            </h2>
                            <p className="text-[#B4967C] font-medium mb-8">{t('missionSubtitle')}</p>
                        </div>

                        <div className="space-y-5 text-[#000000] text-base leading-relaxed">
                            {missionVision?.mission ? (
                                <p>{missionVision.mission}</p>
                            ) : (
                                <>
                                    <p>{t('missionParagraph1')}</p>
                                    <p>{t('missionParagraph2')}</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="relative h-[500px]">
                        <div className="absolute top-0 right-0 w-48 h-48 rounded-2xl overflow-hidden shadow-xl transform rotate-6">
                            <img
                                src="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop"
                                alt="Ceramic cups"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="absolute bottom-0 left-0 right-16 h-80 rounded-2xl overflow-hidden shadow-2xl transform -rotate-2">
                            <img
                                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=500&fit=crop"
                                alt="Yellow coffee cup with flowers"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[450px] order-2 lg:order-1">
                        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=500&fit=crop"
                                alt="Ceramic tea set with floral pattern"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-6 order-1 lg:order-2">
                        <div>
                            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4 tracking-tight">
                                {t('visionTitle')}
                            </h2>
                            <p className="text-[#B4967C] font-medium mb-8">{t('visionSubtitle')}</p>
                        </div>

                        <div className="text-[#000000] text-base leading-relaxed">
                            {missionVision?.vision ? (
                                <p>{missionVision.vision}</p>
                            ) : (
                                <p>{t('visionParagraph1')}</p>
                            )}
                        </div>
                        <span
                            className="text-[60px] text-[#000000] block"
                            style={{ fontFamily: "'SVN Harmony', sans-serif" }}
                        >
                            Trở thành thương hiệu gốm thủ công <br />
                            hàng đầu Việt Nam và Quốc Tế
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
