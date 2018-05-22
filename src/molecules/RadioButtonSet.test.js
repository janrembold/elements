import React from 'react'
import RadioButtonSet from './RadioButtonSet'
import { mount } from 'enzyme'
import ThemeProvider from '../behaviour/ThemeProvider'

const THEME = {
  background: 'blueDanube',
}

const selection = [
  { key: 'b', value: 'blue pill' },
  { key: 'r', value: 'red pill' },
  { key: 'g', value: 'green' },
]

const defaultVal = 'green'

test('First radio-button should be selected', () => {
  const wrapper = mount(
    <ThemeProvider theme={THEME}>
      <RadioButtonSet
        name="color"
        selection={selection}
        defaultValue={defaultVal}
      />
    </ThemeProvider>
  )
  const input = wrapper.find('input').first()
  expect(wrapper).toMatchSnapshot()
  expect(
    wrapper
      .find('label')
      .first()
      .text()
  ).toEqual(selection[0].value)
  // Select other.
  input.simulate('change')
  expect(
    wrapper
      .find('label')
      .last()
      .text()
  ).toEqual(defaultVal)
  expect(input.prop('defaultChecked')).toBeFalsy()
  // Select other.
  input.simulate('change')
  // Re-render in order to get it checked.
  wrapper.update()
  expect(wrapper).toMatchSnapshot()
  expect(
    wrapper
      .find('input')
      .first()
      .prop('defaultChecked')
  ).toBeTruthy()
  wrapper.unmount()
})
