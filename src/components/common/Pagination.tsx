'use client';

import React from 'react';
import { EllipsisH } from '@primeicons/react';
import { ArrowLeft } from '@primeicons/react/arrow-left';
import { ArrowRight } from '@primeicons/react/arrow-right';
import { AngleDoubleLeft } from '@primeicons/react/angle-double-left';
import { AngleDoubleRight } from '@primeicons/react/angle-double-right';
import { ChevronDown } from '@primeicons/react/chevron-down';
import { Check } from '@primeicons/react/check';
import { Paginator } from '@primereact/ui/paginator';
import { Select } from 'primereact/select';
import { PER_PAGE_LIST } from '@/utils/constants';

interface Props {
    page: number;
    limit: number;
    total: number;
    onChangePage: (newPage: number) => void;
    onChangeLimit?: (newLimit: number) => void;
}

const limitOptions = PER_PAGE_LIST.map(size => ({ name: String(size), code: String(size) }));

export function Pagination({ page, limit, total, onChangePage, onChangeLimit }: Props) {
    const totalPages = Math.ceil(total / limit);

    if (total <= 0 || totalPages <= 1) return null;

    // Tìm object hiện tại đang được chọn dựa trên giá trị limit
    const selectedLimit = limitOptions.find(opt => opt.code === String(limit)) || limitOptions[0];

    return (
        <>
        <style>{`
            .pagination-limit {
                display: inline-flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
                padding: 8px 12px;
                border: 1px solid #cbd5e1;
                border-radius: 6px;
                background: #fff;
                cursor: pointer;
                font-size: 14px;
                color: #374151;
                min-width: 70px;
            }
            .pagination-limit:hover { border-color: #94a3b8; }
            .pagination-limit[data-focus] { 
                border-color: var(--color-main); 
                outline: none; 
                box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-main) 15%, transparent);
            }
            .pagination-limit svg { width: 12px; height: 12px; color: #64748b; }

            .pagination-select-popup {
                background: #fff;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
                overflow: hidden;
                z-index: 1000;
                min-width: 70px;
            }
            .pagination-select-list {
                padding: 4px 0;
                margin: 0;
                list-style: none;
                max-height: 14rem;
                overflow-y: auto;
            }
            .pagination-select-option {
                padding: 8px 16px;
                font-size: 14px;
                color: #374151;
                cursor: pointer;
                transition: background 0.15s ease;
                display: flex;
                align-items: center;
            }
            .pagination-select-option:hover,
            .pagination-select-option[data-focus] {
                background: #f1f5f9;
            }
            .pagination-select-option[data-selected] {
                background: var(--color-main) !important;
                color: #fff !important;
            }
            .pagination-select-check {
                display: none;
            }
        `}</style>
        <div className="flex items-center justify-center gap-3 flex-wrap mt-4">
            <Paginator.Root
                page={page}
                total={total}
                itemsPerPage={limit}
                onPageChange={(e) => onChangePage(e.value)}
            >
                <Paginator.Content>
                    <Paginator.First className="min-w-auto! px-3! py-2! rounded-md!">
                        <AngleDoubleLeft />
                    </Paginator.First>
                    <Paginator.Prev className="rounded-md! border! border-surface!">
                        <ArrowLeft className="text-sm" />
                    </Paginator.Prev>
                    <Paginator.Pages>
                        {({ paginator }: any) =>
                            paginator?.pages.map((p: any, index: number) =>
                                p.type === 'page' ? (
                                    <Paginator.Page
                                        key={index}
                                        value={p.value}
                                        className="rounded-md! border! border-surface! data-active:border-primary-500/25!"
                                    />
                                ) : (
                                    <Paginator.Ellipsis key={index}>
                                        <EllipsisH />
                                    </Paginator.Ellipsis>
                                )
                            )
                        }
                    </Paginator.Pages>
                    <Paginator.Next className="rounded-md! border! border-surface!">
                        <ArrowRight className="text-sm" />
                    </Paginator.Next>
                    <Paginator.Last className="min-w-auto! px-3! py-2! rounded-md!">
                        <AngleDoubleRight />
                    </Paginator.Last>
                </Paginator.Content>
            </Paginator.Root>

            {onChangeLimit && (
                <Select.Root
                    options={limitOptions}
                    optionLabel="name"
                    value={selectedLimit}
                    onValueChange={(e: any) => onChangeLimit(Number(e.value.code))}
                >
                    <Select.Trigger className="pagination-limit">
                        <Select.Value />
                        <Select.Indicator>
                            <ChevronDown />
                        </Select.Indicator>
                    </Select.Trigger>
                    <Select.Portal>
                        <Select.Positioner sideOffset={4}>
                            <Select.Popup className="pagination-select-popup">
                                <Select.List className="pagination-select-list">
                                    {limitOptions.map((opt, index) => (
                                        <Select.Option key={opt.code} index={index} uKey={opt.code} className="pagination-select-option">
                                            <Select.OptionIndicator className="pagination-select-check">
                                                <Check />
                                            </Select.OptionIndicator>
                                            <span className="pagination-select-text">{opt.name}</span>
                                        </Select.Option>
                                    ))}
                                </Select.List>
                            </Select.Popup>
                        </Select.Positioner>
                    </Select.Portal>
                </Select.Root>
            )}
        </div>
        </>
    );
}
