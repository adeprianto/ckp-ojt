import { type UserStatus } from './schema';

export const callTypes = new Map<UserStatus, string>([
    [
        'active',
        'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200',
    ],
    ['inactive', 'bg-neutral-300/40 border-neutral-300'],
    ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
    [
        'suspended',
        'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
    ],
]);

export const afdelings = [
    {
        label: 'Afdeling 1',
        value: '1',
    },
    {
        label: 'Afdeling 2',
        value: '2',
    },
    {
        label: 'Afdeling 3',
        value: '3',
    },
    {
        label: 'Afdeling 4',
        value: '4',
    },
    {
        label: 'Afdeling 5',
        value: '5',
    },
    {
        label: 'Afdeling 6',
        value: '6',
    },
] as const;
