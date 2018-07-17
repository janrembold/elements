import React from 'react'
import RadioButton from './RadioButton'
import RadioButtonSet from './RadioButtonSet'

it('should chain the onChange property', () => {
  const handleChange1 = jest.fn()
  const handleChange2 = jest.fn()
  const wrapper = shallow(
    <RadioButtonSet value="" name="test" onChange={handleChange1}>
      <RadioButton onChange={handleChange2} />
      <RadioButton onChange={handleChange2} />
    </RadioButtonSet>
  )

  const internalRadio = wrapper.children().first()
  internalRadio.simulate(
    'change',
    { target: { value: 'woofRadioGroup' } },
    true
  )
  expect(handleChange1).toBeCalled()
  expect(handleChange2).toBeCalled()
})
/**
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
})*/
