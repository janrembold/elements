import React from 'react'
import RadioButton from './RadioButton'

it('should chain the onChange property', () => {
  const handleChange1 = jest.fn()
  const wrapper = shallow(<RadioButton value="a" onChange={handleChange1} />)

  const internalRadio = wrapper.children().first()
  console.log(internalRadio)

  internalRadio.simulate('change', { target: { value: 'a' } }, true)
  expect(handleChange1).toBeCalled()
})
