import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { LucideBookOpen, LucideCalendarDays, LucideMessageSquare, LucidePhone } from '@lucide/angular';
import { Activity, ActivityType } from '../../models/client-profile.model';
import { DisplayDatePipe } from '../../../../shared/pipes/display-date-pipe';

type ActivityFilter = 'all' | ActivityType;

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [
    LucideBookOpen,
    LucideCalendarDays,
    LucideMessageSquare,
    LucidePhone,
    DisplayDatePipe
  ],
  templateUrl: './activity-feed.html',
  styleUrl: './activity-feed.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityFeed {
  readonly activities = input.required<Activity[]>();

  readonly selectedFilter = signal<ActivityFilter>('all');

  readonly filteredActivities = computed(() => {
    const filter = this.selectedFilter();

    if (filter === 'all') {
      return this.activities();
    }

    return this.activities().filter(
      (activity) => activity.type === filter
    );
  });

  setFilter(filter: ActivityFilter): void {
    this.selectedFilter.set(filter);
  }

  isActiveFilter(filter: ActivityFilter): boolean {
    return this.selectedFilter() === filter;
  }
}