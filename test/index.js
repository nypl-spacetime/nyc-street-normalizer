'use strict'

const normalizer = require('../')
const test = require('tap').test

const streets = require('./streets.json')

streets
  .forEach((street, index) => {
    test('street-normalizer', function (t) {
      t.same(normalizer(street[0]), street[1])
      t.end()
    })
  })
