import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { PersonalDetails as PersonalDetailsModel } from '../../models/client-profile.model';
import { DisplayDatePipe } from '../../../../shared/pipes/display-date-pipe';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-personal-details',
  imports: [DisplayDatePipe],
  templateUrl: './personal-details.html',
  styleUrl: './personal-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalDetails {
  readonly personal = input.required<PersonalDetailsModel>();
  private readonly toastService = inject(ToastService);

  onEdit(): void {
    this.toastService.show('Edit personal details');
  }
}