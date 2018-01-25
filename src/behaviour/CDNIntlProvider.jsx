import PropTypes from 'prop-types'
import React from 'react'
import { IntlProvider } from 'react-intl'

class CDNIntlProvider extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    variation: PropTypes.string,
    onDone: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    variation: 'default',
    onDone: _ => _,
  }

  static contextTypes = {
    resourcePath: PropTypes.string,
  }

  state = {
    loaded: false,
  }

  componentWillMount() {
    this.loadLanguages(this.props)
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
    const { project, variation, locale } = props
    const countryCode = locale.split('_')[0]
    const resourcePath = this.context.resourcePath
    const translations = await fetch(
      `${resourcePath}/${project}/staging/i18n/${countryCode}/${variation}.json`
    )
    const messages = await translations.json()
    this.setState({
      loaded: true,
      messages,
    })
    props.onDone()
  }

  render() {
    const countryCode = this.props.locale.split('_')[0]

    return (
      this.state.loaded && (
        <IntlProvider locale={countryCode} messages={this.state.messages}>
          {this.props.children}
        </IntlProvider>
      )
    )
  }
}

export default CDNIntlProvider
