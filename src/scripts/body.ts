import { Angle } from './angle';
import { IPoint } from './ipoint';
export class Body {
    constructor(
        public position: IPoint,
        public facing: Angle,
        public type: number
    ) {
    }
}