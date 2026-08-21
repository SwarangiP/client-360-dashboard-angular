import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ClientProfile } from '../../models/client-profile.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClientHeader } from '../../components/client-header/client-header';
import { ArchetypeCard } from '../../components/archetype-card/archetype-card';
import { PersonalDetails } from '../../components/personal-details/personal-details';
import { AssignedTeam } from '../../components/assigned-team/assigned-team';
import { Household } from '../../components/household/household';
import { LifecycleStepper } from '../../components/lifecycle-stepper/lifecycle-stepper';
import { FinancialSnapshot } from '../../components/financial-snapshot/financial-snapshot';
import { ClientProfileSkeleton } from '../../../../shared/components/client-profile-skeleton/client-profile-skeleton';
import { Compliance } from '../../components/compliance/compliance';
import { ActivityFeed } from '../../components/activity-feed/activity-feed';
import { NextAction } from '../../components/next-action/next-action';
import { ToastService } from '../../../../core/services/toast.service';
import { WorkbookPanel } from '../../components/workbook-panel/workbook-panel';
import { Task } from '../../models/client-profile.model';

@Component({
  selector: 'app-client-profile-page',
  imports: [ClientHeader,
    ArchetypeCard,
    PersonalDetails,
    AssignedTeam,
    Household,
    LifecycleStepper,
    FinancialSnapshot,
    ClientProfileSkeleton,
    Compliance,
    ActivityFeed,
    NextAction,
    WorkbookPanel
  ],
  templateUrl: './client-profile-page.html',
  styleUrl: './client-profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientProfilePage {
  private readonly clientService = inject(ClientService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ToastService);

  readonly client = signal<ClientProfile | null>(null);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly tasks = signal<Task[]>([]);

  constructor() {
    this.loadClientProfile();
  }

  loadClientProfile(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.clientService.getClientProfile().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (clientProfile) => {
          this.client.set(clientProfile);
          this.tasks.set(clientProfile.tasks);
          this.isLoading.set(false);
        },
        error: (error: unknown) => {
          console.error(error);
          this.client.set(null);
          this.isLoading.set(false);
          this.errorMessage.set('Unable to load client profile.');
        }
      });
  }

  retry(): void {
    this.loadClientProfile();
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
    const newTask: Task = {
      id: crypto.randomUUID(),
      label,
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
