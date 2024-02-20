import { ApplicationConfig, InjectionToken } from '@angular/core';

const PLANET_GRID_SIZE = 14 as const;
export interface AppConfig {
  gridSize: typeof PLANET_GRID_SIZE;
}

export const APP_CONFIG: InjectionToken<AppConfig> = new InjectionToken<AppConfig>('APP_CONFIG');

/**
 * Use that: `@Inject(APP_CONFIG) private config: AppConfig`
 * or `inject(APP_CONFIG)`
 */
export const MARS_ROVER_CONFIG: AppConfig = {
  gridSize: PLANET_GRID_SIZE,
};

export const appConfig: ApplicationConfig = {
  providers: [{ provide: APP_CONFIG, useValue: MARS_ROVER_CONFIG }],
};
