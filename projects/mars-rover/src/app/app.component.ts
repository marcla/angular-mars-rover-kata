import { Component, inject } from '@angular/core';

import { CommandService } from './core/services/command.service';
import { PlanetGridComponent } from './features/planet-grid/planet-grid.component';

@Component({
  selector: 'mr-root',
  standalone: true,
  imports: [PlanetGridComponent],
  template: `<mr-planet-grid></mr-planet-grid>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private commandService = inject(CommandService);

  constructor() {
    this.commandService.startBatch();
  }
}
