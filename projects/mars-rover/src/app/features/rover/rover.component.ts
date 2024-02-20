import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Directions } from '../../core/services/navigation-system.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type RoverContext = {
  direction: Directions;
};

@Component({
  selector: 'mr-rover',
  standalone: true,
  imports: [],
  template: `<b>MR</b>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoverComponent {}
