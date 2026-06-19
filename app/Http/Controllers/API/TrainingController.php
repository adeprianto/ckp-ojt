<?php

namespace App\Http\Controllers\API;

use App\Concerns\TrainingValidationRules;
use App\Http\Controllers\Controller;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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
}
