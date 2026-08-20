import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-client-profile-skeleton',
  templateUrl: './client-profile-skeleton.html',
  styleUrl: './client-profile-skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientProfileSkeleton { }