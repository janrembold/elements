import React from 'react'
import HorizontalView from './HorizontalView'
import Text from '../atoms/Text'

describe('HorizontalView behaviors', () => {
  it('should render non-arrays', () => {
    let condition = false
    const wrapper = shallow(
      <HorizontalView id="horizontal">
        <Text id="first" key="first">
          Text 1
        </Text>
        <Text id="second" key="second">
          Text 2
        </Text>
        {condition && (
          <Text id="third" key="third">
            Text 3
          </Text>
        )}
      </HorizontalView>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(Text)).toHaveLength(2)
    expect(wrapper.find('#third').exists()).toEqual(false)

    wrapper.unmount()
  })
  it('should render with array too', () => {
    let condition = false
    const wrapper = shallow(
      <HorizontalView>
        {[
          <Text id="first" key="first">
            Text 1
          </Text>,
          <Text id="second" key="second">
            Text 2
          </Text>,
          condition && (
            <Text id="third" key="third">
              Text 3
            </Text>
          ),
        ]}
      </HorizontalView>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(Text)).toHaveLength(2)
    expect(wrapper.find('#third').exists()).toEqual(false)

    wrapper.unmount()
  })
})
