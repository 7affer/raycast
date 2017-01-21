import { Sprite } from './sprite';
import { AssetLoader } from './assetloader';
import { Scene } from './scene';
import { Controls } from './controls';
import { Angle } from './angle';
import { Map } from './map';
import { Player } from './player';


let fps = document.getElementById('fps')
let width = window.innerWidth < 1024 ? window.innerWidth : 1024
let gamesettins = {
    width: width,
    height: Math.floor(width / 1.8),
    fov: 70 * Math.PI / 180,
    drawingdistance: 25,
    floorcolor1: '#000011',
    floorcolor2: '#111122'
}

let canvas = <HTMLCanvasElement>document.getElementById('gamecanvas')
let ctx = canvas.getContext('2d')
let map = new Map(250, 0.3)
let player = new Player({ x: map.size / 2 + 0.25, y: map.size / 2 + 0.25 }, new Angle(0), gamesettins.fov)
let controls = new Controls()
let assetloader = new AssetLoader()
let scene = new Scene(ctx, gamesettins, assetloader)
let sprites = new Array<Sprite>()
for (let i = 0; i < map.size * 20; i++) {
    sprites.push(
        new Sprite({
            x: Math.random() * map.size,
            y: Math.random() * map.size
        },
            Math.floor(Math.random() * 5)
        )
    )
}

canvas.width = gamesettins.width
canvas.height = gamesettins.height
canvas.style.width = `${gamesettins.width}px`
canvas.style.height = `${gamesettins.height}px`
controls.bindevents(document, canvas)
player.initonmap(map)

let objectsinrange = new Array<Sprite>()
let lastrender: number = Date.now()
function render() {
    let now = Date.now()
    let delta = now - lastrender
    lastrender = now

    objectsinrange = new Array<Sprite>()
    for (let i = 0; i < sprites.length; i++) {
        if (
            Math.abs(player.position.x - sprites[i].position.x) < gamesettins.drawingdistance &&
            Math.abs(player.position.y - sprites[i].position.y) < gamesettins.drawingdistance
        ) {
            sprites[i].angle = Angle.normalizeangle(Math.atan2(
                sprites[i].position.y - player.position.y,
                sprites[i].position.x - player.position.x
            ))
            objectsinrange.push(sprites[i])
        }
    }

    player.getcontrols(controls, map, delta)
    scene.renderframe(delta, map, player, objectsinrange)
    requestAnimationFrame(render)
    fps.innerText = (Math.floor(1000 / delta)).toString()
}
assetloader.loadall(
    (prog) => document.getElementById('loading').innerHTML = `Loading: ${Math.ceil(prog * 100)}%` ,
    () => { document.getElementById('loading-container').style.display = 'none'; render() }
)