import { PI2_0 } from './helpers/mathconst';

export class Angle {
    public angle: number
    public sin: number
    public cos: number
    public tg: number
    public ctg: number
    public dx: number
    public dy: number

    constructor(angle: number) {
        this.angle = Angle.normalizeangle(angle)
        this.sin = Math.sin(angle)
        this.cos = Math.cos(angle)
        this.tg = this.sin / this.cos
        this.ctg = this.cos / this.sin
        this.dx = this.cos > 0 ? 1 : 0
        this.dy = this.sin > 0 ? 1 : 0
    }

    public static normalizeangle(angle: number) {
        if(angle < 0) angle += PI2_0
        if(angle > PI2_0) angle -= PI2_0
        return angle
    }
}