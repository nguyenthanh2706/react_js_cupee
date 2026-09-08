'use client';

import React from 'react';
import { EllipsisH } from '@primeicons/react';
import { ArrowLeft } from '@primeicons/react/arrow-left';
import { ArrowRight } from '@primeicons/react/arrow-right';
import { AngleDoubleLeft } from '@primeicons/react/angle-double-left';
import { AngleDoubleRight } from '@primeicons/react/angle-double-right';
import { Paginator } from '@primereact/ui/paginator';
import { PER_PAGE_LIST } from '@/utils/constants';

interface Props {
    page: number;
    limit: number;
    total: number;
    onChangePage: (newPage: number) => void;
    onChangeLimit?: (newLimit: number) => void;
}

export function Pagination({ page, limit, total, onChangePage, onChangeLimit }: Props) {
    const totalPages = Math.ceil(total / limit);

    if (total <= 0 || totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-3 flex-wrap mt-4">
            <Paginator.Root
                page={page}
                total={total}
                itemsPerPage={limit}
                onPageChange={(e) => onChangePage(e.value)}
            >
                <Paginator.Content>
                    <Paginator.First className="min-w-auto! px-3! py-2! rounded-md!"> <AngleDoubleLeft /></Paginator.First>
                    <Paginator.Prev className="rounded-md! border! border-surface!">
                        <ArrowLeft className="text-sm" />
                    </Paginator.Prev>
                    <Paginator.Pages>
                        {({ paginator }: any) =>
                            paginator?.pages.map((page: any, index: number) =>
                                page.type === 'page' ? (
                                    <Paginator.Page
                                        key={index}
                                        value={page.value}
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
                    <Paginator.Last className="min-w-auto! px-3! py-2! rounded-md!"><AngleDoubleRight /></Paginator.Last>
                </Paginator.Content>
            </Paginator.Root>

            {/* Dropdown chọn số item mỗi trang */}
            {onChangeLimit && (
                <select
                    value={limit}
                    onChange={(e) => onChangeLimit(Number(e.target.value))}
                    className="p-paginator-rpp-dropdown"
                >
                    {PER_PAGE_LIST.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}
