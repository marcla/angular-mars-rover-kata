import { Injectable, inject } from '@angular/core';
import { AppConfig, APP_CONFIG } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  private config: AppConfig = inject(APP_CONFIG);

  generate() {
    const result = Array(this.config.gridSize + 1)
      .fill('')
      .map((_, rowIndex) => ({
        id: `${rowIndex}`,
        content: Array(this.config.gridSize + 1)
          .fill('')
          .map((_, cellIndex) => ({ id: `${rowIndex}-${cellIndex}` })),
      }));

    return result;
  }
}
