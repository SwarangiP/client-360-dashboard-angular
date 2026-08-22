import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ClientProfile } from '../../models/client-profile.model';
import { DecimalPipe } from '@angular/common';
import {
  LucideBell,
  LucideChevronRight,
  LucideEllipsisVertical,
  LucideMessageSquare,
  LucidePhone,
  LucidePlus,
  LucideSend
} from '@lucide/angular';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-client-header',
  imports: [DecimalPipe,
    LucideBell,
    LucideChevronRight,
    LucideEllipsisVertical,
    LucideMessageSquare,
    LucidePhone,
    LucidePlus,
    LucideSend
  ],
  templateUrl: './client-header.html',
  styleUrl: './client-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientHeader {
  readonly client = input.required<ClientProfile>();
  private readonly toastService = inject(ToastService);

  onCall(): void {
    console.log('Call client:', this.client().id);
    this.toastService.show('Calling client...');
  }

  onMessage(): void {
    console.log('Message client:', this.client().id);
    this.toastService.show('Opening message composer...');
  }

  onSendFwp(): void {
    console.log('Send FWP:', this.client().id);
    this.toastService.show('FWP sent for review.');
  }

  onMoreActions(): void {
    console.log('Open client actions:', this.client().id);
    this.toastService.show('More client actions opened.');
  }

  onCreate(): void {
    console.log('Create action');
    this.toastService.show('Create action selected.');
  }

  onNotifications(): void {
    console.log('Open notifications');
    this.toastService.show('Opening notifications...');
  }
}