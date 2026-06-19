<?php

namespace App\Concerns;

use Illuminate\Validation\Rule;

trait TrainingValidationRules
{
    use ProfileValidationRules;

    protected function trainingRules(): array
    {
        return [
            'name' => $this->nameRules(),
            'activity_type' => $this->activityTypeRules(),
            'learning_sector' => $this->learningSectorRules(),
            'learning_hours' => $this->learningHoursRules(),
            'cost' => $this->costRules(),
            'organization_id' => $this->organizationIdRules(),
        ];
    }

    protected function activityTypeRules(): array
    {
        return [
            'required',
            'string',
        ];
    }

    protected function learningSectorRules(): array
    {
        return [
            'required',
            'string',
            Rule::in(['keuangan', 'tanaman', 'pengolahan', 'teknik', 'umum/lainnya']),
        ];
    }

    protected function learningHoursRules(): array
    {
        return [
            'required',
            'numeric',
        ];
    }

    protected function costRules(): array
    {
        return [
            'required',
            'numeric',
        ];
    }

    protected function organizationIdRules(): array
    {
        return [
            'required',
            'integer',
            'exists:organizers,id',
        ];
    }

    protected function learningTypeRules(): array
    {
        return [
            'required',
            'string',
            Rule::in(['softskill', 'hardskill']),
        ];
    }
}
