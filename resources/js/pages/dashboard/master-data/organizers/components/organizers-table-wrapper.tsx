import axios from 'axios';
import { useEffect, useState } from 'react';

import { Spinner } from '@/components/ui/spinner';
import type { Organizer } from '@/types/organizer';
import { useOrganizers } from './organizers-provider';
import { OrganizersTable } from './organizers-table';

export function OrganizersTableWrapper() {
    const { organizers, setOrganizers } = useOrganizers();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get<Organizer[]>(
                    '/api/master-data/organizer',
                );

                setOrganizers(response.data);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [setOrganizers]);

    return isLoading ? (
        <div className="flex h-32 flex-1 items-center justify-center gap-x-4">
            <Spinner />
            <span>Loading ...</span>
        </div>
    ) : (
        <OrganizersTable data={organizers} />
    );
}
