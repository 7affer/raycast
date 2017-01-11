import { AssetLoader } from './assetloader';
import { Scene } from './scene';
import { Controls } from './controls';
import { Angle } from './angle';
import { Map } from './map';
import { Player } from './player';


let fps = document.getElementById('fps')
let gamesettins = {
    width: 800,
    height: 600,
    fov: 70 * Math.PI / 180,
    drawingdistance: 30
}

let sceneevents = {
    renderfps: (e: number) => { fps.innerText = (Math.floor(e)).toString() }
}

let canvas = <HTMLCanvasElement>document.getElementById('gamecanvas')
let ctx = canvas.getContext('2d')
let map = new Map(1000, 0.3)
let player = new Player({ x: map.size / 2 + 0.25, y: map.size / 2 + 0.25 }, new Angle(0), gamesettins.fov)
let controls = new Controls()
let scene = new Scene(ctx, map, player, controls, gamesettins, sceneevents)
let assetloader = new AssetLoader()

canvas.width = gamesettins.width
canvas.height = gamesettins.height
canvas.style.width = `${gamesettins.width}px`
canvas.style.height = `${gamesettins.height}px`
controls.bindevents(document, canvas)
player.initonmap(map)

function render() {
    scene.render()
    requestAnimationFrame(render)
}
assetloader.loadall(render)