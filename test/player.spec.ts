import { Angle } from '../src/angle';
import { Player } from '../src/player';
import { expect } from 'chai';

describe('Player', () => {
    describe('getrays()', () => {
        it('should get rays for given', () => {
            let player = new Player({ x: 0, y: 0 }, new Angle(Math.PI/4), Math.PI/2)
            let rays = player.getrays(100)
            expect(rays.length).to.equals(100)
            expect(rays[0].angle).to.be.closeTo(Math.PI/2, 0.1)
            expect(rays[99].angle).to.be.closeTo(0, 0.1)
        })
    })
})