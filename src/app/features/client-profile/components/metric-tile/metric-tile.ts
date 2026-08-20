import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type MetricTone = 'positive' | 'negative' | 'warning' | 'neutral';

@Component({
  selector: 'app-metric-tile',
  templateUrl: './metric-tile.html',
  styleUrl: './metric-tile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricTile {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly delta = input<string>();
  readonly tone = input<MetricTone>('neutral');
}