import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUpperCase',
})
export class ToUpperCasePipe implements PipeTransform {
  transform(value: string): string {
    console.log('saleee');
    return value.toUpperCase();
  }
}
