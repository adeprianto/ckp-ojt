import type { Table } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import { useState } from 'react';
import React from 'react';
import type { Employee } from '@/types/employee';
import type { Region } from '@/types/region';
import type { Unit } from '@/types/unit';

type TrainingDetailReportInputContextType = {
    isFetchingRegions: boolean;
    setIsFetchingRegions: React.Dispatch<boolean>;
    regions: Region[] | null;
    setRegions: React.Dispatch<Region[] | null>;
    selectedRegion: Region | null;
    setSelectedRegion: React.Dispatch<Region | null>;
    isFetchingUnits: boolean;
    setIsFetchingUnits: React.Dispatch<boolean>;
    units: Unit[] | null;
    setUnits: React.Dispatch<Unit[] | null>;
    selectedUnit: Unit | null;
    setSelectedUnit: React.Dispatch<Unit | null>;
    isFetchingEmployees: boolean;
    setIsFetchingEmployees: React.Dispatch<boolean>;
    employees: Employee[] | null;
    setEmployees: React.Dispatch<Employee[] | null>;
    selectedEmployees: Employee[] | null;
    setSelectedEmployees: React.Dispatch<Employee[] | null>;
    startLearningDate: Date;
    setStartLearningDate: React.Dispatch<Date>;
    endLearningDate: Date;
    setEndLearningDate: React.Dispatch<Date>;
};

const TrainingDetailReportInputContext =
    React.createContext<TrainingDetailReportInputContextType | null>(null);

export function TrainingDetailReportInputProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [isFetchingRegions, setIsFetchingRegions] = useState(false);
    const [regions, setRegions] = useState<Region[] | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
    const [isFetchingUnits, setIsFetchingUnits] = useState(false);
    const [units, setUnits] = useState<Unit[] | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
    const [isFetchingEmployees, setIsFetchingEmployees] = useState(false);
    const [employees, setEmployees] = useState<Employee[] | null>(null);
    const [selectedEmployees, setSelectedEmployees] = useState<
        Employee[] | null
    >(null);
    const [startLearningDate, setStartLearningDate] = useState<Date>(
        new Date(),
    );
    const [endLearningDate, setEndLearningDate] = useState<Date>(new Date());

    return (
        <TrainingDetailReportInputContext
            value={{
                isFetchingRegions,
                setIsFetchingRegions,
                regions,
                setRegions,
                selectedRegion,
                setSelectedRegion,
                isFetchingUnits,
                setIsFetchingUnits,
                units,
                setUnits,
                selectedUnit,
                setSelectedUnit,
                isFetchingEmployees,
                setIsFetchingEmployees,
                employees,
                setEmployees,
                selectedEmployees,
                setSelectedEmployees,
                startLearningDate,
                setStartLearningDate,
                endLearningDate,
                setEndLearningDate,
            }}
        >
            {children}
        </TrainingDetailReportInputContext>
    );
}

export const useTrainingDetailReportInput = () => {
    const trainingDetailReportInputContext = React.useContext(
        TrainingDetailReportInputContext,
    );

    if (!trainingDetailReportInputContext) {
        throw new Error(
            'trainingDetailReportInputContext must be used within trainingDetailReportInputContext',
        );
    }

    return trainingDetailReportInputContext;
};
