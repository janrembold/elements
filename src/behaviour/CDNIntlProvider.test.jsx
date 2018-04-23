import React from 'react'
import { renderToString } from 'react-dom/server'
import { hydrate } from 'react-dom'
import renderer from 'react-test-renderer'
import { FormattedMessage } from 'react-intl'
import CDNIntlProvider from './CDNIntlProvider'
import ResourceProvider from './ResourceProvider'

describe('Check the CDNIntlProvider component', () => {
  beforeEach(fetch.resetMocks)

  it('should fetch the corresponding locales', async () => {
    fetch.mockResponseOnce(JSON.stringify({ test: 'Hallo Welt' }))

    const testRenderer = await new Promise(resolve => {
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

    expect(testRenderer).toMatchSnapshot()

    fetch.mockResponseOnce(JSON.stringify({ test: 'Hello World' }))

    await new Promise(resolve => {
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

    expect(testRenderer).toMatchSnapshot()

    expect(fetch.mock.calls.length).toEqual(2)
    expect(fetch.mock.calls[0][0]).toEqual(
      'https://static.allthings.me/app/production/i18n/de/residential-formal.json'
    )
    expect(fetch.mock.calls[1][0]).toEqual(
      'https://static.allthings.me/app/production/i18n/en/residential-formal.json'
    )

  })

  it('should use the provided locale and do no fetch', () => {
    const onDone = jest.fn()
    const wrapper = mount(
      <ResourceProvider>
        <CDNIntlProvider
          messages={{ test: 'Bonjour tout le monde' }}
          locale="fr_FR"
          project="app"
          variation="residential-formal"
          onDone={onDone}
        >
          <FormattedMessage id="test" defaultMessage="Default" />
        </CDNIntlProvider>
      </ResourceProvider>
    )
    expect(wrapper).toMatchSnapshot()
    expect(onDone.mock.calls.length).toBe(0)
  })

  it('should use the correct stage', () => {
    const stage = 'staging'
    const wrapper = shallow(
      <ResourceProvider>
        <CDNIntlProvider
          messages={{ test: 'Bonjour tout le monde' }}
          locale="fr_FR"
          project="app"
          stage={stage}
          variation="residential-formal"
        >
          <FormattedMessage id="test" defaultMessage="Default" />
        </CDNIntlProvider>
      </ResourceProvider>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.props().stage).toBe(stage)
  })

  it('should pick up if hyrdated', ok => {
    const div = document.createElement('div')

    const dom = renderToString(
      <ResourceProvider>
        <CDNIntlProvider
          messages={{ test: 'Bonjour tout le monde et ala' }}
          locale="fr_FR"
          project="app"
          variation="residential-formal"
        >
          <FormattedMessage id="test" defaultMessage="Default" />
        </CDNIntlProvider>
      </ResourceProvider>
    )

    div.innerHTML = dom
    document.body.appendChild(div)

    hydrate(
      <ResourceProvider>
        <CDNIntlProvider
          locale="fr_FR"
          project="app"
          variation="residential-formal"
        >
          <FormattedMessage id="test" defaultMessage="Default" />
        </CDNIntlProvider>
      </ResourceProvider>,
      div,
      () => expect(div.innerHTML).toMatchSnapshot() & ok()
    )
  })
})
