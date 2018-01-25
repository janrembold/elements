import React from 'react'
import renderer from 'react-test-renderer'
import { FormattedMessage } from 'react-intl'
import CDNIntlProvider from './CDNIntlProvider'
import fetch from 'jest-fetch-mock'
import ResourceProvider from './ResourceProvider'

test('NotificationBubbleManager renders the bubble', async () => {
  const fetchGerman = fetch.mockResponse(JSON.stringify({ test: 'Hallo Welt' }))

  const testRenderer = await new Promise((resolve, reject) => {
    let myRenderer
    function onDone() {
      resolve(myRenderer)
    }
    const nbm = (
      <ResourceProvider>
        <CDNIntlProvider
          locale="de_DE"
          project="app"
          variation="residential-formal"
          onDone={onDone}
        >
          <FormattedMessage id="test" defaultMessage="Default" />
        </CDNIntlProvider>
      </ResourceProvider>
    )

    myRenderer = renderer.create(nbm)
  })

  expect(fetchGerman).toHaveBeenCalledWith(
    'https://static.allthings.me/app/staging/i18n/de/residential-formal.json'
  )
  expect(testRenderer).toMatchSnapshot()

  const fetchEnglish = fetch.mockResponse(
    JSON.stringify({ test: 'Hello World' })
  )

  await new Promise((resolve, reject) => {
    const nbm = (
      <ResourceProvider>
        <CDNIntlProvider
          locale="en_US"
          project="app"
          variation="residential-formal"
          onDone={resolve}
        >
          <FormattedMessage id="test" defaultMessage="Default" />
        </CDNIntlProvider>
      </ResourceProvider>
    )

    testRenderer.update(nbm)
  })

  expect(fetchEnglish).toHaveBeenCalledWith(
    'https://static.allthings.me/app/staging/i18n/en/residential-formal.json'
  )
  expect(testRenderer).toMatchSnapshot()
})
