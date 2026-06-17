<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Position;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeePositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = Employee::all();
        $positions = Position::all();

        foreach ($employees as $employee) {
            $employeePosition = $employee->position;
            $position = $positions->firstWhere('nama_jabatan', '=', $employeePosition);

            if ($position) {
                $employee->position_id = $position->id;
                $employee->save();
            }
        }
    }
}
