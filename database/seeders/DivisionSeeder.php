<?php

namespace Database\Seeders;

use App\Models\Division;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $divisions = [
            'Divisi Akuntansi Dan Perpajakan',
            'Divisi Hubungan Kelembagaan dan TJSL',
            'Divisi Hukum',
            'Divisi Inovasi Dan Pengembangan Bisnis',
            'Divisi Komoditi Aneka Tanaman',
            'Divisi Komoditi Sawit Dan Karet',
            'Divisi Komoditi Tebu',
            'Divisi Manajemen dan Optimalisasi Aset I',
            'Divisi Manajemen dan Optimalisasi Aset II',
            'Divisi Manajemen Risiko Dan Sustainability',
            'Divisi Operasional Sdm Dan General Affair',
            'Divisi Pemasaran',
            'Divisi Pengadaan Dan Teknologi Informasi',
            'Divisi Pengembangan SDM Dan Budaya Perusahaan',
            'Divisi Perbendaharaan Anggaran Dan Keuangan',
            'Divisi Portofolio Dan Strategi Korporasi',
            'Divisi Satuan Pengawas Internal',
            'Divisi Sekretariat Perusahaan',
            'Penugasan Anper',
            'PMN',
            'STO/PMO',
        ];

        // Capture the current timestamp to populate created_at and updated_at
        $now = Carbon::now();

        // Format the array to match the database columns
        $data = array_map(function ($divisionName) use ($now) {
            return [
                'division_name' => $divisionName,
                'created_at'    => $now,
                'updated_at'    => $now,
            ];
        }, $divisions);

        // Bulk insert the data for better performance
        Division::insert($data);
    }
}
