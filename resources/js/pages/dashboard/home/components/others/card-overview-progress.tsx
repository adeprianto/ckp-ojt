import { Hourglass } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadialBarLearningHours } from '@/pages/dashboard/home/components/radial-bar-learning-hours';

export default function CardOverviewProgress() {
    return (
        <Card>
            <CardHeader className="mb-0 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                    Realisasi Jam Pembelajaran
                </CardTitle>
                <Hourglass className="text-muted-foreground" />
            </CardHeader>
            <CardContent className="mt-0">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-2xl font-bold">120 Jam</div>
                        <p className="text-xs text-muted-foreground">
                            20% terhadap RKAP bulan ini
                        </p>
                    </div>
                    <div>
                        <RadialBarLearningHours />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
