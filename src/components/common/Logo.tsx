'use client';

import Image from 'next/image';
import {useTranslations} from "next-intl";

export function Logo() {
    const t = useTranslations();
    return (
        <div className="logo">
            <Image src={"/layout/logo.png"} alt={"logo"} className={"object-contain"} width={142} height={50} />
            <p className={"uppercase"}>  {t('layout.textUnderLogo')}</p>
        </div>
    )
}