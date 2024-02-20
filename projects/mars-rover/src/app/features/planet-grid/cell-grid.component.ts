import { Component, input } from '@angular/core';
import { NgIf } from '@angular/common';

import { RoverComponent } from '../rover/rover.component';

@Component({
  selector: 'mr-cell-grid',
  standalone: true,
  imports: [NgIf, RoverComponent],
  template: `
    <sup>{{ xPos() }} - {{ yPos() }}</sup>

    @if (hasRover) {
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
  xPos = input.required<number>();
  yPos = input.required<number>();

  hasRover = false;
}
