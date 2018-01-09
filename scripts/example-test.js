import glob from 'glob'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import View from '../src/atoms/View'
import { transform } from 'babel-core';
import React from 'react'
var babel = require("babel-core");

const reactDocs = require('react-docgen')

const writeFile = promisify(fs.writeFile)
const readfile = promisify(fs.readFile)
const globber = promisify(glob)

function propToRow(props) {
  return propName => {
    const { required, description, defaultValue, type } = props[propName]
    return `|${propName}${required ? ' **(required)**' : ''}|${type.name}|${
      description ? description : ''
    }${defaultValue ? `<br>Default: ${defaultValue.value}` : ''}`
  }
}
const retrieveExamples = (async function() {
  try {
    console.log('test test test')
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
    files = files.map(({ file, docs }) => {
      const description = docs.description
      const exampleString = description.replace(/^\s+|\r?\n|\r/mg, "").match(/```example(.*?)(?=```)/gm)
      const wholeExample = (!exampleString || null) ? 'false' : exampleString.map(string => string.replace('```example', ''))
      if (wholeExample !== 'false' && wholeExample.length > 2) {
        //console.log('more than 1!', wholeExample)
        wholeExample.forEach(example=> {
          const result = babel.transform(example, {babelrc: true, presets: ['react']})
          console.log(eval('var React= require("react"); var View = require("../src/atoms/View");' + result.code))
        })
      }
      return ({
      file,
      docs: `<!-- 
This is an auto-generated markdown. 
You can change it in "${file}" and run build:docs to update this file.
-->
# ${docs.displayName}
${docs.description}
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
${docs.props ?
        Object.keys(docs.props)
          .map(propToRow(docs.props))
          .join('\n') : '*No properties to pass*'}
`,
    })})
/*
    const write = await Promise.all(
      files.map(({ file, docs }) => {
        writeFile(
          __dirname +
            '/../' +
            file.replace('src/', 'doc/reference/').replace('.jsx', '.md'),
          docs,
          { flag: 'w+' }
        )
      })
    )
*/
  } catch (e) {
    console.log(e)
  }
})()
