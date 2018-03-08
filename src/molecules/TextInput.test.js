import React from 'react'
import renderer from 'react-test-renderer'
import TextInput from './TextInput'

test('TextInput renders', () => {
  const tree = renderer
    .create(
      <TextInput
        name="email"
        label="E-Mail"
        type="email"
        placeholder="E-Mail"
        required
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
