import type { InertiaLinkProps } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

import { toUrl } from '@/lib/utils';

export function useActiveUrl() {
    const page = usePage();

    const currentUrlPath =
        typeof window !== 'undefined'
            ? new URL(page.url, window?.location.origin).pathname
            : undefined;

    function urlIsActive(
        urlToCheck: NonNullable<InertiaLinkProps['href']>,
        currentUrl?: string,
    ) {
        const urlToCompare = currentUrl ?? currentUrlPath;

        return toUrl(urlToCheck) === urlToCompare;
    }

    return {
        currentUrl: currentUrlPath,
        urlIsActive,
    };
}
