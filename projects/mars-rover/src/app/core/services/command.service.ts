import { Injectable, inject } from '@angular/core';

import { concatMap, delay, from, of } from 'rxjs';

import { Command } from '../model/command.model';
import { RoverStateService } from './rover-state.service';

@Injectable({
  providedIn: 'root',
})
export class CommandService {
  private roverService = inject(RoverStateService);

  private route: Command[] = [
    'r',
    'f',
    'f',
    'f',
    'r',
    'b',
    'b',
    'l',
    'f',
    'f',
    'f',
    'f',
    'l',
    'b',
    'l',
    'f',
    'f',
    'f',
    'b',
    'f',
    'f',
    'f',
    'l',
    'b',
    'l',
    'f',
    'f',
    'f',
    'b',
    'r',
    'f',
    'f',
    'f',
    'r',
    'b',
    'b',
    'l',
    'f',
    'b',
    'l',
    'f',
    'f',
    'f',
    'f',
    'l',
    'b',
    'f',
    'f',
    'f',
    'r',
    'b',
    'b',
    'l',
    'f',
  ];

  startBatch() {
    from(this.route)
      .pipe(concatMap(val => of(val).pipe(delay(1000))))
      .subscribe({
        next: command => this.roverService.sendCommand$.next(command),
        complete: () => this.roverService.sendCommand$.complete(),
      });
  }
}
