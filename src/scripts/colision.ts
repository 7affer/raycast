import {IPoint} from './ipoint';
export class Colision implements IPoint {
    constructor(
        public x: number,
        public y: number,
        public type: number
    ) {
    }
}