import glob from 'glob'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
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
const jo = (async function() {
  try {
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
    files = files.map(({ file, docs }) => ({
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
    }))

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
  } catch (e) {
    console.log(e)
  }
})()
