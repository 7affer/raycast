import { AssetLoader } from '../assetloader';

export class Mixer {
    
	constructor($loader: AssetLoader ) {
		this.loader = $loader
        this.audiochannels = new Array<Sound>()
        for (let a = 0; a < this.maxchannels; a++) {
            this.audiochannels[a] = new Sound()
            this.audiochannels[a].audioel = new Audio();
            this.audiochannels[a].finish = -1
        }
	}
    
    private loader: AssetLoader
    private maxchannels: number = 32
    private audiochannels: Array<Sound>

    public playsound(index: number) {
        var audio = new Audio(this.loader.soundssrcs[index]);
        audio.play();
        // for (let a = 0; a < this.audiochannels.length; a++) {
        //     let time = new Date()
        //     let now = time.getTime()
        //     console.log(this.loader.sounds[index].duration)
        //     if (this.audiochannels[a].finish < now) {
        //         this.audiochannels[a].finish = now + this.loader.sounds[index].duration * 1000
        //         this.audiochannels[a].audioel.src = this.loader.sounds[index].src
        //         this.audiochannels[a].audioel.play()
        //         break
        //     }
        // }
    }
}

class Sound {
    public finish: number
    public audioel: HTMLAudioElement
}