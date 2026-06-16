<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            'Asisten Admi Dan Monitoring Pengadaan',
            'Asisten Administrasi Dan Pemetaan Aneka Tanaman',
            'Asisten Administrasi Dan Pemetaan Tanaman Tebu',
            'Asisten Administrasi Kso Aneka Tanaman',
            'Asisten Administrasi KSO Tebu',
            'Asisten Agraria',
            'Asisten Analisa Laporan Keuangan',
            'Asisten Asuransi',
            'Asisten Auditor',
            'Asisten Budaya Perusahaan',
            'Asisten ERP',
            'Asisten Hps Dan Informasi Harga',
            'Asisten Hubungan Industrial Dan Pensiun',
            'Asisten Hubungan Kelembagaan Governance',
            'Asisten Hubungan Kelembagaan Non Governance',
            'Asisten Hukum Dan Peraturan Perusahaan',
            'Asisten Kajian Risiko',
            'Asisten Kas Dan Bank',
            'Asisten Kesekretariatan Dan Support Organ Korporasi',
            'Asisten Kesekretariatan Dan Support Organ Korporasi (Pa Direktur Utama)',
            'Asisten Komunikasi Perusahaan',
            'Asisten Konsolidasi Laporan Keuangan',
            'Asisten Litigasi',
            'Asisten Logistik',
            'Asisten Manajemen Aset Agrowisata I',
            'Asisten Manajemen Aset Agrowisata II',
            'Asisten Manajemen Aset Kawasan Dan Properti I',
            'Asisten Manajemen Aset Kawasan Dan Properti II',
            'Asisten Manajemen Aset, Tanaman, Dan Energi/ Tambang II',
            'Asisten Manajemen Audit',
            'Asisten Manajemen Kinerja Anak Perusahaan',
            'Asisten Manajemen Kinerja Karyawan',
            'Asisten Manajemen Kinerja Korporasi',
            'Asisten Manajemen Talenta',
            'Asisten Monitoring Audit Dan WBS',
            'Asisten Monitoring Risiko',
            'Asisten Non Litigasi',
            'Asisten Operasional Komoditi Kopi',
            'Asisten Operasional TI',
            'Asisten Pajak',
            'Asisten Pedanaan Eksternal',
            'Asisten Pelaksanaan Tjsl Dan Pembinaan Umk',
            'Asisten Pemasaran Aneka Tanaman',
            'Asisten Pemasaran Karet Dan Kopi',
            'Asisten Pemasaran Ritel',
            'Asisten Pemasaran Teh',
            'Asisten Pemeliharaan Dan Proteksi Tanaman Karet',
            'Asisten Pemeliharaan, Pemupukan Dan Proteksi Tanaman Tebu',
            'Asisten Pemupukan Tanaman Karet',
            'Asisten Pengadaan',
            'Asisten Penganggaran Dan Pelaporan TJSL',
            'Asisten Pengawasan Anggaran',
            'Asisten Pengembangan Bisnis Aset',
            'Asisten Pengembangan Bisnis Tanaman',
            'Asisten Pengembangan SDM',
            'Asisten Pengembangan TI',
            'Asisten Pengolahan Komoditi Teh',
            'Asisten Perencanaan Anggaran',
            'Asisten Perencanaan Dan Pengawasan Teknik',
            'Asisten Perencanaan Strategi Korporasi',
            'Asisten Perencanaan Tenaga Kerja Dan Rekrutmen',
            'Asisten Perizinan Dan Divestasi Aset',
            'Asisten Personalia Dan HRIS',
            'Asisten PMN',
            'Asisten Portofolio Anak Perusahaan',
            'Asisten Produksi Komoditi Teh',
            'Asisten Produksi Pengolahan Komoditi Karet',
            'Asisten Produksi Tanaman Karet',
            'Asisten Produksi Tembakau, Kayu Dan Aneka Tanaman',
            'Asisten Remunerasi',
            'Asisten Sistem Manajemen',
            'Asisten Sustainability ESG Dan Sertifikasi',
            'Asisten Tata Kelola TI',
            'Asisten Umum Dan Urta',
            'Asisten Verifikasi',
            'Co Lead STO',
            'Deputy Project Manajer PMN',
            'Head Of PMN',
            'Kepala Divisi Akuntansi Dan Perpajakan',
            'Kepala Divisi Hubungan Kelembagaan Dan TJSL',
            'Kepala Divisi Hukum',
            'Kepala Divisi Inovasi Dan Pengembangan Bisnis',
            'Kepala Divisi Komoditi Aneka Tanaman',
            'Kepala Divisi Komoditi Sawit Dan Karet',
            'Kepala Divisi Komoditi Tebu',
            'Kepala Divisi Manajemen Dan Optimalisasi Aset I',
            'Kepala Divisi Manajemen Dan Optimalisasi Aset Ii',
            'Kepala Divisi Manajemen Risiko Dan Sustainability',
            'Kepala Divisi Operasional Sdm Dan General Affair',
            'Kepala Divisi Pengadaan Dan Teknologi Informasi',
            'Kepala Divisi Pengembangan Sdm Dan Budaya Perusahaan',
            'Kepala Divisi Perbendaharaan Anggaran Dan Keuangan',
            'Kepala Divisi Portofolio Dan Strategi Korporasi',
            'Kepala Divisi Satuan Pengawasan Intern',
            'Kepala Divisi Sekretariat Perusahaan',
            'Kepala Sub Divisi Administrasi, Pemetaan, Pemeliharaan Dan KSO Aneka Tanaman',
            'Kepala Sub Divisi Agraria Dan Pemetaan',
            'Kepala Sub Divisi Akuntansi Dan Pelaporan',
            'Kepala Sub Divisi Hps Dan Informasi Harga',
            'Kepala Sub Divisi Hubungan Kelembagaan',
            'Kepala Sub Divisi Hukum Dan Peraturan Perusahaan',
            'Kepala Sub Divisi Hukum Litigasi Dan Non Litigasi',
            'Kepala Sub Divisi Kas Dan Bank',
            'Kepala Sub Divisi Kemitraan KSO Kelapa Sawit',
            'Kepala Sub Divisi Komoditi Aneka Tanaman',
            'Kepala Sub Divisi Komunikasi Perusahaan',
            'Kepala Sub Divisi Manajemen Audit',
            'Kepala Sub Divisi Manajemen Kinerja Anak Perusahaan',
            'Kepala Sub Divisi Manajemen Risiko',
            'Kepala Sub Divisi Manajemen Talenta Dan Perencanaan Tenaga Kerja',
            'Kepala Sub Divisi Operasional Tanaman Komoditi Karet',
            'Kepala Sub Divisi Operasional Tebu',
            'Kepala Sub Divisi Operasional TI Dan ERP',
            'Kepala Sub Divisi Pemasaran Komoditi Dan Ritel',
            'Kepala Sub Divisi Pengadaan',
            'Kepala Sub Divisi Pengelolaan Bisnis Aset I',
            'Kepala Sub Divisi Pengelolaan Bisnis Aset II',
            'Kepala Sub Divisi Pengembangan Organisasi Dan Budaya',
            'Kepala Sub Divisi Pengembangan SDM Dan Manajemen Kinerja',
            'Kepala Sub Divisi Perbendaharaan Dan Anggaran',
            'Kepala Sub Divisi Perencanaan Dan Pengembangan Bisnis Aset',
            'Kepala Sub Divisi Perencanaan Dan Pengembangan Bisnis Tanaman',
            'Kepala Sub Divisi Perencanaan Strategi Korporasi',
            'Kepala Sub Divisi Perizinan Dan Divestasi Aset',
            'Kepala Sub Divisi Perpajakan Dan Asuransi',
            'Kepala Sub Divisi Personalia Dan Remunerasi',
            'Kepala Sub Divisi Portofolio Anak Perusahaan',
            'Kepala Sub Divisi Proteksi, Pemupukan Dan Hama Penyakit Komoditi Karet',
            'Kepala Sub Divisi Sekretariat Dan GCG',
            'Kepala Sub Divisi Sistem Manajemen Dan Sustainability',
            'Kepala Sub Divisi Tata Kelola Dan Pengembangan TI',
            'Kepala Sub Divisi Teknik Dan Infrastruktur',
            'Kepala Sub Divisi TJSL',
            'Kepala Sub Divisi Umum',
            'Ketua Tim Audit',
            'Lead STO/PMO',
            'Officer (Protokoler)',
            'Officer Data Support',
            'Officer Data Support Akuntansi Dan Perpajakan',
            'Officer Data Support Hubungan Kelembagaan Dan TJSL',
            'Officer Data Support Hukum',
            'Officer Data Support Inovasi Dan Pengembangan Bisnis',
            'Officer Data Support Manajemen Dan Optimalisasi Aset I',
            'Officer Data Support Manajemen Dan Optimalisasi Aset II',
            'Officer Data Support Manajemen Pemasaran',
            'Officer Data Support Manajemen Risiko Dan Sustainability',
            'Officer Data Support Operasional Sdm Dan General Affair',
            'Officer Data Support Pengembangan Sdm Dan Budaya Perusahaan',
            'Officer Data Support Perbendaharaan Anggaran Dan Keuangan',
            'Officer Data Support Spi',
            'Sekretaris Direksi',
            'Staf Dewan Komisaris',
            'STO Bidang Bidang Aset',
            'STO Bidang Keuangan',
            'STO Bidang Operasional & Pengadaan',
            'STO Bidang Operasional Dan Pengadaan',
            'STO Bidang Operasional Non Sawit',
            'STO Bidang Pemasaran',
            'STO Bidang Sdm & Rensus',
        ];

        $insertData = [];
        $now = now();

        foreach ($positions as $positionName) {
            $bodLevel = 1; // Default fallback for everything else
            $lowerPosition = Str::lower($positionName);

            if (
                Str::startsWith($lowerPosition, 'asisten') ||
                Str::startsWith($lowerPosition, 'sekretaris')
            ) {
                $bodLevel = 3;
            } elseif (
                Str::startsWith($lowerPosition, 'staf dewan') ||
                Str::startsWith($lowerPosition, 'kepala sub divisi') ||
                Str::startsWith($lowerPosition, 'co lead') ||
                Str::startsWith($lowerPosition, 'ketua tim')
            ) {
                $bodLevel = 2;
            }  elseif (
                Str::startsWith($lowerPosition, 'officer') ||
                Str::startsWith($lowerPosition, 'sto')
            ) {
                $bodLevel = 4;
            }

            $insertData[] = [
                'position' => $positionName,
                'bod_level' => $bodLevel,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        // Insert in batches of 50 to optimize database queries
        foreach (array_chunk($insertData, 50) as $chunk) {
            Position::insert($chunk);
        }
    }
}
