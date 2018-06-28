import React from 'react'
import { Text, ReadMore } from '../'

class ReadMoreTest extends ReadMore {
  childRef = { current: { style: { height: 480 } } }
}

describe('ReadMore component', () => {
  test('ReadMore renders properly width a px height of 20', () => {
    const wrapper = mount(
      <ReadMoreTest defaultHeight={20}>
        <Text>Testing a short text...</Text>
      </ReadMoreTest>
    )
    expect(wrapper).toMatchSnapshot()
  })
  test('ReadMore renders properly width a vh height of 10vh', () => {
    const wrapper = mount(
      <ReadMoreTest defaultHeight="10vh">
        <Text>Testing a short text with 10vh...</Text>
      </ReadMoreTest>
    )
    expect(wrapper).toMatchSnapshot()
  })
  test('ReadMore extends a large text', () => {
    const wrapper = mount(
      <ReadMoreTest defaultHeight="5vh">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          dignissim sem in elit mollis consequat. Suspendisse potenti. Maecenas
          a velit vel dolor mollis viverra. Praesent ex diam, ultricies ac
          ultricies ut, efficitur sit amet leo. Vivamus ex ante, dapibus a
          elementum vel, ultrices in erat. Vestibulum eget ante turpis. Donec
          dapibus, purus vel euismod egestas
        </Text>
      </ReadMoreTest>
    )
    // @TODO - create a test which actually clicks the readMore link and checks if it disappears....
    expect(wrapper).toMatchSnapshot()
  })
})
