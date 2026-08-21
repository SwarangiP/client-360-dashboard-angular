import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'app-financial-breakdown',
  templateUrl: './financial-breakdown.html',
  styleUrl: './financial-breakdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialBreakdown { }