import OverviewHCDevelopmentCostBodLevel from './overview-hc-development-cost-bod-level';
import OverviewHCDevelopmentCost from './overview-hc-development-cost-chart';
import OverviewHCDevelopmentCostLearningSector from './overview-hc-development-cost-learning-sector';
import OverviewHCDevelopmentCostLppNonLpp from './overview-hc-development-cost-lpp-non-lpp';
import OverviewHCDevelopmentCostLppNonLppPerMonth from './overview-hc-development-cost-lpp-non-lpp-per-month';
import OverviewHCDevelopmentCostOrganizer from './overview-hc-development-cost-organizer';
import OverviewHCDevelopmentCostPerRegion from './overview-hc-development-cost-per-region';
import OverviewHCDevelopmentCostTraining from './overview-hc-development-cost-training';
import OverviewHCDevelopmentLearningHoursPerRegion from './overview-hc-development-learning-hours-per-region';
import OverviewHCDevelopmentParticipantsPerRegion from './overview-hc-development-participants-per-region';
import OverviewHCDevelopmentPercentageToRkap from './overview-hc-development-percentage-to-rkap';

export default function OverviewHCDevelopmentIndex() {
    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 flex min-h-[150px] items-center justify-center overflow-hidden rounded-sm border-[1.5px]">
                    <div className="w-[200px]">
                        <OverviewHCDevelopmentPercentageToRkap
                            fullYear={true}
                        />
                    </div>
                    <div className="grow">
                        <span className="block text-lg font-bold">
                            RKAP Tahun 2026
                        </span>
                        <span className="block text-xs text-gray-500">
                            % Realisasi Terhadap RKAP 2026
                        </span>
                        <span className="mt-4 block text-sm text-gray-500">
                            Persentasi realisasi biaya pengembangan SDM terhadap
                            RKAP tahun 2026
                        </span>
                    </div>
                </div>
                <div className="col-span-6 flex min-h-[150px] items-center justify-center overflow-hidden rounded-sm border-[1.5px]">
                    <div className="w-[200px]">
                        <OverviewHCDevelopmentPercentageToRkap
                            fullYear={false}
                        />
                    </div>
                    <div className="grow">
                        <span className="block text-lg font-bold">
                            RKAP s.d Juni 2026
                        </span>
                        <span className="block text-xs text-gray-500">
                            % Realisasi Terhadap RKAP s.d Juni 2026
                        </span>
                        <span className="mt-4 block text-sm text-gray-500">
                            Persentasi realisasi biaya pengembangan SDM terhadap
                            RKAP s.d Juni 2026
                        </span>
                    </div>
                </div>
            </div>
            <span className="text-lg font-bold">
                Biaya Pengembangan SDM per Region
            </span>
            <div>
                <OverviewHCDevelopmentCostPerRegion />
            </div>
            <div>
                <OverviewHCDevelopmentCost />
            </div>
            <span className="text-lg font-bold">
                Biaya Pengembangan SDM berdasarkan Penyelenggara
            </span>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 flex min-h-[150px] items-center justify-center overflow-hidden rounded-sm border-[1.5px]">
                    <div className="w-[400px]">
                        <OverviewHCDevelopmentCostLppNonLpp />
                    </div>
                    <div className="grow">
                        <span className="block text-lg font-bold">
                            Realisasi Biaya LPP vs Non LPP
                        </span>
                        <span className="block text-xs text-gray-500">
                            % Realisasi Biaya LPP vs Non LPP
                        </span>
                        <span className="mt-4 block text-sm text-gray-500">
                            Persentasi realisasi biaya pengembangan SDM
                            berdasarkan penyelenggara LPP dan Non LPP
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <OverviewHCDevelopmentCostLppNonLppPerMonth />
            </div>
            <div>
                <OverviewHCDevelopmentCostOrganizer />
            </div>
            <span className="text-lg font-bold">
                Biaya Pengembangan SDM berdasarkan Pelatihan
            </span>
            <div>
                <OverviewHCDevelopmentCostLearningSector />
            </div>
            <div>
                <OverviewHCDevelopmentCostTraining />
            </div>
            <span className="text-lg font-bold">
                Biaya Pengembangan SDM berdasarkan Level BOD
            </span>
            <div>
                <OverviewHCDevelopmentCostBodLevel />
            </div>
            <span className="text-lg font-bold">Jumlah Peserta</span>
            <div>
                <OverviewHCDevelopmentParticipantsPerRegion />
            </div>
            <span className="text-lg font-bold">Jumlah Jam Pembelajaran</span>
            <div>
                <OverviewHCDevelopmentLearningHoursPerRegion />
            </div>
        </>
    );
}
