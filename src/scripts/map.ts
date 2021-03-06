import { ISettings } from './isettings';
import { AssetLoader } from './assetloader';
import { ISprite } from "./sprites/isprite";
import { SpritesFactory, SpriteType } from "./sprites/spritesfactory"

export class Map {
    public map: Uint8Array
    public size: number
    public sprites: Array<ISprite>

    constructor(size: number, randparam: number, loader: AssetLoader, settings: ISettings) {
        this.map = new Uint8Array(size * size)
        this.size = size
        this.randomize(randparam)

        let spritesfactory = new SpritesFactory(loader, size, settings)

        this.sprites = new Array<ISprite>()
        for (let i = 0; i < size * 10; i++) {
            this.sprites.push(spritesfactory.createsprite(SpriteType.Static))
        }
        for (let i = 0; i < size * 30; i++) {
            this.sprites.push(spritesfactory.createsprite(SpriteType.Zombie))
        }
    }

    public setvalue(x: number, y: number, value: number) {
        let pos = this.size * y + x
        if (pos < this.map.length && pos >= 0) {
            this.map[this.size * y + x] = value
        }
    }

    public getvalue(x: number, y: number) {
        if (x >= 0 && y >= 0 && x < this.size && y < this.size) {
            let pos = this.size * y + x
            return this.map[pos]
        }
        return 0
    }

    public randomize(randparam: number) {
        for (let i = 0; i < this.map.length; i++) {
            if (Math.random() < randparam) {
                if (Math.random() < 0.1) {
                    this.map[i] = 5
                } else if (Math.random() < 0.1) {
                    this.map[i] = 4
                } else if (Math.random() < 0.3) {
                    this.map[i] = 3
                } else if (Math.random() < 0.5) {
                    this.map[i] = 2
                } else {
                    this.map[i] = 1
                }
            } else {
                this.map[i] = 0
            }
        }
    }
}