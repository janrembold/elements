import React from 'react'
import RadioButton from './RadioButton'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import ThemeProvider from '../behaviour/ThemeProvider'

describe('<RadioButton />', () => {
  it('should render without error', () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <RadioButton value="white" />
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should handle onChange event', () => {
    const handleChange = sinon.spy()
    const wrapper = shallow(
      <ThemeProvider>
        <RadioButton value="white" onChange={handleChange} />
      </ThemeProvider>
    )
    wrapper.find('RadioButton').simulate('change')
    expect(handleChange.calledOnce).toEqual(true)
  })
})
