import axios from 'axios';
import { Loader } from 'lucide-react';
import { useCallback, useEffect } from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTrainingDetailReportInput } from '@/pages/dashboard/reports/training-detail/components/report/training-detail-report-input-provider';
import type { Unit } from '@/types/unit';

type SelectDropdownProps = {
    onValueChange?: (value: string) => void;
    defaultValue?: string | undefined;
    placeholder?: string;
    isPending?: boolean;
    disabled?: boolean;
    className?: string;
    isControlled?: boolean;
};

export default function TrainingDetailReportInputUnitDropdown({
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
        isFetchingUnits,
        setIsFetchingUnits,
        selectedRegion,
        units,
        setUnits,
        selectedUnit,
        setSelectedUnit,
        setSelectedEmployees,
        setEmployees,
    } = useTrainingDetailReportInput();

    useEffect(() => {
        const fetchUnits = async () => {
            if (selectedRegion) {
                setIsFetchingUnits(true);

                try {
                    const response = await axios.get<Unit[]>(
                        `/api/master-data/region/${selectedRegion.id}/unit`,
                    );

                    setUnits(response.data);
                    setIsFetchingUnits(false);
                } catch (e) {
                    console.log(e);
                    setIsFetchingUnits(false);
                }
            }
        };

        fetchUnits();
    }, [selectedRegion, setIsFetchingUnits, setUnits]);

    const handleUnitChange = useCallback(
        (value: string) => {
            if (onValueChange) {
                onValueChange(value);
            }

            const mSelectedUnit = units?.find(
                (unit) => unit.id === parseInt(value),
            );

            setSelectedUnit(mSelectedUnit ?? null);
            setSelectedEmployees(null);
            setEmployees([]);
        },
        [
            onValueChange,
            setEmployees,
            setSelectedEmployees,
            setSelectedUnit,
            units,
        ],
    );

    return (
        <div>
            <span className="mb-3 block text-sm font-bold">Pilih Unit</span>
            <Select
                {...defaultState}
                value={selectedUnit?.id.toString() ?? ''}
                onValueChange={handleUnitChange}
            >
                <SelectTrigger disabled={disabled} className={cn(className)}>
                    <SelectValue placeholder={placeholder ?? 'Select'} />
                </SelectTrigger>
                <SelectContent className="z-[9999]">
                    {isFetchingUnits ? (
                        <SelectItem disabled value="loading" className="h-14">
                            <div className="flex items-center justify-center gap-2">
                                <Loader className="h-5 w-5 animate-spin" />
                                {'  '}
                                Loading...
                            </div>
                        </SelectItem>
                    ) : (
                        units?.map((unit) => (
                            <SelectItem
                                key={unit.id}
                                value={unit.id.toString()}
                            >
                                {unit.unit_name}
                            </SelectItem>
                        ))
                    )}
                </SelectContent>
            </Select>
        </div>
    );
}
