import React from 'react'
import HorizontalView from './HorizontalView'
import Text from '../atoms/Text'

describe('HorizontalView behaviors', () => {
  it('should render non-arrays', () => {
    const condition = false
    const wrapper = shallow(
      <HorizontalView id="horizontal">
        <Text id="first" key="first">
          Text 1
        </Text>
        <Text id="second" key="second">
          Text 2
        </Text>
        {undefined}
      </HorizontalView>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('#horizontal').children()).toHaveLength(2)
    expect(wrapper.find('#first').exists()).toEqual(true)
    expect(wrapper.find('#third').exists()).toEqual(false)
    wrapper.unmount()
  })
  it('should render with array too', () => {
    const wrapper = shallow(
      <HorizontalView>
        {[
          <Text id="first" key="first">
            Text 1
          </Text>,
          <Text id="second" key="second">
            Text 2
          </Text>,
          undefined,
        ]}
      </HorizontalView>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('#second').exists()).toEqual(true)
    expect(wrapper.find('#first').exists()).toEqual(false)
    wrapper.unmount()
  })
})
