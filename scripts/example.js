import glob from 'glob'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import { transform } from 'babel-core'
var React = require('react');
var View = require("../src/atoms/View");

const reactDocs = require('react-docgen')

const readfile = promisify(fs.readFile)
const globber = promisify(glob)

const retrieveExamples = new Promise(async resolve => {
  let files = await globber('src/**/*.jsx')
  files = files.filter(path => path.indexOf('.test.jsx') === -1)
  files = await Promise.all(
    files.map(async file => {
      try {
        const docs = reactDocs.parse(await readfile(file))
        docs.displayName = docs.displayName || path.basename(file, '.jsx')
        return {
          docs,
          file,
        }
      } catch (e) {
        console.log('Could not find React in ' + file)
        return null
      }
    })
  )
  files = files.filter(file => !!file)
  const filesMapped = files.map(({ file, docs }) => {
    const { description, displayName } = docs
    const exampleString = description.replace(/^\s+|\r?\n|\r/mg, "").match(/```example(.*?)(?=```)/gm)
    const wholeExample = (!exampleString || null) ? 'false' : exampleString.map(string => string.replace('```example', ''))
    if (wholeExample !== 'false' && wholeExample.length > 2) {
      wholeExample.forEach(example=> {
        const result = transform(example, {babelrc: true, presets: ['react']})
        //console.log(eval(result.code))
      })
    }
    return {wholeExample, file, displayName}
  })
  resolve(filesMapped)
})

export default retrieveExamples