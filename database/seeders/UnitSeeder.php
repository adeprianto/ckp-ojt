<?php

namespace Database\Seeders;

use App\Models\Region;
use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $head_office_region = Region::where('region_name', 'Head Office')->first();

        $now = Carbon::now();

        Unit::insert([
           'unit_name' => 'Head Office',
            'region_id' => $head_office_region->id,
            'created_at'    => $now,
            'updated_at'    => $now,
        ]);
    }
}
