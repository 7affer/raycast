import { AssetLoader } from '../assetloader';
import { ISettings } from '../isettings';
import { Angle } from '../angle';
import { ISprite } from './isprite';

export class Zombie implements ISprite {

    public left: number = -1
    public width: number = 0
    public anglewidth: number = 0.35
    public starttexture: number
    public endtexture: number
    public distance: number
    private height2: number
    private maxheight: number
    private frame: 0
    private framemax: number = 9
    private framelength: number = 100
    private dead: boolean = false
    private lasttick: number = 0

    constructor(
        public x: number,
        public y: number,
        private type: number,
        private loader: AssetLoader,
        settings: ISettings
    ) {
        if (settings != null) {
            this.height2 = Math.floor(settings.height / 2)
            this.maxheight = settings.wallheight
        }
    }

    private getimage() {
        if (this.type == 0) {
            return this.loader.zsprites[0 + this.frame + (this.dead ? 10: 0)]
        } else {
            return this.loader.zsprites[20 + this.frame + (this.dead ? 10: 0)]
        }
    }

    private setframe() {
        let tick = (new Date()).getTime()
        if (tick > this.lasttick) {
            if (this.frame < this.framemax) this.frame++
            else if(!this.dead) this.frame = 0
            this.lasttick = tick + this.framelength
        }
    }

    public render(ctx: CanvasRenderingContext2D) {
        this.setframe()
        let image = this.getimage()
        let wallheight = Math.ceil(this.maxheight / this.distance)
        let bottom = Math.floor(this.height2 + wallheight / 2)
        let texleft = Math.floor(this.starttexture * image.width)
        let texright = Math.floor(this.endtexture * image.width)
        let height = Math.floor(wallheight * 0.8)
        let swidth = Math.max(1, texright - texleft)
        let top = bottom - height
        ctx.drawImage(image, texleft, 0, swidth, image.height, this.left, top, this.width, height)
    }
}