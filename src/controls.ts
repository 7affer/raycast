export class Controls {
    public rotateleft: boolean = false
    public rotateright: boolean = false
    public forward: boolean = false
    public backward: boolean = false

    public keydown(keycode: number) {
        if (keycode == 37) this.rotateleft = true
        if (keycode == 39) this.rotateright = true
        if (keycode == 38) this.forward = true
        if (keycode == 40) this.backward = true
    }

    public keyup(keycode: number) {
        if (keycode == 37) this.rotateleft = false
        if (keycode == 39) this.rotateright = false
        if (keycode == 38) this.forward = false
        if (keycode == 40) this.backward = false
    }
}