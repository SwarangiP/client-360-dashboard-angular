import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Toast } from '../../shared/components/toast/toast';
import {
  LucideHome,
  LucideBell,
  LucideUsersRound,
  LucidePanelTop,
  LucideMessageSquare,
  LucideBookOpen,
  LucideCircleStar,
  LucideCalendarDays,
  LucideShieldCheck,
  LucideWalletCards,
  LucideChartNoAxesColumn,
  LucideSearch,
  LucideEllipsisVertical,
  LucideMenu,
  LucideX
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
    LucideUsersRound,
    LucidePanelTop,
    LucideMessageSquare,
    LucideBookOpen,
    LucideCircleStar,
    LucideCalendarDays,
    LucideShieldCheck,
    LucideWalletCards,
    LucideChartNoAxesColumn,
    LucideSearch,
    LucideEllipsisVertical,
    LucideMenu,
    LucideX
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Shell {
  protected readonly isNavigationOpen = signal(false);

  protected toggleNavigation(): void {
    this.isNavigationOpen.update(isOpen => !isOpen);
  }
}