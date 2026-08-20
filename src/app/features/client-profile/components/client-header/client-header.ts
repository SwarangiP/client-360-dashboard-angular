import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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

  onCall(): void {
    console.log('Call client:', this.client().id);
  }

  onMessage(): void {
    console.log('Message client:', this.client().id);
  }

  onSendFwp(): void {
    console.log('Send FWP:', this.client().id);
  }

  onMoreActions(): void {
    console.log('Open client actions:', this.client().id);
  }

  onCreate(): void {
    console.log('Create action');
  }

  onNotifications(): void {
    console.log('Open notifications');
  }
}