export class Controls {
    public rotateleft: boolean = false
    public rotateright: boolean = false
    public forward: boolean = false
    public backward: boolean = false
    public run: boolean = false
    public strafeleft: boolean = false
    public straferight: boolean = false
    public mouserotateleft: boolean = false
    public mouserotateright: boolean = false

    public mousemove(e: MouseEvent) {
        if (e.movementX < 0) {
            this.mouserotateleft = true
            this.mouserotateright = false
        } else if (e.movementX > 0) {
            this.mouserotateleft = false
            this.mouserotateright = true
        }
    }

    public resetmouserotate() {
        this.mouserotateleft = false
        this.mouserotateright = false
    }

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

    public bindevents(doc: HTMLDocument, canvas: HTMLElement) {
        doc.addEventListener('keydown', (e) => this.keydown(e), false)
        doc.addEventListener('keyup', (e) => this.keyup(e), false)
        doc.addEventListener('pointerlockchange', (e) => { this.lockChangeAlert(doc, canvas) }, false)
        canvas.addEventListener('click', (e) => {
            canvas.requestPointerLock = canvas.requestPointerLock
            canvas.requestPointerLock()
        }, false)
    }

    private mousemovefunction = (e: MouseEvent) => this.mousemove(e)
    private lockChangeAlert(doc: HTMLDocument, canvas: HTMLElement) {
        let canvaselement = <HTMLCanvasElement>document.getElementById('gamecanvas')
        if (doc.pointerLockElement === canvaselement) {
            doc.addEventListener("mousemove", this.mousemovefunction, false)
        } else {
            doc.removeEventListener("mousemove", this.mousemovefunction, false)
        }
    }
}