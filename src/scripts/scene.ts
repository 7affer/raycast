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

    private renderbackground() {
        var grdceiling = this.ctx.createLinearGradient(0, 0, 0, this.height2);
        grdceiling.addColorStop(0, '#aaaaaa');
        grdceiling.addColorStop(1, '#222222');
        this.ctx.fillStyle = grdceiling;
        this.ctx.fillRect(0, 0, this.settings.width, this.height2)
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
        this.ctx.drawImage(image, texleft, 0, 1, image.height, row, top, 1, height)
        if (row % 3 == 0) {
            this.ctx.beginPath()
            this.ctx.moveTo(row, top)
            this.ctx.lineTo(row, this.settings.height - top)
            this.ctx.lineWidth = 4
            this.ctx.strokeStyle = '#000000'
            this.ctx.fillStyle = '#000000'
            this.ctx.globalAlpha = (distance / this.settings.drawingdistance) * 0.8
            this.ctx.stroke()
            this.ctx.closePath()
            this.ctx.globalAlpha = 1
        }
    }

    private drawwall(left: number, distance: number, wall: Colision, player: Player) {
        let modx = wall.point.x - Math.floor(wall.point.x)
        let mody = wall.point.y - Math.floor(wall.point.y)
        let textureposition = Math.abs(modx > mody ? modx : mody)
        this.renderwall(left, distance, this.assets.walls[wall.type - 1], textureposition)
    }

    private drawobject(left: number, distance: number, object: Sprite, textureposition: number) {
        let wallheight = Math.ceil(this.wallheight / distance)
        let bottom = Math.floor(this.height2 + wallheight / 2)
        let image = this.assets.sprites[object.type]
        let texleft = Math.floor(textureposition * image.width)
        let height = wallheight * 0.4
        this.ctx.drawImage(image, texleft, 0, 1, image.height, left, bottom - height, 1, height)
    }

    private drawfloor(left: number, distance: number, bottom: number, useback: boolean) {
        let height = Math.ceil(this.wallheight / distance)
        let newbottom = Math.floor(this.settings.height - (this.height2 - height / 2))
        if (useback && left % 3 == 0) {
            this.ctx.beginPath()
            this.ctx.moveTo(left, bottom)
            this.ctx.lineTo(left, newbottom)
            this.ctx.lineWidth = 1
            this.ctx.strokeStyle = this.settings.floorcolor2
            this.ctx.strokeStyle = '#fff'
            this.ctx.globalAlpha = 0.2
            this.ctx.stroke()
            this.ctx.closePath()
            this.ctx.globalAlpha = 1
        }
        return newbottom
    }

    public renderframe(delta: number, map: Map, player: Player, objects: Array<Sprite>) {
        this.renderbackground()
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
                let distance = DistanceCalc.getdistance(player.position, object.position)
                if (distance < this.settings.drawingdistance) {
                    if (distance < 0.25) distance = 0.25
                    let mdiff = Math.atan2(0.1, distance)
                    let diff = (rays[r].angle - object.angle) / (2 * mdiff) + 0.5
                    if (distance < walldistance && diff <= 1) {
                        this.drawobject(r, distance, object, diff)
                    }
                }
            }
        }
    }
}