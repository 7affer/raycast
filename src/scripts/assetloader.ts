export class AssetLoader {

    constructor() {
        this.wallssrcs = [
            './assets/walls/wall1.jpg',
            './assets/walls/wall2.jpg',
            './assets/walls/wall3.jpg',
            './assets/walls/wall4.jpg',
            './assets/walls/wall5.jpg',
            './assets/walls/wall1b.jpg',
            './assets/walls/wall2b.jpg',
            './assets/walls/wall3b.jpg',
            './assets/walls/wall4b.jpg',
            './assets/walls/wall5b.jpg',
            './assets/walls/wall1c.jpg',
            './assets/walls/wall2c.jpg',
            './assets/walls/wall3c.jpg',
            './assets/walls/wall4c.jpg',
            './assets/walls/wall5c.jpg'
        ]
        

        this.spritessrcs = [
            './assets/sprites/sprite1.png',
            './assets/sprites/sprite2.png',
            './assets/sprites/sprite3.png',
            './assets/sprites/sprite4.png',
            './assets/sprites/sprite5.png'
        ]

        this.zspritessrcs = [
            './assets/sprites/zombie1.png',
            './assets/sprites/zombie2.png',
            './assets/sprites/zombie3.png',
            './assets/sprites/zombie4.png'
        ]

        this.skylinesrcs = [
            './assets/sprites/skyline.jpg'
        ]

        this.soundssrcs = [
            './assets/sounds/gun.mp3'
        ]

        this.sprites = new Array<HTMLImageElement>()
        this.zsprites = new Array<HTMLImageElement>()
        this.walls = new Array<HTMLImageElement>()
        this.skyline = new Array<HTMLImageElement>()
        this.sounds = new Array<HTMLAudioElement>()
    }

    private loaded = 0
    private wallssrcs: Array<string>
    public walls: Array<HTMLImageElement>
    private spritessrcs: Array<string>
    public sprites: Array<HTMLImageElement>
    private zspritessrcs: Array<string>
    public zsprites: Array<HTMLImageElement>
    private skylinesrcs: Array<string>
    public skyline: Array<HTMLImageElement>
    public soundssrcs: Array<string>
    public sounds: Array<HTMLAudioElement>

    private toload() {
        return this.walls.length +
            this.sprites.length +
            this.zsprites.length +
            this.skyline.length
    }

    private loadimages(
        arrsrc: Array<string>,
        arrobj: Array<HTMLImageElement>,
        onprogress: (prog: number) => void,
        callback: () => void
    ) {
        for (let i in arrsrc) {
            arrobj.push(new Image())
            arrobj[i].onload = () => {
                onprogress(++this.loaded / this.toload())
                if (this.loaded >= this.toload()) callback()
            }
            arrobj[i].src = arrsrc[i]
        }
    }

    private loadaudio(
        arrsrc: Array<string>,
        arrobj: Array<HTMLAudioElement>,
        onprogress: (prog: number) => void,
        callback: () => void
    ) {
        for (let i in arrsrc) {
            arrobj.push(new Audio())
            arrobj[i].oncanplaythrough = () => {
                //onprogress(++this.loaded / this.toload())
                //if (this.loaded >= this.toload()) callback()
            }
            arrobj[i].src = arrsrc[i]
        }
    }

    public loadall(
        onprogress: (prog: number) => void,
        callback: () => void
    ) {
        this.loadimages(this.wallssrcs, this.walls, onprogress, callback)
        this.loadimages(this.spritessrcs, this.sprites, onprogress, callback)
        this.loadimages(this.zspritessrcs, this.zsprites, onprogress, callback)
        this.loadimages(this.skylinesrcs, this.skyline, onprogress, callback)
        this.loadaudio(this.soundssrcs, this.sounds, onprogress, callback)
    }
}