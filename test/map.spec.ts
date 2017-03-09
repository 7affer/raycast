import {AssetLoader} from '../src/scripts/assetloader';
import { Angle } from '../src/scripts/angle';
import { Map } from '../src/scripts/map';
import { expect } from 'chai';

describe('Map', () => {
  describe('contructor()', () => {
    it('should initialize array with given size', () => {
      let map = new Map(4,0, new AssetLoader())
      expect(map.map.length).to.be.equal(16)
    })

    it('should initialize sprites', () => {
      let map = new Map(100, 0.5, new AssetLoader())
      expect(map.sprites.length).to.be.greaterThan(0)
    })

    it('should randomize content', () => {
      let map = new Map(4, 1, new AssetLoader())
      expect(map.map[0]).to.be.greaterThan(0)
    })
  })

  describe('setvalue() getvalue()', () => {
    it('should get and set value in table', () => {
      let map = new Map(4, 0, new AssetLoader())
      map.setvalue(1, 2, 3)
      expect(map.getvalue(1, 2)).to.be.equal(3)
      expect(map.getvalue(1, 3)).to.be.equal(0)
      expect(map.getvalue(9, 0)).to.be.equal(0)
      expect(map.getvalue(-63, 2)).to.be.equal(0)
    })
  })

  describe('randomize()', () => {
    it('should initialize map with random walls', () => {
      let map = new Map(100, 0, new AssetLoader())
      map.randomize(0.3)
      let sum = 0
      for (let i = 0; i < map.map.length; i++) sum += map.map[i]
      expect(sum).to.be.above(0)
    })

    it('should initialize by random factor', () => {
      let map = new Map(100, 0, new AssetLoader())
      map.randomize(1)
      let sum = 0
      for (let i = 0; i < map.map.length; i++) sum += map.map[i]
      expect(sum).to.be.greaterThan(9999)
    })
  })
})