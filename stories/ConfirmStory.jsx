import React from 'react'
import { Button, confirm, ThemeProvider, View } from '../src'
import { css } from 'glamor'

export default class FormStory extends React.Component {
  state = {
    backgroundColor: 'white',
  }

  handleClick = async () => {
    const response = await confirm({
      message: 'Turn the background red?',
      acceptButtonLabel: 'Okidoki',
      cancelButtonLabel: 'Nope',
    })
    const backgroundColor = response ? 'red' : 'white'

    this.setState({ backgroundColor })
  }

  render() {
    return (
      <View
        {...css({
          backgroundColor: this.state.backgroundColor,
          height: '100vh',
        })}
      >
        <ThemeProvider>
          <Button onClick={this.handleClick}>Show a confirm</Button>
        </ThemeProvider>
      </View>
    )
  }
}
