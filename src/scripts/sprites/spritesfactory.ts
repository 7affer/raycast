import { ISettings } from '../isettings';
import { AssetLoader } from '../assetloader';
import { ISprite } from "./isprite";
import { Sprite } from "./sprite";
import { Zombie } from "./zombie";

export { SpritesFactory, SpriteType }

class SpritesFactory {

    public constructor(
        private assetloader: AssetLoader,
        private mapsize: number,
        private settings: ISettings) {

    }

    public createsprite(type: SpriteType):ISprite {
        switch (type) {
            case SpriteType.Static: return new Sprite(
                Math.random() * this.mapsize,
                Math.random() * this.mapsize,
                this.assetloader.sprites[Math.floor(Math.random() * this.assetloader.sprites.length)],
                this.settings
            )
            case SpriteType.Zombie: return new Zombie(
                Math.random() * this.mapsize,
                Math.random() * this.mapsize,
                this.assetloader.zsprites[Math.floor(Math.random() * this.assetloader.zsprites.length)],
                this.settings
            )
        }
    }
}

enum SpriteType {
    Static = 1,
    Zombie
}