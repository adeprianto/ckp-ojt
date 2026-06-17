import type { InertiaLinkProps } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export type BaseNavItem = {
    title: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    badge?: string;
};

export type NavLink = BaseNavItem & {
    href: NonNullable<InertiaLinkProps['href']>;
    items?: never;
};

export type NavCollapsible = BaseNavItem & {
    items: (BaseNavItem & { href: NonNullable<InertiaLinkProps['href']> })[];
    href?: never;
};

export type NavItem = NavCollapsible | NavLink;

export interface NavGroup {
    title: string;
    items: NavItem[];
}
