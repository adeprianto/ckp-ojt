<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class TrainingRegionController extends Controller
{
    public function showRealizationCost(int $regionId)
    {
        $result = DB::table('regions as a')
            ->where('a.id', '=', $regionId)
            ->leftJoin('training_realization_details as b', function ($join) {
                $join->on('a.id', '=', 'b.region_id');
            })
            ->select('a.region_name', DB::raw('IFNULL(SUM(b.cost), 0) as total_cost'))
            ->groupBy('a.id')
            ->get();

        return response()->json($result, Response::HTTP_OK);
    }

    public function showRealizationByLppNonLpp(int $regionId)
    {
        $result = DB::table('trainings as a')
            ->leftJoin('training_realization_details as b', function ($join) use ($regionId) {
                $join->on('a.id', '=', 'b.training_id')
                    ->where('b.region_id', '=', $regionId);
            })
            ->select('a.is_ptpn_group', DB::raw('IFNULL(SUM(b.cost), 0) AS total_cost'))
            ->groupBy('a.is_ptpn_group')
            ->get();

        return response()->json($result, Response::HTTP_OK);
    }

    public function showRealizationByLppNonLppByMonth(int $regionId)
    {
        $result = [
            'january' => $this->mShowRealizationByLppNonLppByMonth($regionId, '2026-01-01', '2026-01-31'),
            'february' => $this->mShowRealizationByLppNonLppByMonth($regionId, '2026-02-01', '2026-02-28'),
            'march' => $this->mShowRealizationByLppNonLppByMonth($regionId, '2026-03-01', '2026-03-31'),
            'april' => $this->mShowRealizationByLppNonLppByMonth($regionId, '2026-04-01', '2026-04-30'),
            'may' => $this->mShowRealizationByLppNonLppByMonth($regionId, '2026-05-01', '2026-05-31'),
            'june' => $this->mShowRealizationByLppNonLppByMonth($regionId, '2026-06-01', '2026-06-30'),
            'july' => $this->mShowRealizationByLppNonLppByMonth($regionId, '2026-07-01', '2026-07-31'),
            'august' => $this->mShowRealizationByLppNonLppByMonth($regionId, '2026-08-01', '2026-08-31'),
            'september' => $this->mShowRealizationByLppNonLppByMonth($regionId, '2026-09-01', '2026-09-30'),
            'october' => $this->mShowRealizationByLppNonLppByMonth($regionId, '2026-10-01', '2026-10-31'),
            'november' => $this->mShowRealizationByLppNonLppByMonth($regionId, '2026-11-01', '2026-11-30'),
            'december' => $this->mShowRealizationByLppNonLppByMonth($regionId, '2026-12-01', '2026-12-31'),
        ];

        return response()->json($result, Response::HTTP_OK);
    }

    private function mShowRealizationByLppNonLppByMonth(int $regionId, string $start_date, string $end_date)
    {
        $result = DB::table('trainings as a')
            ->leftJoin('training_realization_details as b', function ($join) use ($regionId, $start_date, $end_date) {
                $join->on('a.id', '=', 'b.training_id')
                    ->where('b.region_id', '=', $regionId)
                    ->whereDate('b.training_start_date', '>=', $start_date)
                    ->whereDate('b.training_start_date', '<=', $end_date);
            })
            ->select('a.is_ptpn_group', DB::raw('IFNULL(SUM(b.cost), 0) AS total_cost'))
            ->groupBy('a.is_ptpn_group')
            ->get();

        return $result;
    }

    public function showRealizationByOrganizer(int $regionId)
    {
        $result = DB::table('organizers as a')
            ->join('trainings as b', function ($join) {
                $join->on('a.id', '=', 'b.organization_id');
            })
            ->join('training_realization_details as c', function ($join) use ($regionId) {
                $join->on('b.id', '=', 'c.training_id')
                    ->where('c.region_id', '=', $regionId);
            })
            ->select('a.name', DB::raw('IFNULL( SUM( c.cost ), 0 ) AS total_cost '))
            ->groupBy('a.id')
            ->get();

        return response()->json($result, Response::HTTP_OK);
    }

    public function showRealizationByTraining(int $regionId)
    {
        $result = DB::table('trainings as a')
            ->join('training_realization_details as b', function ($join) use ($regionId) {
                $join->on('a.id', '=', 'b.training_id')
                    ->where('b.region_id', '=', $regionId);
            })
            ->select('a.name', DB::raw('IFNULL( SUM( b.cost ), 0 ) AS total_cost '))
            ->groupBy('a.id')
            ->get();

        return response()->json($result, Response::HTTP_OK);
    }

    public function showRealizationByLearningSector(int $regionId)
    {
        $result = DB::table('trainings as a')
            ->leftJoin('training_realization_details as b', function ($join) use ($regionId) {
                $join->on('a.id', '=', 'b.training_id')
                    ->where('b.region_id', '=', $regionId);
            })
            ->select('a.learning_sector', DB::raw('IFNULL( SUM( b.cost ), 0 ) AS total_cost '))
            ->groupBy('a.learning_sector')
            ->get();

        return response()->json($result, Response::HTTP_OK);
    }

    public function showRealizationByLevelBod(int $regionId)
    {
        $result = DB::table('employees as a')
            ->leftJoin('training_realization_details as b', function ($join) use ($regionId) {
                $join->on('a.id', '=', 'b.employee_id')
                    ->where('b.region_id', '=', $regionId);
            })
            ->select('a.bod_level', DB::raw('IFNULL( SUM( b.cost ), 0 ) AS total_cost '))
            ->groupBy('a.bod_level')
            ->get();

        return response()->json($result, Response::HTTP_OK);
    }

    public function showRealizationByUnit(int $regionId)
    {
        $result = DB::table('units as a')
            ->leftJoin('training_realization_details as b', function ($join) {
                $join->on('a.id', '=', 'b.unit_id');
            })
            ->where('a.region_id', '=', $regionId)
            ->select('a.unit_name', DB::raw('IFNULL( SUM( b.cost ), 0 ) AS total_cost '))
            ->groupBy('a.id')
            ->get();

        return response()->json($result, Response::HTTP_OK);
    }

    public function showParticipantsByUnit(int $regionId)
    {
        $result = DB::table('units as a')
            ->leftJoin('training_realization_details as b', function ($join) {
                $join->on('a.id', '=', 'b.unit_id');
            })
            ->where('a.region_id', '=', $regionId)
            ->select('a.unit_name', DB::raw('IFNULL( COUNT( b.id ), 0 ) AS total_participants '))
            ->groupBy('a.id')
            ->get();

        return response()->json($result, Response::HTTP_OK);
    }

    public function showLearningHoursByUnit(int $regionId)
    {
        $result = DB::table('units as a')
            ->leftJoin('training_realization_details as b', function ($join) {
                $join->on('a.id', '=', 'b.unit_id');
            })
            ->where('a.region_id', '=', $regionId)
            ->select('a.unit_name', DB::raw('IFNULL( SUM( b.learning_hours ), 0 ) AS total_learning_hours '))
            ->groupBy('a.id')
            ->get();

        return response()->json($result, Response::HTTP_OK);
    }

}
