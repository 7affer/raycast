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
    drawingdistance: 20,
    floorcolor1: '#3D2F2D',
    floorcolor2: '#261311',
    wallheight: Math.floor(width / 1.8) * 0.8
}

let assetloader = new AssetLoader()

assetloader.loadall(
    (prog) => document.getElementById('loading').innerHTML = `Loading: ${Math.ceil(prog * 100)}%` ,
    () => { 
        document.getElementById('loading-container').style.display = 'none'; 
        let canvas = <HTMLCanvasElement>document.getElementById('gamecanvas')
        let ctx = canvas.getContext('2d')
        let map = new Map(150, 0.3, assetloader, gamesettins)
        let controls = new Controls()
        let player = new Player(map.size / 2 + 0.25, map.size / 2 + 0.25, new Angle(0), assetloader)
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
            scene.renderframe(delta, map, player, gamesettins.fov)
            requestAnimationFrame(render)
            fps.innerText = (Math.floor(1000 / delta)).toString()
        }
        render() 
    }
)