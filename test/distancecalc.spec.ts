import { DistanceCalc } from '../src/distancecalc';
import { expect } from 'chai';

describe('DistanceCalc', () => {
    describe('getdistance()', () => {
        it('should calculate distance between two points', () => {
            let dist = DistanceCalc.getdistance(
                {x:1,y:0},
                {x:2,y:1}
            )
            expect(dist).to.be.closeTo(Math.SQRT2, 0.1)
        })
    })
})