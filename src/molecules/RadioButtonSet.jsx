import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import Text from '../atoms/Text'
import View from '../atoms/View'
import Theme from '../behaviour/Theme'

const styles = {
  radioWrapper: () =>
    css({
      padding: '15px 15px',
    }),
  radioElement: num =>
    css({
      marginRight: 40,
      width: 'auto',
    }),
  radio: primaryColor =>
    css({
      opacity: 0,
      margin: 0,
    }),
  required: css({
    position: 'absolute',
    right: 10,
  }),
}

/**
 * RadioButtonSet can be used to render a set of RadioButtons to allow users to select exactly one item from a set.
 * Like gender (male / female) or sizes (s,m,l,xl)
 *
 * ```example
 * *
 * <RadioButtonSet name="gender" defaultValue="male" required />
 *
 *
 * <RadioButtonSet
 *    name="sizes"
 *    selection={sizes}
 *    defaultValue="large"
 *    required
 * />
 * ```
 */

const DIRECTION_HORIZONTAL = 'horizontal'
const DIRECTION_VERTICAL = 'vertical'
const DIRECTION_AUTO = 'auto'

class RadioButtonSet extends React.Component {
  static propTypes = {
    /** The default value to put into the component, without making it controlled */
    defaultValue: PropTypes.string,
    /** The name of this input field */
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    /** Called when a radio button is clicked */
    onChange: PropTypes.func,
    /** Background color of the form item */
    backgroundColor: PropTypes.string,
    /** Mark if the RadioButton is required */
    required: PropTypes.bool.isRequired,
    /** Pass RadioButton[]  */
    children: PropTypes.node.isRequired,
    /** Mark if the RadioButton is required */
    direction: PropTypes.oneOf([
      DIRECTION_HORIZONTAL,
      DIRECTION_VERTICAL,
      DIRECTION_AUTO,
    ]),
  }

  static DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL
  static DIRECTION_VERTICAL = DIRECTION_VERTICAL
  static DIRECTION_AUTO = DIRECTION_AUTO

  static defaultProps = {
    direction: DIRECTION_AUTO,
  }

  state = {
    value: this.props.defaultValue,
  }

  radios = []

  handleChange = e => {
    this.props.onChange && this.props.onChange(e)
    this.setState({ value: e.target.value })
  }

  getAutoDirection = () =>
    this.props.children && this.props.children.length > 2 ? 'column' : 'row'
  getDirection = () =>
    this.props.direction === DIRECTION_HORIZONTAL ? 'row' : 'column'

  render() {
    const { children, label, required, name, ...props } = this.props
    const { value } = this.state

    const direction =
      this.props.direction === DIRECTION_AUTO
        ? this.getAutoDirection()
        : this.getDirection()

    return (
      <Theme>
        {({ theme, colorize }) => (
          <View>
            {label && (
              <View
                className="label"
                style={{
                  opacity: 1,
                  top: 8,
                }}
              >
                <Text color="secondaryText" size="xs">
                  {label} {required && '*'}
                </Text>
              </View>
            )}
            <View
              alignH="space-between"
              alignV="start"
              style={{ width: '100%' }}
              direction={direction}
              {...props}
            >
              {React.Children.map(children, child => {
                if (!React.isValidElement(child)) {
                  return null
                }
                if (child.type === React.Fragment) {
                  console.log(
                    [
                      "Elements: the RadioButtonSet component doesn't accept a Fragment as a child.",
                      'Consider providing an array instead.',
                    ].join('\n')
                  )
                }
                return React.cloneElement(child, {
                  name,
                  inputRef: node => {
                    if (node) {
                      this.radios.push(node)
                    }
                  },
                  checked: value === child.props.value,
                  onChange: this.handleChange,
                })
              })}
            </View>
          </View>
        )}
      </Theme>
    )
  }
}

export default RadioButtonSet
