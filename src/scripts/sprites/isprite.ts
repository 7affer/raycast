import { Angle } from '../angle';
import { IPoint } from '../ipoint';
export interface ISprite extends IPoint {
    left: number
    width: number
    starttexture: number
    endtexture: number
    distance: number
    x: number
    y: number
    angle: number

    render(ctx:CanvasRenderingContext2D):void
}