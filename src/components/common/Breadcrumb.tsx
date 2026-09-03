'use client';

import React from 'react';
import { Breadcrumb as PRBreadcrumb } from 'primereact/breadcrumb';
import { Link } from '@/i18n/routing';

export interface BreadcrumbItem {
    label: string;
    url?: string;
    icon?: React.ReactNode;
}

export interface BreadcrumbProps {
    model: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ model, className }: BreadcrumbProps) {
    return (
        <PRBreadcrumb.Root className={className}>
            <PRBreadcrumb.List className="flex items-center gap-2 text-xs text-gray-500">
                {model.map((item, index) => {
                    const isLast = index === model.length - 1;

                    return (
                        <React.Fragment key={index}>
                            <PRBreadcrumb.Item>
                                {isLast ? (
                                    <PRBreadcrumb.Current className="text-black">
                                        {item.icon}
                                        {item.label}
                                    </PRBreadcrumb.Current>
                                ) : (
                                    <PRBreadcrumb.Link asChild>
                                        <Link href={item.url || '#'} className="hover:underline flex items-center gap-1">
                                            {item.icon}
                                            {item.label}
                                        </Link>
                                    </PRBreadcrumb.Link>
                                )}
                            </PRBreadcrumb.Item>

                            {!isLast && (
                                <PRBreadcrumb.Separator>/</PRBreadcrumb.Separator>
                            )}
                        </React.Fragment>
                    );
                })}
            </PRBreadcrumb.List>
        </PRBreadcrumb.Root>
    );
}
