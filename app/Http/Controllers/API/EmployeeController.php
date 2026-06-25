<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Unit;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::all();

        return response()->json($employees);
    }

    public function showByUnitId(int $id)
    {
        $employees = Employee::where('unit_id', $id)->get();

        return response()->json($employees);
    }
}
