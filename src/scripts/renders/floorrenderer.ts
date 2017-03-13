import {Colision} from '../colision';
import { PI2_0, PI4_0 } from '../helpers/mathconst';
import { ISettings } from '../isettings';
import { AssetLoader } from '../assetloader';
import { Angle } from '../angle';

export class FloorRenderer {

    public constructor(
        private loader: AssetLoader,
        private settings: ISettings
    ) {

    }

    public render(ctx: CanvasRenderingContext2D, left: number, distance: number, bottom: number, useback: boolean) {
        let height = Math.ceil(this.settings.wallheight / distance)
        let newbottom = Math.floor(this.settings.height - (this.settings.height2 - height / 2))
        if (useback && left % 3 == 0) {
            ctx.beginPath()
            ctx.moveTo(left, bottom)
            ctx.lineTo(left, newbottom)
            ctx.lineWidth = 3
            ctx.strokeStyle = this.settings.floorcolor2
            ctx.stroke()
        }
        return newbottom
    }
}