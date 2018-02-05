import React, { Component } from 'react'
import { number, func, bool, string } from 'prop-types'
import TextInput from './TextInput'
import countryInfo from './CountryList'

const countryCodes = countryInfo.map(country => country.code.toString())

const findArea = (areaCodes, pureNumber, countryLength, areaLength) => {
  // if country has areas property, check if entered area code exists
  if (areaCodes) {
    const area = pureNumber.substring(countryLength)
    const zeroExists = area[0] === '0'
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
  const countryCodeString = code ? code.toString() : ''
  const countryCodeLength = code ? countryCodeString.length : ''
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
              return zeroExists ? countryCodeString + ' (0)' : countryCodeString
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
      : pureNumber[countryCodeLength] === '0'
        ? [
            countryCodeString,
            ' (0) ',
            validAreaCode,
            removedCodes.substring(
              pureNumber.length <= numberInFormat + codeLength + 1 ? 1 : 0,
              removedCodes.length
            ),
          ]
        : code ? [code, ' ', validAreaCode, removedCodes] : pureNumber
  return ['+', ...formattingArea]
}

const formatInput = (countryIndex, pureNumber) => {
  const { code, areas } = countryInfo[countryIndex] || ''
  const countryCodeLength = code ? code.toString().length : ''
  const areaCodes = areas ? areas.map(area => area.toString()) : ''
  const maxAreaDigits = areaCodes
    ? areaCodes.reduce(
        (acc, curr) => (curr.length > acc ? curr.length : acc),
        []
      )
    : ''
  // if country has area codes, check to see if inputted area code exists
  const loopAreas = [...Array(maxAreaDigits)].map((_, index) =>
    findArea(areaCodes, pureNumber, countryCodeLength, index + 1)
  )
  const validAreaObj = loopAreas.find(areaCode => areaCode !== false)
  // check if format of this country is available
  const formatted = checkFormat(countryIndex, pureNumber, validAreaObj)

  return formatted.join('')
}

const formattedNum = number => {
  const matchNumber = number.match(/[0-9]+/gm)
  const joinedMatch = matchNumber ? matchNumber.join('') : ''
  const pureNumber =
    joinedMatch.substr(0, 2) === '00'
      ? joinedMatch.substr(2)
      : joinedMatch[0] === '0' ? joinedMatch.substring(1) : joinedMatch

  // check first 3 digits of pureNum to see if a country matches, else return pureNum
  const loopThreeDigits = [...Array(3)].map((_, index) =>
    countryCodes.indexOf(pureNumber.substring(0, index + 1))
  )
  const countryIndex = loopThreeDigits.find(countryCode => countryCode !== -1)
  const formatted = formatInput(countryIndex, pureNumber)

  return countryIndex === 0 || countryIndex ? formatted : `+${pureNumber}`
}

export default class PhoneInput extends Component {
  static propTypes = {
    onChange: func,
    value: number,
    required: bool,
    name: string.isRequired,
  }

  state = {
    numberEntered: false,
    backspaced: false,
  }

  formatNumber = event => {
    const { input, input: { value: newNumber } } = this.textInput
    const { backspaced, numberEntered } = this.state
    const formatted = formattedNum(newNumber)
    const { selectionStart } = event.target

    input.value = formatted

    // differentiate if backspaced or number is entered, then setSelectionRange accordingly
    if (backspaced) {
      const nextNumber = formatted.substring(0, backspaced)
      const nextNumberIndex = nextNumber
        ? nextNumber
            .split('')
            .reduce(
              (acc, curr, index) =>
                curr.match(/[0-9]/g) !== null ? [...acc, index] : acc
            )
        : ''
      const position = nextNumberIndex[nextNumberIndex.length - 2] + 1

      input.setSelectionRange(position, position)
    } else if (numberEntered) {
      const nextNumber = formatted.substring(numberEntered).split('')
      const nextNumberIndex = nextNumber.findIndex(
        number => number.match(/[0-9]/g) !== null
      )
      const position = nextNumberIndex + selectionStart

      input.setSelectionRange(position, position)
    }

    const pureNumber = formatted.match(/[0-9]/gm)
      ? formatted.match(/[0-9]/gm).join('')
      : ''
    this.setState({ numberEntered: false, backspaced: false })
    this.props.onChange && this.props.onChange(pureNumber)
  }

  handleKeyDown = event => {
    const {
      input,
      input: { selectionStart: start, selectionEnd: end, value },
    } = this.textInput
    const { keyCode: key, shiftKey, altKey, ctrlKey, metaKey } = event
    const nonNumber = value
      ? value.substring(0, start).replace(/[0-9]/gm, '').length
      : ''
    const inputValue = value.match(/[0-9]/gm)
    const pureNumber = inputValue ? inputValue.join('') : ''

    // make sure no shifts etc are pressed (to prevent non-numbers being entered)
    if (!shiftKey && !altKey && !ctrlKey && !metaKey) {
      // if (backspaced || deleted); else if (number is entered)
      if (key === 8 || key === 46) {
        input.value = pureNumber
        if (start !== value.length || key === 46) {
          this.setState({ backspaced: start })
          input.setSelectionRange(start - nonNumber, end - nonNumber)
        }
      } else if (
        ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) &&
        start !== value.length
      ) {
        this.setState({ numberEntered: start })
      }
    }
  }

  createRef = node => this.textInput = node

  render() {
    const { onChange, ...props } = this.props
    return (
      <TextInput
        ref={this.createRef}
        name="phone"
        type="tel"
        defaultValue="+"
        onKeyDown={this.handleKeyDown}
        onChange={this.formatNumber}
        placeholder="Your phone number"
        {...props}
      />
    )
  }
}
