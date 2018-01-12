import retrieveExamples from './example'

const files = retrieveExamples.then(allExamples => {
  const object = new Object
  allExamples.map(example => {
    const { wholeExample, file, displayName } = example
    object[displayName] = file
    return object
  })
  return object
})
.then(object => {
  console.log('files are', object)
  return
})
.catch(err => console.log(err))


var View = require('../src/atoms/View').default
var ThemeProvider = require('../src/behaviour/ThemeProvider').default
var Spinner = require('../src/atoms/Spinner').default


module.exports = {View, ThemeProvider, Spinner}
