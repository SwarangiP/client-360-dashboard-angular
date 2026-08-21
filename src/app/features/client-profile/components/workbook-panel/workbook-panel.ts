import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal
} from '@angular/core';

import {
  LucideChevronRight,
  LucidePlus,
  LucideCheck
} from '@lucide/angular';

import {
  Workbook as WorkbookModel,
  Task,
  PaymentSummary
} from '../../models/client-profile.model';

type WorkbookTab = 'tasks' | 'docs' | 'payment';

@Component({
  selector: 'app-workbook-panel',
  standalone: true,
  imports: [
    LucideChevronRight,
    LucidePlus,
    LucideCheck
  ],
  templateUrl: './workbook-panel.html',
  styleUrl: './workbook-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkbookPanel {
  readonly workbook = input.required<WorkbookModel>();
  readonly tasks = input.required<Task[]>();
  readonly docsCount = input.required<number>();
  readonly paymentSummary = input.required<PaymentSummary>();

  readonly activeTab = signal<WorkbookTab>('tasks');

  readonly taskToggled = output<string>();
  readonly addTask = output<string>();

  readonly showAddTask = signal(false);
  readonly newTaskLabel = signal('');

  setTab(tab: WorkbookTab): void {
    this.activeTab.set(tab);
  }

  onTaskToggle(taskId: string): void {
    this.taskToggled.emit(taskId);
  }

  onAddTask(): void {
    this.newTaskLabel.set('');
    this.showAddTask.set(true);
  }

  cancelAddTask(): void {
    this.newTaskLabel.set('');
    this.showAddTask.set(false);
  }

  submitNewTask(event: Event): void {
    event.preventDefault();

    const label = this.newTaskLabel().trim();

    if (!label) {
      return;
    }

    this.addTask.emit(label);

    this.newTaskLabel.set('');
    this.showAddTask.set(false);
  }
}