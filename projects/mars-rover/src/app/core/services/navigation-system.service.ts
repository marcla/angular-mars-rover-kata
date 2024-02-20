import { Injectable } from '@angular/core';

export const DIRECTIONS = {
  NORTH: 'N',
  EAST: 'E',
  SOUTH: 'S',
  WEST: 'W',
} as const;

type DirectionKeys = keyof typeof DIRECTIONS;
export type Directions = (typeof DIRECTIONS)[DirectionKeys];

@Injectable({
  providedIn: 'root',
})
export class NavigationSystemService {
  constructor() {}
}
