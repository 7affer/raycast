import { Controls } from './controls';
import { DistanceCalc } from './distancecalc';
import { WallFactory } from './wallfactory';
import { Angle } from './angle';
import { Ray } from './ray';
import { PI2_0 } from './mathconst'
import { Map } from './map';
import { Player } from './player';

const wallfact = new WallFactory()
const canvaselement = <HTMLCanvasElement>document.getElementById('gamecanvas')
const fps = <HTMLSpanElement>document.getElementById('fps')
const ctx = canvaselement.getContext('2d')
const WIDTH = 800
const HEIGHT = 600
const HEIGHT2 = HEIGHT / 2
const WALLHEIGHT = HEIGHT * 0.8
const FOV = 90

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
    document.addEventListener('keydown', function (e: KeyboardEvent) {
        controls.keydown(e.keyCode)
    }, false)
    document.addEventListener('keyup', function (e: KeyboardEvent) {
        controls.keyup(e.keyCode)
    }, false)
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

    player.getcontrols(controls, delta)
    var rays = player.getrays(WIDTH)

    for (let r = 0; r < rays.length; r++) {
        let colisions = Ray.cast(map, player.position, null, null, rays[r], 20)
        for (let c = 0; c < colisions.length; c++) {
            if (colisions[c].type > 0) {
                let distance = DistanceCalc.getdistance(player.position, colisions[c].point)
                let height = 
                    WALLHEIGHT / (distance * Math.cos(0.99 * (player.facing.angle - rays[r].angle)))

                height = Math.ceil(height > HEIGHT ? HEIGHT : height)
                let color = Math.floor(255 - distance * 10)

                ctx.putImageData(
                    wallfact.getpxdata(ctx, height, color, color, color, 255),
                    r,
                    HEIGHT2 - height / 2
                )
                break
            }
        }
    }
    requestAnimationFrame(render)
}

map.randomize(0.3)
initctx(canvaselement)
render()