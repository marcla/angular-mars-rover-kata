import { APP_CONFIG } from '../../app.config';

export const generateTestAppConfigProvider = (gridSize: number) => {
  return { provide: APP_CONFIG, useValue: { gridSize } };
};
