import {AssetLoader} from './assetloader';
import {ISceneEvents} from './isceneevents';
import {ISettings} from './isettings';
import {Map} from './map';
import {Player} from './player';
import {Controls} from './controls';
import {Ray} from './ray';
import {DistanceCalc} from './distancecalc';

export class Scene {

    private lastrender: number
    private height2: number
    private wallheight: number

    constructor(
        private ctx: CanvasRenderingContext2D,
        private map: Map,
        private player: Player,
        private controls: Controls,
        private settings: ISettings,
        private events: ISceneEvents,
        private assets: AssetLoader
    ) {
        this.lastrender = Date.now()
        this.height2 = Math.floor(settings.height / 2)
        this.wallheight = Math.floor(settings.height * 0.8)
    }

    private renderbackground() {
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillRect(0, 0, this.settings.width, this.settings.height)
        this.ctx.fillStyle = '#000000'
        this.ctx.fillRect(0, this.height2, this.settings.width, this.height2)
    }

    private renderwall(
        row: number, 
        distancecorrected: number, 
        image: HTMLImageElement, 
        textureposition: number
    ) {
        let height = Math.ceil(this.wallheight / distancecorrected)
        let top = Math.floor(this.height2 - height / 2)
        let texleft = Math.floor(textureposition * image.width)
        this.ctx.drawImage(image, texleft, 0, 1, image.height, row, top, 1, height)
        this.ctx.beginPath()
        this.ctx.moveTo(row, top)
        this.ctx.lineTo(row, this.settings.height - top)
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = '#000000'
        this.ctx.globalAlpha = distancecorrected / this.settings.drawingdistance
        this.ctx.stroke()
        this.ctx.globalAlpha = 1
    }

    public renderframe() {
        let now = Date.now()
        let delta = now - this.lastrender
        this.lastrender = now
        this.events.renderfps(Math.floor(1000 / delta))
        this.renderbackground()
        this.player.getcontrols(this.controls, this.map, delta)

        var rays = this.player.getrays(this.settings.width)
        for (let r = 0; r < rays.length; r++) {
            let colisions = Ray.cast(this.map, this.player.position, null, null, rays[r], this.settings.drawingdistance)
            for (let c = 0; c < colisions.length; c++) {
                if (colisions[c].type > 0) {
                    let modx = colisions[c].point.x - Math.floor(colisions[c].point.x) 
                    let mody = colisions[c].point.y - Math.floor(colisions[c].point.y)
                    let textureposition = Math.abs(modx > mody ? modx : mody)
                    let distance = DistanceCalc.getdistance(this.player.position, colisions[c].point)
                    let distancecorrected = distance * Math.cos(this.player.facing.angle - rays[r].angle)
                    this.renderwall(r, distancecorrected, this.assets.walls[colisions[c].type - 1], textureposition)
                    break
                }
            }
        }
    }
}