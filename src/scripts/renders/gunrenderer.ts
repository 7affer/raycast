import { ISettings } from '../isettings';
import { AssetLoader } from '../assetloader';
export class GunRenderer {

    private frame: number = 0
    private framelength: number = 100
    private framemax: number
    private state: number = 0
    private lasttick: number = 0

    private left: number
    private top: number
    private height: number
    private width: number
    private ratio: number

    public constructor(private loader: AssetLoader, private settings: ISettings) {
        this.framemax = loader.gun.length - 1
        this.left = Math.floor(this.settings.width * 0.50)
        this.top = Math.floor(this.settings.height * 0.55)
        this.ratio = loader.gun[0].width / loader.gun[0].height
        this.height = Math.floor(this.settings.height - this.top)
        this.width = Math.floor(this.height * this.ratio)
    }

    public render(ctx: CanvasRenderingContext2D) {
        this.setframe()
        let gunimage = this.getimage()

        ctx.drawImage(gunimage, 0, 0, gunimage.width, gunimage.height, this.left, this.top, this.width, this.height)
    }

    private getimage() {
        return this.loader.gun[this.frame]
    }

    public shoot() {
        this.state = 1
    }

    private setframe() {
        if (this.state == 1) {
            let tick = (new Date()).getTime()
            if (tick > this.lasttick) {
                if (this.frame < this.framemax - 1) this.frame++
                else {
                    this.frame = 0
                    this.state = 0
                }
                this.lasttick = tick + this.framelength
            }
        }
    }
}