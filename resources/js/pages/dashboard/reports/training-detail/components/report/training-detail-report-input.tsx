import React from 'react';
import { Separator } from '@/components/ui/separator';
import { TrainingDetailReportInputForm } from '@/pages/dashboard/reports/training-detail/components/report/training-detail-report-input-form';
import { TrainingDetailReportInputProvider } from '@/pages/dashboard/reports/training-detail/components/report/training-detail-report-input-provider';
import TrainingDetailReportInputRegionDropdown from '@/pages/dashboard/reports/training-detail/components/report/training-detail-report-input-region-dropdown';
import { TrainingDetailReportInputTableWrapper } from '@/pages/dashboard/reports/training-detail/components/report/training-detail-report-input-table-wrapper';
import TrainingDetailReportInputUnitDropdown from '@/pages/dashboard/reports/training-detail/components/report/training-detail-report-input-unit-dropdown';

type TrainingDetailReportInputProp = {
    isAddReport: boolean;
    setIsAddReport: React.Dispatch<boolean>;
};

export function TrainingDetailReportInput({
    isAddReport,
    setIsAddReport,
}: TrainingDetailReportInputProp) {
    return (
        <TrainingDetailReportInputProvider>
            <div className="flex flex-1 flex-col gap-x-4 gap-y-8 overflow-x-auto rounded-xl p-4">
                <TrainingDetailReportInputForm
                    setIsAddReport={setIsAddReport}
                    isAddReport={isAddReport}
                />
                <Separator className="my-0" />
                <div className="flex flex-wrap items-end gap-x-8 gap-y-2">
                    <TrainingDetailReportInputRegionDropdown />
                    <TrainingDetailReportInputUnitDropdown />
                </div>
                <TrainingDetailReportInputTableWrapper />
            </div>
        </TrainingDetailReportInputProvider>
    );
}
