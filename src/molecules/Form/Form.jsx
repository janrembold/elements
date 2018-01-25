import React from 'react'
import PropTypes from 'prop-types'

/**
Forms are used to allow the user to submit information to the app. The form component provides a very simple,
yet powerful way how to handle them.

We are using uncontrolled components to handle forms. The native onSubmit Event gets intercepted, all values
are collected and get pass them as second argument to the onSubmit callback.

***Note:** You don&apos;t need to use the From component in order to make the components like TextInput work. You can also use them standalone.
To learn more, check out [controlled components section](https://reactjs.org/docs/forms.html#controlled-components) in the React docs.

## Getting started with 'Form'
The Form components just <strong>does one simple thing</strong>:
It intercepts the onSubmit Event and collects all data that the user entered and passes it as <strong>second parameter</strong> to the onSubmit callback,
so you can work with it.

## Simple example

```jsx
import { Form, TextInput } from '@allthings/elements'
class MyForm extends React.Component {

  handleSubmit = (e, data) => {
    exampleLoginRequest(data.username, data.password)
  }

  render () {
    return (
        <Form onSubmit={this.handleSubmit}>
            <TextInput name="username" required defaultValue="test"/>
            <TextInput type="password" name="password" required />
        </Form>)
  }
}
```

## HTML5 Form validation

To validate user input, we rely on <a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation">HTML5 Form validation</a>. It provides a standardized and powerful way to validate users input and is supported across all modern browsers.
If you did not use it yet, make sure the read the documentation on <a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation">Mozilla.org</a>.
Also see the <a href="/molecules/TextInput/">TextInput</a> for allowed props.

## Full Example

```example
<ResourceProvider>
  <ThemeProvider theme={{ primary: '#bada55' }}>
    <View direction="column" flex="flex">
      <TitleBar>
        <SquareIconButton icon="login-key" iconColor="white" />
        <Text strong color="white">
          Create new account
        </Text>
      </TitleBar>
      <SimpleLayout>
        <Form>
          <Card>
            <List>
              <TextInput
                name="name"
                placeholder="Your first- and surname"
                pattern="[A-Za-z ]*"
                required
              />
              <TextInput
                type="email"
                name="number"
                placeholder="Your email address"
                required
              />
              <TextInput
                type="text"
                lines={3}
                name="longStory"
                placeholder="A long story"
              />
              <TextInput
                type="text"
                lines={2}
                maxLength={15}
                name="limitedStory"
                placeholder="A limited story"
              />
              <TextInput
                name="number"
                placeholder="Your phone number"
                minLength={3}
              />
              <Checkbox
                name="accept"
                required
                label="Hereby I accept the terms & blablabla"
                labelSize="s"
              />
              <ListItem alignH="center">
                <Button type="submit">Create my account</Button>
              </ListItem>
            </List>
          </Card>
        </Form>
      </SimpleLayout>
    </View>
  </ThemeProvider>
</ResourceProvider>
```
 */
class Form extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onSubmit: _ => _,
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = {}
    const elements = e.target.elements
    for (let i = 0; i < elements.length; i++) {
      let item = elements.item(i)
      data[item.name] = item.value
    }
    this.props.onSubmit(e, data)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.children}
      </form>
    )
  }
}

export default Form
