import { Colision } from '../src/scripts/colision';
import { Map } from '../src/scripts/map';
import { Angle } from '../src/scripts/angle';
import { Ray } from '../src/scripts/ray';
import { expect } from 'chai';

describe('Ray', () => {

  describe('cast()', () => {
    it('should return array of colisions', () => {
      let map = new Map(2, 0)
      let c1 = Ray.cast(map, { x: 0, y: 0 }, null, null, new Angle(0), 5)
      expect(c1).to.have.property('length', 5)
      let c2 = Ray.cast(map, { x: 0, y: 0 }, null, null, new Angle(Math.PI / 4 - 0.0001), 5)
      expect(c2).to.have.property('length', 4)
    })

    it('should return nearest first', () => {
      let map = new Map(100, 1)
      let c1 = Ray.cast(map, { x: 0, y: 1 }, null, null, new Angle(0), 100)
      expect(c1[0].point.x).to.be.below(c1[c1.length - 1].point.x)
    })

    it('should get proper cell in map', () => {
      let map = new Map(5, 0)
      map.setvalue(3, 2, 1)
      map.setvalue(1, 2, 1)
      map.setvalue(2, 1, 1)
      map.setvalue(2, 3, 1)
      let colisionsE = Ray.cast(map, { x: 2.5, y: 2.5 }, null, null, new Angle(0), 1)
      expect(colisionsE[0].type).to.be.equal(1)
      let colisionsW = Ray.cast(map, { x: 2.5, y: 2.5 }, null, null, new Angle(Math.PI), 1)
      expect(colisionsW[0].type).to.be.equal(1)
      let colisionsN = Ray.cast(map, { x: 2.5, y: 2.5 }, null, null, new Angle(Math.PI / 2), 1)
      expect(colisionsN[0].type).to.be.equal(1)
      let colisionsS = Ray.cast(map, { x: 2.5, y: 2.5 }, null, null, new Angle(-Math.PI / 2), 1)
      expect(colisionsS[0].type).to.be.equal(1)
    })
  })

  describe('nearesty()', () => {
    it('should calculate calculate proper horizontal line', () => {
      let a = Ray.nearesty({ x: 0, y: 0 }, new Angle(Math.PI / 6))
      expect(a.y).to.be.closeTo(1, 0.01)

      let b = Ray.nearesty({ x: 0, y: 0 }, new Angle(-Math.PI / 6))
      expect(b.y).to.be.closeTo(-1, 0.01)

      let c = Ray.nearesty({ x: 0.5, y: 0.5 }, new Angle(Math.PI / 6))
      expect(c.y).to.be.closeTo(1, 0.01)

      let d = Ray.nearesty({ x: 0.5, y: 0.5 }, new Angle(-Math.PI / 6))
      expect(d.y).to.be.closeTo(0, 0.01)
    })

    it('should calculate point where ray crosses horizontal line', () => {
      let c = Ray.nearesty({ x: 0, y: 0 }, new Angle(Math.PI / 6))
      expect(c.x).to.be.closeTo(1.732050, 0.01)
      expect(c.y).to.be.closeTo(1, 0.01)
    })

    it('should calculate manhattan distance origin', () => {
      let c = Ray.nearesty({ x: 1, y: 1 }, new Angle(Math.PI / 4))
      expect(c.manhattandistance).to.be.closeTo(2, 0.01)
    })
  })

  describe('nearestx()', () => {

    it('should calculate calculate proper vertical line', () => {
      let a = Ray.nearestx({ x: 0, y: 0 }, new Angle(Math.PI / 6))
      expect(a.x).to.be.closeTo(1, 0.01)

      let b = Ray.nearestx({ x: 0, y: 0 }, new Angle(Math.PI / 2 + 0.1))
      expect(b.x).to.be.closeTo(-1, 0.01)

      let c = Ray.nearestx({ x: 0.5, y: 0.5 }, new Angle(Math.PI / 6))
      expect(c.x).to.be.closeTo(1, 0.01)

      let d = Ray.nearestx({ x: 0.5, y: 0.5 }, new Angle(Math.PI / 2 + 0.1))
      expect(d.x).to.be.closeTo(0, 0.01)
    })

    it('should calculate point where ray crosses vertical line', () => {
      let c = Ray.nearestx({ x: 0, y: 0 }, new Angle(Math.PI / 6))
      expect(c.x).to.be.closeTo(1, 0.01)
      expect(c.y).to.be.closeTo(0.577350, 0.01)
    })

    it('should calculate length to origin', () => {
      let c = Ray.nearestx({ x: 1, y: 2 }, new Angle(Math.PI / 4))
      expect(c.manhattandistance).to.be.closeTo(2, 0.01)
    })
  })
})