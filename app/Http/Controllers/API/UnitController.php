<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function index()
    {
        $units = Unit::all();

        return response()->json($units);
    }

    public function showByRegionId(int $id)
    {
        $units = Unit::where('region_id', $id)->get();

        return response()->json($units);
    }
}
