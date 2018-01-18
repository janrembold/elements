import glob from 'glob'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import { transform } from 'babel-core'
const reactDocs = require('react-docgen')

const readfile = promisify(fs.readFile)
const globber = promisify(glob)

const retrieveExamples = new Promise(async resolve => {
  let files = await globber('src/**/*.jsx')
  files = files.filter(path => path.indexOf('.test.jsx') === -1)
  files = await Promise.all(
    files.map(async file => {
      const fileName = file
        .replace(/\\/g, '/')
        .replace(/.*\//, '')
        .replace('.jsx', '')
      try {
        const docs = reactDocs.parse(await readfile(file))
        docs.displayName = docs.displayName || path.basename(file, '.jsx')
        return {
          docs,
          file,
        }
      } catch (e) {
        const docs = {
          displayName: fileName,
          description: 'false',
        }
        return {
          docs,
          file,
        }
      }
    })
  )
  files = files.filter(file => !!file)
  let fileObj = {}
  const filesMapped = files.map(({ file, docs }) => {
    const { description, displayName } = docs
    const exampleString = description
      .replace(/\n|\r/gm, ' ')
      .replace(/\t\t+|\s\s+/g, ' ')
      .match(/```example(.*?)(?=```)/gm)
    const wholeExample =
      !exampleString || null
        ? 'false'
        : exampleString.map(string =>
            string.replace('```example', '').replace(/>(\s)</g, '><')
          )
    fileObj[displayName] = { wholeExample, file, displayName }
    return { wholeExample, file, displayName }
  })
  resolve({ filesMapped, fileObj })
})

export default retrieveExamples
