import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import Absolute from '../atoms/Absolute'
import Circle from '../atoms/Circle'
import Relative from '../atoms/Relative'
import Text from '../atoms/Text'
import View from '../atoms/View'
import ListItem from './List/ListItem'
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
 *
 * const gender = [
 *    { key: m, value: 'male' },
 *    { key: f, value: 'female' },
 * ]
 *
 * <RadioButtonSet name="gender" selection={gender} defaultValue="male" required />
 *
 *
 * const sizes = [
 *    { key: s, value: 'short' },
 *    { key: m, value: 'medium' },
 *    { key: l, value: 'large' },
 *    { key: xl, value: 'x-large' },
 * ]
 *
 * <RadioButtonSet
 *    name="sizes"
 *    selection={sizes}
 *    defaultValue="large"
 *    radioSetStyles={css({
 *                   margin: '0 50px',
 *                 })}
 *    radioElementStyles={css({
 *                   width: '100%',
 *                   backgroundColor: '#f00',
 *                 })}
 *    required
 * />
 * ```
 */
class RadioButtonSet extends React.Component {
  static propTypes = {
    /** The default value to put into the component, without making it controlled */
    defaultValue: PropTypes.string,
    /** The name of this input field */
    name: PropTypes.string.isRequired,
    /** Called when a radio button is clicked */
    onChange: PropTypes.func,
    /** an array of key/values */
    selection: PropTypes.array.isRequired,
    /** Background color of the form item */
    backgroundColor: PropTypes.string,
    /** Text size of the label one of xs,s,m,l,xl */
    labelSize: Text.propTypes.size,
    /** css object, that overwrites the default styles of the radio set */
    radioSetStyles: PropTypes.object,
    /** css object, that overwrites the default styles of a single radio element */
    radioElementStyles: PropTypes.object,
  }

  static defaultProps = {
    required: false,
    labelSize: 'l',
  }

  state = {
    visible: true,
    selected: this.props.defaultValue,
  }

  handleChange = e => {
    this.props.onChange && this.props.onChange(e)
    this.setState({ selected: e.target.value })
  }

  isChecked = checked => {
    return checked ? { defaultChecked: 'checked' } : {}
  }

  render() {
    const {
      backgroundColor,
      selection,
      defaultValue,
      onChange,
      labelSize,
      radioSetStyles,
      radioElementStyles,
      ...props
    } = this.props
    return (
      <Theme>
        {({ theme, colorize }) => (
          <ListItem
            alignV="start"
            padded={false}
            backgroundColor={colorize(backgroundColor)}
            direction={`${selection.length > 2 ? 'column' : 'row'}`}
            {...styles.radioWrapper(selection.length)}
            {...radioSetStyles}
          >
            {selection.map(sel => {
              const realChecked = sel.value === this.state.selected
              return (
                <View
                  key={sel.key}
                  {...styles.radioElement(selection.length)}
                  {...radioElementStyles}
                >
                  {
                    <Relative direction="row" alignV="center" alignH="center">
                      <label htmlFor={sel.value}>
                        <Relative top={10}>
                          <Circle
                            color={`${
                              realChecked ? theme.primary : 'lightGrey'
                            }`}
                            radius={20}
                          >
                            <Circle color="white" radius={16}>
                              <Circle
                                color={`${
                                  realChecked ? theme.primary : 'white'
                                }`}
                                radius={10}
                              />
                            </Circle>
                          </Circle>
                        </Relative>
                        <Relative
                          top={-10}
                          style={{
                            marginLeft: 30,
                          }}
                        >
                          <Text size={labelSize}>{sel.value}</Text>
                        </Relative>
                        <Absolute top={0} left={0} right={0} bottom={0}>
                          <input
                            id={sel.value}
                            type="radio"
                            name="title"
                            {...styles.radio(theme.primary)}
                            value={sel.value}
                            {...props}
                            {...this.isChecked(realChecked)}
                            onChange={this.handleChange}
                          />
                        </Absolute>
                      </label>
                    </Relative>
                  }
                </View>
              )
            })}
          </ListItem>
        )}
      </Theme>
    )
  }
}

RadioButtonSet.contextTypes = {
  validity: PropTypes.object,
  STATES: PropTypes.array,
}

export default RadioButtonSet
