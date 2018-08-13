import React from 'react'
import EditableText from './EditableText'

const EDITABLE = 'div[contentEditable]'
const TEXT = 'Edit me!'

describe('Test the editable text component', () => {
  it('should be a simple static one', () => {
    const wrapper = mount(<EditableText>{TEXT}</EditableText>)
    expect(wrapper).toMatchSnapshot()
    // Enzyme doesn't provide a way to modify contentEditable!
    // https://github.com/airbnb/enzyme/issues/927
    wrapper.setProps({ children: TEXT + '?' })
    expect(wrapper.find(EDITABLE).text()).toBe(TEXT + '?')
    wrapper.find(EDITABLE).simulate('keyDown', { key: 'Enter' })
    expect(wrapper.find(EDITABLE).text()).toBe(TEXT + '?')
  })
})
