export class AssetLoader {

    constructor() {
        this.wallssrcs = [
            './assets/walls/wall1.jpg',
            './assets/walls/wall2.jpg',
            './assets/walls/wall3.jpg',
            './assets/walls/wall4.jpg',
            './assets/walls/wall5.jpg'
        ]
        this.walls = new Array<HTMLImageElement>()
        for (let item in this.wallssrcs) this.walls.push(new Image())


        this.spritessrcs = [
            './assets/sprites/sprite1.png',
            './assets/sprites/sprite2.png',
            './assets/sprites/sprite3.png',
            './assets/sprites/sprite4.png',
            './assets/sprites/sprite5.png'
        ]
        this.sprites = new Array<HTMLImageElement>()
        for (let item in this.spritessrcs) this.sprites.push(new Image())
    }

    private loaded = 0
    private wallssrcs: Array<string>
    public walls: Array<HTMLImageElement>
    private spritessrcs: Array<string>
    public sprites: Array<HTMLImageElement>

    private isloaded() {
        return this.loaded ==
            this.walls.length +
            this.sprites.length
    }

    public loadall(callback: () => void) {
        for (let i in this.wallssrcs) {
            this.walls[i].onload = () => {
                this.loaded += 1
                if (this.isloaded()) callback()
            }
            this.walls[i].src = this.wallssrcs[i]
        }

        for (let i in this.spritessrcs) {
            this.sprites[i].onload = () => {
                this.loaded += 1
                if (this.isloaded()) callback()
            }
            this.sprites[i].src = this.spritessrcs[i]
        }
    }
}