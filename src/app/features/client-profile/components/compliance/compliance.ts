import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';

import {
  Compliance as ComplianceModel,
  ComplianceStatus
} from '../../models/client-profile.model';

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.html',
  styleUrl: './compliance.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Compliance {
  readonly compliance = input.required<ComplianceModel>();

  getStatusIcon(status: ComplianceStatus): string {
    switch (status) {
      case 'verified':
        return '✓';

      case 'pending':
        return '○';

      case 'action_required':
        return '!';

      default:
        return '!';
    }
  }

  getStatusLabel(status: ComplianceStatus): string {
    switch (status) {
      case 'verified':
        return 'Verified';

      case 'pending':
        return 'Pending';

      case 'action_required':
        return 'Action required';

      default:
        return 'Unknown';
    }
  }
}