import { Pipe, PipeTransform  } from '@angular/core';

@Pipe({ name: 'toFixed' })
export class ToFixedPipe implements PipeTransform {
    transform(num: number) {
        return num.toFixed(2);
    }
}
