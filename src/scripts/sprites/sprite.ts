import { ISettings } from '../isettings';
import { Angle } from '../angle';
import { ISprite } from './isprite';

export class Sprite implements ISprite {

    public left: number = -1
    public width: number = 0
    public anglewidth: number = 0.2
    public starttexture: number
    public endtexture: number
    public distance: number
    private height2: number
    private maxheight: number

    constructor(
        public x: number,
        public y: number,
        public image: HTMLImageElement,
        settings: ISettings
    ) {
        if (settings != null) {
            this.height2 = Math.floor(settings.height / 2)
            this.maxheight = settings.wallheight
        }
    }

    public render(ctx: CanvasRenderingContext2D) {
        let wallheight = Math.ceil(this.maxheight / this.distance)
        let bottom = Math.floor(this.height2 + wallheight / 2)
        let texleft = Math.floor(this.starttexture * this.image.width)
        let texright = Math.floor(this.endtexture * this.image.width)
        let height = Math.floor(wallheight * 0.4)
        let swidth = Math.max(1, texright - texleft)
        let top = bottom - height
        ctx.drawImage(this.image, texleft, 0, swidth, this.image.height, this.left, top, this.width, height)
    }
}