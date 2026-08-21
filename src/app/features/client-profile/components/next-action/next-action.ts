import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

import {
  LucideEllipsisVertical,
  LucideSend
} from '@lucide/angular';

import {
  NextAction as NextActionModel,
  NextActionStatus
} from '../../models/client-profile.model';

@Component({
  selector: 'app-next-action',
  imports: [
    LucideEllipsisVertical,
    LucideSend
  ],
  templateUrl: './next-action.html',
  styleUrl: './next-action.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextAction {
  readonly action = input.required<NextActionModel>();

  readonly generate = output<void>();
  readonly moreClicked = output<void>();

  getStatusLabel(status: NextActionStatus): string {
    return status.replace('_', ' ');
  }

  onGenerate(): void {
    this.generate.emit();
  }

  onMoreClicked(): void {
    this.moreClicked.emit();
  }
}