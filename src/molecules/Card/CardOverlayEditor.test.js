import React from 'react'
import CardOverlayEditor from './CardOverlayEditor'
import CardButton from './CardButton'

test('Test component alert when cancel button is clicked', () => {


  const log = jest.fn();
  global.window.confirm = log
  const example = mount(      <CardOverlayEditor
          // eslint-disable-next-line
          initialText = "test"
          onSave={jest.fn()}
          onRequestClose={jest.fn()}
          confirmText={"cancel forsure"}
          cancelText={"buttoncancel"}
          submitText={"sumbit"}
        />);
  example.find(CardButton).at(0).simulate("click")
  expect(log).toHaveBeenCalledWith('cancel forsure')
})
