import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Subject, filter, of, switchMap, throwError } from 'rxjs';

import { Coordinates } from '../common/coordinates.class';
import { COMMANDS, Command } from '../model/command.model';
import { Directions, NavigationSystemService } from './navigation-system.service';

interface RoverState {
  direction: Directions;
  position: Coordinates;
}

export type RoverCommandEvent = Command;

export type RoverMoveEvent = {
  command: Command;
  prevPos: Coordinates;
  direction: Directions;
};

@Injectable({
  providedIn: 'root',
})
export class RoverStateService {
  private navigationService = inject(NavigationSystemService);

  private state = signal<RoverState>({
    direction: 'W',
    position: new Coordinates(4, 7),
  });

  // selectors
  direction = computed(() => this.state().direction);
  position = computed(() => this.state().position);

  public readonly sendCommand$ = new Subject<RoverCommandEvent>();

  public readonly changeDirection$ = this.sendCommand$.pipe(
    filter((command: Command) => command === COMMANDS.left || command === COMMANDS.right)
  );

  public readonly changePosition$ = this.sendCommand$.pipe(
    filter((command: Command) => command === COMMANDS.forward || command === COMMANDS.backward)
  );

  constructor() {
    this.changeDirection$
      .pipe(
        takeUntilDestroyed(),
        switchMap((command: Command) => {
          if (command === COMMANDS.left) {
            const turnedLeftDirection = this.navigationService.turnLeft(this.direction());

            return of(turnedLeftDirection);
          }

          if (command === COMMANDS.right) {
            const turnedRightDirection = this.navigationService.turnRight(this.direction());

            return of(turnedRightDirection);
          }

          return throwError(() => new Error(`Unknown change direction command "${command}"`));
        })
      )
      .subscribe((direction: Directions) => {
        this.state.update(prevState => ({
          ...prevState,
          direction,
        }));
      });

    this.changePosition$
      .pipe(
        takeUntilDestroyed(),
        switchMap((command: Command) => {
          if (command === COMMANDS.forward) {
            const movedForward = this.navigationService.moveForward(this.position(), this.direction());

            return of(movedForward);
          }

          if (command === COMMANDS.backward) {
            const movedBackward = this.navigationService.moveBackward(this.position(), this.direction());

            return of(movedBackward);
          }

          return throwError(() => new Error(`Unknown change position command "${command}"`));
        })
      )
      .subscribe((position: Coordinates) => {
        this.state.update(prevState => ({
          ...prevState,
          position,
        }));
      });
  }
}
