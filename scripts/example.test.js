import { shallow, mount, render } from 'enzyme'
import retrieveExamples from './example'
import { transform } from 'babel-core'
var React = require('react');

describe('Ladeeda', () => {
  it('should match', async () => {
    const examples = await retrieveExamples

    examples.map(example => {
      const { wholeExample, file, displayName } = example
      //console.log('example is', displayName)
      if (wholeExample !== 'false' && wholeExample.length > 2) {
        wholeExample.forEach(ex => {
          console.log('display dipslay', displayName)
          const result = transform(ex, {babelrc: true, presets: ['react']})
          console.log('lolilol', eval('var ' + 'View' +' = require("../src/atoms/View");' + result.code))
        })
      }
    })
  })
})