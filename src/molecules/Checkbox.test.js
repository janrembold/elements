import React from 'react'
import Checkbox from './Checkbox'
import { ThemeProvider } from '../'

const THEME = {
  background: 'darkMarco',
}
const STRING_LABEL = 'I am a nice checkbox!'

describe('Test the checkbox component', () => {
  it('should tick it', () => {
    const wrapper = mount(
      <ThemeProvider theme={THEME}>
        <Checkbox label={STRING_LABEL} name="a" />
      </ThemeProvider>
    )
    const input = wrapper.find('input#a')
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('label').text()).toEqual(STRING_LABEL)
    expect(input.prop('checked')).toBeFalsy()
    // Check it.
    input.simulate('change')
    // Re-render in order to get it checked.
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('input#a').prop('checked')).toBeTruthy()
    wrapper.unmount()
  })
  it('should work with children', () => {
    const wrapper = mount(
      <ThemeProvider theme={THEME}>
        <Checkbox label={<h1>test</h1>} name="a" backgroundColor="darkMarco" />
      </ThemeProvider>
    )
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
