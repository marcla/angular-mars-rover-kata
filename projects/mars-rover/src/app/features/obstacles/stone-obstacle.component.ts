import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mr-stone-obstacle',
  standalone: true,
  imports: [],
  template: ` <img src="/assets/images/stone.png" alt="stone obstacle" /> `,
  styles: `
    :host {
      display: flex;
      width: 100%;
      height: 100%;
      align-content: center;
      justify-content: center;
    }

    img {
      width: 100%;
      display: inline-block;
      object-fit: contain;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoneObstacleComponent {}
