import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'displayDate',
  standalone: true
})
export class DisplayDatePipe implements PipeTransform {
  transform(
    value: string | Date | null | undefined,
    withTime = false
  ): string {
    if (!value) {
      return '—';
    }

    try {
      return formatDate(
        value,
        withTime ? 'd MMM yyyy, h:mm a' : 'd MMM yyyy',
        'en-IN',
        'Asia/Kolkata'
      );
    } catch {
      return '—';
    }
  }
}