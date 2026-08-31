'use client';

import React, { createContext, useContext, useState } from 'react';

export interface LayoutState {
    activeMenuItem: string | null;
}

export interface LayoutContextType {
    layoutState: LayoutState;
    setActiveMenuItem: (key: string | null) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
    const [layoutState, setLayoutState] = useState<LayoutState>({
        activeMenuItem: null,
    });
    // 🟢 3. Hàm cập nhật menu active (mở/đóng dropdown)
    const setActiveMenuItem = (key: string | null) => {
        setLayoutState((prev) => ({ ...prev, activeMenuItem: key }));
    };
    return (
        <LayoutContext.Provider
            value={{
                layoutState,
                setActiveMenuItem,
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayout() {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be use inside LayoutProvider');
    }
    return context;
}