import { AssetLoader } from './assetloader';
import { Mixer } from './sounds/mixer';
import { PI0_5 } from './helpers/mathconst';
import { Map } from './map';
import { Controls } from './controls';
import { IPoint } from './ipoint';
import { Angle } from './angle';
import { GunRenderer } from "./renders/gunrenderer";

export class Player implements IPoint {

    private mixer: Mixer
    private guncooldown = 0
    public fired: boolean = false
    public gunrenderer: GunRenderer

    constructor(
        public x: number,
        public y: number,
        public facing: Angle,
        private loader: AssetLoader
    ) {
        if (loader != null) this.mixer = new Mixer(loader)
    }

    public getrays(columns: number, fov: number) {
        var step = fov / columns
        var angle = this.facing.angle + fov / 2
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
            this.fired = true
            this.mixer.playsound(0)
            this.guncooldown = time + 750
            this.gunrenderer.shoot()
        }
    }

    public rotateleft(delta: number, movement: number) {
        this.facing = new Angle(this.facing.angle + Math.PI * movement * delta / 1200)
    }

    public rotateright(delta: number, movement: number) {
        this.facing = new Angle(this.facing.angle - Math.PI * movement * delta / 1200)
    }

    private correctposition(map: Map, newposition: IPoint) {
        if (map.getvalue(Math.floor(newposition.x), Math.floor(this.y)) > 0) {
            newposition.x = this.x
        }
        if (map.getvalue(Math.floor(this.x), Math.floor(newposition.y)) > 0) {
            newposition.y = this.y
        }
        this.x = newposition.x
        this.y = newposition.y
    }

    public moveforward(delta: number, map: Map, run: boolean) {
        let position = {
            x: this.x + this.facing.cos * delta / (run ? 250 : 500),
            y: this.y + this.facing.sin * delta / (run ? 250 : 500)
        }
        this.correctposition(map, position)
    }

    public movebackward(delta: number, map: Map) {
        this.correctposition(map, {
            x: this.x - this.facing.cos * delta / 500,
            y: this.y - this.facing.sin * delta / 500
        })
    }

    public strafeleft(delta: number, map: Map, run: boolean) {
        let newfacing = new Angle(this.facing.angle - PI0_5)
        this.correctposition(map, {
            x: this.x + newfacing.cos * delta / (run ? 250 : 500),
            y: this.y + newfacing.sin * delta / (run ? 250 : 500)
        })
    }

    public straferight(delta: number, map: Map, run: boolean) {
        let newfacing = new Angle(this.facing.angle + PI0_5)
        this.correctposition(map, {
            x: this.x + newfacing.cos * delta / (run ? 250 : 500),
            y: this.y + newfacing.sin * delta / (run ? 250 : 500)
        })
    }

    public initonmap(map: Map) {
        while (map.getvalue(Math.floor(this.x), Math.floor(this.y)) > 0) {
            this.x += 1
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