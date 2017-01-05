export class Controls {
    public rotateleft: boolean = false
    public rotateright: boolean = false
    public forward: boolean = false
    public backward: boolean = false
    public run: boolean = false
    public strafeleft: boolean = false
    public straferight: boolean = false

    public keydown(e: KeyboardEvent) {
        if (e.keyCode == 37) this.rotateleft = true
        if (e.keyCode == 68) this.strafeleft = true
        if (e.keyCode == 39) this.rotateright = true
        if (e.keyCode == 65) this.straferight = true
        if (e.keyCode == 38 || e.keyCode == 87) this.forward = true
        if (e.keyCode == 40 || e.keyCode == 83) this.backward = true
        this.run = e.shiftKey
    }

    public keyup(e: KeyboardEvent) {
        if (e.keyCode == 37) this.rotateleft = false
        if (e.keyCode == 68) this.strafeleft = false
        if (e.keyCode == 39) this.rotateright = false
        if (e.keyCode == 65) this.straferight = false
        if (e.keyCode == 38 || e.keyCode == 87) this.forward = false
        if (e.keyCode == 40 || e.keyCode == 83) this.backward = false
        this.run = e.shiftKey
    }
}