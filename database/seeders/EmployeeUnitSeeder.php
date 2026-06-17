<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Region;
use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = Employee::all();
        $units = Unit::all();

        foreach ($employees as $employee) {
            $employeeUnit = $employee->personnel_subarea;
            $unit = $units->firstWhere('unit_name', '=', $employeeUnit);

            $employee->unit_id = $unit->id;
            $employee->save();
        }
    }
}
