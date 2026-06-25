import axios from 'axios';
import { useEffect } from 'react';

import { Spinner } from '@/components/ui/spinner';
import { useTrainingDetailReportInput } from '@/pages/dashboard/reports/training-detail/components/report/training-detail-report-input-provider';
import { TrainingDetailReportInputTable } from '@/pages/dashboard/reports/training-detail/components/report/training-detail-report-input-table';
import type { Employee } from '@/types/employee';

// import { TrainingTable } from './training-table';

export function TrainingDetailReportInputTableWrapper() {
    const {
        selectedUnit,
        employees,
        setEmployees,
        isFetchingEmployees,
        setIsFetchingEmployees,
    } = useTrainingDetailReportInput();

    useEffect(() => {
        const fetchEmployees = async () => {
            if (selectedUnit) {
                setIsFetchingEmployees(true);

                try {
                    const response = await axios.get<Employee[]>(
                        `/api/master-data/unit/${selectedUnit?.id}/employee`,
                    );

                    setEmployees(response.data);
                    setIsFetchingEmployees(false);
                } catch (e) {
                    console.log(e);
                    setIsFetchingEmployees(false);
                }
            }
        };

        fetchEmployees();
    }, [selectedUnit, setEmployees, setIsFetchingEmployees]);

    return isFetchingEmployees ? (
        <div className="flex h-32 flex-1 items-center justify-center gap-x-4">
            <Spinner />
            <span>Loading ...</span>
        </div>
    ) : (
        <TrainingDetailReportInputTable data={employees ?? []} />
    );
}
