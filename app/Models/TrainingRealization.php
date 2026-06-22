<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TrainingRealization extends Model
{
    protected $fillable = [
        'training_name',
        'training_id',
        'training_start_date',
        'training_end_date',
        'total_participants',
        'total_learning_hours',
        'cost',
    ];

    public function training(): BelongsTo
    {
        return $this->belongsTo(Training::class, 'training_id');
    }

    public function details(): HasMany
    {
        return $this->hasMany(TrainingRealizationDetail::class);
    }
}
