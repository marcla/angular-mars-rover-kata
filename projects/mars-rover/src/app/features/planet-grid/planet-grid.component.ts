import { NgForOf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CellGridComponent } from './cell-grid.component';
import { GridService } from '../../core/services/grid.service';

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
      border-top: 1px dashed var(--mr-grid-cell-border-color);
      border-left: 1px dashed var(--mr-grid-cell-border-color);
    }

    .grid__row {
      display: flex;
    }

    .grid__cell {
      width: var(--mr-grid-cell-size);
      height: var(--mr-grid-cell-size);

      background-color: var(--mr-grid-background-color);
      border-right: 1px dashed var(--mr-grid-cell-border-color);
      border-bottom: 1px dashed var(--mr-grid-cell-border-color);
    }
  `,
})
export class PlanetGridComponent {
  private gridService = inject(GridService);

  readonly grid = this.gridService.generate();
}
