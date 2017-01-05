import { Controls } from './controls';
import { IPoint } from './ipoint';
import { Angle } from './angle';

export class Player {

    constructor(
        public position: IPoint,
        public facing: Angle,
        public fov: number) {
    }

    public getrays(columns: number) {
        var step = this.fov / columns
        var angle = this.facing.angle + this.fov / 2
        var rays = new Array<Angle>()
        for (let i = 0; i < columns; i++) {
            rays.push(new Angle(angle))
            angle -= step
        }
        return rays
    }

    public rotateleft(delta: number) {
        this.facing = new Angle(this.facing.angle + Math.PI / delta)
    }

    public rotateright(delta: number) {
        this.facing = new Angle(this.facing.angle - Math.PI / delta)
    }

    public moveforward(delta: number) {
        this.position = {
            x: this.position.x + this.facing.cos / delta,
            y: this.position.y + this.facing.sin / delta
        }
    }

    public movebackward(delta: number) {
        this.position = {
            x: this.position.x - this.facing.cos / delta,
            y: this.position.y - this.facing.sin / delta
        }
    }

    public getcontrols(controls: Controls, delta: number) {
        if (controls.forward) this.moveforward(delta)
        if (controls.backward) this.movebackward(delta)
        if (controls.rotateleft) this.rotateleft(delta)
        if (controls.rotateright) this.rotateright(delta)
    }
}