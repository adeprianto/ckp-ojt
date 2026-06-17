<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class PositionCsvSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Define the path to your CSV file
        $csvFile = fopen(database_path('data/master_jabatan_n1.csv'), 'r');

        // 2. Skip the first row (the headers)
        $firstline = true;

        $now = Carbon::now();

        $insertedData = [];

        while (($data = fgetcsv($csvFile)) !== false) {
            if (! $firstline) {
                // 3. Insert the data into the database
                $insertedData[] = [
                    'nama_organisasi' => $data[0],
                    'kode_jabatan' => $data[1],
                    'kelompok_jabatan' => $data[2],
                    'bod_level' => $data[3],
                    'nama_jabatan' => $data[4],
                    'id_jobfamily' => $data[5],
                    'komoditas' => $data[6],
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }
            $firstline = false;
        }

        // Insert in batches of 50 to optimize database queries
        foreach (array_chunk($insertedData, 50) as $chunk) {
            Position::insert($chunk);
        }

        // 4. Close the file to free up memory
        fclose($csvFile);
    }
}
