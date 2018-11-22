import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  FloatingButton,
  Form,
  FormValidityProvider,
  Text,
  TextInput,
  ThemeProvider,
  PhoneInput,
} from '../src/'
import HorizontalView from './HorizontalView'
import FormStory from './FormStory'
import createViewportDecorator from './createViewportDecorator'
import RadioButtonStory from './RadioButtonStory'
import CollapsibleStory from './CollapsibleStory'
import TypeaheadStory from './TypeaheadStory'
import Icon, { Icons } from '../src/atoms/Icon'
import ResourceProvider from '../src/behaviour/ResourceProvider'
import List from '../src/molecules/List/List'
import ListItem from '../src/molecules/List/ListItem'
import { css } from 'glamor'
import Input from '../src/atoms/Input'
import ConfirmStory from './ConfirmStory'

storiesOf('Animations', module)
  .addDecorator(createViewportDecorator())
  .add('HorizontalView', () => <HorizontalView />)

storiesOf('Forms', module)
  .addDecorator(createViewportDecorator())
  .add('Confirm', () => <ConfirmStory />)
  .add('SimpleForm', () => <FormStory />)
  .add('RadioButton', () => <RadioButtonStory />)
  .add('PhoneInput', () => {
    return (
      <ThemeProvider>
        <Form>
          <PhoneInput
            placeholder="hello, this is a placeholder"
            defaultValue="49017632"
            name="phone"
            id="phone"
          />
          <FloatingButton>
            <Text>get phone input value</Text>
          </FloatingButton>
        </Form>
      </ThemeProvider>
    )
  })
  .add('Typeahead', () => <TypeaheadStory />)

storiesOf('FloatingButton', module)
  .addDecorator(createViewportDecorator())
  .add('with text', () => (
    <ThemeProvider>
      <FormValidityProvider
        validity={{
          valueMissing: 'YEYYYY, NOPEEEEEEEE!',
        }}
      >
        <Form onSubmit={_ => _}>
          <FloatingButton type="submit" onClick={action('clicked')}>
            <Text strong size="s" color="white">
              Hello Button
            </Text>
          </FloatingButton>
          <TextInput
            name="email"
            type="email"
            placeholder="Your email"
            required
          />
        </Form>
      </FormValidityProvider>
    </ThemeProvider>
  ))

storiesOf('Containers', module)
  .addDecorator(createViewportDecorator())
  .add('Collapsible', CollapsibleStory)

storiesOf('Icons', module)
  .addDecorator(createViewportDecorator())
  .add('List', () => (
    <ThemeProvider>
      <ResourceProvider>
        <List>
          {Icons.map(icon => (
            <ListItem key={icon} directon="row">
              <Icon size="m" name={icon} />
              <Input
                name="x[]"
                onFocus={e => e.target.select()} // eslint-disable-line react/jsx-no-bind
                type="text"
                value={icon}
                readonly
                style={{ cursor: 'pointer', outline: 'none', flex: 1 }}
              />
            </ListItem>
          ))}
        </List>
      </ResourceProvider>
    </ThemeProvider>
  ))
