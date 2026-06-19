<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Training extends Model
{
    protected $fillable = [
        'name',
        'activity_type',
        'learning_sector',
        'learning_type',
        'learning_hours',
        'cost',
        'organization_id',
        'is_ptpn_group',
    ];

    public function organizer(): BelongsTo
    {
        return $this->belongsTo(Organizer::class, 'organization_id');
    }
}
