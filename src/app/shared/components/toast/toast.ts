import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Toast {
  private readonly toastService = inject(ToastService);

  readonly toast = this.toastService.toast;

  dismiss(): void {
    this.toastService.dismiss();
  }
}