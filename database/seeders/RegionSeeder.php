<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $regions = [
            'Head Office',
            'Regional I',
            'Regional II',
            'Regional III',
            'Regional V',
            'Regional VII',
            'Regional VIII',
        ];

        // Capture the current timestamp to populate created_at and updated_at
        $now = Carbon::now();

        // Format the array to match the database columns
        $data = array_map(function ($regionName) use ($now) {
            return [
                'region_name' => $regionName,
                'created_at'    => $now,
                'updated_at'    => $now,
            ];
        }, $regions);

        // Bulk insert the data for better performance
        Region::insert($data);
    }
}
