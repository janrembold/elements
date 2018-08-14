import React from 'react'
import ReactDOM from 'react-dom'
import EditableText from './EditableText'
import { ColorPalette } from '@allthings/colors'

const EDITABLE = 'div[contentEditable]'
const ICON = 'view'
const ICON_COLOR = 'red'
const ICON_COLOR_FROM_PALETTE = ColorPalette.red
const TEXT = 'Edit me!'

describe('Test the editable text component', () => {
  it('should be editable', () => {
    const wrapper = mount(<EditableText>{TEXT}</EditableText>)
    expect(wrapper).toMatchSnapshot()
    // Enzyme doesn't provide a way to modify contentEditable!
    // https://github.com/airbnb/enzyme/issues/927
    wrapper.setProps({ children: TEXT + '?' })
    expect(wrapper.find(EDITABLE).text()).toBe(TEXT + '?')
    wrapper.find(EDITABLE).simulate('keyDown', { key: 'Enter' })
    expect(wrapper.find(EDITABLE).text()).toBe(TEXT + '?')
  })
  it('should be using a custom icon', () => {
    const wrapper = shallow(<EditableText icon={ICON}>{TEXT}</EditableText>)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('Icon').prop('name')).toBe(ICON)
  })
  it('should be using a custom icon color', () => {
    const wrapper = shallow(
      <EditableText icon={ICON} iconColor={ICON_COLOR}>
        {TEXT}
      </EditableText>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('Icon').prop('color')).toBe(ICON_COLOR_FROM_PALETTE)
  })
  it('should be using a custom decoration color', () => {
    // Ideally this should be working:
    // https://github.com/kentcdodds/jest-glamor-react#tohavestyleruleproperty-value
    // But it never get any CSS rule... Instead, let's snapshot-diff!
    // https://github.com/kentcdodds/jest-glamor-react#integration-with-snapshot-diff
    const renderer = ui => {
      const div = document.createElement('div')
      ReactDOM.render(ui, div)
      return div.children[0]
    }
    const wrapper = renderer(<EditableText>{TEXT}</EditableText>)
    const wrapperWithDecoration = renderer(
      <EditableText decorationColor={ICON_COLOR}>{TEXT}</EditableText>
    )
    expect(fromDOMNode(wrapper)).toMatchDiffSnapshot(
      fromDOMNode(wrapperWithDecoration)
    )
  })
})
