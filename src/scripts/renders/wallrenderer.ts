import {Colision} from '../colision';
import { PI2_0, PI4_0 } from '../helpers/mathconst';
import { ISettings } from '../isettings';
import { AssetLoader } from '../assetloader';
import { Angle } from '../angle';

export class WallRenderer {

    public constructor(
        private loader: AssetLoader,
        private settings: ISettings
    ) {

    }

    public render(
        ctx: CanvasRenderingContext2D,
        left: number,
        distance: number,
        wall: Colision
    ) {
        let modx = wall.x - Math.floor(wall.x)
        let mody = wall.y - Math.floor(wall.y)
        let textureposition = Math.abs(modx > mody ? modx : mody)
        let image = this.getwallimage(wall.type, distance)
        let height = Math.ceil(this.settings.wallheight / distance)
        let top = Math.floor(this.settings.height2 - height / 2)
        let texleft = Math.floor(textureposition * image.width)
        let shadowdistance = this.settings.drawingdistance * 0.7
        ctx.drawImage(image, texleft, 0, 1, image.height, left, top, 1, height)
        if (left % 3 == 0) {
            ctx.beginPath()
            ctx.moveTo(left, top)
            ctx.lineTo(left, this.settings.height - top)
            ctx.lineWidth = 4
            ctx.strokeStyle = '#000000'
            ctx.fillStyle = '#000000'
            ctx.globalAlpha = Math.min(distance, shadowdistance) / shadowdistance
            ctx.stroke()
            ctx.globalAlpha = 1
        }
    }

    private getwallimage(type: number, distance: number) {
        if (distance < 3) {
            return this.loader.walls[type - 1]
        } else if (distance < 8) {
            return this.loader.walls[type - 1 + 5]
        }
        return this.loader.walls[type - 1 + 10]
    }

}