'use client';

import Image from 'next/image';
import {useTranslations} from "next-intl";
import {JSX} from "react";

export function Logo({ className }: { className?: string }): JSX.Element {
    const t = useTranslations();
    return (
        <div className={`logo ${className || ''}`}>
            <Image src={"/layout/logo.png"} alt={"logo"} className={"w-auto h-auto object-contain"} width={142} height={50} priority />
            <p className={"uppercase"}>  {t('layout.textUnderLogo')}</p>
        </div>
    )
}