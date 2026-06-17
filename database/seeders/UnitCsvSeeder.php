<?php

namespace Database\Seeders;

use App\Models\Position;
use App\Models\Region;
use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class UnitCsvSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $regions = Region::all();

        // 1. Define the path to your CSV file
        $csvFile = fopen(database_path('data/master_unit_n1.csv'), 'r');

        // 2. Skip the first row (the headers)
        $firstline = true;

        $now = Carbon::now();

        $insertedData = [];

        while (($data = fgetcsv($csvFile)) !== false) {
            if (!$firstline) {
                $region = $regions->firstWhere('region_name', '=', $data[2]);

                // 3. Insert the data into the database
                $insertedData[] = [
                    'unit_name' => $data[0],
                    'region_id' => $region->id,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }
            $firstline = false;
        }

        // Insert in batches of 50 to optimize database queries
        foreach (array_chunk($insertedData, 50) as $chunk) {
            Unit::insert($chunk);
        }

        // 4. Close the file to free up memory
        fclose($csvFile);
    }
}
