import { IComparable } from '../src/scripts/helpers/icomparable'

import { expect } from 'chai';
import { Sort } from "../src/scripts/helpers/quicksort";

describe('Sort', () => {
    describe('quicksort()', () => {
        it('should sort goven table', () => {
            let arr = new Array<{a:number}>()
            arr.push({ a: 2 })
            arr.push({ a: 3 })
            arr.push({ a: 4 })
            arr.push({ a: 1 })

            Sort.quickSort(arr, 0, arr.length - 1, (a,b) => a.a < b.a )

            expect(arr[0].a).to.be.eq(1)
            expect(arr[1].a).to.be.eq(2)
            expect(arr[2].a).to.be.eq(3)
            expect(arr[3].a).to.be.eq(4)
        })
    })
})