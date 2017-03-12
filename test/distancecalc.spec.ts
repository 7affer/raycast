import { DistanceCalc } from '../src/scripts/distancecalc';
import { expect } from 'chai';

describe('DistanceCalc', () => {
    describe('distance()', () => {
        it('should calculate distance between two points', () => {
            let dist = DistanceCalc.distance(
                {x:1,y:0},
                {x:2,y:1}
            )
            expect(dist).to.be.closeTo(Math.SQRT2, 0.1)
        })
    })

    describe('mdistance', ()=> {
        it('should calculate distance on axis', () =>{
            let dist = DistanceCalc.mdistance(
                {x:1,y:0},
                {x:2,y:2}
            )
            expect(dist).to.be.equal(3)
        })
    })
})