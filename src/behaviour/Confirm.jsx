import React from 'react'
import ReactDOM from 'react-dom'
import ConfirmDialog from '../molecules/ConfirmDialog'
import ThemeProvider from './ThemeProvider'

const confirm = ({ acceptButtonLabel, cancelButtonLabel, message }) =>
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
          acceptButtonLabel={acceptButtonLabel}
          cancelButtonLabel={cancelButtonLabel}
          message={message}
          onCancel={() => resolveAndClean(false)}
          onSuccess={() => resolveAndClean(true)}
        />
      </ThemeProvider>,
      div
    )
  })

export default confirm
