import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { COMMANDS } from '../../core/model/command.model';
import { RoverStateService } from '../../core/services/rover-state.service';

@Component({
  selector: 'mr-console',
  standalone: true,
  imports: [],
  template: `<p class="console__message">
    {{ commandMessage() }}
  </p>`,
  styleUrl: './console.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsoleComponent {
  public roverState = inject(RoverStateService);

  public commandMessage = computed(() => {
    let message = '--';

    if (this.roverState.procedureError()) {
      return this.roverState.procedureError();
    }

    switch (this.roverState.lastCommand()) {
      case COMMANDS.left:
        message = 'turn left';
        break;
      case COMMANDS.right:
        message = 'turn right';
        break;
      case COMMANDS.backward:
        message = 'move backward';
        break;
      case COMMANDS.forward:
        message = 'move forward';
        break;
    }

    return message;
  });
}
