import { Injectable, inject } from '@angular/core';
import { AppConfig, APP_CONFIG } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  private config: AppConfig = inject(APP_CONFIG);

  public borderMin = 0;
  public borderMax = this.config.gridSize;

  generate() {
    const result = Array(this.config.gridSize + 1)
      .fill('')
      .map((_, rowIndex) => ({
        id: `${rowIndex}`,
        content: Array(this.config.gridSize + 1)
          .fill('')
          .map((_, cellIndex) => ({ id: `${rowIndex}-${cellIndex}`, hasObstacle: false })),
      }));

    return result;
  }
}
