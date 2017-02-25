import { AssetLoader } from '../src/scripts/assetloader';
import { Map } from '../src/scripts/map';
import { Angle } from '../src/scripts/angle';
import { Player } from '../src/scripts/player';
import { expect } from 'chai';

describe('Player', () => {
    describe('getrays()', () => {
        it('should get rays for given', () => {
            let loader = new AssetLoader()
            let player = new Player({ x: 0, y: 0 }, new Angle(Math.PI / 4), Math.PI / 2, loader)
            let rays = player.getrays(100)
            expect(rays.length).to.equals(100)
            expect(rays[0].angle).to.be.closeTo(Math.PI / 2, 0.1)
            expect(rays[99].angle).to.be.closeTo(0, 0.1)
        })
    })

    describe('initonmap()', () => {
        it('should pass filled cells', () => {
            let map = new Map(3, 1)
            let loader = new AssetLoader()
            let player = new Player({ x: 0.5, y: 0.5 }, new Angle(0), Math.PI / 2, loader)
            player.initonmap(map)
            expect(player.position.x).to.be.equal(3.5)
        })
    })

    describe('moveforward()', () => {
        it('should move player forward', () => {
            let map = new Map(1, 0)
            let loader = new AssetLoader()
            let player = new Player({ x: 0, y: 0 }, new Angle(0), Math.PI / 2, loader)
            player.moveforward(1, map, false)
            expect(player.position.x).to.be.greaterThan(0)
        })
    })

    describe('movebackward()', () => {
        it('should move player backward', () => {
            let map = new Map(1, 0)
            let loader = new AssetLoader()
            let player = new Player({ x: 0, y: 0 }, new Angle(0), Math.PI / 2, loader)
            player.movebackward(1, map)
            expect(player.position.x).to.be.lessThan(0)
        })
    })

    describe('strafeleft()', () => {
        it('player should make left strafe', () => {
            let map = new Map(1, 0)
            let loader = new AssetLoader()
            let player = new Player({ x: 0, y: 0 }, new Angle(0), Math.PI / 2, loader)
            player.strafeleft(1, map, false)
            expect(player.position.y).to.be.lessThan(0)
        })
    })

    describe('straferight()', () => {
        it('player should make right strafe', () => {
            let map = new Map(1, 0)
            let loader = new AssetLoader()
            let player = new Player({ x: 0, y: 0 }, new Angle(0), Math.PI / 2, loader)
            player.straferight(1, map, false)
            expect(player.position.y).to.be.greaterThan(0)
        })
    })
})