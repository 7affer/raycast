export class Controls {
    public rotateleft: boolean = false
    public rotateright: boolean = false
    public forward: boolean = false
    public backward: boolean = false
    public run: boolean = false
    public strafeleft: boolean = false
    public straferight: boolean = false
    public mouserotateleft: number = 0
    public mouserotateright: number = 0
    public shoot: boolean = false

    public mousemove(e: MouseEvent) {
        if (e.movementX < 0) {
            this.mouserotateleft = -e.movementX / 5
            this.mouserotateright = 0
        } else if (e.movementX > 0) {
            this.mouserotateleft = 0
            this.mouserotateright = e.movementX / 5
        }
    }

    public resetmouserotate() {
        this.mouserotateleft = 0
        this.mouserotateright = 0
    }

    public keydown(e: KeyboardEvent) {
        if (e.keyCode == 17) this.shoot = true
        if (e.keyCode == 37) this.rotateleft = true
        if (e.keyCode == 68) this.strafeleft = true
        if (e.keyCode == 39) this.rotateright = true
        if (e.keyCode == 65) this.straferight = true
        if (e.keyCode == 38 || e.keyCode == 87) this.forward = true
        if (e.keyCode == 40 || e.keyCode == 83) this.backward = true
        this.run = e.shiftKey
    }

    public touchstart(e: TouchEvent, canvas: HTMLCanvasElement) {
        var t = e.touches[0];
        this.touchend(e);
        if (t.pageY < canvas.height * 0.5) {
            this.shoot = true
        } else {
            if (t.pageX < window.innerWidth * 0.333) this.rotateleft = true
            else if (t.pageX < window.innerWidth * 0.666) this.forward = true
            else this.rotateright = true
        }
        e.preventDefault();
        e.stopPropagation();
    }

    public touchend(e: TouchEvent) {
        this.rotateleft = false
        this.rotateright = false
        this.forward = false
        e.preventDefault();
        e.stopPropagation();
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

    public bindevents(doc: HTMLDocument, canvas: HTMLCanvasElement) {
        doc.addEventListener('keydown', (e) => this.keydown(e), false)
        doc.addEventListener('keyup', (e) => this.keyup(e), false)
        doc.addEventListener('pointerlockchange', (e) => { this.lockChangeAlert(doc, canvas) }, false)
        doc.addEventListener('mozpointerlockchange', (e) => { this.lockChangeAlert(doc, canvas) }, false)
        canvas.addEventListener('touchstart', (e) => { this.touchstart(e, canvas) }, false)
        canvas.addEventListener('touchend', (e) => { this.touchend(e) }, false)
        canvas.addEventListener('click', (e) => {
            canvas.requestPointerLock = canvas.requestPointerLock || (<any>canvas).mozRequestPointerLock
            canvas.requestPointerLock()
            this.shoot = true
        }, false)
    }

    private mousemovefunction = (e: MouseEvent) => this.mousemove(e)
    private lockChangeAlert(doc: HTMLDocument, canvas: HTMLElement) {
        let canvaselement = <HTMLCanvasElement>document.getElementById('hudcanvas')
        if (doc.pointerLockElement === canvaselement || (<any>document).mozPointerLockElement === canvas) {
            doc.addEventListener("mousemove", this.mousemovefunction, false)
        } else {
            doc.removeEventListener("mousemove", this.mousemovefunction, false)
        }
    }
}