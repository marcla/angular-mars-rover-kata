import { ChangeDetectionStrategy, Component, HostBinding, effect, inject } from '@angular/core';

import { Directions } from '../../core/services/navigation-system.service';
import { RoverStateService } from '../../core/services/rover-state.service';

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

    :host-context(.direction-n) {
      transform: rotate(90deg);
    }
    :host-context(.direction-e) {
      transform: scaleX(-1);
    }
    :host-context(.direction-s) {
      transform: rotate(-90deg);
    }
    :host-context(.direction-w) {
      transform: rotate(0deg);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoverComponent implements RoverContext {
  private roverService = inject(RoverStateService);

  direction: Directions = this.roverService.direction();

  @HostBinding('class')
  get directionClass() {
    return `direction-${this.roverService.direction().toLowerCase()}`;
  }
}
