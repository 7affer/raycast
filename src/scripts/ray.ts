import {DistanceCalc} from './distancecalc';
import { IManhattanDist } from './imanhattandist';
import { IPoint } from './ipoint';
import { Colision } from './colision';
import { PI0_5, PI1_0, PI1_5 } from './mathconst'
import { Angle } from './angle';
import { Map } from './map';

export class Ray {

    public static cast(
        map: Map,
        origin: IPoint,
        nexth: IPoint,
        nextv: IPoint,
        facing: Angle,
        maxdistance: number
    ): Colision[] {

        if (maxdistance < 1) return []

        let h = nexth || Ray.nearesty(origin, facing)
        let v = nextv || Ray.nearestx(origin, facing)
        let distanceh = DistanceCalc.mdistance(origin, h)
        let distancev = DistanceCalc.mdistance(origin, v)

        if (distanceh < distancev) {
            let type = map.getvalue(Math.floor(h.x), h.y - (facing.dy > 0 ? 0 : 1))
            if (type > 0) {
                return [new Colision(h.x, h.y, type)]
            } else {
                return [new Colision(h.x, h.y, type)]
                    .concat(Ray.cast(map, h, null, v, facing, maxdistance - distanceh))
            }
        } else {
            let type = map.getvalue(v.x - (facing.dx > 0 ? 0 : 1), Math.floor(v.y))
            if (type > 0) {
                return [new Colision(v.x, v.y, type)]
            } else {
                return [new Colision(v.x, v.y, type)]
                    .concat(Ray.cast(map, v, h, null, facing, maxdistance - distancev))
            }
        }
    }

    public static nearesty(origin: IPoint, facing: Angle): IPoint {
        let nexty = Math.floor(origin.y + facing.dy)
        if (nexty == origin.y) nexty -= 1
        let dy = nexty - origin.y
        let dx = facing.ctg * dy
        return {
            x: dx + origin.x,
            y: nexty
        }
    }

    public static nearestx(origin: IPoint, facing: Angle): IPoint {
        let nextx = Math.floor(origin.x + facing.dx)
        if (nextx == origin.x) nextx -= 1
        let dx = nextx - origin.x
        let dy = facing.tg * dx
        return {
            x: nextx,
            y: dy + origin.y
        }
    }
}