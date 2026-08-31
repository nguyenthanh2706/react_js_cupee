'use client';

import * as React from 'react';
import {useServerInsertedHTML} from 'next/navigation';
import {PrimeReactProvider, PrimeReactStyleSheet} from '@primereact/core';
import Aura from '@primeuix/themes/aura';

const styledStyleSheet = new PrimeReactStyleSheet();

export default function PrimeSSRProvider({children}: Readonly<{
    children?: React.ReactNode;
}>) {
    useServerInsertedHTML(() => {
        const styles = styledStyleSheet.getStyles();

        if (!styles || styles.size === 0) return null;

        const styleElements = Array.from(styles.entries()).map(([key, value]) => (
            <style
                key={key}
                data-primereact-style-id={key}
                dangerouslySetInnerHTML={{__html: value?.css ?? ''}}
            />
        ));

        styledStyleSheet.clear();

        return <>{styleElements}</>;
    });

    return (
        <PrimeReactProvider
            theme={{
                preset: Aura,
                options: {
                    darkModeSelector: '.app-dark' // Dark mode
                }
            }}
            stylesheet={styledStyleSheet}
        >
            {children}
        </PrimeReactProvider>
    );
}
