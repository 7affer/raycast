import { ISettings } from '../isettings';
import { AssetLoader } from '../assetloader';
export class BloodRenderer {

    private frame: number = 0
    private framelength: number = 500
    private framemax: number = 3
    private state: number = 0
    private lasttick: number = 0
    private image: number = 0

    private left: number

    public constructor(private loader: AssetLoader, private settings: ISettings) {

    }

    public render(ctx: CanvasRenderingContext2D) {
        if (this.state == 1) {
            this.setframe()
            let bloodimage = this.loader.blood[this.image]
            let top = Math.floor(this.settings.height * 0.1)
            let ratio = bloodimage.width / bloodimage.height
            let height = Math.floor(this.settings.height - top)
            let width = Math.floor(height * ratio)
            ctx.drawImage(bloodimage, 0, 0, bloodimage.width, bloodimage.height, this.left, top, width, height)
        }
    }

    public splash() {
        this.left = Math.floor(this.settings.width * (Math.random() * 0.5))
        this.state = 1
        this.image = Math.floor(Math.random() * 3)
        this.frame = 0
    }

    private setframe() {
        if (this.state == 1) {
            let tick = (new Date()).getTime()
            if (tick > this.lasttick) {
                if (this.frame < this.framemax) this.frame++
                else {
                    this.frame = 0
                    this.state = 0
                }
                this.lasttick = tick + this.framelength
            }
        }
    }
}