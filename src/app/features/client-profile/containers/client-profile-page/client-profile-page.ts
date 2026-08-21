import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientProfile, Task } from '../../models/client-profile.model';
import { ClientService } from '../../services/client.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ClientHeader } from '../../components/client-header/client-header';
import { ArchetypeCard } from '../../components/archetype-card/archetype-card';
import { PersonalDetails } from '../../components/personal-details/personal-details';
import { AssignedTeam } from '../../components/assigned-team/assigned-team';
import { Household } from '../../components/household/household';
import { LifecycleStepper } from '../../components/lifecycle-stepper/lifecycle-stepper';
import { FinancialSnapshot } from '../../components/financial-snapshot/financial-snapshot';
import { Compliance } from '../../components/compliance/compliance';
import { ActivityFeed } from '../../components/activity-feed/activity-feed';
import { NextAction } from '../../components/next-action/next-action';
import { WorkbookPanel } from '../../components/workbook-panel/workbook-panel';
import { ClientProfileSkeleton } from '../../../../shared/components/client-profile-skeleton/client-profile-skeleton';

@Component({
  selector: 'app-client-profile-page',
  standalone: true,
  imports: [
    ClientHeader,
    ArchetypeCard,
    PersonalDetails,
    AssignedTeam,
    Household,
    LifecycleStepper,
    FinancialSnapshot,
    Compliance,
    ActivityFeed,
    NextAction,
    WorkbookPanel,
    ClientProfileSkeleton
  ],
  templateUrl: './client-profile-page.html',
  styleUrl: './client-profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientProfilePage implements OnInit {
  readonly client = signal<ClientProfile | null>(null);
  readonly tasks = signal<Task[]>([]);

  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  private readonly clientService = inject(ClientService);
  private readonly toastService = inject(ToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const forceError =
      this.route.snapshot.queryParamMap.get('error') === 'true';

    this.loadClientProfile(forceError);
  }

  private loadClientProfile(forceError = false): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.clientService.getClientProfile(forceError).subscribe({
      next: (clientProfile) => {
        this.client.set(clientProfile);
        this.tasks.set(clientProfile.tasks);
        this.isLoading.set(false);
      },

      error: (error: Error) => {
        this.client.set(null);
        this.tasks.set([]);
        this.isLoading.set(false);

        this.errorMessage.set(
          error.message || 'Unable to load client profile.'
        );
      }
    });
  }

  retry(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      replaceUrl: true
    });

    this.loadClientProfile(false);
  }

  onCall(): void {
    this.toastService.show('Calling client...');
  }

  onMessage(): void {
    this.toastService.show('Opening message composer...');
  }

  onSendFwp(): void {
    this.toastService.show('FWP sent for review.');
  }

  onHeaderMore(): void {
    this.toastService.show('More client actions opened.');
  }

  onGenerateFwp(): void {
    this.toastService.show('Generating FWP v3...');
  }

  onNextActionMore(): void {
    this.toastService.show('More action options opened.');
  }

  onTaskToggled(taskId: string): void {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId
          ? {
            ...task,
            completed: !task.completed
          }
          : task
      )
    );

    this.toastService.show('Task status updated.');
  }

  onAddTask(label: string): void {
    const trimmedLabel = label.trim();

    if (!trimmedLabel) {
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      label: trimmedLabel,
      dueLabel: 'Today',
      assigneeTag: '@me',
      completed: false
    };

    this.tasks.update((tasks) => [
      ...tasks,
      newTask
    ]);

    this.toastService.show('Task added.');
  }
}