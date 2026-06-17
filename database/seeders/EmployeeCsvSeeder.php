<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class EmployeeCsvSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Define the path to your CSV file
        $csvFile = fopen(database_path('data/master_karyawan_n1.csv'), 'r');

        // 2. Skip the first row (the headers)
        $firstline = true;

        $now = Carbon::now();

        $insertedData = [];

        while (($data = fgetcsv($csvFile)) !== false) {
            if (! $firstline) {
                // 3. Insert the data into the database
                $insertedData[] = [
                    'start_working_date' => Carbon::parse($data[0]),
                    'nik' => $data[1],
                    'name' => $data[2],
                    'is_active' => $data[3] == "Active" ? 1 : 0,
                    'company_code' => $data[4],
                    'personnel_area_code' => $data[5],
                    'employee_group_code' => $data[6],
                    'employee_group' => $data[7],
                    'job_grade' => $data[8],
                    'personnel_area' => $data[9],
                    'personnel_subarea' => $data[10],
                    'payroll_area' => $data[11],
                    'organizational_unit_code' => $data[12],
                    'unit' => $data[13],
                    'position_code' => $data[14],
                    'position' => $data[15],
                    'birth_date' => Carbon::parse($data[16]),
                    'person_grade' => $data[17],
                    'gender_code' => $data[18],
                    'gender' => $data[19],
                    'educational' => $data[20],
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }
            $firstline = false;
        }

        // Insert in batches of 50 to optimize database queries
        foreach (array_chunk($insertedData, 50) as $chunk) {
            Employee::insert($chunk);
        }

        // 4. Close the file to free up memory
        fclose($csvFile);
    }
}
