import { Angle } from './angle';
import { IPoint } from './ipoint';
export class Sprite implements IPoint {

    public angle: number
    public start: number = -1
    public starttexture: number
    public end: number
    public endtexture: number
    public distance: number

    constructor(
        public x: number,
        public y: number,
        public image: HTMLImageElement
    ) {
    }
}