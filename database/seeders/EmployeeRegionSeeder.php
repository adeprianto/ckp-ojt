<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Region;
use Illuminate\Database\Seeder;

class EmployeeRegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = Employee::all();
        $regions = Region::all();

        foreach ($employees as $employee) {
            $employeeRegion = $employee->personnel_area;

            if (str_contains($employeeRegion, 'REG 01')) {
                $region = $regions->firstWhere('region_name', '=', 'SUPPCO REG 01');
                $employee->region_id = $region->id;
            } elseif (str_contains($employeeRegion, 'REG 02')) {
                $region = $regions->firstWhere('region_name', '=', 'SUPPCO REG 02');
                $employee->region_id = $region->id;
            } elseif (str_contains($employeeRegion, 'REG 03')) {
                $region = $regions->firstWhere('region_name', '=', 'SUPPCO REG 03');
                $employee->region_id = $region->id;
            } elseif (str_contains($employeeRegion, 'REG 04')) {
                $region = $regions->firstWhere('region_name', '=', 'SUPPCO REG 04');
                $employee->region_id = $region->id;
            } elseif (str_contains($employeeRegion, 'REG 05')) {
                $region = $regions->firstWhere('region_name', '=', 'SUPPCO REG 05');
                $employee->region_id = $region->id;
            } elseif (str_contains($employeeRegion, 'REG 07')) {
                $region = $regions->firstWhere('region_name', '=', 'SUPPCO REG 07');
                $employee->region_id = $region->id;
            } elseif (str_contains($employeeRegion, 'REG 08')) {
                $region = $regions->firstWhere('region_name', '=', 'SUPPCO REG 08');
                $employee->region_id = $region->id;
            } else {
                $region = $regions->firstWhere('region_name', '=', 'SUPPCO HO');
                $employee->region_id = $region->id;
            }

            $employee->save();
        }
    }
}
