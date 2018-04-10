import React from 'react'
import View from '../atoms/View'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'
import Relative from '../atoms/Relative'
import ListItem from './List/ListItem'
import { css } from 'glamor'
import Theme from '../behaviour/Theme'
import PropTypes from 'prop-types'
import Absolute from '../atoms/Absolute'
import Inset from '../atoms/Inset'

const styles = {
  checkbox: (background, checked) =>
    css({
      borderRadius: '3px',
      height: '25px',
      width: '25px',
      backgroundColor: checked && background,
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: checked ? background : 'lightGrey',
      transition: '250ms',
    }),
  text: css({
    width: 200,
    marginLeft: 20,
  }),
}

/**
 * Checkbox are used to give users a way to select or deselect options.
 *
 * ```example
 * <View>
 *   <Checkbox checked name="ok" label="Are you ok?" />
 *   <Checkbox name="notok" label="Are you not ok?" />
 * </View>
 * ```
 */
class Checkbox extends React.Component {
  static propTypes = {
    /** True to make it checked */
    checked: PropTypes.bool,
    /** Label of Checkbox */
    label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    /** Text size of the label */
    labelSize: Text.propTypes.size,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    /** Background color of the form item */
    backgroundColor: PropTypes.string,
  }

  state = {
    checked: this.props.checked,
  }

  static defaultProps = {
    checked: false,
    labelSize: 'l',
  }

  handleChange = () => this.setState(({ checked }) => ({ checked: !checked }))

  render() {
    const {
      checked,
      onChange,
      label,
      labelSize,
      name,
      backgroundColor,
      ...props
    } = this.props
    const realChecked = checked || this.state.checked
    const changeHandler = onChange || this.handleChange
    return (
      <Theme>
        {({ theme, colorize }) => (
          <ListItem backgroundColor={colorize(backgroundColor)}>
            <View direction="row" alignV="center">
              <Relative
                direction="row"
                alignV="center"
                alignH="center"
                {...styles.checkbox(theme.primary, realChecked)}
              >
                {realChecked && (
                  <Relative bottom={1}>
                    <Icon name="check-filled" size={14} color="#fff" />
                  </Relative>
                )}
                <Absolute top={0} left={0} right={0} bottom={0}>
                  <input
                    type="checkbox"
                    checked={realChecked}
                    id={name}
                    value={realChecked}
                    style={{
                      opacity: 0,
                      width: '25px',
                      height: '25px',
                      margin: 0,
                    }}
                    onChange={changeHandler}
                    {...props}
                  />
                </Absolute>
              </Relative>
            </View>
            <label htmlFor={name}>
              <Inset horizontal>
                <Text size={labelSize}>{label}</Text>
              </Inset>
            </label>
          </ListItem>
        )}
      </Theme>
    )
  }
}

export default Checkbox
