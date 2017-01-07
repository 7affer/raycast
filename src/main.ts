import { Controls } from './controls';
import { DistanceCalc } from './distancecalc';
import { Angle } from './angle';
import { Ray } from './ray';
import { PI2_0 } from './mathconst'
import { Map } from './map';
import { Player } from './player';

const canvaselement = <HTMLCanvasElement>document.getElementById('gamecanvas')
const fps = <HTMLSpanElement>document.getElementById('fps')
const ctx = canvaselement.getContext('2d')
const WIDTH = 800
const HEIGHT = 600
const HEIGHT2 = Math.floor(HEIGHT / 2)
const WALLHEIGHT = HEIGHT * 0.8
const FOV = 70

const map = new Map(100)
const player = new Player(
    { x: map.size / 2, y: map.size / 2 },
    new Angle(0),
    FOV * Math.PI / 180
)
const controls = new Controls()

function initctx(canvas: HTMLCanvasElement) {
    canvas.width = WIDTH
    canvas.height = HEIGHT
    document.addEventListener('keydown', (e) => controls.keydown(e), false)
    document.addEventListener('keyup', (e) => controls.keyup(e), false)
    canvas.addEventListener('click', (e) => {
        canvas.requestPointerLock = canvas.requestPointerLock
        canvas.requestPointerLock()
    }, false)

    document.addEventListener('pointerlockchange', lockChangeAlert, false);
}

let mousemovefunction = (e: MouseEvent) => controls.mousemove(e)
function lockChangeAlert() {
    if (document.pointerLockElement === canvaselement) {
        document.addEventListener("mousemove", mousemovefunction, false);
    } else {
        document.removeEventListener("mousemove", mousemovefunction, false);
    }
}

let lastRender = Date.now();


function render() {
    let now = Date.now()
    let delta = now - lastRender
    lastRender = now
    fps.innerText = (Math.floor(1000 / delta)).toString()
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, HEIGHT2, WIDTH, HEIGHT2)

    player.getcontrols(controls, map, delta)

    var rays = player.getrays(WIDTH)
    for (let r = 0; r < rays.length; r++) {
        let colisions = Ray.cast(map, player.position, null, null, rays[r], 20)
        for (let c = 0; c < colisions.length; c++) {
            if (colisions[c].type > 0) {
                let distance = DistanceCalc.getdistance(player.position, colisions[c].point)
                let distancecorrected = distance * Math.cos(player.facing.angle - rays[r].angle)
                let height = Math.ceil(WALLHEIGHT / distancecorrected)
                let color = Math.floor(255 - distancecorrected * 10)
                let colorhex = color.toString(16).toLowerCase()
                let top = Math.floor(HEIGHT2 - height / 2)
                ctx.beginPath()
                ctx.moveTo(r, top)
                ctx.lineTo(r, HEIGHT - top)
                ctx.lineWidth = 2
                ctx.strokeStyle = `#${colorhex}${colorhex}${colorhex}`
                ctx.stroke()
                break
            }
        }
    }

    requestAnimationFrame(render)
}

map.randomize(0.3)
initctx(canvaselement)
render()