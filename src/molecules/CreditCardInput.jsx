import React, { Component } from 'react'
import { func, bool } from 'prop-types'
import View from '../atoms/View'
import Input from '../atoms/Input'
import MaskedInput from 'react-text-mask'

// prettier-ignore
const maskNumber = [
  /\d/, /\d/, /\d/, /\d/, ' ',
  /\d/, /\d/, /\d/, /\d/, ' ',
  /\d/, /\d/, /\d/, /\d/, ' ',
  /\d/, /\d/, /\d/, /\d/,
]
const maskCVC = [/\d/, /\d/, /\d/]
const maskExp = [/\d/, /\d/, '/', /\d/, /\d/]

/**
 * CreditCardInput is used to enter credit card details.
 *
 * ```example
 * <CreditCardInput />
 * ```
 **/
class CreditCardInput extends Component {
  static propTypes = {
    /** Indicates that this field is required */
    required: bool,
    /** Called, when the users changes something */
    onChange: func,
  }

  renderNumber = (ref, maskedProps) => (
    <Input
      label="Credit card number"
      placeholder="Credit card number"
      onInputRef={ref}
      name="cardnumber"
      autoComplete="cc-number"
      {...maskedProps}
    />
  )

  renderCVC = (ref, maskedProps) => (
    <Input
      label="CVC"
      placeholder="CVC"
      onInputRef={ref}
      name="cvc"
      autoComplete="cc-csc"
      {...maskedProps}
    />
  )

  renderExp = (ref, maskedProps) => (
    <Input
      label="Date"
      placeholder="Date"
      onInputRef={ref}
      name="cc-exp"
      autoComplete="cc-exp"
      {...maskedProps}
    />
  )

  render() {
    return (
      <View fill direction="row">
        <View flex={55} style={{ minWidth: '165px' }}>
          <MaskedInput
            mask={maskNumber}
            render={this.renderNumber}
            guide={false}
          />
        </View>
        <View flex={25} style={{ minWidth: '65px' }}>
          <MaskedInput mask={maskCVC} render={this.renderCVC} guide={false} />
        </View>
        <View flex={25} style={{ minWidth: '65px' }}>
          <MaskedInput mask={maskExp} render={this.renderExp} guide={false} />
        </View>
      </View>
    )
  }
}

export default CreditCardInput
