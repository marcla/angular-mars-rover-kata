import { NgIf } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';

import { Coordinates } from '../../core/common/coordinates.class';
import { ObstacleRegistry } from '../../core/common/obstacle.class';
import { RoverStateService } from '../../core/services/rover-state.service';
import { StoneObstacleComponent } from '../obstacles/stone-obstacle.component';
import { RoverComponent } from '../rover/rover.component';

@Component({
  selector: 'mr-cell-grid',
  standalone: true,
  imports: [NgIf, RoverComponent, StoneObstacleComponent],
  template: `
    <sup>{{ id() }}</sup>

    @if (hasRover() && !hasObstacle()) {
      <mr-rover></mr-rover>
    }

    @if (hasObstacle()) {
      <mr-stone-obstacle></mr-stone-obstacle>
    }
  `,
  styles: `
    :host {
      display: block;
      position: relative;
    }

    sup {
      position: absolute;
      top: 4px;
      left: 4px;
    }
  `,
})
export class CellGridComponent {
  private roverState = inject(RoverStateService);
  private obscacleRegistry = inject(ObstacleRegistry);

  xPos = input.required<number>();
  yPos = input.required<number>();

  id = computed(() => new Coordinates(this.xPos(), this.yPos()).toString());

  hasRover = computed(() => this.roverState.position().toString() === this.id());
  hasObstacle = computed(() => this.obscacleRegistry.has(this.id()));
}
