import { Angle } from './angle';
import { IPoint } from './ipoint';
export class Sprite {

    public angle: number

    constructor(
        public position: IPoint,
        public type: number
    ) {
    }
}