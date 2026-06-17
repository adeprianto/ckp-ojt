import type { UrlMethodPair } from '@inertiajs/core';
import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { NavItem } from '@/types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function checkIsActive(href: string, item: NavItem, mainNav = false) {
    return (
        (typeof item.href === 'object' &&
        item.href !== null &&
        'url' in item.href
            ? href === (item.href as UrlMethodPair).url
            : href === item.href) || // /endpint?search=param
        href.split('?')[0] === item.href || // endpoint
        !!item?.items?.filter((i) =>
            typeof i.href === 'object' && i.href !== null && 'url' in i.href
                ? href === (i.href as UrlMethodPair).url
                : href === i.href,
        ).length || // if child nav is active
        (mainNav &&
            href.split('/')[1] !== '' &&
            (typeof item.href === 'object' &&
            item.href !== null &&
            'url' in item.href
                ? href.split('/')[1] ===
                  (item.href as UrlMethodPair).url?.split('/')[1]
                : href.split('/')[1] === item?.href?.split('/')[1]))
    );
}
