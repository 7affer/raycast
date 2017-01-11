import { Map } from '../src/scripts/map';
import { Angle } from '../src/scripts/angle';
import { Player } from '../src/scripts/player';
import { expect } from 'chai';

describe('Player', () => {
    describe('getrays()', () => {
        it('should get rays for given', () => {
            let player = new Player({ x: 0, y: 0 }, new Angle(Math.PI / 4), Math.PI / 2)
            let rays = player.getrays(100)
            expect(rays.length).to.equals(100)
            expect(rays[0].angle).to.be.closeTo(Math.PI / 2, 0.1)
            expect(rays[99].angle).to.be.closeTo(0, 0.1)
        })
    })

    describe('initonmap()', () => {
        it('should pass filled cells', () => {
            let map = new Map(3, 1)
            let player = new Player({ x: 0.5, y: 0.5 }, new Angle(0), Math.PI / 2)
            player.initonmap(map)
            expect(player.position.x).to.be.equal(3.5)
        })
    })
})