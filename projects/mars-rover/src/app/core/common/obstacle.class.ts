import { Injectable } from '@angular/core';

import assert from './assert';
import { Coordinates } from './coordinates.class';

import { PosX, PosY, StringCoordinates } from '../model/coords.model';

export type ObstacleContext = {
  coords: Coordinates;
  x: PosX;
  y: PosY;
  // TODO use a component property to create different obstacle
};

export class Obstacle implements ObstacleContext {
  readonly coords: Coordinates;

  get x(): PosX {
    return this.coords.x;
  }

  get y(): PosX {
    return this.coords.y;
  }

  constructor(x: PosX, y: PosY) {
    this.coords = new Coordinates(x, y);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ObstacleRegistry {
  private stack: Record<StringCoordinates, Obstacle> = {};

  constructor() {
    this.initObstacles();
  }

  add(obstacle: Obstacle): void {
    this.stack = {
      ...this.stack,
      [obstacle.coords.toString()]: obstacle,
    };
  }

  has(position: StringCoordinates): boolean {
    const result = this.stack[position];

    return !assert.isNil(result);
  }

  private initObstacles() {
    const obstacles = [
      { x: 1, y: 1 },
      { x: 4, y: 1 },
      { x: 7, y: 1 },
      { x: 1, y: 4 },
      { x: 4, y: 4 },
      { x: 7, y: 4 },
      { x: 1, y: 7 },
      { x: 4, y: 7 },
      { x: 7, y: 7 },
    ];

    for (const { x, y } of obstacles) {
      const obstacle = new Obstacle(x, y);

      this.add(obstacle);
    }
  }
}
