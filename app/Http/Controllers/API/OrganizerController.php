<?php

namespace App\Http\Controllers\API;

use App\Concerns\OrganizerValidationRules;
use App\Http\Controllers\Controller;
use App\Models\Organizer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class OrganizerController extends Controller
{
    use OrganizerValidationRules;

    public function index()
    {
        $organizers = Organizer::all();

        return response()->json($organizers, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        try {
            Validator::make($request->all(), $this->organizerRules())->validate();

            $organizer = Organizer::create([
                'name' => $request->name,
                'is_ptpn_group' => $request->is_ptpn_group,
            ]);

            return response()->json($organizer, Response::HTTP_CREATED);
        } catch (ValidationException $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function show(int $id)
    {
        $organizer = Organizer::find($id);

        if (is_null($organizer)) {
            return response()->json([
                'success' => false,
                'message' => 'Organizer not found',
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json($organizer, Response::HTTP_OK);
    }

    public function update(Request $request, int $id)
    {
        try {
            $organizer = Organizer::find($id);

            if (is_null($organizer)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Organizer not found',
                ], Response::HTTP_NOT_FOUND);
            }

            $organizer->name = $request->name ?? $organizer->name;
            $organizer->is_ptpn_group = $request->is_ptpn_group ?? $organizer->is_ptpn_group;
            $organizer->save();

            return response()->json($organizer, Response::HTTP_OK);
        } catch (ValidationException $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function destroy($id)
    {
        $organizer = Organizer::find($id);

        if (is_null($organizer)) {
            return response()->json([
                'success' => false,
                'message' => 'Organizer not found',
            ], Response::HTTP_NOT_FOUND);
        }

        $organizer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Organizer deleted successfully',
        ], Response::HTTP_OK);
    }
}
