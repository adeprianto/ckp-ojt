import type { Organizer } from '@/types/organizer';

export type Training = {
    id: number;
    name: string;
    activity_type: string;
    learning_sector: string;
    learning_type: string;
    learning_hours: number;
    cost: bigint;
    organization_id: number;
    is_ptpn_group: boolean;
    organizer: Organizer;
    realization?: TrainingRealization[];
};

export type TrainingRealization = {
    id: number;
    training_name: string;
    training_id: number;
    training_start_date: string;
    training_end_date: string;
    total_participants: number;
    total_learning_hours: number;
    cost: bigint;
};
