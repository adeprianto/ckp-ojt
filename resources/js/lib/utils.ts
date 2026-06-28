import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function sleep(ms: number = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getPageNumbers(currentPage: number, totalPages: number) {
    const maxVisiblePages = 5; // Maximum number of page buttons to show
    const rangeWithDots = [];

    if (totalPages <= maxVisiblePages) {
        // If total pages is 5 or less, show all pages
        for (let i = 1; i <= totalPages; i++) {
            rangeWithDots.push(i);
        }
    } else {
        // Always show first page
        rangeWithDots.push(1);

        if (currentPage <= 3) {
            // Near the beginning: [1] [2] [3] [4] ... [10]
            for (let i = 2; i <= 4; i++) {
                rangeWithDots.push(i);
            }

            rangeWithDots.push('...', totalPages);
        } else if (currentPage >= totalPages - 2) {
            // Near the end: [1] ... [7] [8] [9] [10]
            rangeWithDots.push('...');

            for (let i = totalPages - 3; i <= totalPages; i++) {
                rangeWithDots.push(i);
            }
        } else {
            // In the middle: [1] ... [4] [5] [6] ... [10]
            rangeWithDots.push('...');

            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                rangeWithDots.push(i);
            }

            rangeWithDots.push('...', totalPages);
        }
    }

    return rangeWithDots;
}

export function mapRegionIdToRegion(id: number) {
    switch (id) {
        case 1:
            return 'ho';
        case 2:
            return 'reg1';
        case 3:
            return 'reg2';
        case 4:
            return 'reg3';
        case 5:
            return 'reg5';
        case 6:
            return 'reg7';
        default:
            return 'reg8';
    }
}
