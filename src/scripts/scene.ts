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

export class Scene {

    private lastrender: number
    private height2: number
    private backgroundrenderer: BackgroundRenderer
    private skipobjectdetectionrays: number = 5

    constructor(
        private ctx: CanvasRenderingContext2D,
        private settings: ISettings,
        private assets: AssetLoader
    ) {
        this.lastrender = Date.now()
        this.height2 = Math.floor(settings.height / 2)
        this.backgroundrenderer = new BackgroundRenderer(assets, settings)
    }

    private renderwall(
        row: number,
        distance: number,
        image: HTMLImageElement,
        textureposition: number
    ) {
        let height = Math.ceil(this.settings.wallheight / distance)
        let top = Math.floor(this.height2 - height / 2)
        let texleft = Math.floor(textureposition * image.width)
        let shadowdistance = this.settings.drawingdistance * 0.7
        this.ctx.drawImage(image, texleft, 0, 1, image.height, row, top, 1, height)
        if (row % 3 == 0) {
            this.ctx.beginPath()
            this.ctx.moveTo(row, top)
            this.ctx.lineTo(row, this.settings.height - top)
            this.ctx.lineWidth = 4
            this.ctx.strokeStyle = '#000000'
            this.ctx.fillStyle = '#000000'
            this.ctx.globalAlpha = Math.min(distance, shadowdistance) / shadowdistance
            this.ctx.stroke()
            this.ctx.globalAlpha = 1
        }
    }

    private drawwall(left: number, distance: number, wall: Colision, player: Player) {
        let modx = wall.x - Math.floor(wall.x)
        let mody = wall.y - Math.floor(wall.y)
        let textureposition = Math.abs(modx > mody ? modx : mody)
        if (distance < 3) {
            this.renderwall(left, distance, this.assets.walls[wall.type - 1], textureposition)
        } else if (distance < 8) {
            this.renderwall(left, distance, this.assets.walls[wall.type - 1 + 5], textureposition)
        } else {
            this.renderwall(left, distance, this.assets.walls[wall.type - 1 + 10], textureposition)
        }
    }

    private drawfloor(left: number, distance: number, bottom: number, useback: boolean) {
        let height = Math.ceil(this.settings.wallheight / distance)
        let newbottom = Math.floor(this.settings.height - (this.height2 - height / 2))
        if (useback && left % 3 == 0) {
            this.ctx.beginPath()
            this.ctx.moveTo(left, bottom)
            this.ctx.lineTo(left, newbottom)
            this.ctx.lineWidth = 3
            this.ctx.strokeStyle = this.settings.floorcolor2
            this.ctx.stroke()
        }
        return newbottom
    }

    private filterobjectsinrange(player: Player, sprites: Array<ISprite>) {
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
            if(anglediff < -Math.PI) anglediff += PI2_0 
            if(anglediff > Math.PI) anglediff -= PI2_0

            if(anglediff < this.settings.fov){
                object.distance = DistanceCalc.distance(player, object)
                if (object.distance < this.settings.drawingdistance && object.distance < nearestwalldistance) {
                    if (object.distance < 0.20) object.distance = 0.20
                    let diff = anglediff / Math.atan2(object.anglewidth, object.distance)
                    if (Math.abs(diff) <= 1) {
                        diff = Math.abs((diff - 1))
                        if (object.left < 0) {
                            object.left = left
                            object.starttexture = diff
                        }
                        object.width += this.skipobjectdetectionrays
                        object.endtexture = diff
                        objecttodraw.push(object)
                    }
                }
            }
        }
        return objecttodraw
    }

    public renderframe(delta: number, map: Map, player: Player, fov: number) {
        
        this.backgroundrenderer.render(this.ctx, player.facing.angle, this.settings.fov)
        let objectsinrange = this.filterobjectsinrange(player, map.sprites)
        Sort.quickSort(objectsinrange, 0, objectsinrange.length - 1, (a,b) => a.distance > b.distance)
        let rays = player.getrays(this.settings.width, this.settings.fov)
        let drawfloor = (Math.floor(player.x) + Math.floor(player.y)) % 2 == 0

        for (let r = 0; r < rays.length; r++) {
            let bottom = this.settings.height
            let drawfloorray = drawfloor
            let walldistance: number
            let cos = Math.cos(player.facing.angle - rays[r].angle)
            let colisions = Ray.cast(map, player, null, null, rays[r], this.settings.drawingdistance)

            for (let colision of colisions) {
                let distance = DistanceCalc.distance(player, colision) * cos
                if (colision.type > 0) {
                    walldistance = distance
                    this.drawwall(r, distance, colision, player)
                }
                bottom = this.drawfloor(r, distance, bottom, drawfloorray)
                drawfloorray = !drawfloorray
            }

            if(r % this.skipobjectdetectionrays == 0) {
                this.getobjectstodraw(player, objectsinrange, rays[r].angle, r, walldistance)
            }
        }

        for (let object of objectsinrange) {
            if (object.left >= 0) object.render(this.ctx)
            object.left = -1
            object.width = 0
        }
    }
}