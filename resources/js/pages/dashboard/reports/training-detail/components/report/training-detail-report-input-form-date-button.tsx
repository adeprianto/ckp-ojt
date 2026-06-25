import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useCallback } from 'react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type TrainingDetailReportInputFormDateButtonType = {
    date: Date;
    setDate: React.Dispatch<Date>;
};

export default function TrainingDetailReportInputFormDateButton({
    date,
    setDate,
}: TrainingDetailReportInputFormDateButtonType) {
    const handleOnDateSelected = useCallback(
        (date: Date | undefined) => {
            if (date) {
                setDate(date);
            }
        },
        [setDate],
    );

    return (
        <Popover>
            {/* The Button that acts as the trigger */}
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                        format(date, 'PPP')
                    ) : (
                        <span>Pilih tanggal laporan produksi</span>
                    )}
                </Button>
            </PopoverTrigger>

            {/* The Calendar that pops up */}
            <PopoverContent className="z-[9999] w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleOnDateSelected}
                    required={false}
                />
            </PopoverContent>
        </Popover>
    );
}
