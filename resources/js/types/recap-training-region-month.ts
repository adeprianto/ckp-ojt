import type { RecapTrainingMonth } from '@/types/recap-training-month';

export type RecapTrainingRegionMonth = {
    id: number;
    region_name: string;
    month: RecapTrainingMonth;
}
