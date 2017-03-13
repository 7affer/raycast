import { ISettings } from '../isettings';
import { AssetLoader } from '../assetloader';
import { ISprite } from "./isprite";
import { Sprite } from "./sprite";
import { Zombie } from "./zombie";

export { SpritesFactory, SpriteType }

class SpritesFactory {

    public constructor(
        private loader: AssetLoader,
        private mapsize: number,
        private settings: ISettings) {

    }

    public createsprite(type: SpriteType): ISprite {
        switch (type) {
            case SpriteType.Static: return new Sprite(
                Math.random() * this.mapsize,
                Math.random() * this.mapsize,
                this.loader.sprites[Math.floor(Math.random() * this.loader.sprites.length)],
                this.settings
            )
            case SpriteType.Zombie: return new Zombie(
                Math.random() * this.mapsize,
                Math.random() * this.mapsize,
                Math.floor(Math.random() * 2),
                this.loader,
                this.settings
            )
        }
    }
}

enum SpriteType {
    Static = 1,
    Zombie
}