import { Angle } from './angle';
import { IPoint } from './ipoint';
export class Sprite {
    constructor(
        public position: IPoint,
        public type: number
    ) {
    }
}