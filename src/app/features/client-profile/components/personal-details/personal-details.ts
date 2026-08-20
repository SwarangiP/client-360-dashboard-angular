import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PersonalDetails as PersonalDetailsModel } from '../../models/client-profile.model';

@Component({
  selector: 'app-personal-details',
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