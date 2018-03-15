import React from 'react'
import Theme from '../behaviour/Theme'
import ListItem from './List/ListItem'
import Input from '../atoms/Input'
import PropTypes from 'prop-types'

/**
 * TextInputs are used to allow users to enter information like names, numbers, urls, email addresses or passwords.
 *
 * ```example
 * <TextInput name="email" type="email" placeholder="Your email" required />
 * <TextInput name="inquiry" lines={5} placeholder="Your question" maxLength={255} minLength={50} />
 * ```
 */
class TextInput extends React.Component {
  static propTypes = {
    ...Input.propTypes,
    /** Background color of the form item */
    backgroundColor: PropTypes.string,
  }

  render() {
    const { backgroundColor, ...props } = this.props

    return (
      <Theme>
        {({ theme, colorize }) => (
          <ListItem padded={false} backgroundColor={colorize(backgroundColor)}>
            <Input {...props} />
          </ListItem>
        )}
      </Theme>
    )
  }
}

export default TextInput
