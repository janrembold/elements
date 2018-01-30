import React, { Component } from 'react'
import TextInput from './TextInput'
import countryInfo from './CountryList'

const countryCodes = countryInfo.map(country => {
  return country.code.toString()
})

const findArea = (areaCodes, pureNumber, countryLength, areaLength) => {
  // if country has areas property, check if entered area code exists
  if (areaCodes) {
    const area = pureNumber.substring(countryLength)
    const { offset, zeroExists } =
      area[0] === '0'
        ? { offset: 1, zeroExists: true }
        : { offset: 0, zeroExists: false }
    const testAreaCode = area.substring(offset, areaLength + offset)
    const areaExists = areaCodes.indexOf(testAreaCode)
    return areaExists !== -1
      ? { validAreaCode: testAreaCode, zeroExists }
      : false
  }
}

const checkFormat = (countryIndex, pureNumber, areaCode) => {
  // if country has format property, format accordingly
  const { code, format, areas } = countryInfo[countryIndex]
  const { validAreaCode, zeroExists } = areaCode || ''
  const numberInFormat = format
    ? format.split('').reduce((acc, curr) => (curr === 'X' ? acc + 1 : acc), 0)
    : ''
  const countryCodeString = code.toString()
  const countryCodeLength = countryCodeString.length

  let numberX = 0
  const codeLength = validAreaCode
    ? validAreaCode.length + countryCodeLength
    : countryCodeLength
  const removedCodes = zeroExists
    ? pureNumber.substring(codeLength + 1)
    : pureNumber.substring(codeLength)

  const formattingArea =
    format &&
    pureNumber.length <=
      numberInFormat + (zeroExists ? codeLength + 1 : codeLength) &&
    Boolean(areas) === Boolean(validAreaCode)
      ? format.split('').map((letter, index) => {
          while (index <= pureNumber.length + numberX) {
            if (letter === 'C') {
              numberX++
              return zeroExists ? countryCodeString + ' (0)' : countryCodeString
            } else if (letter === 'A') {
              numberX++
              return validAreaCode
            } else if (letter === 'X') {
              return removedCodes[index - numberX]
            } else {
              numberX++
              return index >= removedCodes.length + numberX ? undefined : letter
            }
          }
        })
      : pureNumber[countryCodeLength] === '0' &&
        pureNumber.length <= numberInFormat + codeLength + 1
        ? [
            countryCodeString,
            ' (0) ',
            validAreaCode,
            removedCodes.substring(1, removedCodes.length),
          ]
        : pureNumber[countryCodeLength] === '0'
          ? [
              countryCodeString,
              ' (0) ',
              validAreaCode,
              removedCodes.substring(0, removedCodes.length),
            ]
          : code ? [code, ' ', validAreaCode, removedCodes] : pureNumber

  return ['+', ...formattingArea]
}

const formatInput = (countryIndex, pureNum) => {
  const { code, areas } = countryInfo[countryIndex]
  const countryCodeLength = code.toString().length
  const areaCodes = areas ? areas.map(area => area.toString()) : ''
  const maxAreaDigits = areaCodes
    ? areaCodes.reduce(
        (acc, curr) => (curr.length > acc ? curr.length : acc),
        []
      )
    : ''
  // if country has area codes, check to see if inputted area code exists
  const loopAreas = [...Array(maxAreaDigits)].map((_, index) =>
    findArea(areaCodes, pureNum, countryCodeLength, index + 1)
  )
  const validAreaObj = loopAreas.find(areaCode => areaCode !== false)
  // check if format of this country is available
  const formattingArea = checkFormat(countryIndex, pureNum, validAreaObj)
  return formattingArea.join('')
}

const formattedNum = number => {
  const matchNumber = number.match(/[0-9]+/gm)
  let pureNum = matchNumber ? matchNumber.join('') : ''
  pureNum =
    pureNum.substring(0, 2) === '00'
      ? pureNum.substring(2)
      : pureNum[0] === '0' ? pureNum.substring(1) : pureNum

  // check first 3 digits of pureNum to see if a country matches, else return pureNum
  const loopThreeDigits = [...Array(3)].map((_, index) =>
    countryCodes.indexOf(pureNum.substring(0, index + 1))
  )
  const countryIndex = loopThreeDigits.find(countryCode => countryCode !== -1)
  return countryIndex === 0 || countryIndex
    ? formatInput(countryIndex, pureNum)
    : `+${pureNum}`
}

class PhoneInput extends Component {
  state = {}

  formatNumber = () => {
    const newNumber = this.textInput.input.value
    const afterFormat = formattedNum(newNumber)
    this.textInput.input.value = afterFormat
  }

  handleKeyDown = event => {
    // when backspaced
    const { input, value = input.value } = this.textInput
    const start = input.selectionStart
    if (event.keyCode === 8 ) {
      const inputValue = value.match(/[0-9]/gm)
      const nonNumber = value ? value.substring(0, start).replace(/[0-9]/gm, '').length : ''
      const pureNum = inputValue ? inputValue.join('') : ''
      this.textInput.input.value = pureNum
      this.textInput.input.setSelectionRange(start - nonNumber, start - nonNumber)
    }
  }

  createRef= node => {
    this.textInput = node
  }

  render() {
    return (
      <TextInput
        ref={this.createRef}
        name="phone"
        type="tel"
        defaultValue="+"
        onKeyDown={this.handleKeyDown}
        onChange={this.formatNumber}
        placeholder="Your phone number"
        required
      />
    )
  }
}

export default PhoneInput
