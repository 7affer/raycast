import { PI0_5, PI1_5, PI2_0, PI4_0 } from './helpers/mathconst';
import { DistanceCalc } from './helpers/distancecalc';
import { IPoint } from './ipoint';
import { Angle } from './angle';
import { Colision } from './colision';
import { AssetLoader } from './assetloader';
import { ISettings } from './isettings';
import { Map } from './map';
import { Player } from './player';
import { Controls } from './controls';
import { Ray } from './ray';
import { ISprite } from "./sprites/isprite";
import { BackgroundRenderer } from "./renders/backgroundrenderer";
import { Sort } from "./helpers/quicksort";
import { WallRenderer } from "./renders/wallrenderer";
import { FloorRenderer } from "./renders/floorrenderer";
import { GunRenderer } from "./renders/gunrenderer";
import { BloodRenderer } from "./renders/bloodrenderer";

export class Scene {

    private lastrender: number
    private backgroundrenderer: BackgroundRenderer
    private wallrenderer: WallRenderer
    private floorrenderer: FloorRenderer
    private gunrenderer: GunRenderer
    private bloodrenderer: BloodRenderer
    private skipobjectdetectionrays: number = 5

    constructor(
        private ctx: CanvasRenderingContext2D,
        private ctxhud: CanvasRenderingContext2D,
        private settings: ISettings,
        private loader: AssetLoader,
        private player: Player
    ) {
        this.lastrender = Date.now()
        this.backgroundrenderer = new BackgroundRenderer(loader, settings)
        this.wallrenderer = new WallRenderer(loader, settings)
        this.floorrenderer = new FloorRenderer(loader, settings)
        this.gunrenderer = new GunRenderer(loader, settings)
        this.bloodrenderer = new BloodRenderer(loader, settings)
        this.player.gunrenderer = this.gunrenderer
    }

    private drawhud() {
        this.ctxhud.clearRect(0,0, this.settings.width, this.settings.height)
        this.bloodrenderer.render(this.ctxhud)
        this.gunrenderer.render(this.ctxhud)
    }

    private getobjectsinrange(player: Player, sprites: Array<ISprite>) {
        let objectsinrange = new Array<ISprite>()
        for (let i = 0; i < sprites.length; i++) {
            if (DistanceCalc.mdistance(player, sprites[i]) < this.settings.drawingdistance) {
                objectsinrange.push(sprites[i])
            }
        }
        return objectsinrange
    }

    private getobjectstodraw(player: Player, sprites: Array<ISprite>, rayangle: number, left: number, nearestwalldistance: number) {
        let objecttodraw = new Array<ISprite>()
        for (let object of sprites) {
            var sprite_player_angle = Math.atan2(object.y - player.y, object.x - player.x)

            let anglediff = rayangle - sprite_player_angle
            if (anglediff < -Math.PI) anglediff += PI2_0
            if (anglediff > Math.PI) anglediff -= PI2_0


            object.distance = DistanceCalc.distance(player, object)
            if (object.distance < this.settings.drawingdistance && object.distance < nearestwalldistance) {
                if (object.distance < 0.20) object.distance = 0.20
                let diff = anglediff / Math.atan2(object.anglewidth, object.distance)
                if (Math.abs(diff) <= 0.5) {
                    diff = Math.abs((diff - 0.5))
                    if (object.left < 0) {
                        object.left = left
                        object.starttexture = diff
                    }
                    object.width += this.skipobjectdetectionrays
                    object.endtexture = diff
                    objecttodraw.push(object)
                    object.settarget(left, this.settings.width)
                }
            }

        }
        return objecttodraw
    }

    public renderframe(delta: number, map: Map, fov: number) {

        this.backgroundrenderer.render(this.ctx, this.player.facing.angle, this.settings.fov)
        let objectsinrange = this.getobjectsinrange(this.player, map.sprites)
        Sort.quickSort(objectsinrange, 0, objectsinrange.length - 1, (a, b) => a.distance > b.distance)
        let rays = this.player.getrays(this.settings.width, this.settings.fov)
        let drawfloor = (Math.floor(this.player.x) + Math.floor(this.player.y)) % 2 == 0

        for (let r = 0; r < rays.length; r++) {
            let bottom = this.settings.height
            let drawfloorray = drawfloor
            let walldistance: number
            let cos = Math.cos(this.player.facing.angle - rays[r].angle)
            let colisions = Ray.cast(map, this.player, null, null, rays[r], this.settings.drawingdistance)

            for (let colision of colisions) {
                let distance = DistanceCalc.distance(this.player, colision) * cos
                if (colision.type > 0) {
                    walldistance = distance
                    this.wallrenderer.render(this.ctx, r, distance, colision)
                }
                bottom = this.floorrenderer.render(this.ctx, r, distance, bottom, drawfloorray)
                drawfloorray = !drawfloorray
            }

            if (r % this.skipobjectdetectionrays == 0) {
                this.getobjectstodraw(this.player, objectsinrange, rays[r].angle, r, walldistance)
            }
        }

        for (let object of objectsinrange) {
            if (object.left >= 0) object.render(this.ctx)
            object.ifshoot(this.player.fired, () => this.bloodrenderer.splash())
            object.targeted = false
            object.left = -1
            object.width = 0            
            object.move(delta)
        }
        this.player.fired = false

        this.drawhud()
    }
}