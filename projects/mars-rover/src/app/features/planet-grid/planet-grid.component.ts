import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CellGridComponent } from './cell-grid.component';

const PLANET_GRID_SIZE = 14 as const;

@Component({
  selector: 'mr-planet-grid',
  standalone: true,
  imports: [NgForOf, CellGridComponent],
  template: `
    <div class="grid">
      @for (rows of grid; track rows.id; let rowId = $index) {
        <div class="grid__row">
          @for (cell of rows.content; track cell.id; let columnId = $index) {
            <mr-cell-grid class="grid__cell" [yPos]="rowId" [xPos]="columnId"></mr-cell-grid>
          }
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .grid {
      // border-top: 1px dashed #ccc;
      // border-left: 1px dashed #ccc;
    }

    .grid__row {
      display: flex;
    }

    .grid__cell {
      width: 50px;
      height: 50px;

      background-color: #bf1104;
      border-right: 1px dashed #ccc;
      border-bottom: 1px dashed #ccc;

      font-size: 12px;
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetGridComponent {
  readonly grid = Array(PLANET_GRID_SIZE + 1)
    .fill('')
    .map((_, rowIndex) => ({
      id: `${rowIndex}`,
      content: Array(PLANET_GRID_SIZE + 1)
        .fill('')
        .map((_, cellIndex) => ({ id: `${rowIndex}-${cellIndex}` })),
    }));
}
