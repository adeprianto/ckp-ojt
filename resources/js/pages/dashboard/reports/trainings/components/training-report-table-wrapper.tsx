import axios from 'axios';
import { useEffect, useState } from 'react';

import { Spinner } from '@/components/ui/spinner';
import { TrainingReportTable } from '@/pages/dashboard/reports/trainings/components/training-report-table';
import type { Training } from '@/types/training';
import { useTrainingReport } from './training-report-provider';
// import { TrainingTable } from './training-table';

export function TrainingReportTableWrapper() {
    const { trainings, setTrainings } = useTrainingReport();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrainings = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get<Training[]>(
                    '/api/training/overview',
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
        <TrainingReportTable data={trainings} />
    );
}
