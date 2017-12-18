import React from 'react'
import CardOverlayEditor from './CardOverlayEditor'
import CardButton from './CardButton'

test('Component sends confirm when cancel button is clicked', () => {
  const log = jest.fn()
  const requestClose = jest.fn()
  const onSave = jest.fn()
  global.window.confirm = log
  const example = mount(
    <CardOverlayEditor
      initialText="test"
      onSave={onSave}
      onRequestClose={requestClose}
      confirmText="cancel forsure"
      cancelText="buttoncancel"
      submitText="sumbit"
    />
  )
  example
    .find(CardButton)
    .at(0)
    .simulate('click')
  expect(log).toHaveBeenCalledWith('cancel forsure')
  expect(requestClose).toHaveBeenCalledTimes(0)
  expect(onSave).toHaveBeenCalledTimes(0)
})

test('Should close when cancel button is clicked without text', () => {
  const requestClose = jest.fn()
  const save = jest.fn()
  const wrapper = mount(
    <CardOverlayEditor
      onSave={save}
      onRequestClose={requestClose}
      confirmText="cancel forsure"
      cancelText="buttoncancel"
      submitText="sumbit"
    />
  )

  wrapper
    .find(CardButton)
    .at(0)
    .simulate('click')
  expect(requestClose).toHaveBeenCalled()
})

test('Should save when confirm button is clicked', () => {
  const requestClose = jest.fn()
  const save = jest.fn()
  const wrapper = mount(
    <CardOverlayEditor
      onSave={save}
      initialText="Hello World"
      onRequestClose={requestClose}
      confirmText="cancel forsure"
      cancelText="buttoncancel"
      submitText="sumbit"
    />
  )

  wrapper
    .find(CardButton)
    .at(1)
    .simulate('click')

  expect(requestClose).toHaveBeenCalledTimes(0)
  expect(save).toHaveBeenCalled()
})
