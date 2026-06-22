<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrainingRealizationDetail extends Model
{
    protected $fillable = [
        'training_realization_id',
        'employee_name',
        'employee_id',
        'employee_position',
        'position_id',
        'employee_bod_level',
        'employee_unit',
        'unit_id',
        'employee_division',
        'division_id',
        'employee_region',
        'region_id',
    ];

    public function master(): BelongsTo
    {
        return $this->belongsTo(TrainingRealization::class, 'training_realization_id');
    }
}
