export class AssetLoader {

    constructor() {
        this.wallssrcs = [
            './assets/wall1.jpg',
            './assets/wall2.jpg',
            './assets/wall3.jpg',
            './assets/wall4.jpg',
            './assets/wall5.jpg'
        ]

        this.walls = [
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image()
        ]
    }

    private loadedwalls = 0
    private wallssrcs: Array<string>
    public walls: Array<HTMLImageElement>

    public loadall(callback: () => void) {
        for (let i in this.wallssrcs) {
            this.walls[i].onload = () => {
                this.loadedwalls += 1
                if (this.loadedwalls == this.wallssrcs.length) callback()
            }
            this.walls[i].src = this.wallssrcs[i]
        }
    }
}