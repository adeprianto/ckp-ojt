import type { InertiaLinkProps } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { toUrl } from '@/lib/utils';

export function useActiveUrl() {
    const page = usePage();

    // 1. Use a dummy base URL ('http://localhost') purely to satisfy the URL constructor.
    // This allows us to safely parse the pathname (stripping query parameters)
    // WITHOUT relying on the browser's `window` object.
    const currentUrlPath = new URL(page.url, 'http://localhost').pathname;

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
