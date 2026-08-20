import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LucideMessageSquare } from '@lucide/angular';
import { TeamMember } from '../../models/client-profile.model';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-assigned-team',
  imports: [LucideMessageSquare],
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