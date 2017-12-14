import React from 'react'
import renderer from 'react-test-renderer'
import Image from './Image'

test('Image renders correctly', () => {
  const tree = renderer
    .create(<Image src="http://example.com/test.js" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('Image should set position', () => {
  const tree = renderer
    .create(<Image src="http://example.com/test.js" position="center" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
