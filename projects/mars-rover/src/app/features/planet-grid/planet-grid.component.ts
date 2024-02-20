import { NgForOf } from '@angular/common';
import { AfterViewInit, Component, QueryList, ViewChildren, inject } from '@angular/core';

import { SelectionModel } from '../../core/common/selection-model';
import { Coordinates } from '../../core/model/coords.model';
import { CoordinatesService } from '../../core/services/coordinates.service';
import { GridService } from './grid.service';
import { CellGridComponent } from './cell-grid.component';

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
    }
  `,
})
export class PlanetGridComponent implements AfterViewInit {
  @ViewChildren(CellGridComponent) cells!: QueryList<CellGridComponent>;

  // services
  private gridService = inject(GridService);
  private coordService = inject(CoordinatesService);

  private archive = new SelectionModel<Coordinates, CellGridComponent>();
  readonly grid = this.gridService.generate();

  ngAfterViewInit(): void {
    this.cells.forEach((item: CellGridComponent) => {
      const coords = this.coordService.toString(item.xPos(), item.yPos());

      this.archive.set(coords, item);
    });

    setTimeout(() => {
      const findRandomItem = this.archive.get(this.coordService.toString(7, 9));

      if (findRandomItem) {
        findRandomItem.hasRover = true;
        console.log(findRandomItem);
      }
    }, 3000);
  }
}
