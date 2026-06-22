<?php

namespace App\Http\Controllers\API;

use App\Concerns\TrainingValidationRules;
use App\Http\Controllers\Controller;
use App\Models\Region;
use App\Models\Training;
use App\Models\TrainingRealization;
use App\Models\TrainingRealizationDetail;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class TrainingController extends Controller
{
    use TrainingValidationRules;

    public function index()
    {
        $trainings = Training::with('organizer')->get();

        return response()->json($trainings, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        try {
            Validator::make($request->all(), $this->trainingRules())->validate();

            $training = Training::create([
                'name' => $request->name,
                'activity_type' => $request->activity_type,
                'learning_sector' => $request->learning_sector,
                'learning_type' => $request->learning_type,
                'learning_hours' => $request->learning_hours,
                'cost' => $request->cost,
                'organization_id' => $request->organization_id,
                'is_ptpn_group' => $request->is_ptpn_group,
            ]);

            return response()->json($training, Response::HTTP_CREATED);
        } catch (ValidationException $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function show(int $id)
    {
        $training = Training::with('organizer')->find($id);

        if (is_null($training)) {
            return response()->json([
                'success' => false,
                'message' => 'Training with id ' . $id . ' cannot be found',
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json($training, Response::HTTP_OK);
    }

    public function update(Request $request, int $id)
    {
        try {
            $training = Training::find($id);

            if (is_null($training)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Training with id ' . $id . ' cannot be found',
                ], Response::HTTP_NOT_FOUND);
            }

            $training->name = $request->name ?? $training->name;
            $training->activity_type = $request->activity_type ?? $training->activity_type;
            $training->learning_sector = $request->learning_sector ?? $training->learning_sector;
            $training->learning_type = $request->learning_type ?? $training->learning_type;
            $training->learning_hours = $request->learning_hours ?? $training->learning_hours;
            $training->cost = $request->cost ?? $training->cost;
            $training->organization_id = $request->organization_id ?? $training->organization_id;
            $training->is_ptpn_group = $request->is_ptpn_group ?? $training->is_ptpn_group;
            $training->save();

            return response()->json($training, Response::HTTP_OK);

        } catch (ValidationException $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function destroy(int $id)
    {
        $training = Training::find($id);

        if (is_null($training)) {
            return response()->json([
                'success' => false,
                'message' => 'Training with id ' . $id . ' cannot be found',
            ], Response::HTTP_NOT_FOUND);
        }

        $training->delete();

        return response()->json([
            'success' => true,
            'message' => 'Training with id ' . $id . ' has been deleted',
        ], Response::HTTP_OK);
    }

    public function indexTrainingOverview()
    {
        $trainings = Training::with('organizer', 'realization')->get();

        return response()->json($trainings, Response::HTTP_OK);
    }

    public function showTrainingOverview(int $id)
    {
        $training = Training::with('organizer', 'realization')->find($id);

        if (is_null($training)) {
            return response()->json([
                'success' => false,
                'message' => 'Training with id ' . $id . ' cannot be found',
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json($training, Response::HTTP_OK);
    }

    public function showTrainingRealizationPerRegionPerMonth(int $id)
    {
        $training = Training::find($id);

        if (is_null($training)) {
            return response()->json([
                'success' => false,
                'message' => 'Training with id ' . $id . ' cannot be found',
            ], Response::HTTP_NOT_FOUND);
        }

        $realizationPerRegionPerMonth = $this->getTraininigRealizationPerRegionPerMonth($training->id);

        return response()->json($realizationPerRegionPerMonth, Response::HTTP_OK);
    }

    private function getTraininigRealizationPerRegionPerMonth(int $trainingId)
    {
        $trainingRealizations = TrainingRealization::where('training_id', $trainingId)->get();

        if (count($trainingRealizations) === 0) {
            return $this->makeNullPerRegionPerMonth();
        }

        return $this->populateTrainingRealizationDetailsPerRegionPerMonth($trainingId);
    }

    private function makeNullPerRegionPerMonth()
    {
        $regions = Region::all();

        foreach ($regions as $region) {
            $region['month'] = [
                'january' => [
                    'total_participants' => 0,
                    'total_learning_hours' => 0,
                    'cost' => 0,
                ],
                'february' => [
                    'total_participants' => 0,
                    'total_learning_hours' => 0,
                    'cost' => 0,
                ],
                'march' => [
                    'total_participants' => 0,
                    'total_learning_hours' => 0,
                    'cost' => 0,
                ],
                'april' => [
                    'total_participants' => 0,
                    'total_learning_hours' => 0,
                    'cost' => 0,
                ],
                'may' => [
                    'total_participants' => 0,
                    'total_learning_hours' => 0,
                    'cost' => 0,
                ],
                'june' => [
                    'total_participants' => 0,
                    'total_learning_hours' => 0,
                    'cost' => 0,
                ],
                'july' => [
                    'total_participants' => 0,
                    'total_learning_hours' => 0,
                    'cost' => 0,
                ],
                'august' => [
                    'total_participants' => 0,
                    'total_learning_hours' => 0,
                    'cost' => 0,
                ],
                'september' => [
                    'total_participants' => 0,
                    'total_learning_hours' => 0,
                    'cost' => 0,
                ],
                'october' => [
                    'total_participants' => 0,
                    'total_learning_hours' => 0,
                    'cost' => 0,
                ],
                'november' => [
                    'total_participants' => 0,
                    'total_learning_hours' => 0,
                    'cost' => 0,
                ],
                'december' => [
                    'total_participants' => 0,
                    'total_learning_hours' => 0,
                    'cost' => 0,
                ],
            ];
        }

        return $regions;
    }

    private function populateTrainingRealizationDetailsPerRegionPerMonth(int $trainingId)
    {
        $regions = Region::all();
        $realizationDetails = TrainingRealizationDetail::where('training_id', $trainingId)->get();

//        dd($realizationDetails);

        $getTrainingRealzationDetailsPerRegion = function (int $regionId, string $start_date, string $end_date) use ($realizationDetails) {
            $data = $realizationDetails->where('region_id', $regionId)->whereBetween('training_start_date', [$start_date, $end_date]);

            $totalParticipants = $data->count();
            $totalLearningHours = $data->sum('learning_hours');
            $totalCost = $data->sum('cost');

            return [
                'total_participants' => $totalParticipants,
                'total_learning_hours' => $totalLearningHours,
                'cost' => $totalCost,
            ];
        };

        foreach ($regions as $region) {
            $region['month'] = [
                'january' => $getTrainingRealzationDetailsPerRegion($region->id, '2026-01-01', '2026-01-31'),
                'february' => $getTrainingRealzationDetailsPerRegion($region->id, '2026-02-01', '2026-02-28'),
                'march' => $getTrainingRealzationDetailsPerRegion($region->id, '2026-03-01', '2026-03-31'),
                'april' => $getTrainingRealzationDetailsPerRegion($region->id, '2026-04-01', '2026-04-30'),
                'may' => $getTrainingRealzationDetailsPerRegion($region->id, '2026-05-01', '2026-05-31'),
                'june' => $getTrainingRealzationDetailsPerRegion($region->id, '2026-06-01', '2026-06-30'),
                'july' => $getTrainingRealzationDetailsPerRegion($region->id, '2026-07-01', '2026-07-31'),
                'august' => $getTrainingRealzationDetailsPerRegion($region->id, '2026-08-01', '2026-08-31'),
                'september' => $getTrainingRealzationDetailsPerRegion($region->id, '2026-09-01', '2026-09-30'),
                'october' => $getTrainingRealzationDetailsPerRegion($region->id, '2026-10-01', '2026-10-31'),
                'november' => $getTrainingRealzationDetailsPerRegion($region->id, '2026-11-01', '2026-11-30'),
                'december' => $getTrainingRealzationDetailsPerRegion($region->id, '2026-12-01', '2026-12-31'),
            ];
        }

        return $regions;
    }

}
