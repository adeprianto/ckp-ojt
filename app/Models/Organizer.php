<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organizer extends Model
{
    protected $fillable = ['name', 'is_ptpn_group'];

    public function trainings(): HasMany
    {
        return $this->hasMany(Training::class);
    }
}
