import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilServiceService {

  constructor() { }

  execute<T>(observale: Observable<T>, fallbackResult?: T): Observable<T> {
    let _cancellationToken: Subject<void> = new Subject();

    let fn = observale;
    if (fallbackResult) {
      fn = fn.pipe(catchError(() => of(fallbackResult)));
    }

    return fn.pipe(takeUntil(_cancellationToken.asObservable()));
  }
}
