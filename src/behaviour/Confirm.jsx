import React from 'react'
import ReactDOM from 'react-dom'
import ConfirmDialog from '../molecules/ConfirmDialog'
import ThemeProvider from './ThemeProvider'

const confirm = customTexts =>
  new Promise(resolve => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const resolveAndClean = response => {
      ReactDOM.unmountComponentAtNode(div)
      document.body.removeChild(div)
      resolve(response)
    }

    ReactDOM.render(
      <ThemeProvider>
        <ConfirmDialog
          onCancel={() => resolveAndClean(false)}
          onSuccess={() => resolveAndClean(true)}
          customTexts={customTexts}
        />
      </ThemeProvider>,
      div
    )
  })

export default confirm
