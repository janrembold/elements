import React from 'react'
import View from '../atoms/View'
import ListItem from './List/ListItem'
import { css } from 'glamor'
import Theme from '../behaviour/Theme'
import PropTypes from 'prop-types'
import Relative from '../atoms/Relative'
import Text from '../atoms/Text'

const styles = {
  input: textColor =>
    css({
      height: '50px',
      width: '100%',
      padding: '10px 15px',
      fontSize: '14px',
      border: 0,
      ':invalid:focus': {
        color: 'red',
      },
    }),
  area: (textColor, lines) =>
    css({
      height: `calc(30px*${lines})`,
      width: '100%',
      padding: '10px 15px',
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
 * <TextInput lines={5} placeholder="Your question" maxLength={255} minLength={50} />
 * ```
 */
class TextInput extends React.Component {
  static propTypes = {
    /** The default value to put into the component, without making it controlled */
    defaultValue: PropTypes.string,
    /** Indicates that this field is required */
    required: PropTypes.bool,
    /** The name of this input field */
    name: PropTypes.string.isRequired,
    /** Type, can be: 'tel', 'number', 'text', 'url', 'email' */
    type: PropTypes.oneOf(['tel', 'number', 'text', 'url', 'email']),
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
  }

  state = {
    visible: true,
    message: null,
    length: (this.props.value && this.props.value.length) || 0,
  }

  static defaultProps = {
    required: false,
    lines: 1,
    type: 'text',
  }

  handleInvalid = e => {
    e.preventDefault()
    const { STATES, validity } = this.context
    const message = e.target.validationMessage
    let hasState = false
    for (const state of STATES) {
      if (e.target.validity[state]) {
        this.setState({ message: validity[state] || message })
        hasState = true
        break
      }
    }
    hasState && this.setState({ message })
  }

  setInput = input => {
    if (input) {
      this.setState({ length: input.value && input.value.length })
      input.addEventListener('invalid', this.handleInvalid)
    } else {
      this.input.removeEventListener('invalid', this.handleInvalid)
    }
    this.input = input
  }

  handleChange = e => {
    this.setState({ message: null, length: e.target.value.length })
    this.props.onChange && this.props.onChange(e)
  }

  handleMessageClick = () => this.setState({ message: null })

  render() {
    const { required, lines, ...props } = this.props
    return (
      <Theme>
        {({ theme, colorize }) => (
          <ListItem padded={false}>
            <Relative style={{ width: '100%' }}>
              {this.state.message && (
                <InputError onClick={this.handleMessageClick}>
                  {this.state.message}
                </InputError>
              )}
              {required && (
                <View {...styles.required}>
                  <Text color="secondaryText" size="s">
                    *
                  </Text>
                </View>
              )}
              {lines === 1 ? (
                <input
                  ref={this.setInput}
                  {...styles.input(theme.secondaryText)}
                  onInvalid={this.handleInvalid}
                  placeholder="Your text"
                  required={required}
                  aria-required={required}
                  {...props}
                  onChange={this.handleChange}
                />
              ) : (
                <textarea
                  {...styles.area(theme.secondaryText, lines)}
                  {...props}
                  onChange={this.handleChange}
                />
              )}
              {props.maxLength && (
                <View {...styles.placeholder}>
                  <Text color="secondaryText" size="s">
                    {this.state.length}/{props.maxLength}
                  </Text>
                </View>
              )}
            </Relative>
          </ListItem>
        )}
      </Theme>
    )
  }
}

TextInput.contextTypes = {
  validity: PropTypes.object,
  STATES: PropTypes.array,
}

export default TextInput
