import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PersonalDetails as PersonalDetailsModel } from '../../models/client-profile.model';
import { DisplayDatePipe } from '../../../../shared/pipes/display-date-pipe';

@Component({
  selector: 'app-personal-details',
  imports: [DisplayDatePipe],
  templateUrl: './personal-details.html',
  styleUrl: './personal-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalDetails {
  readonly personal = input.required<PersonalDetailsModel>();

  onEdit(): void {
    console.log('Edit personal details');
  }
}