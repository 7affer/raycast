import { Angle } from '../src/angle';
import { expect } from 'chai';

describe('Angle', () => {
    describe('contructor()', () => {
        it('should prepare sin and cosin values', () => {
            let angle = new Angle(Math.PI / 2)
            expect(angle.sin).to.be.closeTo(1, 0.1)
            expect(angle.cos).to.be.closeTo(0, 0.1)
        })

        it('should init x an y directions', () => {
            expect((new Angle(Math.PI / 2)).dy).to.be.equal(1)
            expect((new Angle(0)).dx).to.be.equal(1)
            expect((new Angle(-Math.PI / 2)).dy).to.be.equal(0)
            expect((new Angle(Math.PI)).dx).to.be.equal(0)
        })
    })
})