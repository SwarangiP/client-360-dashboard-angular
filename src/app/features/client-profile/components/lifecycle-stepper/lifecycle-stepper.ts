import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Lifecycle, LifecycleStageStatus } from '../../models/client-profile.model';

@Component({
  selector: 'app-lifecycle-stepper',
  templateUrl: './lifecycle-stepper.html',
  styleUrl: './lifecycle-stepper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LifecycleStepper {
  readonly lifecycle = input.required<Lifecycle>();

  isComplete(status: LifecycleStageStatus): boolean {
    return status === 'complete';
  }

  isCurrent(status: LifecycleStageStatus): boolean {
    return status === 'current';
  }
}