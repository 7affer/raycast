import { IPoint } from '../ipoint';
export class DistanceCalc {
    public static distance(a: IPoint, b: IPoint) {
        return Math.sqrt(
            (a.x - b.x) * (a.x - b.x) +
            (a.y - b.y) * (a.y - b.y)
        )
    }

    public static mdistance(a:IPoint, b:IPoint) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
    }
}