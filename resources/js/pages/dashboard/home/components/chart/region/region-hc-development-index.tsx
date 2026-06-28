import RegionHCDevelopmentCostBodLevel from './region-hc-development-cost-bod-level';
import RegionHCDevelopmentCostLearningSector from './region-hc-development-cost-learning-sector';
import RegionHcDevelopmentCostLppNonLpp from './region-hc-development-cost-lpp-non-lpp';
import RegionHCDevelopmentCostLppNonLppPerMonth from './region-hc-development-cost-lpp-non-lpp-per-month';
import RegionHCDevelopmentCostOrganizer from './region-hc-development-cost-organizer';
import RegionHCDevelopmentCostPerUnit from './region-hc-development-cost-per-unit';
import RegionHCDevelopmentCostTraining from './region-hc-development-cost-training';
import RegionHCDevelopmentLearningHoursPerUnit from './region-hc-development-learning-hours-per-unit';
import RegionHCDevelopmentParticipantsPerUnit from './region-hc-development-participants-per-unit';
import RegionHCDevelopmentPercentageToRkap from './region-hc-development-percentage-to-rkap';

type RegionHCDevelopmentIndexProp = {
    selectedRegion: number;
};

export default function RegionHCDevelopmentIndex({
    selectedRegion,
}: RegionHCDevelopmentIndexProp) {
    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 flex min-h-[150px] items-center justify-center overflow-hidden rounded-sm border-[1.5px]">
                    <div className="w-[200px]">
                        <RegionHCDevelopmentPercentageToRkap
                            fullYear={true}
                            selectedRegion={selectedRegion}
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
                        <RegionHCDevelopmentPercentageToRkap
                            selectedRegion={selectedRegion}
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
                Biaya Pengembangan SDM per Unit
            </span>
            <div>
                <RegionHCDevelopmentCostPerUnit
                    selectedRegion={selectedRegion}
                />
            </div>
            <span className="text-lg font-bold">
                Biaya Pengembangan SDM berdasarkan Penyelenggara
            </span>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 flex min-h-[150px] items-center justify-center overflow-hidden rounded-sm border-[1.5px]">
                    <div className="w-[400px]">
                        <RegionHcDevelopmentCostLppNonLpp
                            selectedRegion={selectedRegion}
                        />
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
                <RegionHCDevelopmentCostLppNonLppPerMonth />
            </div>
            <div>
                <RegionHCDevelopmentCostOrganizer />
            </div>
            <span className="text-lg font-bold">
                Biaya Pengembangan SDM berdasarkan Pelatihan
            </span>
            <div>
                <RegionHCDevelopmentCostLearningSector />
            </div>
            <div>
                <RegionHCDevelopmentCostTraining />
            </div>
            <div>
                <RegionHCDevelopmentCostBodLevel />
            </div>
            <span className="text-lg font-bold">Jumlah Peserta</span>
            <div>
                <RegionHCDevelopmentParticipantsPerUnit />
            </div>
            <span className="text-lg font-bold">Jumlah Jam Pembelajaran</span>
            <div>
                <RegionHCDevelopmentLearningHoursPerUnit />
            </div>
        </>
    );
}
