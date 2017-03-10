import { PI0_5, PI1_5, PI2_0 } from './mathconst';
import { IPoint } from './ipoint';
import { Angle } from './angle';
import { Colision } from './colision';
import { AssetLoader } from './assetloader';
import { ISettings } from './isettings';
import { Map } from './map';
import { Player } from './player';
import { Controls } from './controls';
import { Ray } from './ray';
import { DistanceCalc } from './distancecalc';
import { ISprite } from "./sprites/isprite";

export class Scene {

    private lastrender: number
    private height2: number

    constructor(
        private ctx: CanvasRenderingContext2D,
        private settings: ISettings,
        private assets: AssetLoader
    ) {
        this.lastrender = Date.now()
        this.height2 = Math.floor(settings.height / 2)
    }

    private renderbackground(player: Player, fov: number) {
        let image = this.assets.skyline[0]
        let PI4 = 4 * Math.PI
        let sleft = ((PI2_0 - (player.facing.angle + fov / 2)) / PI4) * image.width
        sleft = Math.abs(sleft)
        sleft = Math.floor(sleft)
        let swidth = Math.floor((image.width * fov) / PI4)
        let height = Math.floor(this.settings.height * 0.5)
        this.ctx.drawImage(image, sleft, 0, swidth, image.height, 0, 0, this.settings.width, height)
        this.ctx.fillStyle = this.settings.floorcolor1
        this.ctx.fillRect(0, this.height2, this.settings.width, this.settings.height)
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
            if (
                Math.abs(player.x - sprites[i].x) < this.settings.drawingdistance &&
                Math.abs(player.y - sprites[i].y) < this.settings.drawingdistance
            ) {
                sprites[i].angle = Angle.normalizeangle(Math.atan2(
                    sprites[i].y - player.y,
                    sprites[i].x - player.x
                ))
                objectsinrange.push(sprites[i])
            }
        }
        return objectsinrange
    }

    private getobjectstodraw(player: Player, sprites: Array<ISprite>, ray: Angle, row: number, walldistance: number) {
        let objecttodraw = new Array<ISprite>()
        for (let object of sprites) {
            object.distance = DistanceCalc.distance(player, object)
            if (object.distance < this.settings.drawingdistance && object.distance < walldistance) {
                if (object.distance < 0.20) object.distance = 0.20
                if (ray.angle > PI1_5) ray.angle -= PI2_0
                if (object.angle > PI1_5) object.angle -= PI2_0
                let diff = (ray.angle - object.angle) / (2 * Math.atan2(0.05, object.distance))
                if (Math.abs(diff) <= 1) {
                    diff = Math.abs((diff - 1) * 0.5)
                    if (object.left < 0) {
                        object.left = row
                        object.starttexture = diff
                    }
                    object.width++
                    object.endtexture = diff
                    objecttodraw.push(object)
                }
            }
        }
        return objecttodraw
    }

    public renderframe(delta: number, map: Map, player: Player, fov: number) {
        this.renderbackground(player, fov)

        let objectsinrange = this.filterobjectsinrange(player, map.sprites)
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

            this.getobjectstodraw(player, objectsinrange, rays[r], r, walldistance)
        }

        for (let object of objectsinrange) {
            if (object.left >= 0) object.render(this.ctx)
            object.left = -1
            object.width = 0
        }
    }
}