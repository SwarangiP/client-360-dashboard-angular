import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Toast } from '../../shared/components/toast/toast';
import {
  LucideHome,
  LucideBell,
  LucideUsers,
  LucidePanelTop,
  LucideMessageSquare,
  LucideBookOpen,
  LucideCircleStar,
  LucideCalendarDays,
  LucideShieldCheck,
  LucideWalletCards,
  LucideChartNoAxesColumn,
  LucideSearch,
  LucideEllipsisVertical
} from '@lucide/angular';

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    Toast,
    LucideHome,
    LucideBell,
    LucideUsers,
    LucidePanelTop,
    LucideMessageSquare,
    LucideBookOpen,
    LucideCircleStar,
    LucideCalendarDays,
    LucideShieldCheck,
    LucideWalletCards,
    LucideChartNoAxesColumn,
    LucideSearch,
    LucideEllipsisVertical
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Shell { }