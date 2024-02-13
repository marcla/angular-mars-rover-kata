import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mr-cell-grid',
  standalone: true,
  imports: [],
  template: `{{ xPos }} - {{ yPos }}`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellGridComponent {
  @Input({ required: true }) yPos!: number;
  @Input({ required: true }) xPos!: number;
}
