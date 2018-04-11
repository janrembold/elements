import React from 'react'
import View from '../atoms/View'
import { css } from 'glamor'
import Theme from '../behaviour/Theme'
import PropTypes from 'prop-types'
import Relative from '../atoms/Relative'
import Text, { createTextStyles } from '../atoms/Text'
import Icon from '../atoms/Icon'

const styles = {
  input: showLabel =>
    css(createTextStyles({ size: 'm' }), {
      boxSizing: 'border-box',
      height: 50,
      width: '100%',
      padding: '0 15px',
      paddingTop: showLabel ? 10 : 0,
      transition: 'padding-top .225s ease-out',
      border: 0,
      '&:-webkit-autofill ~ div': {
        opacity: '1 !important',
        top: '8px !important',
      },
      '&:-webkit-autofill': {
        paddingTop: '10px !important',
      },
    }),
  area: (textColor, lines, showLabel) =>
    css(createTextStyles({ size: 'm' }), {
      boxSizing: 'border-box',
      transition: 'padding-top .225s ease-out',
      height: `calc(30px*${lines})`,
      width: '100%',
      padding: '10px 15px',
      paddingTop: showLabel ? 20 : 10,
      fontSize: '14px',
      border: 0,
      ':invalid:focus': {
        color: 'red',
      },
    }),
  error: css({
    backgroundColor: '#c1392b',
    position: 'absolute',
    bottom: '100%',
    left: '0',
    zIndex: 40,
    width: '100%',
    padding: '12px 15px 15px',
    borderRadius: '2px',
    boxShadow: '0 1px 2px 1px rgba(0,0,0,.25)',
  }),
  arrow: css({
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    marginLeft: '-10px',
    display: 'block',
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTop: '10px solid #c1392b',
  }),
  required: css({
    position: 'absolute',
    right: 10,
  }),
  label: css({
    position: 'absolute',
    left: 15,
    fontSize: 10,
    opacity: 0,
    transition: 'all .225s ease-out',
  }),
  placeholder: css({
    position: 'absolute',
    bottom: 2,
    right: 15,
  }),
}

const InputError = ({ children, ...props }) => (
  <View {...styles.error} {...props}>
    <Text color="textOnBackground">{children}</Text>
    <View {...styles.arrow} />
  </View>
)

InputError.propTypes = {
  children: PropTypes.string.isRequired,
}

/**
 * TextInputs are used to allow users to enter information like names, numbers, urls, email addresses or passwords.
 *
 * ```example
 * <TextInput name="email" type="email" placeholder="Your email" required />
 * <TextInput name="inquiry" lines={5} placeholder="Your question" maxLength={255} minLength={50} />
 * ```
 */
class Input extends React.Component {
  static propTypes = {
    /** The default value to put into the component, without making it controlled */
    defaultValue: PropTypes.string,
    /** Indicates that this field is required */
    required: PropTypes.bool,
    /** The name of this input field */
    name: PropTypes.string.isRequired,
    /** The label of the input */
    label: PropTypes.string,
    /** Type, can be: 'tel', 'number', 'text', 'url', 'email' */
    type: PropTypes.oneOf([
      'tel',
      'number',
      'text',
      'url',
      'email',
      'password',
      'date',
      'datetime-local',
    ]),
    /** Called, when the users changes something */
    onChange: PropTypes.func,
    /** The value, makes this component a controlled component */
    value: PropTypes.string,
    /** Can only be used with type=text. Increase to enable multi-line input */
    lines: PropTypes.number,
    /** Regular expression to validate against */
    pattern: PropTypes.string,
    /** Min number of characters that must be provided */
    minLength: PropTypes.number,
    /** Max number of characters that can be provided */
    maxLength: PropTypes.number,
    /** Called with the input field a reference */
    onInputRef: PropTypes.func,
  }

  state = {
    value: '',
    visible: true,
    message: null,
    length: (this.props.value && this.props.value.length) || 0,
  }

  static defaultProps = {
    required: false,
    lines: 1,
    onInputRef: _ => _,
    type: 'text',
  }

  handleInvalid = e => {
    e.preventDefault()
    const { STATES, validity } = this.context
    const message = e.target.validationMessage
    let hasState = false
    if (STATES) {
      for (const state of STATES) {
        if (e.target.validity[state]) {
          this.setState({ message: validity[state] || message })
          hasState = true
          break
        }
      }
    }
    !hasState && this.setState({ message })
  }

  setInput = input => {
    if (input) {
      this.setState({ length: input.value && input.value.length })
      input.addEventListener('invalid', this.handleInvalid)
    } else if (this.input) {
      this.input.removeEventListener('invalid', this.handleInvalid)
    }
    this.input = input
    this.props.onInputRef(input)
  }

  handleChange = e => {
    this.setState({
      value: e.target.value,
      message: null,
      length: e.target.value.length,
    })
    this.props.onChange && this.props.onChange(e)
  }

  handleMessageClick = () => this.setState({ message: null })

  render() {
    const { required, onInputRef, lines, label, pattern, ...props } = this.props
    const currentValue = this.props.value || this.state.value
    const labelVisible = currentValue.length > 0
    const showLabel = label && currentValue.length > 0

    return (
      <Theme>
        {({ theme, colorize }) => (
          <Relative style={{ width: '100%' }}>
            {this.state.message && (
              <InputError onClick={this.handleMessageClick}>
                {this.state.message}
              </InputError>
            )}
            {lines === 1 ? (
              <input
                ref={this.setInput}
                {...styles.input(showLabel)}
                required={required}
                aria-required={required}
                {...props}
                onInvalid={this.handleInvalid}
                onKeyUp={this.handleChange}
                pattern={pattern}
              />
            ) : (
              <textarea
                {...styles.area(theme.secondaryText, lines, showLabel)}
                {...props}
                ref={onInputRef}
                onChange={this.handleChange}
              />
            )}
            {label && (
              <View
                {...styles.label}
                style={{
                  opacity: labelVisible ? 1 : 0,
                  top: labelVisible ? 8 : 12,
                }}
              >
                <Text color="secondaryText" size="xs">
                  {label} {required && '*'}
                </Text>
              </View>
            )}
            {pattern &&
              this.input &&
              this.input.validity &&
              this.input.validity.valid && (
                <View
                  {...css({
                    position: 'absolute',
                    top: 16,
                    right: 15,
                    pointerEvents: 'none',
                  })}
                >
                  <Icon name="checkFilled" size="xs" color="lightGrey" />
                </View>
              )}
            {props.maxLength && (
              <View {...styles.placeholder}>
                <Text color="secondaryText" size="s">
                  {this.state.length}/{props.maxLength}
                </Text>
              </View>
            )}
          </Relative>
        )}
      </Theme>
    )
  }
}

Input.contextTypes = {
  validity: PropTypes.object,
  STATES: PropTypes.array,
}

export default Input
