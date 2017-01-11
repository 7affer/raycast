import { IManhattanDist } from './imanhattandist';
import { IPoint } from './ipoint';
import { Colision } from './colision';
import { PI0_5, PI1_0, PI1_5 } from './mathconst'
import { Angle } from './angle';
import { Map } from './map';

export class Ray {

    public static nearesty(origin: IPoint, facing: Angle): IManhattanDist {
        let nexty = Math.floor(origin.y+ facing.dy) 
        if (nexty == origin.y) nexty -= 1
        let dy = nexty - origin.y
        let dx = facing.ctg * dy
        return {
            x: dx + origin.x,
            y: nexty,
            manhattandistance: Math.abs(dx) + Math.abs(dy)
        }
    }

    public static nearestx(origin: IPoint, facing: Angle): IManhattanDist {
        let nextx = Math.floor(origin.x+ facing.dx) 
        if (nextx == origin.x) nextx -= 1
        let dx = nextx - origin.x
        let dy = facing.tg * dx
        return {
            x: nextx,
            y: dy + origin.y,
            manhattandistance: Math.abs(dx) + Math.abs(dy)
        }
    }

    public static cast(
        map: Map,
        origin: IPoint,
        nexth: IManhattanDist,
        nextv: IManhattanDist,
        facing: Angle,
        maxdistance: number
    ): Colision[] {

        if (maxdistance < 1) return []

        let h = nexth || Ray.nearesty(origin, facing)
        let v = nextv || Ray.nearestx(origin, facing)

        if (h.manhattandistance < v.manhattandistance) {
            v.manhattandistance -= h.manhattandistance

            return [new Colision(h, map.getvalue(Math.floor(h.x), h.y - (facing.dy > 0 ? 0 : 1)))]
                .concat(Ray.cast(map, h, null, v, facing, maxdistance - h.manhattandistance))
        } else {
            h.manhattandistance -= v.manhattandistance
            return [new Colision(v, map.getvalue(v.x - (facing.dx > 0 ? 0 : 1), Math.floor(v.y)))]
                .concat(Ray.cast(map, v, h, null, facing, maxdistance - v.manhattandistance))
        }
    }
}