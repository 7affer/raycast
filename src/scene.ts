import { ISceneEvents } from './isceneevents';
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
        private map: Map,
        private player: Player,
        private controls: Controls,
        private settings: ISettings,
        private events: ISceneEvents
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

    private renderwall(row: number, distancecorrected: number) {
        let height = Math.ceil(this.wallheight / distancecorrected)
        let color = Math.floor(255 - distancecorrected * 10)
        let colorhex = color.toString(16).toLowerCase()
        let top = Math.floor(this.height2 - height / 2)
        this.ctx.beginPath()
        this.ctx.moveTo(row, top)
        this.ctx.lineTo(row, this.settings.height - top)
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = `#${colorhex}${colorhex}${colorhex}`
        this.ctx.stroke()
    }

    public render() {
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
                    let distance = DistanceCalc.getdistance(this.player.position, colisions[c].point)
                    let distancecorrected = distance * Math.cos(this.player.facing.angle - rays[r].angle)
                    this.renderwall(r, distancecorrected)
                    break
                }
            }
        }

        requestAnimationFrame(() => this.render())
    }
}