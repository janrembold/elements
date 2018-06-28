import React from 'react'
import { Text, ReadMore } from '../'

class ReadMoreTest extends ReadMore {
    childRef = { current: { style: { height: 480 } } }
}

describe('ReadMore component', () => {
  test('ReadMoreTest renders properly width a px height of 20', () => {
    const wrapper = mount(
      <ReadMoreTest defaultHeight={20}>
        <Text>Testing a short text...</Text>
      </ReadMoreTest>
    )
    expect(wrapper).toMatchSnapshot()
  })
  test('ReadMoreTest renders properly width a vh height of 10vh', () => {
    const wrapper = mount(
      <ReadMoreTest defaultHeight="10vh">
        <Text>Testing a short text with 10vh...</Text>
      </ReadMoreTest>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
