import { PosX, PosY, StringCoordinates } from '../model/coords.model';

function axisTypeOfGuard(x: PosX, y: PosY) {
  const numberValidator = [x, y].every(v => typeof v === 'number');

  if (numberValidator === false) {
    throw new Error(`Invalid format of coordinates (${x}, ${y})`);
  }
}

export const COORDINATES_SEPARATOR = '-' as const;

export class Coordinates {
  constructor(
    public x: PosX,
    public y: PosY
  ) {}

  toString(): StringCoordinates {
    const result = [this.x, this.y].join(COORDINATES_SEPARATOR);
    // TODO verificare il formato della stringa generata;

    return result;
  }

  setX(value: PosX) {
    return new Coordinates(value, this.y);
  }

  setY(value: PosY) {
    return new Coordinates(this.x, value);
  }

  static create(pos: StringCoordinates): Coordinates {
    const [x, y] = pos.split(COORDINATES_SEPARATOR).map(value => Number(value));

    axisTypeOfGuard(x, y);

    return new Coordinates(x, y);
  }
}
