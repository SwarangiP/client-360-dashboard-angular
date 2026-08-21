import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayDatecls',
})
export class DisplayDateclsPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
