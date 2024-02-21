import { TestBed } from '@angular/core/testing';

import { DIRECTIONS, NavigationSystemService } from './navigation-system.service';
import { generateTestAppConfigProvider } from '../test/helpers';
import { Coordinates } from '../common/coordinates.class';

describe('NavigationSystemService', () => {
  const gridLimit = 8;
  let service: NavigationSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [generateTestAppConfigProvider(gridLimit)],
    });
    service = TestBed.inject(NavigationSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('check edge map', () => {
    it('simple changing position', () => {
      const result = service.checkEdgeMap(5);

      expect(result).toEqual(5);
    });

    it('position less limit', () => {
      const result = service.checkEdgeMap(-1);

      expect(result).toEqual(gridLimit);
    });

    it('position after max limit', () => {
      const result = service.checkEdgeMap(gridLimit + 1);

      expect(result).toEqual(0);
    });
  });

  describe('calculate moving position', () => {
    it('should move the rover forward to EAST into the grid', () => {
      const pos = new Coordinates(2, 3);
      const dir = DIRECTIONS.EAST;
      const result = service.moveForward(pos, dir);

      expect(result.toString()).toEqual('3-3');
    });

    it('should move the rover forward to EAST at maximus grid limit', () => {
      const pos = new Coordinates(gridLimit, gridLimit);
      const dir = DIRECTIONS.EAST;
      const result = service.moveForward(pos, dir);

      expect(result.toString()).toEqual(`0-${gridLimit}`);
    });

    it('should move the rover forward to NORTH into the grid', () => {
      const pos = new Coordinates(2, 3);
      const dir = DIRECTIONS.NORTH;
      const result = service.moveForward(pos, dir);

      expect(result.toString()).toEqual('2-2');
    });

    it('should move the rover forward to NORTH at minumis grid limit', () => {
      const pos = new Coordinates(0, 0);
      const dir = DIRECTIONS.NORTH;
      const result = service.moveForward(pos, dir);

      expect(result.toString()).toEqual(`0-${gridLimit}`);
    });

    it('should move the rover forward to SOUTH into the grid', () => {
      const pos = new Coordinates(2, 3);
      const dir = DIRECTIONS.SOUTH;
      const result = service.moveForward(pos, dir);

      expect(result.toString()).toEqual('2-4');
    });

    it('should move the rover forward to SOUTH at maximus grid limit', () => {
      const pos = new Coordinates(gridLimit, gridLimit);
      const dir = DIRECTIONS.SOUTH;
      const result = service.moveForward(pos, dir);

      expect(result.toString()).toEqual(`${gridLimit}-0`);
    });

    it('should move the rover forward to WEST into the grid', () => {
      const pos = new Coordinates(2, 3);
      const dir = DIRECTIONS.WEST;
      const result = service.moveForward(pos, dir);

      expect(result.toString()).toEqual('1-3');
    });

    it('should move the rover forward to WEST at minumis grid limit', () => {
      const pos = new Coordinates(0, 0);
      const dir = DIRECTIONS.WEST;
      const result = service.moveForward(pos, dir);

      expect(result.toString()).toEqual(`${gridLimit}-0`);
    });
  });
});
