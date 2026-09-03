'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { IconFieldRoot } from '@primereact/ui/iconfield';
import { InputText } from '@primereact/ui/inputtext';

interface Props {
    value?: string | null;
    placeholder?: string;
    isShowBtn?: boolean;
    className?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
}

export default function InputSearch({
    value = '',
    placeholder = '',
    isShowBtn = true,
    className = '',
    onChange,
    onSearch
}: Props) {
    const t = useTranslations();

    const [localValue, setLocalValue] = useState<string>(value || '');
    const [prevValue, setPrevValue] = useState<string | null | undefined>(value);

    // Thay thế useEffect bằng Derived State ngay trong quá trình Render
    if (value !== prevValue) {
        setPrevValue(value);
        setLocalValue(value || '');
    }

    // Debounce logic
    useEffect(() => {
        const handler = setTimeout(() => {
            // Chỉ bắn lên nếu khác với giá trị hiện tại của Cha
            if (onChange && localValue !== (value || '')) {
                onChange(localValue);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [localValue, value, onChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(localValue);
        }
    };

    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(localValue);
        }
    };

    return (
        <div className="flex flex-row items-center">
            <IconFieldRoot className="mr-3 input-search relative">
                <InputText
                    className={`w-full ${className}`}
                    type="text"
                    placeholder={placeholder}
                    value={localValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <i 
                    className="pi pi-search cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" 
                    onClick={handleSearchClick} 
                ></i>
            </IconFieldRoot>
            
            {isShowBtn && (
                <span className="font-bold cursor-pointer" onClick={handleSearchClick}>
                    {t('btn.search')}
                </span>
            )}
        </div>
    );
}
