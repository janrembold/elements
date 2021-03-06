import React, { Component } from 'react'
import { func, bool, string } from 'prop-types'
import Input from '../atoms/Input'
import Text from '../atoms/Text'
import countryInfo from '../utils/CountryList'

const countryCodes = countryInfo.map(country => country.code.toString())

const matchNumber = original => (original ? original.match(/[0-9]/gm) : '')

const removeFormat = original =>
  matchNumber(original) ? matchNumber(original).join('') : ''

const findArea = (areaCodes, pureNumber, countryCode, areaLength) => {
  // if country has areas property, check if entered area code exists
  if (areaCodes) {
    const areaBeginsZero = areaCodes.find(area => area.split('')[0] === '0')
    const area = pureNumber.substring(countryCode.length)
    const zeroExists = !areaBeginsZero && area[0] === '0'
    const offset = zeroExists ? 1 : 0
    const testAreaCode = area.substring(offset, areaLength + offset)
    const areaExists = areaCodes.indexOf(testAreaCode)
    return areaExists !== -1
      ? { validAreaCode: testAreaCode, zeroExists }
      : false
  }

  return false
}

const checkFormat = (countryIndex, pureNumber, areaCode) => {
  // if country has format property, format accordingly
  const { code, format, areas } = countryInfo[countryIndex] || ''
  const { validAreaCode, zeroExists } = areaCode || ''
  const numberInFormat = format
    ? format.split('').reduce((acc, curr) => (curr === 'X' ? acc + 1 : acc), 0)
    : ''
  const countryCode = code ? code.toString() : ''
  const countryCodeLength = code ? countryCode.length : ''
  const codeLength = validAreaCode
    ? validAreaCode.length + countryCodeLength
    : countryCodeLength
  const offset = zeroExists ? 1 : 0
  const removedCodes = pureNumber.substring(codeLength + offset)
  let numberX = 0
  const formattingArea =
    format &&
    pureNumber.length <= numberInFormat + codeLength + offset &&
    !!areas === !!validAreaCode
      ? format.split('').map((letter, index) => {
          if (index <= pureNumber.length + numberX) {
            if (letter === 'C') {
              numberX++
              return zeroExists ? countryCode + ' (0)' : countryCode
            } else if (letter === 'A') {
              numberX++
              return validAreaCode
            } else if (letter === 'X') {
              return removedCodes[index - numberX]
            }

            numberX++
            return index >= removedCodes.length + numberX ? undefined : letter
          }
        })
      : // spain's (+39) area codes starts with 0, and keeps the 0 even when calling internationally
        pureNumber[countryCodeLength] === '0' && countryCode !== '39'
        ? [
            countryCode,
            ' (0) ',
            validAreaCode,
            removedCodes.substring(
              pureNumber.length <= numberInFormat + codeLength + 1
                ? 1
                : pureNumber.length > numberInFormat + codeLength + 1 &&
                  pureNumber[countryCodeLength] === '0' &&
                  !validAreaCode
                  ? 1
                  : 0
            ),
          ]
        : code ? [code, ' ', validAreaCode, removedCodes] : pureNumber

  return ['+', ...formattingArea]
}

const formatInput = (countryIndex, pureNumber) => {
  const { code, areas } = countryInfo[countryIndex] || ''
  const countryCode = code ? code.toString() : ''
  const areaCodes = areas ? areas.map(area => area.toString()) : ''
  const maxAreaDigits = areaCodes
    ? areaCodes.reduce(
        (acc, curr) => (curr.length > acc ? curr.length : acc),
        []
      )
    : ''

  // if country has area codes, check to see if inputted area code exists
  const loopAreas = [...Array(maxAreaDigits)].map((_, index) =>
    findArea(areaCodes, pureNumber, countryCode, index + 1)
  )
  const validAreaObj = loopAreas.find(areaCode => areaCode !== false)
  // check if format of this country is available
  const formatted = checkFormat(countryIndex, pureNumber, validAreaObj)

  return formatted.join('')
}

const formattedNumber = number => {
  const joinedMatch = removeFormat(number)
  const pureNumber =
    joinedMatch.substring(0, 2) === '00'
      ? joinedMatch.substring(2)
      : joinedMatch[0] === '0' ? joinedMatch.substring(1) : joinedMatch

  // check first 3 digits of pureNumber to see if a country matches, else return pureNumber
  const loopThreeDigits = [...Array(3)].map((_, index) =>
    countryCodes.indexOf(pureNumber.substring(0, index + 1))
  )
  const countryIndex = loopThreeDigits.find(countryCode => countryCode !== -1)
  const formatted = formatInput(countryIndex, pureNumber)
  const formatSubstring = formatted.substring(0, formatted.length)
  return countryIndex === 0 || pureNumber ? formatSubstring : pureNumber
}

/**
 * PhoneInputs are used to enter international phone numbers - country codes are mandatory.
 * For non-international numbers, please see our TextInput component.
 *
 * Features:
 * Entered information will automatically be formatted according to the country code.
 * Currently, area codes are only formatted for Austria, France, Germany, Italy, Portugal, Switzerland, and the United States.
 *
 * ```example
 * <PhoneInput name="phone" placeholder="Example Placeholder" defaultValue="4907615555555" required />
 * ```
 **/

class PhoneInput extends Component {
  static propTypes = {
    /** Indicates that this field is required */
    required: bool,
    /** The name of this input field */
    name: string.isRequired,
    /** Called, when the users changes something */
    onChange: func,
    /** Prefilled default value (optional) */
    defaultValue: string,
    /** Value of placeholder */
    placeholder: string,
  }

  state = {
    numberEntered: false,
    backspaced: false,
    deleted: false,
    value: this.props.defaultValue,
    spanZ: 10,
    placeholder: '+',
  }

  componentDidMount = () => {
    const formatted = formattedNumber(this.textInput.value)

    this.setState({ value: formatted, spanZ: formatted ? 0 : 10 })
  }

  formatNumber = event => {
    const input = this.textInput
    const {
      backspaced,
      backspaced: { end, offset, previous },
      numberEntered,
      deleted,
    } = this.state
    const { selectionStart } = event.target
    const formatted = formattedNumber(removeFormat(event.target.value))

    this.setState({ value: formatted }, () => {
      const beforeSelection = previous ? previous.substring(0, end) : ''
      const { nonNumber, value } = this.state
      // differentiate if backspaced or number is entered, then setSelectionRange accordingly
      if ((value === '+' || beforeSelection === '+') && !numberEntered) {
        input.setSelectionRange(1, 1)
      } else if (backspaced) {
        const previousSubstring = previous.substring(0, selectionStart)
        const currentSubstring = input.value.substring(0, selectionStart)
        const lastNumber = formatted
          .split('')
          .findIndex(
            (_, index) =>
              removeFormat(formatted.substring(0, index)) ===
              removeFormat(previousSubstring)
          )
        const position =
          previousSubstring === currentSubstring
            ? selectionStart
            : previous.length <= value.length && lastNumber !== -1
              ? lastNumber
              : previous.length <= value.length
                ? value.length
                : end - nonNumber[0] - nonNumber[1] - offset
        input.setSelectionRange(position, position)
      } else if (deleted || deleted === 0) {
        input.setSelectionRange(deleted, deleted)
      } else if (numberEntered || numberEntered === 0) {
        const nextNumber = formatted.substring(numberEntered).split('')
        const nextNumberIndex = nextNumber.findIndex(
          number => matchNumber(number) !== null
        )
        const position = nextNumberIndex + selectionStart

        input.setSelectionRange(position, position)
      }

      this.setState({
        numberEntered: false,
        backspaced: false,
        deleted: false,
        spanZ: input.value ? 0 : 10,
      })
      this.props.onChange && this.props.onChange(removeFormat(formatted))
    })
  }

  handleKeyDown = event => {
    const input = this.textInput
    const { selectionStart: start, selectionEnd: end, value } = input
    const { keyCode: key, shiftKey, altKey, metaKey } = event

    // make sure no shifts etc are pressed (to prevent non-numbers being entered)
    if (!shiftKey && !altKey && !metaKey) {
      // if (backspaced || deleted); else if (number is entered)
      if (key === 8) {
        if (start === end) {
          event.preventDefault()
          const closestNumber = value
            .substring(0, start)
            .split('')
            .reduce(
              (acc, curr, index) =>
                matchNumber(curr) !== null
                  ? {
                      number: [index, acc.number[0]],
                      nonNumber: [0, acc.nonNumber[0]],
                    }
                  : {
                      number: acc.number,
                      nonNumber: [acc.nonNumber[0] + 1, acc.nonNumber[1]],
                    },
              { number: [0, 0], nonNumber: [0, 0] }
            )

          this.setState(
            {
              backspaced: { end, offset: 1, previous: value },
              nonNumber: closestNumber.nonNumber,
              value:
                value.substring(0, closestNumber.number[0]) +
                value.substring(end),
            },
            () => {
              this.formatNumber({
                target: {
                  selectionStart: closestNumber.number[0],
                  value: this.state.value,
                },
              })
            }
          )
        } else {
          this.setState({
            backspaced: { end: start, offset: 0, previous: value },
            nonNumber: [0, 0],
          })
        }
      } else if (key === 46) {
        if (start === end) {
          const firstNumber = !matchNumber(value[end])
            ? 1 +
              end +
              value
                .substring(start)
                .split('')
                .findIndex(number => number.match(/[0-9]/g) !== null)
            : end
          this.setState({ deleted: start })
          input.setSelectionRange(start, firstNumber)
        } else {
          this.setState({ deleted: start })
        }
      } else if (
        ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) &&
        start !== value.length
      ) {
        this.setState({ numberEntered: start })
      }
    }
  }

  handleFocus = () => {
    const { value } = this.textInput
    this.setState({ spanZ: value ? 0 : 10 })
    // time out of 0sec b/c setSelectionRange will only execute properly after focus event
    setTimeout(() => {
      const cursorPosition = value === '+' ? 1 : value.length
      this.textInput.setSelectionRange(cursorPosition, cursorPosition)
    }, 0)
  }

  handleBlur = () =>
    this.textInput.value || this.setState({ spanZ: 10, value: '' })

  handleClick = () => this.textInput.focus()

  createRef = node => (this.textInput = node)

  render() {
    const { onChange, ...props } = this.props
    const styles = {
      wrapper: {
        position: 'relative',
        cursor: 'text',
        width: '100%',
      },
      span: {
        marginLeft: '5px',
        userSelect: 'none',
        position: 'absolute',
        zIndex: this.state.spanZ,
        width: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
      },
    }

    return (
      <div style={styles.wrapper} onClick={this.handleClick}>
        <Text style={styles.span} size="m">
          {this.state.placeholder}
        </Text>
        <Input
          onInputRef={this.createRef}
          name="phone"
          type="tel"
          value={this.state.value}
          onKeyDown={this.handleKeyDown}
          onChange={this.formatNumber}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...props}
        />
      </div>
    )
  }
}

export default PhoneInput
