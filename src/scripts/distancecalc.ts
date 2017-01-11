import { IPoint } from './ipoint';
export class DistanceCalc {
    public static getdistance(a: IPoint, b: IPoint) {
        return Math.sqrt(
            (a.x - b.x) * (a.x - b.x) +
            (a.y - b.y) * (a.y - b.y)
        )
    }
}