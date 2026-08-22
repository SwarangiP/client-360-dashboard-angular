import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FinancialSnapshot as FinancialSnapshotModel } from '../../models/client-profile.model';
import { MetricTile } from '../metric-tile/metric-tile';
import { Router } from '@angular/router';
import { IndianCurrencyPipe } from '../../../../shared/pipes/indian-currency-pipe';

@Component({
  selector: 'app-financial-snapshot',
  imports: [MetricTile, IndianCurrencyPipe],
  templateUrl: './financial-snapshot.html',
  styleUrl: './financial-snapshot.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialSnapshot {
  readonly snapshot = input.required<FinancialSnapshotModel>();
  readonly Math = Math;
  private readonly router = inject(Router);

  getLastSyncedLabel(): string {
    const value = this.snapshot().lastSynced;
    const syncedDate = new Date(value);

    if (Number.isNaN(syncedDate.getTime())) {
      return value;
    }

    const now = new Date();

    const differenceMs = now.getTime() - syncedDate.getTime();

    if (differenceMs < 0) {
      return 'just now';
    }

    const minutes = Math.floor(differenceMs / (1000 * 60));

    if (minutes < 1) {
      return 'just now';
    }

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    return `${days}d ago`;
  }

  formatDelta(
    value: number | null | undefined,
    positiveIsGood = true
  ): string {
    if (value === null || value === undefined) {
      return '';
    }

    const absoluteValue = Math.abs(value);

    if (value === 0) {
      return '— No change';
    }

    const direction = value > 0 ? '▲' : '▼';

    return `${direction} ${absoluteValue}%`;
  }

  getInsuranceGap(): number | null {
    const gap = this.snapshot().metrics.insuranceCover.gap;

    return gap?.value ?? null;
  }

  getFbsDelta(): string {
    const fbs = this.snapshot().monthly.fbs;

    return `${fbs.percentile} · ▲ ${Math.abs(fbs.deltaAbs)}`;
  }

  getTrendPoints(): string {
    const trend = this.snapshot().netWorth.trend;

    if (trend.length === 0) {
      return '';
    }

    const width = 520;
    const height = 100;
    const horizontalPadding = 6;
    const verticalPadding = 10;

    const values = trend.map((point) => point.value);

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    return trend
      .map((point, index) => {
        const x =
          horizontalPadding +
          (index *
            (width - horizontalPadding * 2)) /
          Math.max(trend.length - 1, 1);

        const y =
          height -
          verticalPadding -
          ((point.value - min) / range) *
          (height - verticalPadding * 2);

        return `${x},${y}`;
      })
      .join(' ');
  }

  onViewBreakdown(): void {
    this.router.navigate([
      '/clients',
      '147842',
      'financials'
    ]);
  }
}