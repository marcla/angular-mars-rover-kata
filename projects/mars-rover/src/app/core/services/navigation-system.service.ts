import { Injectable, inject } from '@angular/core';

import { INDEX_OF_NOT_FOUND_VALUE } from '../common/const';
import { Index } from '../model/app.model';

import { GridService } from './grid.service';
import { Coordinates } from '../common/coordinates.class';
import { ObstacleRegistry } from '../common/obstacle.class';
import { MR_ERROR_OBSTACLE_FOUND } from '../common/error';

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
  private planet = inject(GridService);
  private obscacleRegistry = inject(ObstacleRegistry);

  private readonly directions = Object.values(DIRECTIONS);
  private readonly borderDirections = this.directions.length - 1;

  moveForward(position: Coordinates, dir: Directions): Coordinates {
    const result = this.move(position, dir);

    return result;
  }

  moveBackward(position: Coordinates, dir: Directions): Coordinates {
    const result = this.move(position, dir, -1);

    return result;
  }

  turnLeft(currentDirection: Directions): Directions {
    let newIndex = this.indexOfDirection(currentDirection) - 1;

    if (newIndex < 0) {
      newIndex = this.borderDirections;
    }

    return this.directions[newIndex];
  }

  turnRight(currentDirection: Directions): Directions {
    let newIndex = this.indexOfDirection(currentDirection) + 1;

    if (newIndex > this.borderDirections) {
      newIndex = 0;
    }

    return this.directions[newIndex];
  }

  indexOfDirection(dir: Directions): Index {
    const index = this.directions.indexOf(dir);

    if (index === INDEX_OF_NOT_FOUND_VALUE) {
      throw new Error(`Unable to find direction value: ${dir}`);
    }

    return index;
  }

  move(position: Coordinates, dir: Directions, directionCoeff = 1): Coordinates {
    const verticalDirections: Directions[] = [DIRECTIONS.NORTH, DIRECTIONS.SOUTH];
    const increaseDirections: Directions[] = [DIRECTIONS.EAST, DIRECTIONS.SOUTH];

    const isVerticalDirection = verticalDirections.includes(dir);
    let increaseCoeff = increaseDirections.includes(dir) ? 1 : -1;
    increaseCoeff *= directionCoeff;
    let outputPosition = position;

    if (isVerticalDirection) {
      const newPosY = position.y + increaseCoeff;

      outputPosition = outputPosition.setY(this.checkEdgeMap(newPosY));
    } else {
      const newPosX = position.x + increaseCoeff;

      outputPosition = outputPosition.setX(this.checkEdgeMap(newPosX));
    }

    if (this.obscacleRegistry.has(outputPosition.toString())) {
      throw new Error(MR_ERROR_OBSTACLE_FOUND);
    }

    return outputPosition;
  }

  checkEdgeMap(newPos: number): number {
    if (newPos > this.planet.borderMax) {
      return this.planet.borderMin;
    }

    if (newPos < this.planet.borderMin) {
      return this.planet.borderMax;
    }

    return newPos;
  }
}
