import React from 'react'
import PropTypes from 'prop-types'

/**
 * The FormValidityProvider gives a nice and simple way for injecting custom
 * error messages that are mapping the HTML5 constraint validation API.
 *
 * Please check the following documentation:
 * https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation#Validating_forms_using_JavaScript
 */
const STATES = [
  'badInput',
  'customError',
  'patternMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'stepMismatch',
  'tooLong',
  'tooShort',
  'typeMismatch',
  'valueMissing',
]

const validityPropTypes = STATES.reduce((acc, prop) => ({
  ...acc,
  [prop]: PropTypes.string,
}), {})

class FormValidityProvider extends React.Component {
  getChildContext() {
    return { validity: this.props.validity, STATES }
  }

  static childContextTypes = {
    validity: PropTypes.shape(validityPropTypes),
    STATES: PropTypes.array,
  }

  static propTypes = {
    validity: PropTypes.shape(validityPropTypes),
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    validity: {},
    children: null,
  }

  render() {
    return this.props.children
  }
}

export default FormValidityProvider
