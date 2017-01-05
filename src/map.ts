export class Map {
    public map: Uint8Array
    public size: number

    constructor(size: number) {
        this.map = new Uint8Array(size * size)
        this.size = size
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

    public randomize(factor:number) {
        for (let i = 0; i < this.map.length; i++) {
            this.map[i] = Math.random() < factor ? 1 : 0
        }
    }
}