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
]

test('First radio-button should be selected', () => {
  const wrapper = mount(
    <ThemeProvider theme={THEME}>
      <RadioButtonSet
        name="color"
        selection={selection}
        defaultValue="blue pill"
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
  expect(input.prop('checked')).toBeFalsy()
  // Select other.
  input.simulate('change')
  // Re-render in order to get it checked.
  wrapper.update()
  expect(wrapper).toMatchSnapshot()
  expect(
    wrapper
      .find('input')
      .first()
      .prop('checked')
  ).toBeTruthy()
  wrapper.unmount()
})
