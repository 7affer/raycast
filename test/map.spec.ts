import { Angle } from '../src/angle';
import { Map } from '../src/map';
import { expect } from 'chai';

describe('Map', () => {
  describe('contructor()', () => {
    it('should initialize array with given size', () => {
      let map = new Map(4)
      expect(map.map.length).to.be.equal(16)
    })
  })

  describe('setvalue() getvalue()', () => {
    it('should get and set value in table', () => {
      let map = new Map(4)
      map.setvalue(1, 2, 3)
      expect(map.getvalue(1, 2)).to.be.equal(3)
      expect(map.getvalue(1, 3)).to.be.equal(0)
      expect(map.getvalue(9, 0)).to.be.equal(0)
      expect(map.getvalue(-63, 2)).to.be.equal(0)
    })
  })

  describe('randomize()', () => {
    it('should initialize map with random walls', () => {
      let map = new Map(100)
      map.randomize(0.3)
      let sum = 0
      for (let i = 0; i < map.map.length; i++) sum += map.map[i]
      expect(sum).to.be.above(0)
    })

    it('should initialize by random factor', () => {
      let map = new Map(100)
      map.randomize(1)
      let sum = 0
      for (let i = 0; i < map.map.length; i++) sum += map.map[i]
      expect(sum).to.be.equal(10000)
    })
  })
})