import { Scene } from './scene';
import { Controls } from './controls';
import { DistanceCalc } from './distancecalc';
import { Angle } from './angle';
import { Ray } from './ray';
import { PI2_0 } from './mathconst'
import { Map } from './map';
import { Player } from './player';

let canvaselement = <HTMLCanvasElement>document.getElementById('gamecanvas')
let fps = document.getElementById('fps')
let ctx = canvaselement.getContext('2d')
let map = new Map(100)
map.randomize(0.3)

let gamesettins = {
    width: 800,
    height: 600,
    fov: 70 * Math.PI / 180,
    drawingdistance: 30
}

let sceneevents = {
    renderfps: (e: number) => { fps.innerText = (Math.floor(e)).toString() }
}

let playerposition = { x: map.size / 2 + 0.25, y: map.size / 2 + 0.25 }
while (map.getvalue(Math.floor(playerposition.x), Math.floor(playerposition.y)) > 0) playerposition.x += 1
let player = new Player(playerposition, new Angle(0), gamesettins.fov)
let controls = new Controls()
let scene = new Scene(ctx, map, player, controls, gamesettins, sceneevents)

function initctx(canvas: HTMLCanvasElement) {
    canvas.width = gamesettins.width
    canvas.height = gamesettins.height
    canvas.style.width = `${gamesettins.width}px`
    canvas.style.height = `${gamesettins.height}px`
    controls.bindevents(document, canvas)
}

initctx(canvaselement)
scene.render()