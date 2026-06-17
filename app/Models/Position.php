<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Position extends Model
{
    protected $fillable = ['nama_organisasi', 'kode_jabatan', 'kelompok_jabatan', 'bod_level', 'nama_jabatan', 'id_jobfamily', 'komoditas'];

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }
}
