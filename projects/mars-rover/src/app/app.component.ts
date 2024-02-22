import { Component, inject } from '@angular/core';

import { CommandService } from './core/services/command.service';
import { ConsoleComponent } from './features/console/console.component';
import { PlanetGridComponent } from './features/planet-grid/planet-grid.component';

@Component({
  selector: 'mr-root',
  standalone: true,
  imports: [PlanetGridComponent, ConsoleComponent],
  template: `
    <main>
      <mr-planet-grid></mr-planet-grid>
      <mr-console></mr-console>
    </main>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private commandService = inject(CommandService);

  constructor() {
    this.commandService.startBatch();
  }
}
