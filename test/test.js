const normalizer = require('../')
const assert = require('assert')

const streets = require('./streets.json')

describe('nyc-street-normalizer', function() {
  streets
    .forEach((street) => {
      it(`"${street[0]}" -> "${street[1]}"`, () => {
        const normalized = normalizer(street[0])
        assert.equal(street[1], normalized)
      })
    })
})
