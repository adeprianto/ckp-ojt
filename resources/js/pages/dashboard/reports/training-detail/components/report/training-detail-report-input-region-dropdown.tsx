import axios from 'axios';
import { Loader } from 'lucide-react';
import { useCallback, useEffect } from 'react';

import { FormLabel } from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTrainingDetailReportInput } from '@/pages/dashboard/reports/training-detail/components/report/training-detail-report-input-provider';
import type { Region } from '@/types/region';

type SelectDropdownProps = {
    onValueChange?: (value: string) => void;
    defaultValue?: string | undefined;
    placeholder?: string;
    isPending?: boolean;
    disabled?: boolean;
    className?: string;
    isControlled?: boolean;
};

export default function TrainingDetailReportInputRegionDropdown({
    defaultValue,
    onValueChange,
    placeholder,
    disabled,
    className = '',
    isControlled = false,
}: SelectDropdownProps) {
    const defaultState = isControlled
        ? { value: defaultValue, onValueChange }
        : { defaultValue, onValueChange };

    const {
        isFetchingRegions,
        setIsFetchingRegions,
        regions,
        setRegions,
        selectedRegion,
        setSelectedRegion,
        setSelectedUnit,
        setSelectedEmployees,
        setEmployees,
        setUnits,
    } = useTrainingDetailReportInput();

    useEffect(() => {
        const fetchRegions = async () => {
            setIsFetchingRegions(true);

            try {
                const response = await axios.get<Region[]>(
                    '/api/master-data/region',
                );

                setRegions(response.data);
                setIsFetchingRegions(false);
            } catch (e) {
                console.log(e);
                setIsFetchingRegions(false);
            }
        };

        fetchRegions();
    }, [setIsFetchingRegions, setRegions]);

    const handleRegionChange = useCallback(
        (value: string) => {
            if (onValueChange) {
                onValueChange(value);
            }

            const mSelectedRegion = regions?.find(
                (region) => region.id === parseInt(value),
            );

            setSelectedRegion(mSelectedRegion ?? null);
            setSelectedUnit(null);
            setUnits([]);
            setSelectedEmployees(null);
            setEmployees([]);
        },
        [
            onValueChange,
            regions,
            selectedRegion?.id,
            setSelectedRegion,
            setSelectedUnit,
            setUnits,
        ],
    );

    return (
        <div>
            <span className="mb-3 block text-sm font-bold">Pilih Regional</span>
            <Select
                {...defaultState}
                value={selectedRegion?.id.toString() ?? ''}
                onValueChange={handleRegionChange}
            >
                <SelectTrigger disabled={disabled} className={cn(className)}>
                    <SelectValue placeholder={placeholder ?? 'Select'} />
                </SelectTrigger>
                <SelectContent className="z-[9999]">
                    {isFetchingRegions ? (
                        <SelectItem disabled value="loading" className="h-14">
                            <div className="flex items-center justify-center gap-2">
                                <Loader className="h-5 w-5 animate-spin" />
                                {'  '}
                                Loading...
                            </div>
                        </SelectItem>
                    ) : (
                        regions?.map((region) => (
                            <SelectItem
                                key={region.id}
                                value={region.id.toString()}
                            >
                                {region.region_name}
                            </SelectItem>
                        ))
                    )}
                </SelectContent>
            </Select>
        </div>
    );
}
