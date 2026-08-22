import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indianCurrency',
  standalone: true
})
export class IndianCurrencyPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || !Number.isFinite(value)) {
      return '—';
    }

    if (Math.abs(value) >= 10_000_000) {
      return `₹${(value / 10_000_000).toFixed(2)} Cr`;
    }

    if (Math.abs(value) >= 100_000) {
      return `₹${(value / 100_000).toFixed(2)} L`;
    }

    return `₹${new Intl.NumberFormat('en-IN').format(value)}`;
  }
}
