import axios from 'axios';
import { useEffect, useState } from 'react';

import { Spinner } from '@/components/ui/spinner';
import type { Training } from '@/types/training';
import { useTraining } from './training-provider';
import { TrainingTable } from './training-table';

export function TrainingTableWrapper() {
    const { trainings, setTrainings } = useTraining();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrainings = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get<Training[]>(
                    '/api/master-data/training',
                );

                setTrainings(response.data);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
                setIsLoading(false);
            }
        };

        fetchTrainings();
    }, [setTrainings]);

    return isLoading ? (
        <div className="flex h-32 flex-1 items-center justify-center gap-x-4">
            <Spinner />
            <span>Loading ...</span>
        </div>
    ) : (
        <TrainingTable data={trainings} />
    );
}
