import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { IntlProvider } from 'react-intl'
import 'cross-fetch/polyfill'

export const loadLanguage = async (
  resourcePath,
  project,
  variation,
  locale,
  stage
) => {
  const countryCode = locale.split('_')[0]
  const translations = await fetch(
    `${resourcePath}/${project}/${stage}/i18n/${countryCode}/${variation}.json`
  )
  return translations.json()
}

class CDNIntlProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    /** Locale you like to get, EN_us, DE_de */
    locale: PropTypes.string.isRequired,
    /** Optionally pass messages. This will prevent initial loading. */
    messages: PropTypes.object,
    /** Called when new languages got loaded */
    onDone: PropTypes.func,
    /** The project ID loading the langauges for */
    project: PropTypes.string.isRequired,
    /** Stage, can be production and staging */
    stage: PropTypes.oneOf(['prerelease', 'production', 'staging']),
    /** "Default" by default. Can be any allowed variation string.  */
    variation: PropTypes.string,
  }

  static defaultProps = {
    onDone: _ => _,
    stage: 'production',
    variation: 'default',
  }

  static contextTypes = {
    resourcePath: PropTypes.string,
  }

  constructor(props) {
    super(props)

    if (typeof document !== 'undefined') {
      const container = document.getElementById('__ELEMENTS_INTL__')

      const stateString = container.getAttribute('data-state')
      this.state = { messages: JSON.parse(stateString) }
      this.isClient = true
    } else {
      this.state = { messages: this.props.messages }
      this.isClient = false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { project, locale, variation } = this.props
    if (
      nextProps.project !== project ||
      nextProps.locale !== locale ||
      nextProps.variation !== variation
    ) {
      this.loadLanguages(nextProps)
    }
  }

  loadLanguages = async props => {
    const { project, variation, locale, stage, onDone } = props

    const messages = await loadLanguage(
      this.context.resourcePath,
      project,
      variation,
      locale,
      stage
    )

    this.setState({ messages }, onDone)
  }

  renderSideEffect = messages => (
    <span
      suppressHydrationWarning
      id="__ELEMENTS_INTL__"
      style={{ display: 'none' }}
      data-state={!this.isClient && messages && JSON.stringify(messages)}
    />
  )

  render() {
    const countryCode = this.props.locale.split('_')[0]
    const { messages } = this.state

    return (
      <IntlProvider locale={countryCode} messages={messages}>
        <Fragment>
          {this.renderSideEffect(messages)}
          {this.props.children}
        </Fragment>
      </IntlProvider>
    )
  }
}

export default CDNIntlProvider
