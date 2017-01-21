import { PI0_5, PI1_5, PI2_0 } from './mathconst';
import { Sprite } from './sprite';
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

export class Scene {

    private lastrender: number
    private height2: number
    private wallheight: number

    constructor(
        private ctx: CanvasRenderingContext2D,
        private settings: ISettings,
        private assets: AssetLoader
    ) {
        this.lastrender = Date.now()
        this.height2 = Math.floor(settings.height / 2)
        this.wallheight = Math.floor(settings.height * 0.8)
    }

    private renderbackground(player: Player) {
        let image = this.assets.skyline[0]
        let PI4 = 4 * Math.PI
        let sleft = ((PI2_0 - (player.facing.angle + player.fov / 2)) / PI4) * image.width
        sleft = Math.abs(sleft)
        sleft = Math.floor(sleft)
        let swidth = Math.floor((image.width * player.fov) / PI4)
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
        let height = Math.ceil(this.wallheight / distance)
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
            this.ctx.globalAlpha = Math.min(distance,shadowdistance) / shadowdistance
            this.ctx.stroke()
            this.ctx.globalAlpha = 1
        }
    }

    private drawwall(left: number, distance: number, wall: Colision, player: Player) {
        let modx = wall.point.x - Math.floor(wall.point.x)
        let mody = wall.point.y - Math.floor(wall.point.y)
        let textureposition = Math.abs(modx > mody ? modx : mody)
        if (distance < 3) {
            this.renderwall(left, distance, this.assets.walls[wall.type - 1], textureposition)
        } else if (distance < 8) {
            this.renderwall(left, distance, this.assets.walls[wall.type - 1 + 5], textureposition)
        } else {
            this.renderwall(left, distance, this.assets.walls[wall.type - 1 + 10], textureposition)
        }
    }

    private drawobject(object: Sprite) {
        let wallheight = Math.ceil(this.wallheight / object.distance)
        let bottom = Math.floor(this.height2 + wallheight / 2)
        let image = this.assets.sprites[object.type]
        let texleft = Math.floor(object.starttexture * image.width)
        let texright = Math.floor(object.endtexture * image.width)
        let height = Math.floor(wallheight * 0.4)
        let swidth = Math.max(1, texright - texleft)
        let top = bottom - height
        let width = Math.max(1, object.end - object.start)
        this.ctx.drawImage(image, texleft, 0, swidth, image.height, object.start, top, width, height)
    }

    private drawfloor(left: number, distance: number, bottom: number, useback: boolean) {
        let height = Math.ceil(this.wallheight / distance)
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

    public renderframe(delta: number, map: Map, player: Player, objects: Array<Sprite>) {
        this.renderbackground(player)
        let rays = player.getrays(this.settings.width)
        let drawfloor = (Math.floor(player.position.x) + Math.floor(player.position.y)) % 2 == 0

        for (let r = 0; r < rays.length; r++) {
            let bottom = this.settings.height
            let drawfloorray = drawfloor
            let walldistance: number
            let cos = Math.cos(player.facing.angle - rays[r].angle)
            let colisions = Ray.cast(map, player.position, null, null, rays[r], this.settings.drawingdistance)

            for (let colision of colisions) {
                let distance = DistanceCalc.getdistance(player.position, colision.point) * cos
                if (colision.type > 0) {
                    walldistance = distance
                    this.drawwall(r, distance, colision, player)
                }
                bottom = this.drawfloor(r, distance, bottom, drawfloorray)
                drawfloorray = !drawfloorray
            }

            for (let object of objects) {
                object.distance = DistanceCalc.getdistance(player.position, object.position)
                if (object.distance < this.settings.drawingdistance && object.distance < walldistance) {
                    if (object.distance < 0.25) object.distance = 0.25
                    if (rays[r].angle > PI1_5) rays[r].angle -= PI2_0
                    if (object.angle > PI1_5) object.angle -= PI2_0
                    let diff = (rays[r].angle - object.angle) / (2 * Math.atan2(0.05, object.distance))
                    if (Math.abs(diff) <= 1) {
                        diff = Math.abs((diff - 1) * 0.5)
                        if (object.start < 0) {
                            object.start = r
                            object.starttexture = diff
                        }
                        object.end = r
                        object.endtexture = diff
                    }
                }
            }
        }

        for (let object of objects) {
            if (object.start >= 0) this.drawobject(object)
            object.start = -1
        }
    }
}