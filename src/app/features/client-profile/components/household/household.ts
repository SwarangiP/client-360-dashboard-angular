import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input
} from '@angular/core';

import { HouseholdMember } from '../../models/client-profile.model';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-household',
  templateUrl: './household.html',
  styleUrl: './household.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Household {
  readonly members = input.required<HouseholdMember[]>();

  private readonly toastService = inject(ToastService);

  onAdd(): void {
    this.toastService.show('Add household member selected.');
  }
}