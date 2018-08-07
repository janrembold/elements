import React from 'react'
import {
  Button,
  Card,
  Checkbox,
  Form,
  List,
  ListItem,
  PhoneInput,
  ResourceProvider,
  RadioButtonSet,
  RadioButton,
  SimpleLayout,
  SquareIconButton,
  Text,
  TextInput,
  TitleBar,
  ThemeProvider,
  View,
} from '../src'

export default class FormStory extends React.Component {
  render() {
    return (
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
                      label="First- and last name"
                      name="name"
                      placeholder="What's your first name?"
                      required
                    />
                    <PhoneInput
                      label="Phone"
                      name="firstname"
                      placeholder="Whats you number dude?"
                      required
                    />
                    <TextInput
                      name="firstname"
                      placeholder="What's your last name?"
                      required
                    />
                    <TextInput
                      name="email"
                      label="E-Mail"
                      type="email"
                      pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                      placeholder="E-Mail"
                      required
                    />
                    <TextInput
                      type="password"
                      label="Password"
                      name="password"
                      placeholder="Your secret for login"
                      required
                    />
                    <TextInput
                      label="Your feelings"
                      name="password"
                      lines={5}
                      placeholder="Tell us how you feel today"
                    />

                    <Checkbox
                      name="accept"
                      required
                      label="Hereby I accept the terms & blablabla"
                      labelSize="s"
                    />

                    <ListItem>
                      <RadioButtonSet
                        name="drinks"
                        label="Like to drink?"
                        direction="horizontal"
                      >
                        <RadioButton value="coffe">Coffe</RadioButton>
                        <RadioButton value="tee">Tee</RadioButton>
                        <RadioButton value="beer">Beer</RadioButton>
                      </RadioButtonSet>
                    </ListItem>

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
    )
  }
}
