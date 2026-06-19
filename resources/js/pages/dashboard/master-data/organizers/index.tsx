import { Head } from '@inertiajs/react';
import { OrganizerProvider } from '@/pages/dashboard/master-data/organizers/components/organizers-provider';
import { OrganizersTableWrapper } from '@/pages/dashboard/master-data/organizers/components/organizers-table-wrapper';

export default function MasterDataOrganizers() {
    return (
        <>
            <OrganizerProvider>
                <Head title="Dashboard" />
                <div className="flex h-full flex-1 flex-col gap-x-4 gap-y-8 overflow-x-auto rounded-xl p-4">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">
                            Data Master Penyelenggara
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Manajemen data master penyelenggara pelatihan
                        </p>
                    </div>
                    <OrganizersTableWrapper />
                </div>
            </OrganizerProvider>
        </>
    );
}

MasterDataOrganizers.layout = {
    breadcrumbs: [
        {
            title: 'Master Data - Penyelenggara',
            href: '#',
        },
    ],
};
