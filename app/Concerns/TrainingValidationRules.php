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
            Rule::in(['keuangan', 'tanaman', 'pengolahan', 'teknik', 'umum', 'personalia', 'lainnya']),
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

    protected function trainingRealizationRules(): array
    {
        return [
            'name' => $this->nameRules(),
            'activity_type' => $this->activityTypeRules(),
            'learning_sector' => $this->learningSectorRules(),
            'learning_hours' => $this->learningHoursRules(),
            'cost' => $this->costRules(),
            'organization_id' => $this->organizationIdRules(),
            'start_learning_date' => $this->learningDateRules(),
            'end_learning_date' => $this->learningDateRules(),
            'total_participants' => $this->totalParticipantRules(),
            'total_learning_hours' => $this->learningHoursRules(),
            'total_cost' => $this->costRules(),
            'participants' => $this->participantsRules(),
        ];
    }

    protected function learningDateRules(): array
    {
        return [
            'required',
            'string',
        ];
    }

    protected function totalParticipantRules(): array
    {
        return [
            'required',
            'numeric',
        ];
    }

    protected function participantsRules(): array
    {
        return [
            'required',
            'array',
            'min:1',
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
