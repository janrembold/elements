import React from 'react'
import ReactDOM from 'react-dom'
import ConfirmDialog from './ConfirmDialog'
import ThemeProvider from '../behaviour/ThemeProvider'

const confirm = message =>
  new Promise(resolve => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    function resolveAndClean(response) {
      ReactDOM.unmountComponentAtNode(div)
      document.body.removeChild(div)
      resolve(response)
    }
    ReactDOM.render(
      <ThemeProvider theme={{ primary: '#bada55' }}>
        <ConfirmDialog
          onCancel={() => resolveAndClean(false)}
          onSuccess={() => resolveAndClean(true)}
        >
          {message}
        </ConfirmDialog>
      </ThemeProvider>,
      div
    )
  })

export default confirm
