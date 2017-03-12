import { PI2_0, PI4_0 } from '../helpers/mathconst';
import {ISettings} from '../isettings';
import {AssetLoader} from '../assetloader';
import {Angle} from '../angle';

export class BackgroundRenderer {

    public constructor(
        private loader: AssetLoader,
        private settings: ISettings
    ) {
        
    }

    public render(ctx: CanvasRenderingContext2D, facingangle: number) {
        let image = this.loader.skyline[0]
        let sourceleft = Math.floor((image.width * (PI2_0 - facingangle)) / PI4_0)
        let sourcewidth = Math.floor(image.width / 2)
        ctx.drawImage(image, sourceleft, 0, sourcewidth, image.height, 0, 0, this.settings.width, this.settings.height2)
        ctx.fillStyle = this.settings.floorcolor1
        ctx.fillRect(0, this.settings.height2, this.settings.width, this.settings.height)

        console.log(`${facingangle} ${image.width / 2} ${sourceleft}`)
    }

}