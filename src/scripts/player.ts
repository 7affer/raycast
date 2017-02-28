import { AssetLoader } from './assetloader';
import { Mixer } from './sounds/mixer';
import { PI0_5 } from './mathconst';
import { Map } from './map';
import { Controls } from './controls';
import { IPoint } from './ipoint';
import { Angle } from './angle';

export class Player {

    private mixer: Mixer
    private guncooldown = 0

    constructor(
        public position: IPoint,
        public facing: Angle,
        public fov: number,
        private loader: AssetLoader
    ) {
        if (loader != null) this.mixer = new Mixer(loader)
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

    public shoot() {
        let time = (new Date()).getTime()
        if (this.guncooldown < time) {
            this.mixer.playsound(0)
            this.guncooldown = time + 750
        }
    }

    public rotateleft(delta: number, movement: number) {
        this.facing = new Angle(this.facing.angle + Math.PI * movement * delta / 1200)
    }

    public rotateright(delta: number, movement: number) {
        this.facing = new Angle(this.facing.angle - Math.PI * movement * delta / 1200)
    }

    private correctposition(map: Map, position: IPoint): IPoint {
        if (map.getvalue(Math.floor(position.x), Math.floor(this.position.y)) > 0) {
            position.x = this.position.x
        }
        if (map.getvalue(Math.floor(this.position.x), Math.floor(position.y)) > 0) {
            position.y = this.position.y
        }
        return position
    }

    public moveforward(delta: number, map: Map, run: boolean) {
        let position = {
            x: this.position.x + this.facing.cos * delta / (run ? 250 : 500),
            y: this.position.y + this.facing.sin * delta / (run ? 250 : 500)
        }
        this.position = this.correctposition(map, position)
    }

    public movebackward(delta: number, map: Map) {
        let position = {
            x: this.position.x - this.facing.cos * delta / 500,
            y: this.position.y - this.facing.sin * delta / 500
        }
        this.position = this.correctposition(map, position)
    }

    public strafeleft(delta: number, map: Map, run: boolean) {
        let newfacing = new Angle(this.facing.angle - PI0_5)
        let position = {
            x: this.position.x + newfacing.cos * delta / (run ? 250 : 500),
            y: this.position.y + newfacing.sin * delta / (run ? 250 : 500)
        }
        this.position = this.correctposition(map, position)
    }

    public straferight(delta: number, map: Map, run: boolean) {
        let newfacing = new Angle(this.facing.angle + PI0_5)
        let position = {
            x: this.position.x + newfacing.cos * delta / (run ? 250 : 500),
            y: this.position.y + newfacing.sin * delta / (run ? 250 : 500)
        }
        this.position = this.correctposition(map, position)
    }

    public initonmap(map: Map) {
        while (map.getvalue(Math.floor(this.position.x), Math.floor(this.position.y)) > 0) {
            this.position.x += 1
        }
    }

    public getcontrols(controls: Controls, map: Map, delta: number) {
        if (controls.forward) this.moveforward(delta, map, controls.run)
        if (controls.backward) this.movebackward(delta, map)
        if (controls.rotateleft) this.rotateleft(delta, 1)
        if (controls.rotateright) this.rotateright(delta, 1)
        if (controls.mouserotateleft) this.rotateleft(delta, controls.mouserotateleft)
        if (controls.mouserotateright) this.rotateright(delta, controls.mouserotateright)
        if (controls.strafeleft) this.strafeleft(delta, map, controls.run)
        if (controls.straferight) this.straferight(delta, map, controls.run)
        if (controls.shoot) {
            this.shoot()
            controls.shoot = false
        }
        controls.resetmouserotate()
    }
}