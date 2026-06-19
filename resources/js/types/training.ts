import type { Organizer } from '@/types/organizer';

export type Training = {
    id: number;
    name: string;
    activity_type: string;
    learning_sector: string;
    learning_type: string;
    learning_hours: number;
    cost: number;
    organization_id: number;
    is_ptpn_group: boolean;
    organizer: Organizer;
};
