import { Injectable } from '@angular/core';

import { Coordinates, CoordinatesTupla, PosX, PosY } from '../model/coords.model';

@Injectable({
  providedIn: 'root',
})
export class CoordinatesService {
  #separator = '-';

  toString(x: PosX, y: PosY): Coordinates {
    this.axisTyoeOfGuard(x, y);
    const result = [x, y].join(this.#separator);
    // TODO verificare il formato della stringa generata;

    return result;
  }

  toAxis(pos: Coordinates): CoordinatesTupla {
    // TODO verificare il formato della stringa in ingresso;
    const [x, y] = pos.split(this.#separator);
    const result = [Number(x), Number(y)];

    this.axisTyoeOfGuard(result[0], result[1]);

    return [Number(x), Number(y)];
  }

  axisTyoeOfGuard(x: PosX, y: PosY) {
    const numberValidator = [x, y].every(v => typeof v === 'number');

    if (numberValidator === false) {
      throw new Error(`Invalid format of coordinates (${x}, ${y})`);
    }
  }
}
