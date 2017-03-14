import { IPoint } from '../ipoint';
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
    private frame: number = 0
    private framemax: number = 9
    private framelength: number = 100
    private dead: boolean = false
    private lasttick: number = 0
    private lastvectorchangetick: number = 0
    private vectorchangelength: number = 3000
    private vector: IPoint
    public targeted: boolean = false


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
        this.vector = this.getnewvector()
    }

    private getnewvector() {
        return {
            x: Math.sin((Math.random() * 2) - 1),
            y: Math.sin((Math.random() * 2) - 1)
        }
    }

    private getimage() {
        if (this.type == 0) {
            return this.loader.zsprites[0 + this.frame + (this.dead ? 10 : 0)]
        } else {
            return this.loader.zsprites[20 + this.frame + (this.dead ? 10 : 0)]
        }
    }

    private setvector() {
        let tick = (new Date()).getTime()
        if (tick > this.lastvectorchangetick) {
            this.vector = this.getnewvector()
            this.lastvectorchangetick = tick + this.vectorchangelength
        }
    }

    private setframe() {
        let tick = (new Date()).getTime()
        if (tick > this.lasttick) {
            if (this.frame < this.framemax) this.frame++
            else if (!this.dead) this.frame = 0
            this.lasttick = tick + this.framelength
        }
    }

    public move(delta: number) {
        if (!this.dead) {
            this.x += this.vector.x * (delta / 5000)
            this.y += this.vector.y * (delta / 5000)
            this.setvector()
        }
    }

    public settarget(left: number, width: number) {
        if (width * 0.45 < left &&
            width * 0.55 > left &&
            this.distance < 5) {
            this.targeted = true
        }
    }

    public ifshoot(fired: boolean, onshoot: () => void) {
        if (fired && this.targeted && !this.dead) {
            this.dead = true
            this.frame = 0
            if(this.distance < 2) {
                onshoot()
            }
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