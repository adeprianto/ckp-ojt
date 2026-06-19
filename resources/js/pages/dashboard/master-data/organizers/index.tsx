import { Head } from '@inertiajs/react';
import { OrganizersDialogs } from '@/pages/dashboard/master-data/organizers/components/organizers-dialogs';
import { OrganizersPrimaryButtons } from '@/pages/dashboard/master-data/organizers/components/organizers-primary-buttons';
import { OrganizerProvider } from '@/pages/dashboard/master-data/organizers/components/organizers-provider';
import { OrganizersTableWrapper } from '@/pages/dashboard/master-data/organizers/components/organizers-table-wrapper';
import { home as dashboardHome } from '@/routes/dashboard';

export default function MasterDataOrganizers() {
    return (
        <>
            <OrganizerProvider>
                <Head title="Dashboard" />
                <div className="flex h-full flex-1 flex-col gap-x-4 gap-y-8 overflow-x-auto rounded-xl p-4">
                    <div className="flex flex-wrap items-end justify-between gap-2">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">
                                Data Master Penyelenggara
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Manajemen data master penyelenggara pelatihan
                            </p>
                        </div>
                        <OrganizersPrimaryButtons />
                    </div>
                    <OrganizersTableWrapper />
                </div>

                <OrganizersDialogs />
            </OrganizerProvider>
        </>
    );
}

MasterDataOrganizers.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboardHome(),
        },
        {
            title: 'Master Data - Penyelenggara',
            href: '#',
        },
    ],
};
