import { NgIf } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';

import { Coordinates } from '../../core/common/coordinates.class';
import { RoverStateService } from '../../core/services/rover-state.service';
import { RoverComponent } from '../rover/rover.component';

@Component({
  selector: 'mr-cell-grid',
  standalone: true,
  imports: [NgIf, RoverComponent],
  template: `
    <sup>{{ xPos() }} - {{ yPos() }}</sup>

    @if (hasRover()) {
      <mr-rover></mr-rover>
    }
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
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

  xPos = input.required<number>();
  yPos = input.required<number>();

  hasRover = computed(
    () => this.roverState.position().toString() === new Coordinates(this.xPos(), this.yPos()).toString()
  );
}
