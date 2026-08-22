import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LucideMessageSquare } from '@lucide/angular';
import { TeamMember } from '../../models/client-profile.model';
import { ToastService } from '../../../../core/services/toast.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-assigned-team',
  imports: [EmptyState, LucideMessageSquare],
  templateUrl: './assigned-team.html',
  styleUrl: './assigned-team.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignedTeam {
  readonly team = input.required<TeamMember[]>();

  private readonly toastService = inject(ToastService);

  onMessage(member: TeamMember): void {
    this.toastService.show(`Opening message composer for ${member.name}...`);
  }
}