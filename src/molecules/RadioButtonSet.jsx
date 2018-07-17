import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import Text from '../atoms/Text'
import View from '../atoms/View'
import Theme from '../behaviour/Theme'

const styles = {
  label: css({
    position: 'relative',
    marginBottom: 10,
  }),
}

const DIRECTION_HORIZONTAL = 'horizontal'
const DIRECTION_VERTICAL = 'vertical'
const DIRECTION_AUTO = 'auto'

/**
 * RadioButtonSet can be used to render a set of RadioButtons to allow users to select exactly one item from a set.
 *
 * ```example
 * <RadioButtonSet
 *    name="order"
 *    defaultValue="tee"
 *    required
 * >
 *   <RadioButton value="coffe">Coffe</RadioButton>
 *   <RadioButton value="tee">Tee</RadioButton>
 *   <RadioButton value="others">Others</RadioButton>
 * </RadioButtonSet>
 * ```
 */
class RadioButtonSet extends React.Component {
  static propTypes = {
    /** Pass in RadioButton[] */
    children: PropTypes.node.isRequired,
    /** The default value to put into the component, without making it controlled */
    defaultValue: PropTypes.string,
    /** Customize direction */
    direction: PropTypes.oneOf([
      DIRECTION_HORIZONTAL,
      DIRECTION_VERTICAL,
      DIRECTION_AUTO,
    ]),
    /** The label of this input field */
    label: PropTypes.string,
    /** The name of this input field */
    name: PropTypes.string.isRequired,
    /** Called when a radio button is clicked */
    onChange: PropTypes.func,
    /** Pass true to mark the field as required */
    required: PropTypes.bool,
  }

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
    const { children, label, required, name, direction, ...props } = this.props
    const { value } = this.state

    return (
      <Theme>
        {({ theme, colorize }) => (
          <View>
            {label && (
              <View
                className="label"
                {...styles.label}
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
              direction={
                direction === DIRECTION_AUTO
                  ? this.getAutoDirection()
                  : this.getDirection()
              }
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
