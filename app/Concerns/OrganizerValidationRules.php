<?php

namespace App\Concerns;

use App\Concerns\ProfileValidationRules;

trait OrganizerValidationRules
{
    use ProfileValidationRules;

    protected function organizerRules(?int $userId = null): array
    {
        return [
            'name' => $this->nameRules(),
            'is_ptpn_group' => $this->isPtpnGroupRules(),
        ];
    }

    protected function isPtpnGroupRules(): array
    {
        return ['required', 'boolean'];
    }
}
