import { shallow, mount, render } from 'enzyme'
import retrieveExamples from './example'
import { transform } from 'babel-core'
var { View, ThemeProvider, Spinner } = require('./atoms')
var React = require('react');

describe('Ladeeda', async () => {
  it('should match', async () => {
    //const examples = await retrieveExamples
    const randomShit = retrieveExamples.then(result => {
      //console.log('restul result result', result)
      result.map(example => {
        const { wholeExample, file, displayName } = example
        if (displayName === 'Spinner') {
          wholeExample.forEach(stringExample => {
            console.log('working working', stringExample)
            console.log('spinner3', Spinner)
            const resultTwo = transform(stringExample, {presets: ['react']})
            console.log('resulttwo is', resultTwo)
            //const Spin = eval('console.log("eval spiner is");' + resultTwo.code)
            //const component = shallow(Spin)
            //console.log('prop is', Spin)
          })
        }
      })
      return('jello')
    }).catch(err => {
      console.log(err)
      return('mistake')
    })
    randomShit.then(result => console.log('awaited', result))
  })
})

/*
describe('Ladeeda', async () => {
  it('should match', async () => {
    const examples = await retrieveExamples
    examples.map(example => {
      const { wholeExample, file, displayName } = example
      //console.log('example is', displayName)
      if (displayName === 'Spinner') {
        wholeExample.forEach(stringExample => {
          const result = transform(stringExample, {presets: ['react']})
          console.log('result.code', result.code)
          const Spin = eval(result.code)
          const component = shallow(Spin)
          console.log('prop is', component)
        })
      }
    })
  })
})
*/



      /*
      if (wholeExample !== 'false' && wholeExample.length > 2) {
        wholeExample.forEach(ex => {
          const result = transform(ex, {presets: ['react']})
          console.log('lolilol', eval(result.code))
        })
      }
      */