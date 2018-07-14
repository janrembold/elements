import React, { Component } from 'react'
import { func, bool } from 'prop-types'
import View from '../atoms/View'
import Input from '../atoms/Input'
import MaskedInput from 'react-text-mask'

const maskCVC = [/\d/, /\d/, /\d/]
const maskExp = [/\d/, /\d/, '/', /\d/, /\d/]
const maskNumber = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

const styles = {
  wrapper: {
    width: '100%',
  },
}

/**
 * CreditCardInput is used to enter credit card details.
 *
 * ```example
 * <PhoneInput name="phone" placeholder="Example Placeholder" defaultValue="4907615555555" required />
 * ```
 **/
class CreditCardInput extends Component {
  static propTypes = {
    /** Indicates that this field is required */
    required: bool,
    /** Called, when the users changes something */
    onChange: func,
  }

  renderNumber = (ref, maskedProps) => {
    const { onChange, ...props } = this.props
    return (
      <Input
        label="Credit card number"
        placeholder="Credit card number"
        onInputRef={ref}
        name="cardnumber"
        onKeyDown={this.handleKeyDown}
        onChange={this.formatNumber}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        autoComplete="cc-number"
        {...maskedProps}
        {...props}
      />
    )
  }

  renderExp = (ref, maskedProps) => {
    const { onChange, ...props } = this.props
    return (
      <Input
        label="Date"
        placeholder="Date"
        onInputRef={ref}
        name="cc-exp"
        onKeyDown={this.handleKeyDown}
        onChange={this.formatNumber}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        autoComplete="cc-exp"
        {...maskedProps}
        {...props}
      />
    )
  }

  renderCVC = (ref, maskedProps) => {
    const { onChange, ...props } = this.props
    return (
      <Input
        label="CVC"
        placeholder="CVC"
        onInputRef={ref}
        name="cvc"
        onKeyDown={this.handleKeyDown}
        onChange={this.formatNumber}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        autoComplete="cc-csc"
        {...maskedProps}
        {...props}
      />
    )
  }

  render() {
    return (
      <View style={styles.wrapper} direction="row">
        <View flex={55} style={{ minWidth: '165px' }}>
          <MaskedInput
            placeholderChar={'\u2000'}
            mask={maskNumber}
            render={this.renderNumber}
          />
        </View>
        <View flex={25} style={{ minWidth: '65px' }}>
          <MaskedInput
            placeholderChar={'\u2000'}
            mask={maskCVC}
            render={this.renderCVC}
          />
        </View>
        <View flex={25} style={{ minWidth: '65px' }}>
          <MaskedInput
            placeholderChar={'\u2000'}
            mask={maskExp}
            render={this.renderExp}
          />
        </View>
      </View>
    )
  }
}

export default CreditCardInput
