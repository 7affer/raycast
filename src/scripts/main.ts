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
let map = new Map(1000, 0.3)
let player = new Player({ x: map.size / 2 + 0.25, y: map.size / 2 + 0.25 }, new Angle(0), gamesettins.fov)
let controls = new Controls()
let assetloader = new AssetLoader()
let scene = new Scene(ctx, gamesettins, assetloader)

canvas.width = gamesettins.width
canvas.height = gamesettins.height
canvas.style.width = `${gamesettins.width}px`
canvas.style.height = `${gamesettins.height}px`
controls.bindevents(document, canvas)
player.initonmap(map)

let lastrender: number = Date.now()
function render() {
    let now = Date.now()
    let delta = now - lastrender
    lastrender = now

    player.getcontrols(controls, map, delta)
    scene.renderframe(delta, map, player)
    requestAnimationFrame(render)

    fps.innerText = (Math.floor(1000 / delta)).toString()
}
assetloader.loadall(render)