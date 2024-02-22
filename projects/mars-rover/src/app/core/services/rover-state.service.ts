import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Subject, filter, iif, mergeMap, of, switchMap, throwError } from 'rxjs';

import { Coordinates } from '../common/coordinates.class';
import { COMMANDS, Command } from '../model/command.model';
import { Directions, NavigationSystemService } from './navigation-system.service';

interface RoverState {
  direction: Directions;
  position: Coordinates;
  lastCommand: Command | null;
  procedureError: string | null;
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
    position: new Coordinates(3, 2),
    lastCommand: null,
    procedureError: null,
  });

  // selectors
  public readonly direction = computed(() => this.state().direction);
  public readonly position = computed(() => this.state().position);
  public readonly lastCommand = computed(() => this.state().lastCommand);
  public readonly procedureError = computed(() => this.state().procedureError);

  public readonly sendCommand$ = new Subject<RoverCommandEvent>();
  private readonly validCommand$ = this.sendCommand$.pipe(
    mergeMap(command =>
      iif(
        () => Object.values(COMMANDS).includes(command),
        of(command),
        throwError(() => new Error(`Invalid command!`))
      )
    )
  );

  private readonly changeDirection$ = this.validCommand$.pipe(
    filter((command: Command) => command === COMMANDS.left || command === COMMANDS.right)
  );

  private readonly changePosition$ = this.validCommand$.pipe(
    filter((command: Command) => command === COMMANDS.forward || command === COMMANDS.backward)
  );

  constructor() {
    this.validCommand$.pipe(takeUntilDestroyed()).subscribe({
      next: command => {
        this.state.update(prevState => ({
          ...prevState,
          lastCommand: command,
        }));
      },
      error: error => {
        this.state.update(prevState => ({
          ...prevState,
          procedureError: error,
        }));

        this.sendCommand$.error(error);
      },
    });

    this.changeDirection$
      .pipe(
        takeUntilDestroyed(),
        switchMap((command: Command) => {
          return iif(
            () => command === COMMANDS.left,
            of(this.navigationService.turnLeft(this.direction())),
            of(this.navigationService.turnRight(this.direction()))
          );
        })
      )
      .subscribe({
        next: (direction: Directions) => {
          this.state.update(prevState => ({
            ...prevState,
            direction,
          }));
        },
        error: error => this.sendCommand$.error(error),
      });

    this.changePosition$
      .pipe(
        takeUntilDestroyed(),
        switchMap((command: Command) => {
          return iif(
            () => command === COMMANDS.forward,
            of(this.navigationService.moveForward(this.position(), this.direction())),
            of(this.navigationService.moveBackward(this.position(), this.direction()))
          );
        })
      )
      .subscribe({
        next: (position: Coordinates) => {
          this.state.update(prevState => ({
            ...prevState,
            position,
          }));
        },
        error: error => this.sendCommand$.error(error),
      });
  }
}
